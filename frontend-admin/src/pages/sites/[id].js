import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import ImageUpload from '../../components/ImageUpload';

export default function EditSite() {
  const router = useRouter();
  const { id } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [site, setSite] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); // info, design, hero
  
  const [formData, setFormData] = useState({
    business_name: '',
    subdomain: '',
    whatsapp: '',
    business_category: '',
    business_city: '',
    
    logo_url: '',
    logo_filename: '',
    primary_color: '#002177',
    secondary_color: '#00b3ff',
    
    hero_title: '',
    hero_subtitle: '',
    hero_cta_text: 'Fale Conosco',
    hero_background: '',
    hero_background_filename: '',
  });

  useEffect(() => {
    if (!id) return;
    
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`https://api.movella.com.br/api/sites/${id}`, {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        setSite(data);
        
        const settings = data.settings ? JSON.parse(data.settings) : {};
        
        setFormData({
          business_name: data.business_name || '',
          subdomain: data.subdomain || '',
          whatsapp: data.whatsapp || '',
          business_category: data.business_category || '',
          business_city: data.business_city || '',
          
          logo_url: settings.logo_url || '',
          logo_filename: settings.logo_filename || '',
          primary_color: settings.primary_color || '#002177',
          secondary_color: settings.secondary_color || '#00b3ff',
          
          hero_title: settings.hero_title || data.business_name || '',
          hero_subtitle: settings.hero_subtitle || 'Bem-vindo ao nosso site',
          hero_cta_text: settings.hero_cta_text || 'Fale Conosco',
          hero_background: settings.hero_background || '',
          hero_background_filename: settings.hero_background_filename || '',
        });
        
        setLoading(false);
      })
      .catch(err => {
        alert('Erro ao carregar site');
        setLoading(false);
      });
  }, [id]);

  const handleLogoUpload = (url, filename) => {
    // Deletar logo antigo se existir
    if (formData.logo_filename) {
      deleteOldFile(formData.logo_filename);
    }
    setFormData({
      ...formData, 
      logo_url: url || '', 
      logo_filename: filename || ''
    });
  };

  const handleHeroUpload = (url, filename) => {
    // Deletar hero antigo se existir
    if (formData.hero_background_filename) {
      deleteOldFile(formData.hero_background_filename);
    }
    setFormData({
      ...formData, 
      hero_background: url || '', 
      hero_background_filename: filename || ''
    });
  };

  const deleteOldFile = async (filename) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://api.movella.com.br/api/upload/${filename}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      });
    } catch (err) {
      console.error('Erro ao deletar arquivo antigo:', err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem('token');

    const settings = {
      logo_url: formData.logo_url,
      logo_filename: formData.logo_filename,
      primary_color: formData.primary_color,
      secondary_color: formData.secondary_color,
      hero_title: formData.hero_title,
      hero_subtitle: formData.hero_subtitle,
      hero_cta_text: formData.hero_cta_text,
      hero_background: formData.hero_background,
      hero_background_filename: formData.hero_background_filename,
    };

    try {
      const res = await fetch(`https://api.movella.com.br/api/sites/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          business_name: formData.business_name,
          subdomain: formData.subdomain,
          whatsapp: formData.whatsapp,
          business_category: formData.business_category,
          business_city: formData.business_city,
          settings: JSON.stringify(settings)
        })
      });

      if (res.ok) {
        alert('✅ Site atualizado com sucesso!');
        router.push('/dashboard');
      } else {
        alert('❌ Erro ao salvar');
      }
    } catch (err) {
      alert('❌ Erro ao salvar: ' + err.message);
    }
    setSaving(false);
  };

  const handlePublish = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(`https://api.movella.com.br/api/sites/${id}/publish`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token }
      });

      if (res.ok) {
        alert('🚀 Site publicado!');
        setSite({...site, is_published: true});
      }
    } catch (err) {
      alert('Erro ao publicar');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ fontSize: '1.2rem', color: '#002177' }}>Carregando...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        {/* Barra de Topo Fixa */}
        <div style={{
          background: '#ffffff',
          borderBottom: '2px solid #e0e0e0',
          padding: '1.5rem 2rem',
          position: 'sticky',
          top: '80px',
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{ color: '#002177', margin: 0, fontSize: '1.8rem' }}>
                ✏️ {formData.business_name}
              </h1>
              <p style={{ color: '#666', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
                🌐 {formData.subdomain}.movella.com.br
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              {!site?.is_published && (
                <button
                  onClick={handlePublish}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #8317d4 0%, #f11ba9 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.95rem'
                  }}
                >
                  🚀 Publicar
                </button>
              )}
              
              <a
                href={`https://${formData.subdomain}.movella.com.br`}
                target="_blank"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#00b3ff',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '0.95rem'
                }}
              >
                👁️ Ver Site
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          position: 'sticky',
          top: '160px',
          zIndex: 99
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            gap: '2rem',
            padding: '0 2rem'
          }}>
            {['info', 'design', 'hero'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '3px solid #00b3ff' : '3px solid transparent',
                  color: activeTab === tab ? '#002177' : '#666',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {tab === 'info' && '📋 Informações'}
                {tab === 'design' && '🎨 Design'}
                {tab === 'hero' && '🎯 Hero Section'}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '3rem 2rem'
        }}>
          {activeTab === 'info' && (
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ color: '#002177', marginTop: 0 }}>📋 Informações Básicas</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    Nome do Negócio:
                  </label>
                  <input
                    value={formData.business_name}
                    onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #00b3ff',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    Subdomínio:
                  </label>
                  <input
                    value={formData.subdomain}
                    onChange={(e) => setFormData({...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #00b3ff',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    WhatsApp:
                  </label>
                  <input
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    placeholder="5548999999999"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #00b3ff',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    Categoria:
                  </label>
                  <select
                    value={formData.business_category}
                    onChange={(e) => setFormData({...formData, business_category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #00b3ff',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Selecione...</option>
                    <option value="servicos">Serviços Gerais</option>
                    <option value="salao">Salão / Estética</option>
                    <option value="petshop">Pet Shop</option>
                    <option value="restaurante">Restaurante</option>
                    <option value="profissional">Profissional Liberal</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    Cidade:
                  </label>
                  <input
                    value={formData.business_city}
                    onChange={(e) => setFormData({...formData, business_city: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #00b3ff',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ color: '#002177', marginTop: 0 }}>🎨 Personalização Visual</h2>

              <ImageUpload 
                label="📸 Logo do Negócio"
                currentImage={formData.logo_url ? `https://api.movella.com.br${formData.logo_url}` : null}
                onUpload={handleLogoUpload}
                type="logo"
                maxSize={5}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    🎨 Cor Primária:
                  </label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => setFormData({...formData, primary_color: e.target.value})}
                      style={{
                        width: '80px',
                        height: '50px',
                        border: '2px solid #8317d4',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                    <input
                      type="text"
                      value={formData.primary_color}
                      onChange={(e) => setFormData({...formData, primary_color: e.target.value})}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '2px solid #8317d4',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    🎨 Cor Secundária:
                  </label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={formData.secondary_color}
                      onChange={(e) => setFormData({...formData, secondary_color: e.target.value})}
                      style={{
                        width: '80px',
                        height: '50px',
                        border: '2px solid #8317d4',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                    <input
                      type="text"
                      value={formData.secondary_color}
                      onChange={(e) => setFormData({...formData, secondary_color: e.target.value})}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        border: '2px solid #8317d4',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{ color: '#002177', marginTop: 0 }}>🎯 Hero Section (Topo do Site)</h2>

              <ImageUpload 
                label="🖼️ Imagem de Fundo do Hero"
                currentImage={formData.hero_background ? `https://api.movella.com.br${formData.hero_background}` : null}
                onUpload={handleHeroUpload}
                type="hero"
                maxSize={10}
              />

              <div style={{ marginTop: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                  📝 Título Principal:
                </label>
                <input
                  value={formData.hero_title}
                  onChange={(e) => setFormData({...formData, hero_title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #f11ba9',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                  📝 Subtítulo:
                </label>
                <textarea
                  value={formData.hero_subtitle}
                  onChange={(e) => setFormData({...formData, hero_subtitle: e.target.value})}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #f11ba9',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                  🔘 Texto do Botão:
                </label>
                <input
                  value={formData.hero_cta_text}
                  onChange={(e) => setFormData({...formData, hero_cta_text: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #f11ba9',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            justifyContent: 'center',
            position: 'sticky',
            bottom: '2rem',
            padding: '1.5rem',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={() => router.push('/dashboard')}
              style={{
                padding: '1rem 2rem',
                background: '#666',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ❌ Cancelar
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '1rem 3rem',
                background: saving ? '#ccc' : 'linear-gradient(135deg, #00b3ff 0%, #0652f7 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: saving ? 'not-allowed' : 'pointer',
                boxShadow: saving ? 'none' : '0 4px 15px rgba(0,179,255,0.4)'
              }}
            >
              {saving ? '⏳ Salvando...' : '💾 Salvar Alterações'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

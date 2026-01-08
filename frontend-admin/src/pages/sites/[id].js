import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';

export default function EditSite() {
  const router = useRouter();
  const { id } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [site, setSite] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    business_name: '',
    subdomain: '',
    whatsapp: '',
    business_category: '',
    business_city: '',
    
    // Personalização
    logo_url: '',
    primary_color: '#002177',
    secondary_color: '#00b3ff',
    
    // Hero
    hero_title: '',
    hero_subtitle: '',
    hero_cta_text: 'Fale Conosco',
    hero_background: '',
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
          primary_color: settings.primary_color || '#002177',
          secondary_color: settings.secondary_color || '#00b3ff',
          
          hero_title: settings.hero_title || data.business_name || '',
          hero_subtitle: settings.hero_subtitle || 'Bem-vindo ao nosso site',
          hero_cta_text: settings.hero_cta_text || 'Fale Conosco',
          hero_background: settings.hero_background || '',
        });
        
        setLoading(false);
      })
      .catch(err => {
        alert('Erro ao carregar site');
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem('token');

    const settings = {
      logo_url: formData.logo_url,
      primary_color: formData.primary_color,
      secondary_color: formData.secondary_color,
      hero_title: formData.hero_title,
      hero_subtitle: formData.hero_subtitle,
      hero_cta_text: formData.hero_cta_text,
      hero_background: formData.hero_background,
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
        <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Cabeçalho */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{ color: '#002177', margin: 0, fontSize: '2rem' }}>
                ✏️ Editar Site
              </h1>
              <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>
                {formData.subdomain}.movella.com.br
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
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
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
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}
              >
                👁️ Ver Site
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Coluna Esquerda - Informações Básicas */}
            <div>
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '2rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ color: '#002177', marginTop: 0, borderBottom: '2px solid #00b3ff', paddingBottom: '0.5rem' }}>
                  📋 Informações Básicas
                </h2>

                <div style={{ marginBottom: '1.5rem' }}>
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
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
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
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  <small style={{ color: '#666' }}>.movella.com.br</small>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
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
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
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
                      borderRadius: '6px',
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

                <div style={{ marginBottom: '1.5rem' }}>
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
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Coluna Direita - Personalização */}
            <div>
              {/* Cores */}
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '2rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ color: '#002177', marginTop: 0, borderBottom: '2px solid #8317d4', paddingBottom: '0.5rem' }}>
                  🎨 Personalização Visual
                </h2>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    URL do Logo:
                  </label>
                  <input
                    value={formData.logo_url}
                    onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                    placeholder="https://..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #8317d4',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                      Cor Primária:
                    </label>
                    <input
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => setFormData({...formData, primary_color: e.target.value})}
                      style={{
                        width: '100%',
                        height: '50px',
                        border: '2px solid #8317d4',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                      Cor Secundária:
                    </label>
                    <input
                      type="color"
                      value={formData.secondary_color}
                      onChange={(e) => setFormData({...formData, secondary_color: e.target.value})}
                      style={{
                        width: '100%',
                        height: '50px',
                        border: '2px solid #8317d4',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ color: '#002177', marginTop: 0, borderBottom: '2px solid #f11ba9', paddingBottom: '0.5rem' }}>
                  🎯 Seção Hero (Topo)
                </h2>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    Título Principal:
                  </label>
                  <input
                    value={formData.hero_title}
                    onChange={(e) => setFormData({...formData, hero_title: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #f11ba9',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    Subtítulo:
                  </label>
                  <textarea
                    value={formData.hero_subtitle}
                    onChange={(e) => setFormData({...formData, hero_subtitle: e.target.value})}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #f11ba9',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    Texto do Botão:
                  </label>
                  <input
                    value={formData.hero_cta_text}
                    onChange={(e) => setFormData({...formData, hero_cta_text: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #f11ba9',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#002177' }}>
                    URL Imagem de Fundo (Hero):
                  </label>
                  <input
                    value={formData.hero_background}
                    onChange={(e) => setFormData({...formData, hero_background: e.target.value})}
                    placeholder="https://..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #f11ba9',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            justifyContent: 'center'
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
                boxShadow: '0 4px 15px rgba(0,179,255,0.4)'
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

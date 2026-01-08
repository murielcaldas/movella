import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Dashboard() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('https://api.movella.com.br/api/sites', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((res) => res.json())
      .then((data) => {
        setSites(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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
        padding: '3rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem' 
          }}>
            <h1 style={{ color: '#002177', fontSize: '2.5rem', margin: 0 }}>
              📊 Meus Sites
            </h1>
            <button 
              onClick={() => router.push('/sites/new')}
              style={{ 
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #00b3ff 0%, #0652f7 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0,179,255,0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              ➕ Criar Novo Site
            </button>
          </div>

          {sites.length === 0 ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '4rem 2rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌐</div>
              <h2 style={{ color: '#002177', marginBottom: '1rem' }}>
                Nenhum site criado ainda
              </h2>
              <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Comece criando seu primeiro site profissional em minutos!
              </p>
              <button 
                onClick={() => router.push('/sites/new')}
                style={{ 
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #8317d4 0%, #f11ba9 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                🚀 Criar Meu Primeiro Site
              </button>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem' 
            }}>
              {sites.map((site) => (
                <div 
                  key={site.id} 
                  style={{ 
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,179,255,0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Badge de Status */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.4rem 0.8rem',
                    background: site.is_published 
                      ? 'linear-gradient(135deg, #8317d4 0%, #f11ba9 100%)'
                      : 'linear-gradient(135deg, #666 0%, #999 100%)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    textTransform: 'uppercase'
                  }}>
                    {site.is_published ? '✅ Publicado' : '⏸️ Rascunho'}
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <h3 style={{ 
                      color: '#002177', 
                      fontSize: '1.5rem',
                      margin: '0 0 0.5rem 0',
                      wordBreak: 'break-word'
                    }}>
                      {site.business_name}
                    </h3>
                    
                    <p style={{ 
                      color: '#00b3ff', 
                      margin: '0.5rem 0',
                      fontWeight: '600',
                      fontSize: '0.95rem'
                    }}>
                      🌐 {site.subdomain}.movella.com.br
                    </p>

                    {site.business_category && (
                      <p style={{ 
                        color: '#666', 
                        margin: '0.5rem 0',
                        fontSize: '0.9rem'
                      }}>
                        📂 {site.business_category}
                      </p>
                    )}

                    {site.business_city && (
                      <p style={{ 
                        color: '#666', 
                        margin: '0.5rem 0',
                        fontSize: '0.9rem'
                      }}>
                        📍 {site.business_city}
                      </p>
                    )}
                  </div>

                  <div style={{ 
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '1.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid #eee'
                  }}>
                    <button 
                      onClick={() => router.push('/sites/' + site.id)}
                      style={{ 
                        flex: 1,
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #00b3ff 0%, #0652f7 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.95rem'
                      }}
                    >
                      ✏️ Editar
                    </button>
                    
                    <a 
                      href={`https://${site.subdomain}.movella.com.br`}
                      target="_blank"
                      style={{ 
                        flex: 1,
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #8317d4 0%, #f11ba9 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      👁️ Ver
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

    fetch(process.env.NEXT_PUBLIC_API_URL + '/sites', {
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

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📊 Meus Sites</h1>
        <button onClick={logout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Sair
        </button>
      </div>
      
      <button 
        onClick={() => router.push('/sites/new')}
        style={{ 
          padding: '0.75rem 1.5rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        + Criar Novo Site
      </button>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {sites.map((site) => (
          <div 
            key={site.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '1.5rem', 
              borderRadius: '8px',
              background: 'white'
            }}
          >
            <h3>{site.business_name}</h3>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>
              {site.subdomain}.movella.com.br
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Status: {site.is_published ? '✅ Publicado' : '⏸️ Rascunho'}
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button 
                onClick={() => router.push('/sites/' + site.id)}
                style={{ 
                  padding: '0.5rem 1rem',
                  marginRight: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Editar
              </button>
              <a 
                href={'https://' + site.subdomain + '.movella.com.br'}
                target="_blank"
                style={{ padding: '0.5rem 1rem' }}
              >
                Ver Site
              </a>
            </div>
          </div>
        ))}
        
        {sites.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            Você ainda não tem sites. Clique em "Criar Novo Site" para começar!
          </p>
        )}
      </div>
    </div>
  );
}

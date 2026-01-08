import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (
    <header style={{
      background: 'linear-gradient(135deg, #002177 0%, #0652f7 100%)',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <img 
            src="/logo_movella_branco.png" 
            alt="Movella"
            style={{ height: '40px', cursor: 'pointer' }}
            onClick={() => router.push('/dashboard')}
          />
          
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <a 
              href="/dashboard"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: router.pathname === '/dashboard' ? 'bold' : 'normal',
                borderBottom: router.pathname === '/dashboard' ? '2px solid #00b3ff' : 'none',
                paddingBottom: '0.25rem',
                transition: 'all 0.3s'
              }}
            >
              📊 Meus Sites
            </a>
            
            <a 
              href="/perfil"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: router.pathname === '/perfil' ? 'bold' : 'normal',
                borderBottom: router.pathname === '/perfil' ? '2px solid #00b3ff' : 'none',
                paddingBottom: '0.25rem',
                transition: 'all 0.3s'
              }}
            >
              👤 Perfil
            </a>
          </nav>
        </div>

        <button
          onClick={logout}
          style={{
            padding: '0.5rem 1.5rem',
            background: 'rgba(255,255,255,0.2)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          🚪 Sair
        </button>
      </div>
    </header>
  );
}

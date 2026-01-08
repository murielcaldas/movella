export default function Custom404() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#002177',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      padding: '2rem'
    }}>
      <img 
        src="/logo_movella_branco.png" 
        alt="Movella"
        style={{ width: '200px', marginBottom: '2rem' }}
      />
      <h1 style={{ fontSize: '6rem', margin: '0', fontWeight: 'bold' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '1rem', marginBottom: '2rem' }}>
        Página não encontrada
      </p>
      <a 
        href="/dashboard"
        style={{
          padding: '1rem 2rem',
          background: '#00b3ff',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = '#0652f7'}
        onMouseOut={(e) => e.target.style.background = '#00b3ff'}
      >
        Voltar ao Dashboard
      </a>
    </div>
  );
}

export default function Custom404() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      background: '#002177',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff'
    }}>
      <img 
        src="/logo_movella_branco.png" 
        alt="Movella"
        style={{ 
          width: '250px', 
          marginBottom: '3rem',
          filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.2))'
        }}
      />
      
      <h1 style={{ 
        fontSize: '8rem', 
        margin: '0', 
        fontWeight: '900',
        background: 'linear-gradient(135deg, #00b3ff 0%, #f11ba9 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        404
      </h1>
      
      <p style={{ 
        fontSize: '1.8rem', 
        marginTop: '1.5rem', 
        marginBottom: '3rem',
        fontWeight: '300'
      }}>
        Página não encontrada
      </p>
      
      <a 
        href="/dashboard"
        style={{
          padding: '1.2rem 3rem',
          background: 'linear-gradient(135deg, #00b3ff 0%, #0652f7 100%)',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '50px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 8px 30px rgba(0,179,255,0.4)',
          transition: 'all 0.3s',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-5px)';
          e.target.style.boxShadow = '0 12px 40px rgba(0,179,255,0.6)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 8px 30px rgba(0,179,255,0.4)';
        }}
      >
        🏠 Voltar ao Dashboard
      </a>
    </div>
  );
}

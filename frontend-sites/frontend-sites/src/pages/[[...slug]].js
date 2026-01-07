export async function getServerSideProps(context) {
  const host = context.req.headers.host;
  const subdomain = host.split('.')[0];
  
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/render?subdomain=' + subdomain
    );
    
    if (!res.ok) {
      return { notFound: true };
    }
    
    const siteData = await res.json();
    return { props: { siteData } };
  } catch (err) {
    return { notFound: true };
  }
}

export default function Site({ siteData }) {
  const whatsappLink = `https://wa.me/${siteData.whatsapp}`;
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
            {siteData.business_name}
          </h1>
          {siteData.business_category && (
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              {siteData.business_category}
            </p>
          )}
          {siteData.business_city && (
            <p style={{ color: '#888', marginTop: '0.5rem' }}>
              📍 {siteData.business_city}
            </p>
          )}
        </header>

        <section style={{
          textAlign: 'center',
          padding: '2rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Entre em Contato</h2>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            Estamos prontos para atender você!
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: '#25D366',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
            }}
          >
            💬 Chamar no WhatsApp
          </a>
        </section>

        <footer style={{
          textAlign: 'center',
          padding: '2rem 0',
          borderTop: '1px solid #eee',
          marginTop: '3rem'
        }}>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            Site criado com Movella 🚀
          </p>
        </footer>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const host = context.req.headers.host;
  const subdomain = host.split('.')[0];
  
  try {
    const res = await fetch(
      `https://api.movella.com.br/api/render?subdomain=${subdomain}`
    );
    
    if (!res.ok) {
      return { notFound: true };
    }
    
    const siteData = await res.json();
    
    // Parse settings
    let settings = {};
    if (siteData.settings) {
      try {
        settings = JSON.parse(siteData.settings);
      } catch (e) {
        console.error('Erro ao parsear settings:', e);
      }
    }
    
    return { 
      props: { 
        siteData,
        settings
      } 
    };
  } catch (err) {
    return { notFound: true };
  }
}

export default function Site({ siteData, settings }) {
  const whatsappLink = `https://wa.me/${siteData.whatsapp}`;
  
  // Cores personalizadas ou padrão
  const primaryColor = settings.primary_color || '#002177';
  const secondaryColor = settings.secondary_color || '#00b3ff';
  
  // Hero
  const heroTitle = settings.hero_title || siteData.business_name;
  const heroSubtitle = settings.hero_subtitle || 'Bem-vindo ao nosso site';
  const heroCta = settings.hero_cta_text || 'Fale Conosco';
  const heroBackground = settings.hero_background 
    ? `https://api.movella.com.br${settings.hero_background}`
    : null;
  
  // Logo
  const logoUrl = settings.logo_url 
    ? `https://api.movella.com.br${settings.logo_url}`
    : null;

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
      `}</style>

      <div style={{ width: '100vw', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          background: primaryColor,
          padding: '1.5rem 5%',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={siteData.business_name}
                style={{ 
                  height: '50px',
                  filter: 'brightness(0) invert(1)' // Logo branco
                }}
              />
            ) : (
              <h2 style={{ color: '#ffffff', fontSize: '1.5rem', margin: 0 }}>
                {siteData.business_name}
              </h2>
            )}
            
            <a
              href={whatsappLink}
              target="_blank"
              style={{
                padding: '0.75rem 2rem',
                background: '#25D366',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                transition: 'all 0.3s'
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{
          width: '100vw',
          minHeight: '100vh',
          background: heroBackground 
            ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBackground})`
            : `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5%',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '900',
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              {heroTitle}
            </h1>
            
            <p style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              fontWeight: '300',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              {heroSubtitle}
            </p>
            
            <a
              href={whatsappLink}
              target="_blank"
              style={{
                display: 'inline-block',
                padding: '1.5rem 4rem',
                background: secondaryColor,
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '50px',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
              }}
            >
              {heroCta}
            </a>
          </div>
        </section>

        {/* Sobre */}
        <section style={{
          width: '100vw',
          padding: '8rem 5%',
          background: '#ffffff'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: primaryColor,
              marginBottom: '2rem',
              fontWeight: '800'
            }}>
              Sobre Nós
            </h2>
            
            <p style={{
              fontSize: '1.3rem',
              color: '#666',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {siteData.business_category && (
                <>Somos especialistas em <strong>{siteData.business_category}</strong>. </>
              )}
              {siteData.business_city && (
                <>Atendemos em <strong>{siteData.business_city}</strong> e região. </>
              )}
              Entre em contato conosco pelo WhatsApp!
            </p>
          </div>
        </section>

        {/* CTA Final */}
        <section style={{
          width: '100vw',
          padding: '8rem 5%',
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '2rem',
            fontWeight: '800'
          }}>
            Pronto para começar?
          </h2>
          
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '3rem',
            fontWeight: '300'
          }}>
            Fale conosco agora mesmo pelo WhatsApp!
          </p>
          
          <a
            href={whatsappLink}
            target="_blank"
            style={{
              display: 'inline-block',
              padding: '1.5rem 4rem',
              background: '#25D366',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '50px',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)',
              transition: 'all 0.3s'
            }}
          >
            💬 Chamar no WhatsApp
          </a>
        </section>

        {/* Footer */}
        <footer style={{
          width: '100vw',
          padding: '3rem 5%',
          background: '#1a1a1a',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            {siteData.business_name}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#999' }}>
            Site criado com{' '}
            <a 
              href="https://movella.com.br" 
              target="_blank"
              style={{ color: secondaryColor, textDecoration: 'none', fontWeight: 'bold' }}
            >
              Movella
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

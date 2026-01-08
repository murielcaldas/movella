export async function getServerSideProps(ctx) {
  const subdomain = ctx.req.headers.host.split('.')[0];
  try {
    const res = await fetch(`https://api.movella.com.br/api/render?subdomain=${subdomain}`);
    if (!res.ok) return {notFound:true};
    const site = await res.json();
    const settings = site.settings ? JSON.parse(site.settings) : {};
    return {props:{site,settings}};
  } catch {
    return {notFound:true};
  }
}

export default function Site({site,settings}) {
  const primary = settings.primary_color || '#002177';
  const secondary = settings.secondary_color || '#00b3ff';
  const logo = settings.logo_url ? `https://api.movella.com.br${settings.logo_url}` : null;
  const heroBg = settings.hero_background ? `https://api.movella.com.br${settings.hero_background}` : null;
  
  return (
    <>
      <style jsx global>{`*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif}`}</style>
      <div style={{width:'100vw',overflow:'hidden'}}>
        <header style={{background:primary,padding:'1.5rem 5%',position:'sticky',top:0,zIndex:1000}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            {logo ? <img src={logo} alt={site.business_name} style={{height:'50px'}}/> : <h2 style={{color:'#fff',margin:0}}>{site.business_name}</h2>}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" style={{padding:'0.75rem 2rem',background:'#25D366',color:'#fff',textDecoration:'none',borderRadius:'50px',fontWeight:'bold'}}>💬 WhatsApp</a>
          </div>
        </header>
        
        <section style={{width:'100vw',minHeight:'100vh',background:heroBg?`url(${heroBg})`:`linear-gradient(135deg,${primary},${secondary})`,backgroundSize:'cover',backgroundPosition:'center',display:'flex',alignItems:'center',justifyContent:'center',padding:'5%',textAlign:'center',color:'#fff'}}>
          <div>
            <h1 style={{fontSize:'clamp(2.5rem,8vw,5rem)',fontWeight:'900',marginBottom:'1.5rem'}}>{settings.hero_title||site.business_name}</h1>
            <p style={{fontSize:'clamp(1.2rem,3vw,1.8rem)',marginBottom:'3rem'}}>{settings.hero_subtitle||'Bem-vindo'}</p>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" style={{display:'inline-block',padding:'1.5rem 4rem',background:secondary,color:'#fff',textDecoration:'none',borderRadius:'50px',fontSize:'1.3rem',fontWeight:'bold'}}>{settings.hero_cta_text||'Fale Conosco'}</a>
          </div>
        </section>
        
        <section style={{width:'100vw',padding:'8rem 5%',background:'#fff',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(2rem,5vw,3.5rem)',color:primary,marginBottom:'2rem'}}>Sobre Nós</h2>
          <p style={{fontSize:'1.3rem',color:'#666',maxWidth:'800px',margin:'0 auto'}}>
            {site.business_category && <>Especialistas em <strong>{site.business_category}</strong>. </>}
            {site.business_city && <>Atendemos em <strong>{site.business_city}</strong>.</>}
          </p>
        </section>
        
        <footer style={{width:'100vw',padding:'3rem 5%',background:'#1a1a1a',color:'#fff',textAlign:'center'}}>
          <p>Site criado com <a href="https://movella.com.br" style={{color:secondary,textDecoration:'none'}}>Movella</a></p>
        </footer>
      </div>
    </>
  );
}

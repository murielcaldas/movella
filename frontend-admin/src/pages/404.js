export default function Custom404() {
  return (
    <div style={{width:'100vw',height:'100vh',margin:0,padding:0,background:'#002177',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#fff'}}>
      <img src="/logo_movella_branco.png" alt="Movella" style={{width:'200px',marginBottom:'2rem'}}/>
      <h1 style={{fontSize:'6rem',margin:0}}>404</h1>
      <p style={{fontSize:'1.5rem',margin:'1rem 0 2rem'}}>Página não encontrada</p>
      <a href="/dashboard" style={{padding:'1rem 2rem',background:'#00b3ff',color:'#fff',textDecoration:'none',borderRadius:'8px',fontWeight:'bold'}}>Voltar</a>
    </div>
  );
}

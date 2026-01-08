import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import Header from '../components/Header';

export default function Dashboard(){
  const [sites,setSites]=useState([]);
  const router=useRouter();

  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token){router.push('/login');return;}
    fetch('https://api.movella.com.br/api/sites',{headers:{Authorization:'Bearer '+token}})
      .then(r=>r.json())
      .then(d=>setSites(d));
  },[]);

  return(
    <>
      <Header/>
      <div style={{width:'100vw',minHeight:'calc(100vh - 80px)',background:'#f5f7fa',padding:'3rem 5%'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
          <h1 style={{color:'#002177',margin:0}}>📊 Meus Sites</h1>
          <button onClick={()=>router.push('/sites/new')} style={{padding:'1rem 2rem',background:'linear-gradient(135deg,#00b3ff,#0652f7)',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>➕ Criar Site</button>
        </div>
        {sites.length===0?<div style={{background:'#fff',borderRadius:'12px',padding:'4rem',textAlign:'center'}}>Nenhum site criado</div>:
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(350px,1fr))',gap:'2rem'}}>
          {sites.map(s=>(
            <div key={s.id} style={{background:'#fff',borderRadius:'12px',padding:'1.5rem'}}>
              <h3 style={{color:'#002177',margin:'0 0 0.5rem'}}>{s.business_name}</h3>
              <p style={{color:'#00b3ff',margin:'0.5rem 0',fontWeight:'600'}}>{s.subdomain}.movella.com.br</p>
              <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem'}}>
                <button onClick={()=>router.push('/sites/edit?id='+s.id)} style={{flex:1,padding:'0.75rem',background:'linear-gradient(135deg,#00b3ff,#0652f7)',color:'#fff',border:'none',borderRadius:'6px',fontWeight:'600',cursor:'pointer'}}>✏️ Editar</button>
                <a href={`https://${s.subdomain}.movella.com.br`} target="_blank" style={{flex:1,padding:'0.75rem',background:'linear-gradient(135deg,#8317d4,#f11ba9)',color:'#fff',textDecoration:'none',borderRadius:'6px',textAlign:'center',fontWeight:'600'}}>👁️ Ver</a>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
}

import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import Header from '../../components/Header';

export default function EditSite(){
  const router=useRouter();
  const {id}=router.query;
  const [site,setSite]=useState(null);
  const [saving,setSaving]=useState(false);
  const [msg,setMsg]=useState('');
  const [form,setForm]=useState({business_name:'',subdomain:'',whatsapp:'',business_category:'',business_city:'',logo_url:'',primary_color:'#002177',secondary_color:'#00b3ff',hero_title:'',hero_subtitle:'',hero_cta_text:'Fale Conosco',hero_background:''});

  useEffect(()=>{
    if(!id)return;
    const token=localStorage.getItem('token');
    if(!token){router.push('/login');return;}
    fetch(`https://api.movella.com.br/api/sites/${id}`,{headers:{Authorization:'Bearer '+token}}).then(r=>r.json()).then(d=>{setSite(d);const s=d.settings?JSON.parse(d.settings):{};setForm({business_name:d.business_name||'',subdomain:d.subdomain||'',whatsapp:d.whatsapp||'',business_category:d.business_category||'',business_city:d.business_city||'',logo_url:s.logo_url||'',primary_color:s.primary_color||'#002177',secondary_color:s.secondary_color||'#00b3ff',hero_title:s.hero_title||'',hero_subtitle:s.hero_subtitle||'',hero_cta_text:s.hero_cta_text||'Fale Conosco',hero_background:s.hero_background||''});});
  },[id]);

  const save=async()=>{
    setSaving(true);setMsg('');
    const token=localStorage.getItem('token');
    const settings={logo_url:form.logo_url,primary_color:form.primary_color,secondary_color:form.secondary_color,hero_title:form.hero_title,hero_subtitle:form.hero_subtitle,hero_cta_text:form.hero_cta_text,hero_background:form.hero_background};
    try{
      const res=await fetch(`https://api.movella.com.br/api/sites/${id}`,{method:'PUT',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({business_name:form.business_name,subdomain:form.subdomain,whatsapp:form.whatsapp,business_category:form.business_category,business_city:form.business_city,settings:JSON.stringify(settings)})});
      if(res.ok){setMsg('✅ Salvo!');}else{setMsg('❌ Erro');}
    }catch(e){setMsg('❌ '+e.message);}
    setSaving(false);
  };

  if(!site)return <><Header/><div style={{padding:'2rem'}}>Carregando...</div></>;

  return(<><Header/><div style={{width:'100vw',minHeight:'calc(100vh - 80px)',background:'#f5f7fa',padding:'2rem 5%'}}><div style={{background:'#fff',borderRadius:'12px',padding:'2rem'}}><h1 style={{color:'#002177',marginBottom:'2rem'}}>✏️ Editar</h1><input value={form.business_name} onChange={e=>setForm({...form,business_name:e.target.value})} placeholder="Nome" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}/><input value={form.subdomain} onChange={e=>setForm({...form,subdomain:e.target.value})} placeholder="Subdomínio" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}/><input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="WhatsApp" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}/><input value={form.business_city} onChange={e=>setForm({...form,business_city:e.target.value})} placeholder="Cidade" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}/><h3 style={{color:'#002177',margin:'2rem 0 1rem'}}>🎨 Design</h3><input value={form.logo_url} onChange={e=>setForm({...form,logo_url:e.target.value})} placeholder="URL Logo" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #8317d4',borderRadius:'8px',fontSize:'1rem'}}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1rem'}}><input type="color" value={form.primary_color} onChange={e=>setForm({...form,primary_color:e.target.value})} style={{width:'100%',height:'50px',border:'2px solid #8317d4',borderRadius:'8px'}}/><input type="color" value={form.secondary_color} onChange={e=>setForm({...form,secondary_color:e.target.value})} style={{width:'100%',height:'50px',border:'2px solid #8317d4',borderRadius:'8px'}}/></div><h3 style={{color:'#002177',margin:'2rem 0 1rem'}}>🎯 Hero</h3><input value={form.hero_title} onChange={e=>setForm({...form,hero_title:e.target.value})} placeholder="Título" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #f11ba9',borderRadius:'8px',fontSize:'1rem'}}/><textarea value={form.hero_subtitle} onChange={e=>setForm({...form,hero_subtitle:e.target.value})} placeholder="Subtítulo" rows={3} style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #f11ba9',borderRadius:'8px',fontSize:'1rem'}}/><input value={form.hero_cta_text} onChange={e=>setForm({...form,hero_cta_text:e.target.value})} placeholder="Botão" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #f11ba9',borderRadius:'8px',fontSize:'1rem'}}/><input value={form.hero_background} onChange={e=>setForm({...form,hero_background:e.target.value})} placeholder="URL Fundo" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #f11ba9',borderRadius:'8px',fontSize:'1rem'}}/>{msg&&<div style={{padding:'1rem',background:msg.includes('✅')?'#d4edda':'#f8d7da',borderRadius:'8px',marginTop:'1rem',fontWeight:'bold'}}>{msg}</div>}<div style={{display:'flex',gap:'1rem',marginTop:'2rem'}}><button onClick={()=>router.push('/dashboard')} style={{flex:1,padding:'1rem',background:'#666',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>Cancelar</button><button onClick={save} disabled={saving} style={{flex:1,padding:'1rem',background:saving?'#ccc':'linear-gradient(135deg,#00b3ff,#0652f7)',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:saving?'not-allowed':'pointer'}}>{saving?'Salvando...':'💾 Salvar'}</button></div></div></div></>);
}

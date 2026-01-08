import {useState} from 'react';
import {useRouter} from 'next/router';
import Header from '../../components/Header';

export default function NewSite(){
  const router=useRouter();
  const [saving,setSaving]=useState(false);
  const [form,setForm]=useState({business_name:'',subdomain:'',whatsapp:'',business_category:'',business_city:''});

  const create=async()=>{
    setSaving(true);
    const token=localStorage.getItem('token');
    try{
      const res=await fetch('https://api.movella.com.br/api/sites',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify(form)});
      if(res.ok){alert('✅ Criado!');router.push('/dashboard');}else{alert('❌ Erro');}
    }catch(e){alert('❌ '+e.message);}
    setSaving(false);
  };

  return(<><Header/><div style={{width:'100vw',minHeight:'calc(100vh - 80px)',background:'#f5f7fa',padding:'2rem 5%'}}><div style={{maxWidth:'800px',margin:'0 auto',background:'#fff',borderRadius:'12px',padding:'2rem'}}><h1 style={{color:'#002177',marginBottom:'2rem'}}>➕ Criar Site</h1><input value={form.business_name} onChange={e=>setForm({...form,business_name:e.target.value})} placeholder="Nome" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}/><input value={form.subdomain} onChange={e=>setForm({...form,subdomain:e.target.value.toLowerCase()})} placeholder="Subdomínio" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}/><input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="WhatsApp" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}/><select value={form.business_category} onChange={e=>setForm({...form,business_category:e.target.value})} style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}><option value="">Categoria</option><option value="servicos">Serviços</option><option value="salao">Salão</option><option value="petshop">Pet Shop</option></select><input value={form.business_city} onChange={e=>setForm({...form,business_city:e.target.value})} placeholder="Cidade" style={{width:'100%',padding:'0.75rem',marginBottom:'1rem',border:'2px solid #00b3ff',borderRadius:'8px',fontSize:'1rem'}}/><div style={{display:'flex',gap:'1rem',marginTop:'2rem'}}><button onClick={()=>router.push('/dashboard')} style={{flex:1,padding:'1rem',background:'#666',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:'pointer'}}>Cancelar</button><button onClick={create} disabled={saving} style={{flex:1,padding:'1rem',background:saving?'#ccc':'linear-gradient(135deg,#00b3ff,#0652f7)',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'bold',cursor:saving?'not-allowed':'pointer'}}>{saving?'Criando...':'Criar'}</button></div></div></div></>);
}

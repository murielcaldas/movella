import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewSite() {
  const [data, setData] = useState({
    business_name: '',
    subdomain: '',
    business_category: '',
    business_city: '',
    whatsapp: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        alert('Site criado com sucesso!');
        router.push('/dashboard');
      }
    } catch (err) {
      alert('Erro ao criar site');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>➕ Criar Novo Site</h1>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Nome do Negócio:
          </label>
          <input
            required
            value={data.business_name}
            onChange={(e) => setData({ ...data, business_name: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Subdomínio:
          </label>
          <input
            required
            placeholder="meunegocio"
            value={data.subdomain}
            onChange={(e) => setData({ ...data, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '16px' }}
          />
          <small style={{ color: '#666' }}>
            Seu site será: {data.subdomain || 'meunegocio'}.movella.com.br
          </small>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Categoria:
          </label>
          <select
            value={data.business_category}
            onChange={(e) => setData({ ...data, business_category: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '16px' }}
          >
            <option value="">Selecione...</option>
            <option value="servicos">Serviços Gerais</option>
            <option value="salao">Salão / Estética</option>
            <option value="petshop">Pet Shop</option>
            <option value="restaurante">Restaurante</option>
            <option value="profissional">Profissional Liberal</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Cidade:
          </label>
          <input
            value={data.business_city}
            onChange={(e) => setData({ ...data, business_city: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            WhatsApp de Contato:
          </label>
          <input
            required
            placeholder="5548999999999"
            value={data.whatsapp}
            onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '16px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          {loading ? 'Criando...' : 'Criar Site'}
        </button>
        
        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'transparent',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

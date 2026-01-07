import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [step, setStep] = useState(1);
  const [whatsapp, setWhatsapp] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp }),
      });
      if (res.ok) {
        alert('Código enviado! Verifique o console do backend.');
        setStep(2);
      }
    } catch (err) {
      alert('Erro ao enviar código');
    }
    setLoading(false);
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp, code }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      }
    } catch (err) {
      alert('Código inválido');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          🚀 Movella Admin
        </h1>
        
        {step === 1 ? (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              WhatsApp:
            </label>
            <input
              placeholder="5548999999999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                marginBottom: '1rem',
                border: '2px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            <button 
              onClick={sendOTP} 
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
                cursor: 'pointer'
              }}
            >
              {loading ? 'Enviando...' : 'Enviar Código'}
            </button>
          </div>
        ) : (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Código (6 dígitos):
            </label>
            <input
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                marginBottom: '1rem',
                border: '2px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            <button 
              onClick={verifyOTP}
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
                cursor: 'pointer'
              }}
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
            <button 
              onClick={() => setStep(1)}
              style={{ 
                width: '100%', 
                padding: '0.75rem',
                marginTop: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

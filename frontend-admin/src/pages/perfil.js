import { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Mock user data - você pode buscar da API depois
    const mockUser = {
      id: 1,
      name: 'Usuário Teste',
      whatsapp: '5548999999999',
      role: 'client',
      created_at: new Date().toISOString()
    };
    
    setUser(mockUser);
    setFormData({
      name: mockUser.name || '',
      whatsapp: mockUser.whatsapp || ''
    });
    setLoading(false);
  }, []);

  const handleSave = async () => {
    alert('Perfil atualizado com sucesso!');
    setEditMode(false);
    setUser({...user, ...formData});
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '3rem 2rem'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            color: '#002177', 
            marginBottom: '2rem',
            fontSize: '2rem',
            borderBottom: '3px solid #00b3ff',
            paddingBottom: '1rem'
          }}>
            👤 Meu Perfil
          </h1>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#002177'
            }}>
              📱 WhatsApp:
            </label>
            <input
              disabled={!editMode}
              value={formData.whatsapp}
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid ' + (editMode ? '#00b3ff' : '#ddd'),
                borderRadius: '6px',
                background: editMode ? '#fff' : '#f5f5f5',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold',
              color: '#002177'
            }}>
              ✏️ Nome:
            </label>
            <input
              disabled={!editMode}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Seu nome completo"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid ' + (editMode ? '#00b3ff' : '#ddd'),
                borderRadius: '6px',
                background: editMode ? '#fff' : '#f5f5f5',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            marginTop: '2rem'
          }}>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #00b3ff 0%, #0652f7 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                ✏️ Editar Perfil
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #8317d4 0%, #f11ba9 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ✅ Salvar
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setFormData({
                      name: user.name || '',
                      whatsapp: user.whatsapp || ''
                    });
                  }}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    background: '#666',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ❌ Cancelar
                </button>
              </>
            )}
          </div>

          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(0,33,119,0.05) 0%, rgba(6,82,247,0.05) 100%)',
            borderRadius: '8px',
            borderLeft: '4px solid #00b3ff'
          }}>
            <h3 style={{ color: '#002177', marginBottom: '1rem' }}>
              📊 Estatísticas
            </h3>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>
              <strong>Conta criada em:</strong> {new Date(user?.created_at).toLocaleDateString('pt-BR')}
            </p>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>
              <strong>Tipo de conta:</strong> {user?.role === 'client' ? 'Cliente' : 'Administrador'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';

export default function ImageUpload({ 
  label, 
  currentImage, 
  onUpload, 
  type = 'logo',
  maxSize = 5 
}) {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;

    // Validar tipo
    if (!file.type.match(/image\/(jpg|jpeg|png|gif|webp)/)) {
      alert('❌ Apenas imagens são permitidas!');
      return;
    }

    // Validar tamanho
    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > maxSize) {
      alert(`❌ Imagem muito grande! Máximo ${maxSize}MB`);
      return;
    }

    // Preview local
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`https://api.movella.com.br/api/upload/${type}`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        onUpload(data.url, data.filename);
      } else {
        alert('❌ Erro ao fazer upload');
        setPreview(currentImage);
      }
    } catch (err) {
      alert('❌ Erro: ' + err.message);
      setPreview(currentImage);
    }
    
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '0.5rem', 
        fontWeight: 'bold',
        color: '#002177'
      }}>
        {label}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        style={{
          border: '3px dashed ' + (dragOver ? '#00b3ff' : '#ddd'),
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          background: dragOver ? 'rgba(0,179,255,0.05)' : '#fafafa',
          transition: 'all 0.3s',
          position: 'relative'
        }}
      >
        {preview ? (
          <div style={{ position: 'relative' }}>
            <img 
              src={preview} 
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: type === 'logo' ? '150px' : '300px',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            />
            <button
              onClick={() => {
                setPreview(null);
                onUpload(null, null);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#f11ba9',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              📸
            </div>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Arraste uma imagem ou clique para selecionar
            </p>
            <p style={{ color: '#999', fontSize: '0.85rem' }}>
              Máximo {maxSize}MB - JPG, PNG, GIF, WebP
            </p>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: uploading ? 'not-allowed' : 'pointer'
          }}
        />

        {uploading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                marginBottom: '0.5rem',
                animation: 'spin 1s linear infinite'
              }}>
                ⏳
              </div>
              <p style={{ color: '#002177', fontWeight: 'bold' }}>
                Enviando...
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

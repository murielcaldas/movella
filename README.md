# MOVELLA - MVP Funcional

## ✅ O QUE TEM NESTE PACOTE

Este é um MVP FUNCIONAL MÍNIMO do Movella.

Contém:
- Backend NestJS básico (compila e roda)
- Frontend Admin básico (compila e roda)
- Frontend Sites básico (compila e roda)
- Database SQL completo
- Dockerfiles prontos

## 🚀 COMO USAR

### 1. Fazer Upload no GitHub

```bash
cd movella-final
git init
git add .
git commit -m "Movella MVP inicial"
git remote add origin https://github.com/SEU_USUARIO/movella.git
git push -u origin main
```

### 2. Criar Services no EasyPanel

**Backend API:**
- Source: GitHub → movella
- Build: Dockerfile em `backend/Dockerfile`
- Port: 4000
- Domain: api.movella.com.br
- Env vars:
  ```
  DB_HOST=seu-mysql-service
  DB_USERNAME=movella
  DB_PASSWORD=M0v3ll@#2025$Pr0d
  DB_DATABASE=movella_production
  ```

**Frontend Admin:**
- Source: GitHub → movella
- Build: Dockerfile em `frontend-admin/Dockerfile`
- Port: 3000
- Domain: admin.movella.com.br

**Frontend Sites:**
- Source: GitHub → movella
- Build: Dockerfile em `frontend-sites/Dockerfile`
- Port: 3000
- Domain: *.movella.com.br

### 3. Testar

- API: https://api.movella.com.br
- Admin: https://admin.movella.com.br

## 📝 PRÓXIMOS PASSOS

Este MVP compila e roda mas precisa dos módulos completos.

Você pode:
1. Adicionar módulos incrementalmente
2. Usar a documentação que forneci
3. Pedir ajuda para expandir

## 🎯 OBJETIVO

Fazer o sistema **COMPILAR e RODAR** no EasyPanel.

Depois vamos adicionando features.

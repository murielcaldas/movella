# 🎯 MOVELLA - Próximos Passos

## ✅ Você já tem rodando:

- Backend API conectado ao banco
- Frontend Admin básico
- Frontend Sites básico
- Infraestrutura completa no EasyPanel

## 📝 Para adicionar funcionalidades:

### 1. Desenvolver Localmente

Clone seu repositório e desenvolva as funcionalidades localmente:

```bash
git clone https://github.com/murielcaldas/movella.git
cd movella

# Instalar dependências
cd backend && npm install
cd ../frontend-admin && npm install  
cd ../frontend-sites && npm install
```

### 2. Módulos para Adicionar

#### Auth (Login WhatsApp)
- Integrar com API do WhatsApp (Twilio ou Evolution API)
- Implementar geração e validação de OTP
- JWT para autenticação

#### Sites CRUD
- Criar endpoints REST completos
- Validações com class-validator
- Relacionamentos com templates e sections

#### Renderização Dinâmica
- Buscar site por subdomain
- Carregar sections ordenadas
- Cache com Redis (opcional)

### 3. Testar Localmente

```bash
# Backend
cd backend
npm run start:dev

# Frontend Admin (outro terminal)
cd frontend-admin
npm run dev

# Frontend Sites (outro terminal)
cd frontend-sites
npm run dev
```

### 4. Deploy

Quando estiver pronto:
```bash
git add .
git commit -m "Adicionar funcionalidade X"
git push
```

EasyPanel faz rebuild automático!

## 🎓 Recursos de Aprendizado

- NestJS Docs: https://docs.nestjs.com
- Next.js Docs: https://nextjs.org/docs
- TypeORM Docs: https://typeorm.io

## 💡 Ordem Recomendada de Implementação

1. Auth Module (login funcional)
2. Sites Module (CRUD básico)
3. Templates pré-configurados
4. Render API (sites públicos)
5. Frontend Admin (páginas reais)
6. Frontend Sites (renderização dinâmica)
7. Upload de imagens
8. Editor visual
9. Sistema financeiro
10. Notificações

## 🆘 Precisa de Ajuda?

Se travar em alguma parte, me peça ajuda específica!

Boa sorte! 🚀

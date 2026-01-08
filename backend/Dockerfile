FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código
COPY . .

# Criar diretórios de upload
RUN mkdir -p ./uploads/logos ./uploads/heroes

# Build
RUN npm run build

# Expor porta
EXPOSE 4000

# Comando
CMD ["node", "dist/main.js"]

FROM node:18-slim

# Instala dependências do sistema
RUN apt-get update && \
  apt-get install -y \
  openssl \
  libssl-dev \
  ca-certificates \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Define diretório de trabalho
WORKDIR /app

# Copia e instala dependências do projeto
COPY package*.json ./
RUN npm install

# Copia restante dos arquivos
COPY . .

# Gera Prisma Client
RUN npx prisma generate

# Compila a aplicação
RUN npm run build

# Define o comando de startup
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:seed && npm run start:prod"]

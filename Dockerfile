# Imagem base leve com suporte a node e npm
FROM node:18-slim

# Atualiza pacotes e instala dependências do Prisma
RUN apt-get update && apt-get install -y openssl

# Diretório de trabalho
WORKDIR /app

# Copia o package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Gera os clientes do Prisma
RUN npm run prisma:generate

# Compila o projeto
RUN npm run build

# Define variáveis de ambiente para o NestJS
ENV NODE_ENV=production

# Expõe a porta esperada pelo Render (MUITO IMPORTANTE)
EXPOSE 3000

# Comando de inicialização com migração + start
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]

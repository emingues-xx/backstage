# Use Node.js 20 oficial (já vem com Yarn)
FROM node:20.18.0-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json yarn.lock ./

# Copiar configuração do workspace
COPY packages/backend/package.json ./packages/backend/
COPY packages/app/package.json ./packages/app/

# Instalar dependências
RUN yarn install

# Copiar código fonte
COPY . .

# Build do frontend
RUN yarn tsc
RUN yarn workspace app build

# Expor porta
EXPOSE 3000

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV NODE_OPTIONS=--no-node-snapshot

# Comando de start
CMD ["sh", "-c", "cd packages/backend && yarn start --config ../../app-config.production.yaml"]

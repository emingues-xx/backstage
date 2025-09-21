# Use Node.js 20.18.1+ (já vem com Yarn)
FROM node:20.18.1-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar tudo primeiro
COPY . .

# Limpar cache e instalar dependências
RUN yarn cache clean
RUN yarn install --network-timeout 1000000 --force

# Build do frontend
RUN yarn tsc
RUN yarn workspace app build

# Expor porta
EXPOSE 3000

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV NODE_OPTIONS=--no-node-snapshot

# Comando de start
WORKDIR /app/packages/backend
CMD ["yarn", "start", "--config", "../../app-config.production.yaml"]

# Use Node.js 20 oficial
FROM node:20.18.0-alpine

# Instalar Yarn
RUN npm install -g yarn@4.4.1

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Copiar configuração do workspace
COPY packages/backend/package.json ./packages/backend/
COPY packages/app/package.json ./packages/app/

# Instalar dependências
RUN yarn install --immutable

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

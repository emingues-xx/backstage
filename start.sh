#!/bin/bash

# Força Node.js v20
export NODE_VERSION=20.18.0
export NODE_ENV=production

# Verifica se está usando Node.js v20
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" != "20" ]; then
    echo "ERRO: Node.js v20 é obrigatório. Versão atual: $(node -v)"
    echo "Configurando Node.js v20..."
    # Tenta usar nvm se disponível
    if command -v nvm &> /dev/null; then
        nvm use 20
    fi
fi

echo "Usando Node.js: $(node -v)"

# Navega para o diretório do backend e inicia
cd packages/backend
yarn start --config ../../app-config.production.yaml

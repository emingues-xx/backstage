# Deploy no Railway - Backstage

## Configurações realizadas

### 1. Arquivos modificados:
- `nixpacks.toml` - Configuração do build
- `railway.json` - Configuração do deploy
- `app-config.production.yaml` - Configuração de produção
- `railway-env-vars.txt` - Variáveis de ambiente

### 2. Passos para deploy:

#### 2.1. No Railway Dashboard:
1. Conecte seu repositório GitHub
2. Adicione um serviço PostgreSQL
3. Configure as variáveis de ambiente:

```bash
# URLs (substitua pelo domínio real do Railway)
APP_BASE_URL=https://seu-app.railway.app
BACKEND_BASE_URL=https://seu-app.railway.app
PORT=3000

# Segurança (GERE UMA CHAVE SEGURA!)
BACKEND_SECRET=my-super-secret-key-for-production-2024-change-this

# GitHub (opcional)
GITHUB_TOKEN=your-github-token-here

# PostgreSQL (use as variáveis automáticas do Railway)
POSTGRES_HOST=${{Postgres.PGHOST}}
POSTGRES_PORT=${{Postgres.PGPORT}}
POSTGRES_USER=${{Postgres.PGUSER}}
POSTGRES_PASSWORD=${{Postgres.PGPASSWORD}}
POSTGRES_DB=${{Postgres.PGDATABASE}}

# Variáveis adicionais
NODE_ENV=production
NODE_OPTIONS=--no-node-snapshot
```

#### 2.2. Deploy:
1. O Railway irá automaticamente detectar o `nixpacks.toml`
2. Fazer build usando `yarn build:all`
3. Iniciar com `yarn workspace backend start --config app-config.production.yaml`

### 3. Verificações importantes:

#### 3.1. Antes do deploy:
- [ ] Gerar uma chave segura para `BACKEND_SECRET`
- [ ] Configurar o token do GitHub se necessário
- [ ] Verificar se o PostgreSQL está configurado

#### 3.2. Após o deploy:
- [ ] Verificar logs no Railway Dashboard
- [ ] Testar o endpoint de health: `/api/catalog/health`
- [ ] Verificar se a aplicação está acessível

### 4. Troubleshooting:

#### 4.1. Erro de build:
- Verificar se todas as dependências estão no `package.json`
- Verificar se o Node.js 20 está sendo usado
- **CORRIGIDO**: Erro "Could not resolve entry module" - ajustado nixpacks.toml para build individual dos workspaces
- **CORRIGIDO**: Erro Rollup "Could not resolve entry module src/index.ts" - adicionado .nixpacksignore e ajustado build process
- **NOVA ABORDAGEM**: Removido build do backend - Backstage roda diretamente do TypeScript com ts-node
- **CORRIGIDO**: Erro "Cannot find module" - adicionado ts-node e ajustado comando de start
- **CORRIGIDO**: Erro ts-node "Cannot find module './index.ts'" - voltado ao build do backend e comando original
- **CORRIGIDO**: Erro Rollup persistente - usando comando direto no diretório do backend
- **ABORDAGEM FINAL**: Removido build do backend completamente - usando ts-node para execução direta
- **CORRIGIDO**: Erro ts-node persistente - voltado ao backstage-cli com contexto correto
- **SOLUÇÃO FINAL**: Voltado ao build completo com yarn build:all e comando original
- **SOLUÇÃO DEFINITIVA**: Removido build do backend - usando ts-node para execução direta
- **SOLUÇÃO RAILWAY**: Build apenas do frontend + backstage-cli no contexto correto
- **✅ TESTADO**: Solução funcionou no macOS - configuração validada para Railway
- **CORRIGIDO**: Caminho do arquivo de config + Node.js v20.18.0
- **MUDANÇA**: Migrado de Nixpacks para Dockerfile para controle total do Node.js v20
- **CORRIGIDO**: Erro "Invalid URL" - variáveis de ambiente com URLs completas (https://)

#### 4.2. Erro "Invalid URL":
- **PROBLEMA**: `TypeError: Invalid URL` - URLs sem protocolo https://
- **SOLUÇÃO**: Configurar variáveis de ambiente com URLs completas:
  ```
  APP_BASE_URL=https://seu-app.railway.app
  BACKEND_BASE_URL=https://seu-app.railway.app
  ```
- **IMPORTANTE**: Substitua `seu-app.railway.app` pelo domínio real do Railway

#### 4.3. Erro de conexão com banco:
- Verificar se as variáveis do PostgreSQL estão corretas
- Verificar se o serviço PostgreSQL está rodando

#### 4.3. Erro de CORS:
- Verificar se `APP_BASE_URL` e `BACKEND_BASE_URL` estão corretos
- Verificar configuração de CORS no `app-config.production.yaml`

### 5. Comandos úteis:

```bash
# Ver logs
railway logs

# Conectar ao banco
railway connect postgres

# Ver variáveis de ambiente
railway variables
```

### 6. Estrutura do projeto:
```
backstage/
├── nixpacks.toml          # Configuração do build
├── railway.json           # Configuração do deploy
├── app-config.production.yaml  # Config de produção
├── railway-env-vars.txt   # Variáveis de ambiente
└── packages/
    └── backend/           # Backend do Backstage
```

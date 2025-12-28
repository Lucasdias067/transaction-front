# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Instala pnpm via corepack
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# Copia arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala todas as dependências (incluindo devDependencies para o build)
RUN pnpm install --frozen-lockfile

# Copia o restante do código
COPY . .

# Build do Next.js
RUN pnpm run build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

# Adiciona dependências de sistema necessárias
RUN apk add --no-cache libc6-compat

# Cria usuário não-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Instala pnpm
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# Copia arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala apenas dependências de produção
RUN pnpm install --prod --frozen-lockfile

# Copia arquivos do build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Define permissões
RUN chown -R nextjs:nodejs /app

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# Troca para usuário não-root
USER nextjs

# Comando para iniciar a aplicação
CMD ["node", "server.js"]


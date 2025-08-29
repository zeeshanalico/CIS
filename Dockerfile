FROM node:18 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

FROM node:18 AS server-build
WORKDIR /app/server
COPY server/package*.json ./
COPY server/ .
RUN npm install
ENV NODE_ENV=production
RUN npm run build

FROM node:18 AS runtime
WORKDIR /app

COPY --from=server-build /app/server/dist ./dist
COPY --from=server-build /app/server/node_modules ./node_modules
COPY --from=server-build /app/server/package*.json ./
COPY --from=server-build /app/server/prisma ./prisma

COPY --from=client-build /app/client/dist ./dist/public

HEALTHCHECK --interval=59s --timeout=10s --start-period=20s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

EXPOSE 8080
CMD ["node", "dist/index.js"]
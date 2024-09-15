FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "npm","run","dev:serve" ]
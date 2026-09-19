FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY app ./app
COPY fixtures ./fixtures
EXPOSE 4173
CMD ["node", "app/server.js"]
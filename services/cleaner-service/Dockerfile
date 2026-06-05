FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY cleaner-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY cleaner-service .
EXPOSE 4003
CMD ["node", "src/index.js"]

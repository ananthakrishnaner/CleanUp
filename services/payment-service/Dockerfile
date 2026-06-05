FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY payment-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY payment-service .
EXPOSE 4005
CMD ["node", "src/index.js"]

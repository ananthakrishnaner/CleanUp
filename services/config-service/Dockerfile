FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY config-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY config-service .
EXPOSE 4008
CMD ["node", "src/index.js"]

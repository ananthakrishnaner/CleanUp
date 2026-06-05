FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY chat-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY chat-service .
EXPOSE 4010
CMD ["node", "src/index.js"]

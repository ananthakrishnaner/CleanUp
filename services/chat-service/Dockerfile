FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
COPY services/chat-service/package.json ./services/chat-service/
WORKDIR /app/services/chat-service
RUN npm install --omit=dev
COPY services/chat-service .
EXPOSE 4010
CMD ["node", "src/index.js"]

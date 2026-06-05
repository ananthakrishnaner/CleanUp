FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/chat-service/package.json /app/services/chat-service/
WORKDIR /app/services/chat-service
RUN npm install --omit=dev
COPY services/chat-service /app/services/chat-service/
EXPOSE 4010
CMD ["node", "src/index.js"]

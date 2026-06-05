FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
COPY services/user-service/package.json ./services/user-service/
WORKDIR /app/services/user-service
RUN npm install --omit=dev
COPY services/user-service .
EXPOSE 4002
CMD ["node", "src/index.js"]

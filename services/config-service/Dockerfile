FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
COPY services/config-service/package.json ./services/config-service/
WORKDIR /app/services/config-service
RUN npm install --omit=dev
COPY services/config-service .
EXPOSE 4008
CMD ["node", "src/index.js"]

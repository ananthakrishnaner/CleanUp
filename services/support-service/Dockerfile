FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
COPY services/support-service/package.json ./services/support-service/
WORKDIR /app/services/support-service
RUN npm install --omit=dev
COPY services/support-service .
EXPOSE 4009
CMD ["node", "src/index.js"]

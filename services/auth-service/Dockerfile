FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/auth-service/package.json /app/services/auth-service/
WORKDIR /app/services/auth-service
RUN npm install --omit=dev
COPY services/auth-service /app/services/auth-service/
EXPOSE 4001
CMD ["node", "src/index.js"]

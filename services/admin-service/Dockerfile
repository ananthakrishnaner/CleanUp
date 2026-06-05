FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/admin-service/package.json /app/services/admin-service/
WORKDIR /app/services/admin-service
RUN npm install --omit=dev
COPY services/admin-service /app/services/admin-service/
EXPOSE 4007
CMD ["node", "src/index.js"]

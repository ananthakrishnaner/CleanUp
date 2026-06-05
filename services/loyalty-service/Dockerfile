FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/loyalty-service/package.json /app/services/loyalty-service/
WORKDIR /app/services/loyalty-service
RUN npm install --omit=dev
COPY services/loyalty-service /app/services/loyalty-service/
EXPOSE 4013
CMD ["node", "src/index.js"]

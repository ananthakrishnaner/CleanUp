FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY analytics-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY analytics-service .
EXPOSE 4014
CMD ["node", "src/index.js"]

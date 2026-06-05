FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY auth-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY auth-service .
EXPOSE 4001
CMD ["node", "src/index.js"]

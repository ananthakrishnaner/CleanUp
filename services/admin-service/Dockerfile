FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY admin-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY admin-service .
EXPOSE 4007
CMD ["node", "src/index.js"]

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY review-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY review-service .
EXPOSE 4011
CMD ["node", "src/index.js"]

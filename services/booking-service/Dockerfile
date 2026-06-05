FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY booking-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY booking-service .
EXPOSE 4004
CMD ["node", "src/index.js"]

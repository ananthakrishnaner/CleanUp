FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY user-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY user-service .
EXPOSE 4002
CMD ["node", "src/index.js"]

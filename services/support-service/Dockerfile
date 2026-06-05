FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY support-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY support-service .
EXPOSE 4009
CMD ["node", "src/index.js"]

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/review-service/package.json /app/services/review-service/
WORKDIR /app/services/review-service
RUN npm install --omit=dev
COPY services/review-service /app/services/review-service/
EXPOSE 4011
CMD ["node", "src/index.js"]

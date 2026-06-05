FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY shared ./shared
COPY booking-service ./booking-service
WORKDIR /app/booking-service
RUN npm install
EXPOSE 4004
CMD ["npm", "start"]

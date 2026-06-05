FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY shared ./shared
COPY cleaner-service ./cleaner-service
WORKDIR /app/cleaner-service
RUN npm install
EXPOSE 4003
CMD ["npm", "start"]

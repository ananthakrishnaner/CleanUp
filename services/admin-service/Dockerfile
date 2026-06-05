FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY shared ./shared
COPY admin-service ./admin-service
WORKDIR /app/admin-service
RUN npm install
EXPOSE 4007
CMD ["npm", "start"]

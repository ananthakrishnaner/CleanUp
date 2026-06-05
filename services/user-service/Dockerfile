FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY ../shared ./shared
RUN npm install --omit=dev
COPY . .
EXPOSE 4002
CMD ["node", "src/index.js"]

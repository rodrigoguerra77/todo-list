FROM node:18.14
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
FROM node:23-alpine

WORKDIR /app  

COPY package*.json ./  

RUN npm install 

COPY . .  

EXPOSE 5173

ENV VITE_API_URL=http://localhost:8080/api/v1

CMD [ "npm","run","dev" ]
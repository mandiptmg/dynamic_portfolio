FROM node:23-alpine AS build  
WORKDIR /app  
COPY package.json package-lock.json ./  
RUN npm install  
COPY . .  
EXPOSE 5173
CMD [ "node" ]
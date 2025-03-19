FROM node:20 AS frontend-builder

WORKDIR /app
    
COPY package*.json ./
    
RUN npm install
    
COPY . .
    
FROM node:20-slim
    
WORKDIR /app
    
COPY --from=frontend-builder /app .

COPY .env .env
        
EXPOSE 5173
    
CMD ["npm", "run", "dev", "--", "--host"]
    
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8106
ENV PORT 8106
CMD ["npm", "run", "dev"]

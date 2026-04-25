FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN echo "Forçando reconstrução - Versão 4.0"
COPY . .
EXPOSE 8106
ENV PORT 8106
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8106"]

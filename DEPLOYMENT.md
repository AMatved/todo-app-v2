FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем остальное
COPY . .

# Создаем папки для данных
RUN mkdir -p data certs

# Открываем порт
EXPOSE 3000

# Запускаем
CMD ["node", "server.js"]

FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Сначала копируем package.json
COPY package*.json ./

# Устанавливаем зависимости без postinstall скриптов
RUN npm install --omit=dev --ignore-scripts

# Копируем остальное
COPY . .

# Создаем папки для данных
RUN mkdir -p data certs

# Открываем порт
EXPOSE 3000

# Запускаем
CMD ["node", "server.js"]

# Используем Node.js 16 для сборки
FROM node:16-slim AS base
WORKDIR /app

# # Копируем package.json и package-lock.json
# COPY package.json package-lock.json ./ 

# # Устанавливаем зависимости
# RUN npm install --production

# # Устанавливаем необходимые утилиты (ping или nc)
# RUN apt-get update && apt-get install -y iputils-ping netcat

# Устанавливаем утилиты ping и wget
RUN apt-get update && \
    apt-get install -y iputils-ping wget && \
    rm -rf /var/lib/apt/lists/*

# Копируем весь код приложения
COPY . .

# Открываем порт для сокета
EXPOSE 3120

# Запускаем сервер
CMD ["node", "server.js"]
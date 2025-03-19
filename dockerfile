# Usa la imagen de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos necesarios
COPY package.json yarn.lock ./
RUN yarn install

# Copia todo el código fuente
COPY . .

# Expone el puerto 3001
EXPOSE 3002

# Comando por defecto
CMD ["yarn", "dev"]

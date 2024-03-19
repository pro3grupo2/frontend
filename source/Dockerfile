# Deployment de la aplicacion con Docker
FROM node:20.11.1-alpine3.19
WORKDIR /proyectos3

# Copiar los archivos necesarios para la aplicacion
COPY . .

# Instalar las dependencias de la aplicacion
RUN npm install --loglevel verbose
RUN npm run build

# Comando para iniciar la aplicacion
CMD ["npm", "start"]

# Comando para iniciar la aplicacion en modo desarrollo
# Quitar en produccion y descomentar el comando anterior
# CMD ["npm", "run", "dev"]

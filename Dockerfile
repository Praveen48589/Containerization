<<<<<<< HEAD

FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=devops_db
ENV MYSQL_USER=devops
env MYSQL_PASSWOrd=devops123

EXPOSE 3306
=======
FROM node:18-alpine

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]

>>>>>>> b2e4e0c787babc6e86b53f46f06d3b26be54df82

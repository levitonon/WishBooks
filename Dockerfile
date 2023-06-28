FROM node:20.3.1

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install express
RUN npm install
RUN npm install bcryptjs
RUN npm install dotenv  
RUN npm install express-handlebars 
RUN npm install express-session 
RUN npm install jsonwebtoken 
RUN npm install pg
COPY . .

EXPOSE 3000

#CMD npm start
CMD [ "node", "app.js" ]
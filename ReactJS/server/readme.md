this is the server part of Store-Web-Application


I. if this the first time you run the server please follow these step
    - install nodejs version 22.12.0
    - access to server folder :  cd server 
    - install package for ndoejs: npm install 
    - create the table for database base on the model: npx sequelize-cli db:migrate
    - 
    - start the server: npm start
II. at the second time run the server just need command: npm start
III. list of API 
    - http://localhost:8080/api/login : login API, require email and passwork of the user 
    - http://localhost:8080/api/createNewUser : create new user API, required email and password to create new user
const express = require('express');
const server = express();
const registerRoute = require("./routes/usersRegister")
const loginRoute = require('./routes/userLogin')
const usersList = require('./users/users')
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const port = process.env.PORT || 4000


server.use(express.json());
server.use(session({
    name: 'sessionId', // name of the cookie
    secret: 'keep it secret, keep it long', // we intend to encrypt
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    // extra chunk of config
    store: new KnexSessionStore({
      knex: require('./database/dbConfig'), // configured instance of knex
      tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
      sidfieldname: 'sid', // column that will hold the session id, name it anything you want
      createtable: true, // if the table does not exist, it will create it automatically
      clearInterval: 1000 * 60 * 60, // time it takes to check for old sessions and remove them from the database to keep it clean and performant
    }),
  }));
server.use('/', registerRoute);
server.use('/', loginRoute)
server.use('/', usersList)





server.listen(port, () => console.log(`listening on port ${port}`))
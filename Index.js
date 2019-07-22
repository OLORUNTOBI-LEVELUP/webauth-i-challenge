const express = require('express');
const server = express();
const registerRoute = require("./routes/usersRegister")
const loginRoute = require('./routes/userLogin')
const port = process.env.PORT || 4000


server.use(express.json());
server.use('/', registerRoute);
server.use('/', loginRoute)





server.listen(port, () => console.log(`listening on port ${port}`))
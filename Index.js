const express = require('express');
const server = express();
const registerRoute = require("./routes/users")
const port = process.env.PORT || 4000


server.use(express.json());
server.use('/', registerRoute);





server.listen(port, () => console.log(`listening on port ${port}`))
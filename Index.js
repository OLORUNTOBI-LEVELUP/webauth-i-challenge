const express = require('express');
const server = express();
const port = process.env.PORT || 4000


server.use(express.json());





server.listen(port, () => console.log(`listening on port ${port}`))
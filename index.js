const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`
  ----------------------------------------------
       Listening on http://localhost:${port}
  ----------------------------------------------`);
});

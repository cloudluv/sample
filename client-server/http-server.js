const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  console.log(req.headers, req.socket.remoteAddress);
  res.send(`Hello world`);
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

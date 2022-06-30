const express = require('express');

const PORT = process.env.PORT;
const app = express();
app.get('/', (req, res) => {
  res.send(`${req.socket.localAddress} ${req.socket.localPort}`);
});

app.listen(PORT);
console.log(`Running on localhost:${PORT}`);
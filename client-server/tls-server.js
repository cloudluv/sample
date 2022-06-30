const tls = require("tls");
const fs = require("fs");
const port = 8080;

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
  ca: fs.readFileSync("ca.crt"),
  requestCert: false, // true로 하면 client authentication도 진행합니다.
};

const server = tls.createServer(options, (socket) => {
  socket.write("hello client");
  socket.setEncoding("utf8");
  socket.on("data", (data) => console.log(`${data.toString()}`));
});

server.on("secureConnection", (c) =>
  console.log(`client authenticated: ${c.authorized}`)
);

server.listen(port, () => console.log(`listening on port ${port}`));

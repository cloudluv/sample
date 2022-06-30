const Net = require("net");
const port = 8080;

const server = new Net.Server();
server.listen(port, () => console.log(`listening on port ${port}`));

server.on("connection", (socket) => {
  console.log("established a new conn");
  socket.write("hello client");
  socket.on("end", () => console.log("closing connection with the client"));
  socket.on("error", (err) => console.log(`error: ${err}`));
  socket.on("data", (data) =>
    console.log(`data from client: ${data.toString()}`)
  );
});

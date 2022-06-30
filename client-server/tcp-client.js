const Net = require("net");
const port = 8080;
const host = "18.181.225.66"; // public IP로 변경
const client = new Net.Socket();
client.connect({ port: port, host: host });

client.on("connect", () => {
  console.log("established a connection with the server.");
  client.write("hello server");
});

client.on("data", (data) => {
  console.log(`data from server: ${data.toString()}`);
  client.end();
});

client.on("end", () => console.log("Requested closing the conn"));

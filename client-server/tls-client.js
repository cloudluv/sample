const port = 8080;
const hostname = "localhost";

const tls = require("tls");
var fs = require("fs");

const options = {
  host: hostname,
  port: port,

  // server에서 requestCert를 true로 설정했을 때 필요합니다.
  // key: fs.readFileSync('client.key'),
  // cert: fs.readFileSync('client.crt'),

  ca: fs.readFileSync("ca.crt"),
};

const client = tls.connect(options, () => {
  console.log("established a connection with the server.");
  client.write("hello server");
});

client.on("data", (data) => {
  console.log(`data from server: ${data.toString()}`);
  client.end();
});

client.on("end", () => console.log("Requested closing the conn"));

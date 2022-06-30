const http = require("http");

function fibo(n) {
    if (n < 2) return 1;
    else return fibo(n - 2) + fibo(n - 1);
}

const server = http.createServer((req, res) => {
    if (req.url == '/fibo') {
        res.end(`${fibo(35)}`);
    } else {
        res.end('hello world');
    }
});

server.listen(8000, () => console.log("running on port 8000"));
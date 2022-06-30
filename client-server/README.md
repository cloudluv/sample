# client-server code sample

TLS 사용시 `openssl`를 사용하여 key와 certificate를 생성합니다.

## self-signed CA

```bash
openssl genrsa -out ca.key 2048
openssl req -new -x509 -days 365 -key ca.key -out ca.crt \
-subj "/C=FR/ST=./L=./O=ACME Signing Authority Inc/CN=."
```

## server certificate

```bash
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr \
-subj "/C=FR/ST=./L=./O=ACME Signing Authority Inc/CN=localhost"
openssl x509 -req -days 365 -in server.csr \
-CA ca.crt -CAkey ca.key -set_serial "0x`openssl rand -hex 8`" -out server.crt
```

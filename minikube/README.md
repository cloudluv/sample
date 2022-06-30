# Minikube

minikube 실행

```bash
minikube start --nodes=2 --kubernetes-version=v1.22.9
```

node 2개 생성 확인

```bash
minikube node list
```

minikube가 사용할 수 있도록 dockerfile로 container image 생성(Node가 두개이기 때문에 각 Node별로 실행)

```bash
minikube image build -t my-app .
minikube image build --node=minikube-m02 -t my-app .
```

Pod를 Deployment를 통해서 생성하고 service를 추가

```
kubectl apply -f my-app-deployment.yaml
kubectl apply -f my-app-service.yaml
```

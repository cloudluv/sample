# Cloud9

실습 환경을 통일하기 위해서 Cloud9에서 진행됩니다.

다음과 같은 소프트웨어&패키지를 설치합니다.

- ⚙️ awscli v2 (기존 awscli v1에서 업그레이드 필요)
- ⚙️ packer (설치 필요)
- ⚙️ ansible (설치 필요)
- ⚙️ minikube (설치 필요)
- ⚙️ kubectl 및 기타 (설치 필요)
- ✅ sam (Cloud 9에 이미 설치되어 있음)
- ✅ cdk (Cloud 9에 이미 설치되어 있음)
- ✅ terraform (Cloud 9에 이미 설치되어 있음)
- ✅ docker (Cloud 9에 이미 설치되어 있음)

## Volume size up

기본 설정된 10GB Storage size가 부족하기 때문에 EBS Volume size를 30GB로 증가시킵니다.

EBS volume size를 증가시키고 Partition과 File System에도 적용합니다.

```bash
lsblk
sudo growpart /dev/nvme0n1 1
sudo xfs_growfs -d /
df -h
```

## awscli v2로 설치

설치

```bash
sudo pip uninstall -y awscli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
. ~/.bash_profile
```

버전 확인

```bash
aws --version
```

## packer 설치

설치

```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
sudo yum -y install packer
```

확인

```
packer --version
```

## ansible 5.x 설치

Cloud9에는 Python3.7이 설치되어있습니다. Ansible 5.x를 사용하기 위해서 Python3.8로 업그레이드 합니다.

Python3.8 설치

```bash
sudo amazon-linux-extras enable python3.8
sudo yum -y install python3.8
sudo rm /usr/bin/python3
sudo ln -s /usr/bin/python3.8 /usr/bin/python3
```

ansible 설치

```bash
pip3 install ansible
```

설치 확인

```bash
ansible --version
```

## minikube

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

설치 확인

```bash
minikube version
```

## kubernetes

### kubectl 설치

```bash
curl -LO "https://dl.k8s.io/release/v1.22.9/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

확인

```bash
kubectl version --client --output=yaml
```

### kubectx & kubens 설치

```bash
sudo git clone https://github.com/ahmetb/kubectx /opt/kubectx
sudo ln -s /opt/kubectx/kubectx /usr/local/bin/kubectx
sudo ln -s /opt/kubectx/kubens /usr/local/bin/kubens
```

### kubetail 설치

sudo git clone https://github.com/johanhaleby/kubetail.git /opt/kubetail
sudo ln -s /opt/kubetail/kubetail /usr/local/bin/kubetail

### kube-ps1 설정

```bash
git clone https://github.com/jonmosco/kube-ps1.git
echo "source kube-ps1/kube-ps1.sh" >> ~/.bash_profile
echo "PS1='[\u|\W $(kube_ps1)]\$ '" >> ~/.bash_profile
. ~/.bash_profile
```

- [Google Docs 정리- Google Docs 정리](#google-docs-정리--google-docs-정리)
  - [IAM](#iam)
    - [condition example](#condition-example)
    - [resource tag로 acess control](#resource-tag로-acess-control)
    - [STS를 통해서 Temporary credentials 발급](#sts를-통해서-temporary-credentials-발급)
    - [MFA 인증시에만 접근 가능하도록 Condition 설정](#mfa-인증시에만-접근-가능하도록-condition-설정)
    - [EC2 instance connect와 IAM policy로 접근 제어](#ec2-instance-connect와-iam-policy로-접근-제어)
    - [AWS SSM를 통해서 접근](#aws-ssm를-통해서-접근)
  - [EBS](#ebs)
  - [Lambda](#lambda)
  - [Systemd 설정](#systemd-설정)
- [Cloud9](#cloud9)
- [Packer & Ansible](#packer--ansible)
- [Sample code for Load balancers](#sample-code-for-load-balancers)
- [Infrastructure as code](#infrastructure-as-code)
- [CI/CD with Action](#cicd-with-action)
- [Minikube](#minikube)

# Google Docs 정리- [Google Docs 정리](#google-docs-정리)

- [Google Docs 정리- Google Docs 정리](#google-docs-정리--google-docs-정리)
  - [IAM](#iam)
    - [condition example](#condition-example)
    - [resource tag로 acess control](#resource-tag로-acess-control)
    - [STS를 통해서 Temporary credentials 발급](#sts를-통해서-temporary-credentials-발급)
    - [MFA 인증시에만 접근 가능하도록 Condition 설정](#mfa-인증시에만-접근-가능하도록-condition-설정)
    - [EC2 instance connect와 IAM policy로 접근 제어](#ec2-instance-connect와-iam-policy로-접근-제어)
    - [AWS SSM를 통해서 접근](#aws-ssm를-통해서-접근)
  - [EBS](#ebs)
  - [Lambda](#lambda)
  - [Systemd 설정](#systemd-설정)
- [Cloud9](#cloud9)
- [Packer & Ansible](#packer--ansible)
- [Sample code for Load balancers](#sample-code-for-load-balancers)
- [Infrastructure as code](#infrastructure-as-code)
- [CI/CD with Action](#cicd-with-action)
- [Minikube](#minikube)

## IAM

### condition example

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": ["ap-northeast-2"]
        }
      }
    }
  ]
}
```

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "ec2:DescribeVpcs",
      "Resource": "*",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "121.138.200.2"
        }
      }
    }
  ]
}
```

### resource tag로 acess control

```json
{
  "Version": "2012-10-17",

  "Statement": [
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": "ec2:CreateRouteTable",
      "Resource": "arn:aws:ec2:*:*:route-table/*"
    },
    {
      "Sid": "VisualEditor4",
      "Effect": "Allow",
      "Action": "ec2:CreateRouteTable",
      "Resource": "arn:aws:ec2:*:*:vpc/*",
      "Condition": {
        "StringEquals": {
          "aws:ResourceTag/Env": ["test", "dev"]
        }
      }
    }
  ]
}
```

### STS를 통해서 Temporary credentials 발급

```bash
aws sts get-session-token --serial-number arn:aws:iam::{계정ID}:mfa/test --token-code 977093
```

새로운 profile로 credentials 저장

```bash
aws configure set aws_access_key_id {결과값} --profile mfa
aws configure set aws_secret_access_key {결과값} --profile mfa
aws configure set aws_session_token {결과값} --profile mfa
```

### MFA 인증시에만 접근 가능하도록 Condition 설정

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "OnlyWithMFA",
      "Effect": "Deny",
      "NotAction": "sts:GetSessionToken",
      "Resource": "*",
      "Condition": {
        "BoolIfExists": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}
```

### EC2 instance connect와 IAM policy로 접근 제어

해당 package를 python을 통해서 설치

```bash
pip3 install ec2instanceconnectcli
```

IAM policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2-instance-connect:SendSSHPublicKey",
      "Resource": ["*"],
      "Condition": {
        "StringEquals": {
          "ec2:osuser": "ec2-user"
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": "ec2:DescribeInstances",
      "Resource": "*"
    }
  ]
}
```

### AWS SSM를 통해서 접근

`AmazonSSMManagedInstanceCore`가 EC2 instance profile에 설정 필요

endpoint interface로 NAT gateway없이 접근할 때 아래의 세 가지 endpoint를 생성해야 함

- com.amazonaws.{region}.ssm
- com.amazonaws.{region}.ec2messages
- com.amazonaws.{region}.ssmmessages

## EBS

EBS volume을 연결/분리하면서 확인

```bash
lsblk

sudo mkfs -t xfs /dev/xvdf

sudo file -s /dev/xvdf

sudo mkdir /data

sudo mount /dev/xvdf /data

sudo su -

cd /data

echo "hello world" > sample.txt

cd ~

sudo umount /data
```

## Lambda

동기 호출

```bash
aws lambda invoke \
--function-name myFirstLambda \
--invocation-type RequestResponse /dev/stdout
```

비동기 호출

```bash
aws lambda invoke \
--function-name myFirstLambda \
--invocation-type Event /dev/stdout
```

강제로 3초 기다리도록 하고, Error를 발생

```js
exports.handler = async (event) => {
  // TODO implement
  const delay = new Promise((resolve, rejec) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  throw new Error(`${event.invokeType}: force to throw Error!`);

  await delay;

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
```

## Systemd 설정

```js
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -

sudo yum install -y nodejs
```

```js
const http = require("http");

function fibo(n) {
  if (n < 2) return 1;
  else return fibo(n - 2) + fibo(n - 1);
}

const server = http.createServer((req, res) => {
  if (req.url == "/fibo") {
    res.end(`${fibo(35)}`);
  } else {
    res.end("hello world");
  }
});

server.listen(8080, () => console.log("running on port 8080"));
```

```bash
sudo touch /etc/systemd/system/tutorial.service
sudo chmod 644 /etc/systemd/system/tutorial.service
```

```bash
[Unit]
Description=toturial application
After=network.target

[Service]
Type=simple
User=ec2-user
ExecStart=/usr/bin/node /home/ec2-user/app.js
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl start tutorial
sudo systemctl status tutorial
sudo systemctl enable tutorial
```

# Cloud9

환경을 통일하고 이미 설치되어 있는 tool들을 사용하기 위하여 AWS Cloud9를 사용하였습니다. Cloud9에 추가적으로 필요한 것을 설치합니다. [설치 방법 확인하기]()

# Packer & Ansible

Amazon Linux 2를 base AMI로 하여 필요한 package를 설치하여 AMI를 AWS console에서 메뉴얼하게 만들어보았습니다. Packer와 Ansible을 통해서 코드로 관리하고 자동화할 수 있습니다. [예제 코드 확인하기]()

# Sample code for Load balancers

Network Load Balancer와 Application Load Balancer의 차이를 확인하였습니다. TCP, TLS, HTTP로 설정하면서 Nodejs application을 사용합니다. [예제 코드 확인하기]()

# Infrastructure as code

다양한 Cloud provider와 함께 사용할 수 있는 Terraform과 AWS에서 사용할 수 있는 Cloudformation, CDK, SAM을 살펴보았습니다. [예제 코드 확인하기]()

Terraform module을 활용하는 법을 배웠습니다. 그리고 직접 매번 작성할 필요 없이 [Terraform Registry](https://registry.terraform.io/browse/modules)에서 다양한 Module을 활용할 수 있습니다.

# CI/CD with Action

Infrastructure as code를 통해서 Infrastructure도 code처럼 관리할 수 있는 것을 배웠습니다. Github과 같은 원격저장소를 통해서 공유하고 CI/CD pipeline을 통해서 자동화할 수 있습니다. Code처럼 terraform code가 변경되었을 때, push를 하고 변경하사항을 pull request를 통해서 반영합니다. Github action을 통해서 pull request를 했을 때, lint와 terraform plan 결과값을 보여주도록 할 수 있습니다. 그리고 merge가 되어 main branch에 push가 되었을 때, 자동으로 terraform apply를 하여 변경된 사항을 반영합니다. [예제 코드 확인하기]()

# Minikube

Kubernetes를 로컬에서 실습할 수 있도록 minikube를 사용합니다. [예제 코드 확인하기]()

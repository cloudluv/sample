# Terraform with Action

Access key를 발급받아서 생성하는 대신에, OpenID connect 방식으로 Github에서 IAM role을 Assume할 수 있도록 설정하였습니다. [해당 문서 확인](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

```yaml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    role-to-assume: { 본인의 IAM role }
    aws-region: ap-northeast-2
```

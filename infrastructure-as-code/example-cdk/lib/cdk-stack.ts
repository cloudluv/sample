import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns' 이런게 design pattern이구나.
import { Construct } from 'constructs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // new ec2.CfnVPC => CloudFormation Resource Constructs

    // 이건 Service Construct이다

    const vpc = new ec2.Vpc(this, "my-cdk-vpc", {
      cidr: "10.6.0.0/16",
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: "private-subnet",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
        {
          name: "public-subnet",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
      ],
    });
  }
}

terraform {
  required_providers {
      aws = {
          source = "hashicorp/aws"
          version = "~>3.0"
      }
  }
}

provider "aws" {
  region = "us-west-2"
}

module "create-vpc" {
  source = "./modules/create-vpc"
  cidr_block = "10.1.0.0/16"
}

resource "aws_vpc_ipv4_cidr_block_association" "secondary_cidr" {
  vpc_id = module.create-vpc.id
  cidr_block = "10.4.0.0/16"
}
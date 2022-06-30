resource "aws_vpc" "testVpc" {
  cidr_block = var.cidr_block

  tags = {
    Name = "jaemyun-test-n-vpc"
  }
}
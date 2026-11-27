# APP stack: switch ON for demos (terraform apply), OFF afterwards (terraform destroy).
# Network, load balancer, WAF firewall, ECS Fargate containers, autoscaling, alarms.
# Reads registry/secret/certificate/roles from the BASE stack.
terraform {
  required_version = ">= 1.10"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.80" }
  }
  backend "s3" {
    bucket       = "ayaone-tfstate-277057415255"
    key          = "app/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = "ap-south-1"
  default_tags {
    tags = { Project = "ayaone", Environment = "staging", Stack = "app", ManagedBy = "terraform" }
  }
}

data "terraform_remote_state" "base" {
  backend = "s3"
  config = {
    bucket = "ayaone-tfstate-277057415255"
    key    = "base/terraform.tfstate"
    region = "ap-south-1"
  }
}

data "aws_ecr_repository" "app" {
  name = "ayaone-app"
}

locals {
  base = data.terraform_remote_state.base.outputs
}

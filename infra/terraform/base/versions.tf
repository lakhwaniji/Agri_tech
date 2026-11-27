# BASE stack: stays up permanently (~$1-3/month).
# Image registry, secrets, HTTPS certificate, IAM roles, logs, alerts, audit trail, budget.
terraform {
  required_version = ">= 1.10"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.80" }
  }
  backend "s3" {
    bucket       = "ayaone-tfstate-277057415255"
    key          = "base/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = "ap-south-1"
  default_tags {
    tags = { Project = "ayaone", Environment = "staging", Stack = "base", ManagedBy = "terraform" }
  }
}

data "aws_caller_identity" "me" {}

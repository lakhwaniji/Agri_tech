output "godaddy_certificate_record" {
  description = "Add this CNAME in GoDaddy once. In GoDaddy's Name box, enter only the part before '.ayaone.in.' (e.g. _abc123.app)."
  value = [for o in aws_acm_certificate.app.domain_validation_options : {
    type  = o.resource_record_type
    name  = o.resource_record_name
    value = o.resource_record_value
  }]
}

output "ecr_repository_url" { value = aws_ecr_repository.app.repository_url }
output "app_secret_name" { value = aws_secretsmanager_secret.app.name }

# Read by the app stack (terraform_remote_state).
output "app_domain" { value = var.app_domain }
output "certificate_arn" { value = aws_acm_certificate.app.arn }
output "secret_arn" { value = aws_secretsmanager_secret.app.arn }
output "secret_keys" { value = local.secret_keys }
output "log_group_name" { value = aws_cloudwatch_log_group.app.name }
output "execution_role_arn" { value = aws_iam_role.execution.arn }
output "task_role_arn" { value = aws_iam_role.task.arn }
output "alerts_topic_arn" { value = aws_sns_topic.alerts.arn }

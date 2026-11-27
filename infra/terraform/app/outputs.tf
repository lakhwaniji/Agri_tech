output "app_url" {
  value = "https://${local.base.app_domain}"
}

output "godaddy_app_record" {
  description = "Add/update this CNAME in GoDaddy after every apply (the load balancer address changes when recreated)."
  value       = { type = "CNAME", name = "app", value = aws_lb.app.dns_name }
}

output "ecs_cluster" { value = aws_ecs_cluster.main.name }
output "ecs_service" { value = aws_ecs_service.app.name }

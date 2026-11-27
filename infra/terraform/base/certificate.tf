# HTTPS certificate for app.ayaone.in (free, auto-renewing).
# DNS is at GoDaddy, so after apply you add ONE validation CNAME there (see output).
# Kept in base so it survives app teardown and never needs validating again.
resource "aws_acm_certificate" "app" {
  domain_name       = var.app_domain
  validation_method = "DNS"
  lifecycle { create_before_destroy = true }
}

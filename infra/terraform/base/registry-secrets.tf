# Image registry: holds every version of the app's Docker image.
resource "aws_ecr_repository" "app" {
  name                 = "ayaone-app"
  image_tag_mutability = "IMMUTABLE" # a tag like v1 can never be overwritten
  image_scanning_configuration { scan_on_push = true }
  encryption_configuration { encryption_type = "KMS" }
}

resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep the last 15 images"
      selection    = { tagStatus = "any", countType = "imageCountMoreThan", countNumber = 15 }
      action       = { type = "expire" }
    }]
  })
}

# App settings and keys. Created with placeholders; you fill in the real values
# in the AWS console (Secrets Manager -> ayaone/staging/app). Terraform never
# overwrites them afterwards, and real values never go into code or GitHub.
locals {
  secret_keys = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "OPENWEATHER_API_KEY",
    "SENTINEL_HUB_CLIENT_ID",
    "SENTINEL_HUB_CLIENT_SECRET",
    "SENTINEL_HUB_TOKEN_URL",
    "SENTINEL_HUB_API_URL",
    "DEMO_MODE",
  ]
  secret_defaults = {
    DEMO_MODE              = "true"
    SENTINEL_HUB_TOKEN_URL = "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token"
    SENTINEL_HUB_API_URL   = "https://sh.dataspace.copernicus.eu"
  }
}

resource "aws_secretsmanager_secret" "app" {
  name                    = "ayaone/staging/app"
  recovery_window_in_days = 7
}

resource "aws_secretsmanager_secret_version" "app" {
  secret_id     = aws_secretsmanager_secret.app.id
  secret_string = jsonencode({ for k in local.secret_keys : k => lookup(local.secret_defaults, k, "CHANGE_ME") })
  lifecycle { ignore_changes = [secret_string] }
}

# App logs. CERT-In asks for 180 days in India. Lives in base so logs survive app teardown.
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ayaone/staging/app"
  retention_in_days = 180
}

# AgriFintech on AWS — staging setup runbook

Everything below uses the **company email**. Every account gets **authenticator-app 2-factor (not SMS)**.

```
Browser ─► WAF ─► Load balancer (HTTPS) ─► 2 × ECS Fargate containers (2 zones)
                                              │
                         Secrets Manager · CloudWatch · ECR · GuardDuty · CloudTrail
                                              │
                                              ▼
                         Supabase (database, OTP login, photos) · Sentinel Hub · OpenWeather
```

Cheaper staging layout: no NAT gateway (containers sit in public subnets but accept traffic only
from the load balancer). Approx. **$60–75 / month** on AWS + Supabase free plan (kept awake by a daily ping).

---

## Part A — New Supabase project (company email)

1. Sign up at supabase.com with the company email. Account → Security → enable **authenticator app** 2FA.
2. New project → region **Mumbai (ap-south-1)** → save the database password in a password manager.
3. **SQL Editor** → paste all of `supabase/000_full_setup.sql` → Run.
   Then run the commented `ops_users` insert at the bottom with a **strong** password.
4. **Project Settings → API**: copy `Project URL`, `anon` key, `service_role` key (keep this one secret).
5. **Authentication → URL Configuration**: Site URL = `https://<app domain>`; add it to Redirect URLs too.

### Twilio (OTP SMS) — new account
1. Sign up at twilio.com with the company email → enable authenticator-app 2FA.
2. Buy / use a number → **Messaging → Services → Create** a Messaging Service, add the number as sender.
3. Copy **Account SID**, **Auth Token**, **Messaging Service SID**.
4. Supabase → **Authentication → Sign In / Providers → Phone** → enable → provider **Twilio** → paste the three values → Save.
5. Trial accounts only text **verified numbers** (Twilio console → Verified Caller IDs). Add the demo phones,
   or upgrade the account before the investor demo. Production SMS to India needs **DLT registration**.

### Other keys
- **Sentinel Hub**: new account with company email → OAuth client → client ID + secret.
- **OpenWeather**: new account with company email → API key.

---

## Part B — AWS (run in AWS CloudShell, region Mumbai)

### B1. Install Terraform and get the code (once)
```bash
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
sudo dnf install -y terraform
git clone https://github.com/lakhwaniji/Agri_tech.git && cd Agri_tech/infra/terraform
```

### B2. Bootstrap (once): state bucket + GitHub deploy role
```bash
cd bootstrap && terraform init && terraform apply
```
Note the two outputs: `state_bucket` and `deploy_role_arn`.

### B3. Staging stack
```bash
cd ../staging
cp terraform.tfvars.example terraform.tfvars && nano terraform.tfvars   # domain + company email
terraform init -backend-config="bucket=<state_bucket>"
```
**If your domain's DNS is NOT in Route 53** (GoDaddy, Namecheap, Hostinger…):
```bash
terraform apply -target=aws_acm_certificate.app      # 1. create the HTTPS certificate request
terraform output certificate_validation_records       # 2. add this CNAME at your DNS provider
terraform apply                                        # 3. builds everything (waits for the certificate)
terraform output app_dns_record                        # 4. add this CNAME too: app domain → load balancer
```
**If DNS is in Route 53**: set `route53_zone_name` in tfvars and just run `terraform apply`.

Confirm the "AWS Notification – Subscription Confirmation" email so alarms reach you.

### B4. Put the real secrets in
AWS console → **Secrets Manager → `agrifintech/staging/app` → Retrieve secret value → Edit**:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key |
| `OPENWEATHER_API_KEY` | OpenWeather key |
| `SENTINEL_HUB_CLIENT_ID` / `SENTINEL_HUB_CLIENT_SECRET` | Sentinel Hub client |
| `DEMO_MODE` | `false` (set `true` only for a no-login demo, then back to `false`) |

---

## Part C — GitHub (repo → Settings → Secrets and variables → Actions → **Variables**)

| Variable | Value |
|---|---|
| `AWS_DEPLOY_ROLE_ARN` | `deploy_role_arn` from B2 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public by design) |
| `APP_URL` | `https://<app domain>` (turns on the daily keep-alive) |

Also: Settings → Environments → create **staging**. Make the repo **private** (Settings → General → Danger zone).

Then push to `main` (or Actions → "Deploy to AWS (staging)" → Run workflow). The first deploy takes ~5–8 min.
Open `https://<app domain>` — done.

---

## What Terraform creates

| File | Resources |
|---|---|
| `bootstrap/main.tf` | Encrypted, versioned state bucket · GitHub OIDC provider · deploy role (ECR push + ECS update only, `main` branch only) |
| `staging/network.tf` | VPC across 2 Availability Zones · public subnets · firewall rules (app reachable only from the load balancer) |
| `staging/edge.tf` | HTTPS certificate (ACM) · load balancer with HTTP→HTTPS redirect, TLS 1.2+ · WAF (AWS common rules, bad-input rules, rate limit 1000 req / 5 min / IP) |
| `staging/app.tf` | ECR (scan on push, immutable tags) · Secrets Manager · CloudWatch logs (180 days) · ECS cluster + Fargate service (2 tasks, auto-scale to 4, auto-rollback) |
| `staging/monitoring.tf` | Email alarms (unhealthy containers, 5xx errors) · GuardDuty · CloudTrail (all regions, log validation) · monthly budget alerts |

Later (not in staging yet): CloudFront, NAT gateway + private subnets (needed for bank partner IP allow-listing), RDS, Cognito.

variable "app_domain" {
  description = "Hostname for the app"
  type        = string
  default     = "app.ayaone.in"
}

variable "alert_email" {
  description = "Company email for alarms and the budget alert"
  type        = string
}

variable "monthly_budget_usd" {
  description = "Email alert at 80% actual / 100% forecast of this amount"
  type        = number
  default     = 50
}

variable "image_tag" {
  description = "Which image version in ECR to run, e.g. v1"
  type        = string
  default     = "v1"
}

variable "desired_count" {
  description = "Baseline containers. 1 is enough at current traffic; autoscaling adds more on load."
  type        = number
  default     = 1
}

variable "max_count" {
  description = "Most containers autoscaling may run when CPU is busy"
  type        = number
  default     = 2
}

variable "container_insights" {
  description = "Detailed per-container metrics (extra cost). Basic metrics, alarms and logs work without it."
  type        = bool
  default     = false
}

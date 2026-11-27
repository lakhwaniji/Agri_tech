# Email alerts (to the SNS topic from the base stack).

resource "aws_cloudwatch_metric_alarm" "unhealthy" {
  alarm_name          = "ayaone-staging-unhealthy-containers"
  alarm_description   = "One or more app containers failing health checks"
  namespace           = "AWS/ApplicationELB"
  metric_name         = "UnHealthyHostCount"
  statistic           = "Maximum"
  period              = 60
  evaluation_periods  = 3
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  dimensions = {
    LoadBalancer = aws_lb.app.arn_suffix
    TargetGroup  = aws_lb_target_group.app.arn_suffix
  }
  alarm_actions = [local.base.alerts_topic_arn]
  ok_actions    = [local.base.alerts_topic_arn]
}

resource "aws_cloudwatch_metric_alarm" "errors_5xx" {
  alarm_name          = "ayaone-staging-5xx-errors"
  alarm_description   = "App returning server errors"
  namespace           = "AWS/ApplicationELB"
  metric_name         = "HTTPCode_Target_5XX_Count"
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 10
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
  dimensions          = { LoadBalancer = aws_lb.app.arn_suffix }
  alarm_actions       = [local.base.alerts_topic_arn]
}

# ECS Fargate: runs the app containers. No servers to manage.

resource "aws_ecs_cluster" "main" {
  name = "ayaone-staging"
  setting {
    name  = "containerInsights"
    value = var.container_insights ? "enabled" : "disabled"
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = "ayaone-staging-app"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256 # 0.25 vCPU
  memory                   = 512 # 0.5 GB
  execution_role_arn       = local.base.execution_role_arn
  task_role_arn            = local.base.task_role_arn
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64" # Graviton: matches the Mac (Apple chip) build, ~20% cheaper
  }

  container_definitions = jsonencode([{
    name         = "app"
    image        = "${data.aws_ecr_repository.app.repository_url}:${var.image_tag}"
    essential    = true
    portMappings = [{ containerPort = 3000, protocol = "tcp" }]
    # Each key of the Secrets Manager JSON becomes an environment variable.
    secrets = [for k in local.base.secret_keys : {
      name      = k
      valueFrom = "${local.base.secret_arn}:${k}::"
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = local.base.log_group_name
        awslogs-region        = "ap-south-1"
        awslogs-stream-prefix = "app"
      }
    }
  }])
}

resource "aws_ecs_service" "app" {
  name                              = "ayaone-app"
  cluster                           = aws_ecs_cluster.main.id
  task_definition                   = aws_ecs_task_definition.app.arn
  desired_count                     = var.desired_count
  launch_type                       = "FARGATE"
  health_check_grace_period_seconds = 60

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.app.id]
    assign_public_ip = true # outbound only; the security group blocks all inbound except the ALB
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = 3000
  }

  # A release that fails health checks rolls back automatically.
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200

  lifecycle { ignore_changes = [desired_count] } # autoscaling owns this

  depends_on = [aws_lb_listener.https]
}

# Scale from 1 up to max_count containers when CPU is busy.
resource "aws_appautoscaling_target" "app" {
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.main.name}/${aws_ecs_service.app.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  min_capacity       = var.desired_count
  max_capacity       = var.max_count
}

resource "aws_appautoscaling_policy" "cpu" {
  name               = "cpu-target"
  service_namespace  = aws_appautoscaling_target.app.service_namespace
  resource_id        = aws_appautoscaling_target.app.resource_id
  scalable_dimension = aws_appautoscaling_target.app.scalable_dimension
  policy_type        = "TargetTrackingScaling"
  target_tracking_scaling_policy_configuration {
    target_value = 60
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
  }
}

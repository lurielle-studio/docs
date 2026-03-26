---
slug: /deployment
sidebar_position: 8
title: Deploy & Publish
description: Deploy Cortana to production environments.
---

import Callout from '@site/src/components/Callout';

# Deploy & Publish

This guide covers deployment strategies for running Cortana in production.

## Deployment Options

### Option 1: Docker (Recommended)

Build and run Cortana with Docker:

```bash
# Build the image
docker build -t cortana:latest .

# Run with environment variables
docker run -d \
  --name cortana \
  -p 4000:4000 \
  -e SECRET_KEY_BASE=your_secret_key \
  -e DATABASE_URL=ecto://user:pass@host/db \
  -e REDIS_URL=redis://redis:6379 \
  cortana:latest
```

### Option 2: Fly.io

Deploy to Fly.io with built-in Elixir support:

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Launch your app
fly launch

# Set secrets
fly secrets set SECRET_KEY_BASE=$(mix phx.gen.secret)
fly secrets set DATABASE_URL="ecto://..."
fly secrets set REDIS_URL="redis://..."

# Deploy
fly deploy
```

### Option 3: Gigalixir

Managed Elixir hosting:

```bash
# Install Gigalixir CLI
curl https://gigalixir.com/install.sh | sh

# Create app
gigalixir create

# Set config
gigalixir config:set SECRET_KEY_BASE=$(mix phx.gen.secret)

# Deploy
git push gigalixir main
```

## Database Setup

### PostgreSQL on AWS RDS

```hcl
# terraform/main.tf
resource "aws_db_instance" "cortana" {
  identifier          = "cortana-db"
  engine              = "postgres"
  engine_version      = "15.4"
  instance_class      = "db.t3.medium"
  allocated_storage   = 20
  
  db_name  = "cortana_prod"
  username = "cortana"
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  multi_az                = true
}
```

### Redis on AWS ElastiCache

```hcl
resource "aws_elasticache_cluster" "cortana" {
  cluster_id           = "cortana-redis"
  engine              = "redis"
  node_type           = "cache.t3.micro"
  num_cache_nodes     = 1
  parameter_group_name = "default.redis7"
  port                = 6379
}
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Elixir
        uses: erlef/setup-beam@v1
        with:
          elixir-version: '1.15'
          otp-version: '26'
          
      - name: Install dependencies
        run: mix deps.get
        
      - name: Run tests
        run: mix test
        
      - name: Build assets
        run: mix assets.deploy
        
      - name: Deploy to Fly.io
        uses: superfly/flyctl-actions/setup-flyctl@master
        
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

## SSL/TLS Configuration

### Let's Encrypt with Certbot

```bash
# Install certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d api.cortana.dev

# Configure in Phoenix
config :cortana, MyAppWeb.Endpoint,
  https: [
    port: 443,
    certfile: "/etc/letsencrypt/live/api.cortana.dev/fullchain.pem",
    keyfile: "/etc/letsencrypt/live/api.cortana.dev/privkey.pem"
  ]
```

<Callout type="info" title="Auto-renewal">
Set up a cron job to renew certificates automatically:
```bash
0 0 1 * * certbot renew --quiet
```
</Callout>

## Monitoring and Alerts

### Uptime Monitoring

Configure external uptime monitoring:

- **UptimeRobot**: Free tier available, 5-minute checks
- **Better Uptime**: Team incident management included
- **Pingdom**: Enterprise-grade monitoring

### Error Tracking with Sentry

```elixir
config :sentry,
  dsn: System.get_env("SENTRY_DSN"),
  environment_name: Mix.env(),
  enable_source_code_context: true,
  root_source_code_paths: [File.cwd!()]
```

## Scaling Considerations

### Horizontal Scaling

For high-traffic deployments, scale horizontally:

```yaml
# fly.toml
[deploy]
  processes = ["app"]

[http_service]
  internal_port = 4000
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 2
```

### Load Testing

Use tools like k6 or Artillery:

```javascript
// load-test.js
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '5m',
};

export default function () {
  http.get('https://api.cortana.dev/health');
  sleep(1);
}
```

## Rollback Strategy

### Database Migrations

Always have a rollback plan:

```bash
# Before deploying
mix ecto.migrations.status

# If issues occur after deploy
mix ecto.rollback --step N
```

### Blue-Green Deployment

Deploy to a parallel environment and switch traffic:

```bash
# Deploy to staging
fly deploy --app cortana-staging --image cortana:new

# Run smoke tests
curl https://cortana-staging.fly.dev/health

# Switch traffic
fly certs add api.cortana.dev --app cortana-staging
```

<Callout type="success" title="Production Ready">
With these configurations, your Cortana deployment is ready for production workloads. Remember to:
- Enable monitoring and alerting
- Set up automated backups
- Document your runbooks
- Test disaster recovery procedures
</Callout>

## Next Steps

- Review [Administration Guide](/administration) for ongoing operations
- Set up your [MCP & Integrations](/mcp-integrations) for external services

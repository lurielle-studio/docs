---
slug: /administration
sidebar_position: 7
title: Administration Guide
description: Configure and manage your Cortana deployment.
---

import Callout from '@site/src/components/Callout';

# Administration Guide

This guide covers the operational aspects of running Cortana in production environments.

## Server Configuration

### Core Settings

Configure Cortana's core behavior in `config/runtime.exs`:

```elixir
config :cortana,
  # Server settings
  http_port: 4000,
  secret_key_base: System.get_env("SECRET_KEY_BASE"),
  
  # Database
  repo: MyApp.Repo,
  
  # Redis (for caching and pub/sub)
  redis_url: System.get_env("REDIS_URL"),
  
  # LLM Providers
  providers: %{
    openai: %{
      api_key: System.get_env("OPENAI_API_KEY"),
      default_model: "gpt-4"
    },
    anthropic: %{
      api_key: System.get_env("ANTHROPIC_API_KEY"),
      default_model: "claude-3-opus"
    }
  }
```

### Environment Variables

<Callout type="info" title="Required Variables">
These environment variables must be set before starting the server.
</Callout>

| Variable | Description | Required |
|----------|-------------|----------|
| `SECRET_KEY_BASE` | Phoenix secret key for sessions/cookies | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key | If using OpenAI |
| `ANTHROPIC_API_KEY` | Anthropic API key | If using Anthropic |

## Database Management

### Migrations

Run database migrations:

```bash
# Apply pending migrations
mix ecto.migrate

# Rollback last migration
mix ecto.rollback

# Check migration status
mix ecto.migrations
```

### Backup and Restore

<Callout type="warning" title="Data Loss Risk">
Always backup your database before running migrations or upgrades.
</Callout>

```bash
# Create backup
pg_dump -Fc cortana_prod > backup_$(date +%Y%m%d).dump

# Restore from backup
pg_restore -d cortana_prod backup_20240326.dump
```

## Monitoring

### Health Checks

Cortana exposes health endpoints:

- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed status including dependencies

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "dependencies": {
    "database": "connected",
    "redis": "connected",
    "llm_providers": {
      "openai": "available",
      "anthropic": "available"
    }
  }
}
```

### Metrics

Enable Prometheus metrics:

```elixir
config :cortana, :metrics,
  enabled: true,
  port: 9090,
  path: "/metrics"
```

## User Management

### Creating Admin Users

```bash
mix cortana.admin create --email admin@example.com --name "Admin User"
```

### API Keys

Manage API keys through the admin interface or CLI:

```bash
# Generate new API key
mix cortana.api_key generate --name "Production Key"

# List all API keys
mix cortana.api_key list

# Revoke an API key
mix cortana.api_key revoke --id abc123
```

## Logging

### Configuration

Configure logging in `config/prod.exs`:

```elixir
config :logger,
  level: :info,
  backends: [:console, {LoggerFileBackend, :file_log}],
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id, :user_id, :agent_id]

config :logger, :file_log,
  path: "/var/log/cortana/production.log",
  level: :info
```

### Log Levels

| Level | When to Use |
|-------|-------------|
| `debug` | Detailed debugging information |
| `info` | General operational events |
| `warning` | Recoverable issues requiring attention |
| `error` | Failures requiring immediate investigation |

<Callout type="warning" title="Production Logging">
In production, avoid `debug` level logging as it can impact performance and storage.
</Callout>

## Performance Tuning

### Connection Pooling

Configure database pool size:

```elixir
config :cortana, MyApp.Repo,
  pool_size: 20,
  queue_target: 500,
  queue_interval: 1000
```

### Caching

Enable Redis caching for improved performance:

```elixir
config :cortana, :cache,
  backend: :redis,
  ttl: 3600,  # 1 hour
  max_size: 10_000
```

## Security Hardening

### HTTPS Configuration

Always use HTTPS in production:

```elixir
config :cortana, MyAppWeb.Endpoint,
  https: [
    port: 443,
    cipher_suite: :strong,
    certfile: "/etc/letsencrypt/live/domain/cert.pem",
    keyfile: "/etc/letsencrypt/live/domain/privkey.pem"
  ]
```

### Rate Limiting

Configure API rate limiting:

```elixir
config :cortana, :rate_limiting,
  enabled: true,
  requests_per_minute: 100,
  burst_size: 20
```

<Callout type="success" title="Next Steps">
You now have the foundation for a production-ready Cortana deployment. Review the [Deploy & Publish](/deployment) guide for deployment strategies.
</Callout>

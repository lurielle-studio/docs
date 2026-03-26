---
slug: /mcp-integrations
sidebar_position: 5
title: MCP & Integrations
description: Connect Cortana to external tools and services via MCP.
---

import Callout from '@site/src/components/Callout';

# MCP & Integrations

Cortana's **Model Context Protocol (MCP)** enables agents to connect to external tools and data sources securely.

## What is MCP?

MCP is a standardized protocol for exposing tools and resources to LLM-powered agents. It allows agents to:

- **Execute code** in sandboxed environments
- **Access databases** through structured queries
- **Call external APIs** with proper authentication
- **Read/write files** in controlled directories

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Agent                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              LLM (Brain)                        │   │
│  └─────────────────────────────────────────────────┘   │
│                        │                                │
│                        ▼                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │           MCP Client                            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                        │
                        │ MCP Protocol
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    MCP Servers                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  File    │  │  Code    │  │  API     │             │
│  │  Server  │  │  Server  │  │  Server  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

## Built-in MCP Servers

### File System Server

Provides controlled file access for agents.

```elixir
config :my_agent, :mcp_servers,
  file_system: %{
    module: Cortana.MCP.FileSystem,
    options: %{
      allowed_paths: ["/tmp/agent_workspace"],
      read_only: false
    }
  }
```

### Code Execution Server

Execute code in sandboxed environments.

```elixir
config :my_agent, :mcp_servers,
  code_execution: %{
    module: Cortana.MCP.CodeExec,
    options: %{
      languages: ["elixir", "python", "javascript"],
      timeout_ms: 30_000,
      memory_limit_mb: 256
    }
  }
```

### API Gateway Server

Make authenticated API calls to external services.

```elixir
config :my_agent, :mcp_servers,
  api_gateway: %{
    module: Cortana.MCP.APIGateway,
    options: %{
      credentials: %{
        "github" => System.get_env("GITHUB_TOKEN"),
        "openai" => System.get_env("OPENAI_API_KEY")
      }
    }
  }
```

## Creating Custom MCP Servers

<Callout type="info">
Custom MCP servers allow you to extend agent capabilities with domain-specific tools.
</Callout>

### Server Module Structure

```elixir
defmodule MyApp.MCP.CustomServer do
  @behaviour Cortana.MCP.Server

  @impl true
  def tools do
    [
      %{
        name: "my_tool",
        description: "A custom tool",
        input_schema: %{
          type: "object",
          properties: %{
            query: %{type: "string", description: "The query parameter"}
          },
          required: ["query"]
        }
      }
    ]
  end

  @impl true
  def call_tool("my_tool", %{"query" => query}) do
    # Your implementation
    {:ok, %{result: "Processed: #{query}"}}
  end

  @impl true
  def call_tool(tool_name, _args) do
    {:error, "Unknown tool: #{tool_name}"}
  end
end
```

## Security Considerations

<Callout type="warning" title="Security">
Always implement proper input validation and sandboxing when exposing tools to agents. Agents may attempt unexpected inputs or privilege escalation.
</Callout>

- **Input Validation**: Sanitize all tool inputs
- **Resource Limits**: Set timeouts and memory constraints
- **Audit Logging**: Log all tool invocations
- **Least Privilege**: Grant minimum required permissions

## Next Steps

- Review the [API Reference](/api/overview) for programmatic configuration
- Learn about [Agents](/agent-system/overview) that use these integrations

---
title: Endpoints
description: API Endpoints for interacting with Cortana resources
---

import ApiSignature from '@site/src/components/ApiSignature';
import Callout from '@site/src/components/Callout';

# API Endpoints

Here are the core endpoints available in the Cortana API.

<Callout type="info" title="Base URL">
All endpoints are relative to `https://api.cortana.dev/v1`
</Callout>

## Agents

### List Agents

<ApiSignature 
  method="GET" 
  path="/agents" 
  description="Retrieve a list of all available agents in your organization"
  params={[
    { name: "limit", type: "integer", required: false, description: "Max number of agents to return (default: 20)" },
    { name: "offset", type: "integer", required: false, description: "Pagination offset" },
    { name: "status", type: "string", required: false, description: "Filter by status: active, paused, archived" }
  ]}
/>

### Create Agent

<ApiSignature 
  method="POST" 
  path="/agents" 
  description="Create a new agent with specified configuration"
  params={[
    { name: "name", type: "string", required: true, description: "Agent display name" },
    { name: "model", type: "string", required: true, description: "LLM model ID (e.g., 'gpt-4', 'claude-3')" },
    { name: "system_prompt", type: "string", required: false, description: "Custom system prompt" },
    { name: "temperature", type: "number", required: false, description: "Sampling temperature (0.0-2.0)" }
  ]}
/>

### Get Agent

<ApiSignature 
  method="GET" 
  path="/agents/:id" 
  description="Get detailed information about a specific agent"
  params={[
    { name: "id", type: "string", required: true, description: "Agent unique identifier" }
  ]}
/>

### Update Agent

<ApiSignature 
  method="PATCH" 
  path="/agents/:id" 
  description="Update agent configuration"
  params={[
    { name: "id", type: "string", required: true, description: "Agent unique identifier" },
    { name: "name", type: "string", required: false, description: "Updated display name" },
    { name: "system_prompt", type: "string", required: false, description: "Updated system prompt" },
    { name: "status", type: "string", required: false, description: "Set status: active, paused, archived" }
  ]}
/>

### Delete Agent

<ApiSignature 
  method="DELETE" 
  path="/agents/:id" 
  description="Permanently delete an agent and its history"
  params={[
    { name: "id", type: "string", required: true, description: "Agent unique identifier" }
  ]}
/>

## Tasks

### Create Task

<ApiSignature 
  method="POST" 
  path="/tasks" 
  description="Assign a new task to an agent for execution"
  params={[
    { name: "agent_id", type: "string", required: true, description: "Target agent ID" },
    { name: "input", type: "object", required: true, description: "Task input data payload" },
    { name: "callback_url", type: "string", required: false, description: "Webhook URL for completion notification" },
    { name: "timeout", type: "integer", required: false, description: "Maximum execution time in seconds" }
  ]}
/>

### Get Task

<ApiSignature 
  method="GET" 
  path="/tasks/:id" 
  description="Retrieve task status, result, and metadata"
  params={[
    { name: "id", type: "string", required: true, description: "Task unique identifier" }
  ]}
/>

### List Tasks

<ApiSignature 
  method="GET" 
  path="/tasks" 
  description="List tasks with optional filtering"
  params={[
    { name: "agent_id", type: "string", required: false, description: "Filter by agent ID" },
    { name: "status", type: "string", required: false, description: "Filter by status: pending, running, completed, failed" },
    { name: "limit", type: "integer", required: false, description: "Max number of tasks to return" }
  ]}
/>

### Cancel Task

<ApiSignature 
  method="DELETE" 
  path="/tasks/:id" 
  description="Cancel a pending or running task"
  params={[
    { name: "id", type: "string", required: true, description: "Task unique identifier" }
  ]}
/>

<Callout type="warning" title="Rate Limits">
API requests are limited to 100 requests per minute per API key. Exceeding this limit will result in a 429 Too Many Requests response.
</Callout>

---
slug: /core-concepts
sidebar_position: 2
title: Core Concepts
description: Understand the fundamental architecture of Cortana.
---

import Callout from '@site/src/components/Callout';

# Core Concepts

Cortana is built on a hierarchical architecture designed for intelligent agent orchestration.

## Architecture Overview

The system consists of three main layers:

1.  **The Brain** (LLM Integration)
    *   Handles reasoning, planning, and natural language understanding.
    *   Supports multiple providers (OpenAI, Anthropic, Local).

2.  **The Nervous System** (Message Bus)
    *   Routes messages between channels, agents, and tasks.
    *   Built on Phoenix PubSub for high-throughput real-time communication.

3.  **The Memory** (State Management)
    *   Short-term: In-memory conversation buffers.
    *   Long-term: Vector databases (Pinecone, Weaviate) or traditional DBs.

## Agents

An **Agent** is the autonomous unit of work in Cortana. Each agent:

*   Has a specific persona and system prompt.
*   Maintains its own context window.
*   Can access tools and MCP servers.

## Channels

**Channels** are communication interfaces. They connect agents to the outside world.

*   `WebChannel`: HTTP/WebSocket interface.
*   `SlackChannel`: Slack integration.
*   `TerminalChannel`: CLI interface.

## Tasks

**Tasks** represent discrete units of work that can be assigned to agents. They have:

*   A defined goal.
*   Input/Output schemas.
*   Lifecycle states (Pending, Running, Completed, Failed).

<Callout type="info">
  Tasks are idempotent by design. You can retry a failed task without side effects.
</Callout>

## Next Steps

*   Learn about the **Agent System** in detail.
*   Check the **API Reference** for implementation specifics.

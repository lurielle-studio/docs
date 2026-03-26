---
slug: /getting-started
sidebar_position: 1
title: Getting Started
description: Get up and running with Cortana in minutes.
---

import Callout from '@site/src/components/Callout';
import CodeBlock from '@site/src/components/CodeBlock';

# Getting Started

Welcome to **Cortana**, the intelligent agent platform. This guide will help you set up your development environment and create your first agent.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Elixir** (>= 1.14)
*   **Phoenix** (>= 1.7)
*   **Node.js** (>= 18.0)

## Installation

Install the Cortana CLI tool globally:

<CodeBlock language="bash" title="Terminal">
{`mix archive.install hex cortana_cli
cortana init my_agent`}
</CodeBlock>

<Callout type="info">
  If you are upgrading from a previous version, make sure to clear your Mix cache first using `mix deps.clean --all`.
</Callout>

## Configuration

Create a `config/cortana.exs` file in your project root:

<CodeBlock language="elixir" title="config/cortana.exs">
{`import Config

config :my_agent,
  cortana: %{
    providers: [:openai, :anthropic],
    default_model: "gpt-4",
    memory_backend: :redis
  }
`}
</CodeBlock>

## Running Your Agent

Start your Phoenix server:

<CodeBlock language="bash" title="Terminal">
{`mix phx.server`}
</CodeBlock>

Your agent is now live at `http://localhost:4000`.

<Callout type="success" title="Ready to go!">
  You've successfully set up Cortana. Head over to **Core Concepts** to learn about the agent architecture.
</Callout>

## Troubleshooting

<Callout type="warning">
  If you encounter `Elixir.Version` compatibility errors, ensure your `.tool-versions` or `asdf` configuration matches the required versions.
</Callout>

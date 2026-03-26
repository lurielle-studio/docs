---
slug: /mdx-test
sidebar_position: 99
title: MDX Test Page
description: Testing MDX components and functionality
---

import Callout from '@site/src/components/Callout';
import ApiSignature from '@site/src/components/ApiSignature';

# MDX Test Page

This page demonstrates that MDX is properly configured and custom components are working.

## Callout Components

<Callout type="info" title="Information">
  This is an informational callout using CSS custom properties.
</Callout>

<Callout type="warning" title="Warning">
  This is a warning callout with design token support.
</Callout>

<Callout type="success" title="Success">
  This is a success callout ready for design system integration.
</Callout>

<Callout type="error" title="Error">
  This is an error callout demonstrating semantic colors.
</Callout>

## API Signature Component

<ApiSignature 
  method="GET" 
  path="/api/v1/agents" 
  description="Retrieve a list of all agents in your organization"
  params={[
    { name: "limit", type: "integer", required: false, description: "Maximum number of results (default: 20)" },
    { name: "offset", type: "integer", required: false, description: "Pagination offset" },
    { name: "status", type: "string", required: false, description: "Filter by status: active, paused, archived" }
  ]}
/>

## Code Blocks with Syntax Highlighting

```elixir
# Elixir code with syntax highlighting
defmodule MyApp.Agent do
  use Cortana.Agent,
    name: "My First Agent",
    model: "gpt-4"
  
  def handle_message(message, state) do
    {:reply, "Hello! I received: #{message.content}", state}
  end
end
```

```typescript
// TypeScript code
interface AgentConfig {
  name: string;
  model: 'gpt-4' | 'claude-3-opus';
  temperature?: number;
}

const createAgent = (config: AgentConfig): Agent => {
  return new Agent(config);
};
```

## CSS Custom Properties Test

<div style={{
  padding: 'var(--space-6, 1.5rem)',
  backgroundColor: 'var(--color-primary-50, #eff6ff)',
  borderRadius: 'var(--border-radius-lg, 0.5rem)',
  border: '1px solid var(--color-primary-200, #bfdbfe)',
  marginBottom: 'var(--space-6, 1.5rem)'
}}>
  <h3 style={{ 
    color: 'var(--color-primary-700, #1d4ed8)',
    marginBottom: 'var(--space-4, 1rem)'
  }}>
    Design Token Test
  </h3>
  <p style={{ 
    color: 'var(--color-primary-600, #2563eb)',
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-base, 1rem)'
  }}>
    This section uses CSS custom properties that will be replaced with actual design tokens 
    when the Design System Integration task is completed.
  </p>
</div>

## Next Steps

✅ MDX is working correctly!  
✅ Custom components render properly  
✅ CSS custom properties layer is ready  
✅ Syntax highlighting works for Elixir, TypeScript, and other languages

The documentation site is ready for content and design token injection.

# MDX Component Library

This directory contains reusable MDX components for the Cortana documentation.

## Components

### `Callout`
Displays styled callout/admonition boxes for important information.

```jsx
import { Callout } from '@site/src/components/MDXComponents';

<Callout type="info" title="Note">
  Important information goes here.
</Callout>

<Callout type="warning" title="Warning">
  Cautionary information.
</Callout>

<Callout type="success" title="Tip">
  Helpful suggestions.
</Callout>

<Callout type="error" title="Danger">
  Critical warnings.
</Callout>
```

### `CodeBlock`
Enhanced code blocks with syntax highlighting, titles, and line numbers.

```jsx
import { CodeBlock } from '@site/src/components/MDXComponents';

<CodeBlock language="javascript" title="example.js" showLineNumbers>
{`function hello() {
  console.log('Hello, world!');
}`}
</CodeBlock>
```

### `ApiSignature`
API endpoint documentation with method badges and parameter tables.

```jsx
import { ApiSignature } from '@site/src/components/MDXComponents';

<ApiSignature
  method="GET"
  path="/api/agents"
  description="List all available agents"
  parameters={[
    { name: 'limit', type: 'integer', required: false, description: 'Max results' },
    { name: 'offset', type: 'integer', required: false, description: 'Pagination offset' }
  ]}
/>
```

### `AgentCapabilityCard`
Displays agent capabilities based on the Agent Capability Matrix.

```jsx
import { AgentCapabilityCard } from '@site/src/components/MDXComponents';

<AgentCapabilityCard
  name="Kai"
  role="Primary implementation agent for codebase modifications"
  status="active"
  model="Anthropic Claude Sonnet 4"
  description="Responsible for executing code changes and file operations."
  tools={[
    { name: 'read_file', safety: 'Low' },
    { name: 'write_file', safety: 'Medium' },
    { name: 'bash', safety: 'High' }
  ]}
/>
```

## Using in MDX Files

### Option 1: Import directly in MDX

```mdx
---
title: My Documentation Page
---

import { Callout, CodeBlock } from '@site/src/components/MDXComponents';

# My Page

<Callout type="info">
  This is an info callout.
</Callout>
```

### Option 2: Add to MDX provider (global availability)

Edit `docusaurus.config.js` to add components to the MDX provider:

```js
themeConfig: {
  // ... existing config
  mdx: {
    components: {
      Callout: './src/components/Callout',
      CodeBlock: './src/components/CodeBlock',
      ApiSignature: './src/components/ApiSignature',
      AgentCapabilityCard: './src/components/AgentCapabilityCard',
    },
  },
}
```

## Design Tokens

All components use CSS custom properties from the design system:

### Colors
- `--color-info`, `--color-info-bg` - Information callouts
- `--color-warning`, `--color-warning-bg` - Warning callouts
- `--color-success`, `--color-success-bg` - Success/tip callouts
- `--color-error`, `--color-error-bg` - Danger callouts
- `--color-gray-100` through `--color-gray-900` - Neutral palette

### Typography
- `--font-sans` - System font stack
- `--font-mono` - Monospace for code
- `--text-xs` through `--text-4xl` - Type scale

### Spacing
- `--space-1` (0.25rem) through `--space-16` (4rem)

### Borders & Radii
- `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (12px), `--radius-full` (9999px)
- `--border-width` (1px), `--border-width-thick` (2px)

## Accessibility

All components follow WCAG 2.1 AA guidelines:
- Minimum 4.5:1 contrast ratio for text
- Semantic HTML elements
- Proper ARIA labels where needed
- Focus-visible states
- Keyboard navigation support

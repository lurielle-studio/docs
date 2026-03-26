/**
 * MDX Component Library
 * Central export for all reusable MDX components
 * Provides design system integration for documentation
 */

// Core MDX Components
export { default as Callout } from './Callout';
export { default as CodeBlock } from './CodeBlock';
export { default as ApiSignature } from './ApiSignature';
export { default as AgentCapabilityCard } from './AgentCapabilityCard';

// Convenience export for MDX frontmatter
export const mdxComponents = {
  Callout,
  CodeBlock,
  ApiSignature,
  AgentCapabilityCard,
};

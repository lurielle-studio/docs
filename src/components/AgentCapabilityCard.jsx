/**
 * AgentCapabilityCard Component
 * Displays agent capabilities in a card format
 * Based on Agent Capability Matrix analysis
 */

import React from 'react';
import clsx from 'clsx';

const STATUS_COLORS = {
  active: 'var(--color-success)',
  inactive: 'var(--color-gray-400)',
  deprecated: 'var(--color-error)',
};

const TOOL_SAFETY_COLORS = {
  Low: 'var(--color-success)',
  Medium: 'var(--color-warning)',
  High: 'var(--color-error)',
};

/**
 * @param {Object} props
 * @param {string} props.name - Agent name
 * @param {string} props.role - Agent role description
 * @param {'active'|'inactive'|'deprecated'} [props.status='active'] - Current status
 * @param {Array<{name: string, safety: 'Low'|'Medium'|'High'}>} [props.tools] - Available tools
 * @param {string} [props.model] - LLM model used
 * @param {string} [props.description] - Additional description
 */
export default function AgentCapabilityCard({
  name,
  role,
  status = 'active',
  tools = [],
  model,
  description,
}) {
  const statusColor = STATUS_COLORS[status] || STATUS_COLORS.inactive;

  return (
    <article
      className="agent-card"
      aria-label={`Agent: ${name}`}
    >
      <header className="agent-card-header">
        <h3 className="agent-card-title">{name}</h3>
        <span
          className="agent-card-status"
          style={{ backgroundColor: statusColor }}
          aria-label={`Status: ${status}`}
        />
      </header>

      <p className="agent-card-role">{role}</p>

      {description && (
        <p className="agent-card-description">{description}</p>
      )}

      <div className="agent-card-meta">
        {model && (
          <div className="agent-card-model">
            <span className="agent-card-label">Model</span>
            <code>{model}</code>
          </div>
        )}

        {tools.length > 0 && (
          <div className="agent-card-tools">
            <span className="agent-card-label">Tools ({tools.length})</span>
            <ul className="agent-card-tool-list" aria-label="Available tools">
              {tools.slice(0, 6).map((tool) => (
                <li key={tool.name} className="agent-card-tool-item">
                  <code>{tool.name}</code>
                  <span
                    className="agent-card-safety"
                    style={{ color: TOOL_SAFETY_COLORS[tool.safety] || 'inherit' }}
                    title={`Safety level: ${tool.safety}`}
                  >
                    {tool.safety === 'High' ? '⚠️' : tool.safety === 'Medium' ? '⚡' : '✓'}
                  </span>
                </li>
              ))}
              {tools.length > 6 && (
                <li className="agent-card-tool-more">
                  +{tools.length - 6} more tools
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

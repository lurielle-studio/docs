import React, { useState } from 'react';

/**
 * API Signature component for documenting endpoints
 */
export default function ApiSignature({ method, path, description, params = [] }) {
  const [expanded, setExpanded] = useState(false);
  
  const methodColors = {
    GET: { bg: '#dbeafe', text: '#1d4ed8' },
    POST: { bg: '#d1fae5', text: '#065f46' },
    PATCH: { bg: '#fef3c7', text: '#92400e' },
    PUT: { bg: '#fef3c7', text: '#92400e' },
    DELETE: { bg: '#fee2e2', text: '#991b1b' },
  };

  const colors = methodColors[method] || methodColors.GET;

  return (
    <div style={{
      border: '1px solid var(--border-color-default, #e5e7eb)',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--color-neutral-50, #f9fafb)',
        borderBottom: expanded ? '1px solid var(--border-color-default, #e5e7eb)' : 'none',
        cursor: 'pointer',
      }}
      onClick={() => setExpanded(!expanded)}
      >
        <span style={{
          backgroundColor: colors.bg,
          color: colors.text,
          padding: '0.25rem 0.75rem',
          borderRadius: '0.25rem',
          fontFamily: 'var(--font-family-mono, monospace)',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}>
          {method}
        </span>
        <code style={{
          fontFamily: 'var(--font-family-mono, monospace)',
          fontSize: '0.95rem',
        }}>
          {path}
        </code>
        <span style={{
          marginLeft: 'auto',
          fontSize: '1.25rem',
        }}>
          {expanded ? '▼' : '▶'}
        </span>
      </div>

      {/* Description */}
      <div style={{ padding: '1rem' }}>
        <p style={{ margin: '0 0 1rem 0' }}>{description}</p>

        {/* Parameters Table */}
        {expanded && params.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
              Parameters
            </h4>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color-default, #e5e7eb)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Required</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {params.map((param, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color-default, #e5e7eb)' }}>
                    <td style={{ padding: '0.5rem' }}>
                      <code>{param.name}</code>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <code style={{ color: 'var(--color-primary-600, #2563eb)' }}>
                        {param.type}
                      </code>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      {param.required ? (
                        <span style={{ color: 'var(--color-error, #ef4444)' }}>Yes</span>
                      ) : (
                        <span style={{ color: 'var(--color-neutral-500, #6b7280)' }}>No</span>
                      )}
                    </td>
                    <td style={{ padding: '0.5rem' }}>{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

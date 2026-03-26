import React from 'react';

/**
 * Callout component for highlighting important information
 */
export default function Callout({ type = 'info', title, children }) {
  const styles = {
    info: {
      backgroundColor: 'var(--color-info-light, #dbeafe)',
      borderColor: 'var(--color-info, #3b82f6)',
    },
    warning: {
      backgroundColor: 'var(--color-warning-light, #fef3c7)',
      borderColor: 'var(--color-warning, #f59e0b)',
    },
    success: {
      backgroundColor: 'var(--color-success-light, #d1fae5)',
      borderColor: 'var(--color-success, #10b981)',
    },
    error: {
      backgroundColor: 'var(--color-error-light, #fee2e2)',
      borderColor: 'var(--color-error, #ef4444)',
    },
  };

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  };

  const style = styles[type] || styles.info;

  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '1rem',
        borderLeft: `4px solid ${style.borderColor}`,
        backgroundColor: style.backgroundColor,
        borderRadius: '0.5rem',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {icons[type]} {title || type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div>{children}</div>
    </div>
  );
}

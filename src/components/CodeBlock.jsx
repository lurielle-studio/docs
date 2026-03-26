/**
 * Enhanced CodeBlock Component
 * Extends Docusaurus CodeBlock with title support and copy functionality
 * Uses design tokens for consistent styling
 */

import React, { useState } from 'react';
import clsx from 'clsx';

/**
 * @param {Object} props
 * @param {string} [props.title] - Optional filename/title header
 * @param {string} props.language - Programming language for syntax highlighting
 * @param {string} props.children - Code content
 */
export default function CodeBlock({ title, language = 'text', children }) {
  const [copied, setCopied] = useState(false);
  const codeRef = React.useRef(null);

  const handleCopy = async () => {
    const code = typeof children === 'string' ? children : children?.toString() || '';
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="codeblock" role="figure" aria-label={title || `${language} code snippet`}>
      {title && (
        <div className="codeblock-header">
          <span className="codeblock-filename">{title}</span>
          <span className="codeblock-language">{language}</span>
        </div>
      )}
      <div className="codeblock-content">
        <pre className={clsx('codeblock-pre', `language-${language}`)}>
          <code ref={codeRef} className={clsx(`language-${language}`)}>
            {children}
          </code>
        </pre>
        <button 
          className="codeblock-copy"
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy code'}
          type="button"
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
              <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

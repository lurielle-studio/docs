/**
 * API Signature Component
 * Displays API endpoint with method badge, path, and optional parameters table
 * Semantic HTML for accessibility
 */

import React from 'react';
import clsx from 'clsx';

const METHOD_STYLES = {
  GET: 'api-method--get',
  POST: 'api-method--post',
  PUT: 'api-method--put',
  PATCH: 'api-method--put',
  DELETE: 'api-method--delete',
};

/**
 * @param {Object} props
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} props.method - HTTP method
 * @param {string} props.path - API endpoint path
 * @param {string} [props.description] - Brief description
 * @param {Array<{name: string, type: string, required?: boolean, description?: string}>} [props.params] - Parameters
 */
export default function ApiSignature({ method = 'GET', path, description, params = [] }) {
  const methodClass = METHOD_STYLES[method] || 'api-method--get';

  return (
    <section className="api-signature" aria-label={`${method} ${path}`}>
      <div className="api-signature-header">
        <span className={clsx('api-method', methodClass)}>{method}</span>
        <code className="api-path">{path}</code>
      </div>
      {description && <p className="api-description">{description}</p>}
      
      {params.length > 0 && (
        <div className="api-params">
          <h4 className="api-params-title">Parameters</h4>
          <table className="api-params-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {params.map((param) => (
                <tr key={param.name}>
                  <td><code>{param.name}</code></td>
                  <td><code>{param.type}</code></td>
                  <td>{param.required ? 'Yes' : 'No'}</td>
                  <td>{param.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/**
 * Custom MDX Components
 * Provides components for MDX files automatically
 */

import React from 'react';
import Callout from '@site/src/components/Callout';
import CodeBlock from '@site/src/components/CodeBlock';
import ApiSignature from '@site/src/components/ApiSignature';

// Map standard HTML elements to custom styles if needed
const components = {
  // Wrapper for standard code blocks to add styling
  pre: (props) => {
    // Docusaurus handles syntax highlighting, so just pass through
    return <div className="mdx-pre">{props.children}</div>;
  },
  
  // Table styling
  table: (props) => <div className="table-responsive"><table {...props} /></div>,
  
  // Custom components exposed to MDX
  Callout,
  CodeBlock,
  ApiSignature,
};

export default components;

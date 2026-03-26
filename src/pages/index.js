import React from 'react';
import {Redirect} from '@docusaurus/router';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Cortana Documentation">
      <main style={{padding: '2rem', textAlign: 'center'}}>
        <h1>Welcome to Cortana Documentation</h1>
        <p>Redirecting to Getting Started...</p>
      </main>
    </Layout>
  );
}

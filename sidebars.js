/**
 * Sidebars configuration for Cortana Docs
 * Placeholder structure for design system testing
 */

const sidebars = {
  docs: [
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'core-concepts',
      label: 'Core Concepts',
    },
    {
      type: 'category',
      label: 'Agent System',
      items: [
        'agent-system/overview',
        'agent-system/channels',
        'agent-system/tasks',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/endpoints',
      ],
    },
  ],
};

module.exports = sidebars;

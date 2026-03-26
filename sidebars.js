/**
 * Sidebars configuration for Cortana Docs
 * Structure follows milestone order for logical progression
 */

const sidebars = {
  docs: [
    'getting-started',
    'core-concepts',
    {
      type: 'category',
      label: 'Agent System',
      collapsed: false,
      items: [
        'agent-system/overview',
        'agent-system/channels',
        'agent-system/tasks',
      ],
    },
    'mcp-integrations',
    'administration',
    'deployment',
  ],
};

module.exports = sidebars;

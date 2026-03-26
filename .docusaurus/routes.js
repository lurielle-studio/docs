import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f5c'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '2fa'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '828'),
            routes: [
              {
                path: '/administration',
                component: ComponentCreator('/administration', '0cc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/agent-system/channels',
                component: ComponentCreator('/agent-system/channels', '208'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/agent-system/overview',
                component: ComponentCreator('/agent-system/overview', '753'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/agent-system/tasks',
                component: ComponentCreator('/agent-system/tasks', '299'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/api/endpoints',
                component: ComponentCreator('/api/endpoints', 'd55'),
                exact: true
              },
              {
                path: '/api/overview',
                component: ComponentCreator('/api/overview', '8fb'),
                exact: true
              },
              {
                path: '/core-concepts',
                component: ComponentCreator('/core-concepts', '588'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/deployment',
                component: ComponentCreator('/deployment', 'ae7'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/getting-started',
                component: ComponentCreator('/getting-started', 'ac2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/mcp-integrations',
                component: ComponentCreator('/mcp-integrations', '8ab'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/mdx-test',
                component: ComponentCreator('/mdx-test', 'c68'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

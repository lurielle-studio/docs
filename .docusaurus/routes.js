import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '8a4'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '8e9'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '0dd'),
            routes: [
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
                component: ComponentCreator('/api/endpoints', '93e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/api/overview',
                component: ComponentCreator('/api/overview', 'd47'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/core-concepts',
                component: ComponentCreator('/core-concepts', '588'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/getting-started',
                component: ComponentCreator('/getting-started', 'ac2'),
                exact: true,
                sidebar: "docs"
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

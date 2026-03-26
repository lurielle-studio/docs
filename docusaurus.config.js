const prismReactRenderer = require('prism-react-renderer');
const prismThemes = prismReactRenderer.themes;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cortana',
  tagline: 'Intelligent Agent Platform',
  favicon: 'img/favicon.ico',
  url: 'https://docs.cortana.dev',
  baseUrl: '/',
  organizationName: 'lurielle-studio',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/lurielle-studio/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/cortana-social-card.png',
      navbar: {
        title: 'Cortana',
        logo: {
          alt: 'Cortana Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/lurielle-studio/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/getting-started',
              },
              {
                label: 'Core Concepts',
                to: '/core-concepts',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/lurielle-studio/docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Lurielle Studio. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'elixir', 'javascript', 'json', 'markdown'],
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      markdown: {
        hooks: {
          onBrokenMarkdownLinks: 'warn',
        },
      },
    }),
};

module.exports = config;

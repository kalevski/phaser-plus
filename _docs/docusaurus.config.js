// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Phaser+',
    tagline: 'Extensions to make PhaserJS more awesome',
    url: 'https://phaser-plus.kalevski.dev',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'kalevski',
    projectName: 'phaser-plus',
    deploymentBranch: 'public',
    trailingSlash: false,

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
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/kalevski/phaser-plus/tree/main/_docs/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    changefreq: 'weekly'                    
                }
            }),
        ],
    ],
    themes: ['@docusaurus/theme-live-codeblock'],
    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
        navbar: {
            title: 'Phaser+',
            logo: {
                alt: 'Extensions to make PhaserJS more awesome',
                src: 'img/logo.png',
            },
          items: [
                {
                    to: '/examples',
                    position: 'right',
                    label: 'Examples',
                },
                {
                    type: 'doc',
                    docId: 'intro',
                    position: 'right',
                    label: 'Docs',
                },
                {
                    href: 'https://github.com/kalevski/phaser-plus',
                    label: 'GitHub',
                    position: 'right',
                },
          ],
        },
      footer: {
          style: 'dark',
          links: [],
          copyright: `Copyright © ${new Date().getFullYear()} phaser-plus.`,
      },
        prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme
        },
        colorMode: {
            defaultMode: 'dark',
            respectPrefersColorScheme: false,
            disableSwitch: true
        }
    })
}

module.exports = config

// Core Plugins
import { RouteTypes, ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { baseHrefRewrite } from '@scullyio/scully-plugin-base-href-rewrite';
import { docLink } from '@scullyio/scully-plugin-docs-link-update';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-properties.js';
import { CATEGORY_ROUTES_RESOLVER_NAME } from './scully/plugins/category-routes-resolver';
// Custom Plugins
import { THEME_APPLIER_NAME } from './scully/plugins/theme-applier';
import { timeToRead, TimeToReadOptions } from './scully/plugins/time-to-read';
// Community Plugins
const {
  getFlashPreventionPlugin,
} = require('@scullyio/scully-plugin-flash-prevention');

/* -------------------------------------------------------------------------- */
/*                          Configuration des plugins                         */
/* -------------------------------------------------------------------------- */

setPluginConfig('md', { enableSyntaxHighlighting: true });
setPluginConfig(baseHrefRewrite, { href: '/Desnote-Book/' });
setPluginConfig(timeToRead, { path: '/blog' } as TimeToReadOptions);

/* -------------------------------------------------------------------------- */
/*                   Configuration de Scully pour le projet                   */
/* -------------------------------------------------------------------------- */

const defaultPostRenderers = [
  baseHrefRewrite,
  getFlashPreventionPlugin({ appRootSelector: 'app-root' }),
  THEME_APPLIER_NAME,
];

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'desnote-book',
  outDir: './dist/static',
  defaultPostRenderers,
  routes: {
    '/blog/:slug': {
      type: RouteTypes.contentFolder,
      postRenderers: [docLink, ...defaultPostRenderers],
      slug: {
        folder: './src/assets/blog',
      },
      manualIdleCheck: true,
    },
    '/categories/:id': {
      type: CATEGORY_ROUTES_RESOLVER_NAME,
      postRenderers: [...defaultPostRenderers],
    },
  },
};

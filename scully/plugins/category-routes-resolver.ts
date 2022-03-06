import { registerPlugin } from '@scullyio/scully';

/**
 * Nom du plugin
 */
export const CATEGORY_ROUTES_RESOLVER_NAME = 'category-routes-resolver';

/**
 * Plugin Category Routes Resolver
 *
 * Ce plugin indique à Scully quelles sont les routes à créer pour les categories de notes.
 * 
 */
const categoryRoutesResolverPlugin: any = async (
  route: string,
  config = {}
) => {
  return [
    { route: '/categories/css' },
    { route: '/categories/html' },
    { route: '/categories/vscode' },
    { route: '/categories/spring' },
    { route: '/categories/javascript' },
    { route: '/categories/methodologies' },
  ];
};

const validator = async (conf) => [];
/**
 * Enregistrement du plugin.
 *
 * L'enregistrement sera effectif pour un projet lorsque ce fichier sera importé dans
 * le fichier de configuration Scully du projet (scully.<nom-du-projet>.config.ts).
 */
registerPlugin(
  'router',
  CATEGORY_ROUTES_RESOLVER_NAME,
  categoryRoutesResolverPlugin,
  validator
);

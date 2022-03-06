import { ScullyRoute } from '@scullyio/ng-lib';

export function keepNotesOnly(scullyRoutes: ScullyRoute[]) {
  return scullyRoutes.filter((scullyRoute) => isANote(scullyRoute));
}

/**
 * Vérifie si une route de Scully est celle d'une note.
 *
 * Supporte les routes préfixées (en prod.):
 * /Desnote-book/notes/...
 * et les routes non-préfixées (en dev.):
 * /notes/...
 *
 * @param scullyRoute
 * @returns
 */
export function isANote(scullyRoute: ScullyRoute): boolean {
  return scullyRoute.route.includes('/notes/');
}

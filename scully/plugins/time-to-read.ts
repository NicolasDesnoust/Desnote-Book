import { getMyConfig, HandledRoute, registerPlugin } from '@scullyio/scully';
import * as fs from 'fs';
import readingTime from 'reading-time';

export const timeToRead = 'timeToRead';

export interface TimeToReadOptions {
  path: string;
}

export const timeToReadFunc = async (routes: HandledRoute[]) => {
  const options: TimeToReadOptions = getMyConfig(timeToReadFunc);
  
  return routes.map((route) => {
    if (route.templateFile && route.route.startsWith(options.path)) {
      const content = fs.readFileSync(route.templateFile).toString('utf-8');
      const stats = readingTime(content);
      
      return {
        ...route,
        data: {
          ...route.data,
          readingTime: stats.minutes > 1 ? stats.minutes : 1,
        },
      };
    }
    return route;
  });
};

/**
 * Enregistrement du plugin.
 *
 * L'enregistrement sera effectif pour un projet lorsque ce fichier sera importé dans
 * le fichier de configuration Scully du projet (scully.<nom-du-projet>.config.ts).
 */
registerPlugin('routeProcess', timeToRead, timeToReadFunc);

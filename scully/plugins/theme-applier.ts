import { HandledRoute, registerPlugin } from '@scullyio/scully';

/**
 * Nom du plugin
 */
export const THEME_APPLIER_NAME = 'theme-applier';

/**
 * Plugin Theme Applier
 *
 * Ce plugin extrait les informations du thème à partir du localStorage
 * pour l'appliquer au pré-rendu de l'application.
 *
 * NB: L'application d'un thème consiste à placer la classe
 * "<nom-du-theme>-theme" sur le tag <html>.
 */
const themeApplierPlugin: any = async (html: string, route: HandledRoute) => {
  const regex = /(<html[^>]*>)/;

  return html.replace(
    regex,
    `$1<script>
      const theme = localStorage.getItem('theme');

      if (theme === 'light' || theme === 'dark') {
        const htmlClassList = document.querySelector('html').classList;
        const removeClassList = /\\w*-theme\\b/.exec(htmlClassList.value);
        if (removeClassList) {
          htmlClassList.remove(...removeClassList);
        }
        htmlClassList.add(theme + '-theme');
      }
    </script>`
  );
};

/**
 * Enregistrement du plugin.
 *
 * L'enregistrement sera effectif pour un projet lorsque ce fichier sera importé dans
 * le fichier de configuration Scully du projet (scully.<nom-du-projet>.config.ts).
 */
registerPlugin('render', THEME_APPLIER_NAME, themeApplierPlugin);

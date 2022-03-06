import algoliasearch from 'algoliasearch';
import fs from 'fs';
import { NoteMetadata } from 'src/app/core/model/note';

if (process.argv.length < 3) {
  throw new Error(
    `Please provide an Algoria admin api key.
     Usage: npm run index-posts -- <ADMIN_API_KEY>`
  );
}

const APPLICATION_ID = 'W1EFSZBSFF';
const ADMIN_API_KEY = process.argv[2];
const ROUTES_FILE_PATH = 'src/assets/scully-routes.json';

const client = algoliasearch(APPLICATION_ID, ADMIN_API_KEY);
const index = client.initIndex('posts');

type AlgoliaRecord = NoteMetadata & { objectID?: string };

/**
 * Read scullyRoutes.json and index notes routes in Algolia Search.
 */
fs.readFile(ROUTES_FILE_PATH, (fileErr, data) => {
  if (fileErr) {
    console.error(fileErr);
  } else {
    const routes: AlgoliaRecord[] = JSON.parse(data.toString());
    const noteRoutes = routes.filter((route) =>
      route.route.startsWith('/notes/')
    );

    noteRoutes.forEach((noteRoute) => {
      noteRoute.objectID = removeFileExtension(noteRoute.sourceFile);
    });

    index.addObjects(noteRoutes, (indexErr, content) => {
      if (indexErr) {
        console.error(indexErr);
      } else {
        console.log('Successfully indexed all posts : ');
        console.log(content);
      }
    });
  }
});

// <file-name>.md -> <file-name>
function removeFileExtension(sourceFile: string): string {
  return sourceFile.substring(0, sourceFile.length - 3);
}

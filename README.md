# Desnote Book
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=NicolasDesnoust_Desnote-Book&metric=alert_status)](https://sonarcloud.io/dashboard?id=NicolasDesnoust_Desnote-Book) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=NicolasDesnoust_Desnote-Book&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=NicolasDesnoust_Desnote-Book)

Application web permettant de centraliser et explorer tout type de notes personnelles, pour conserver une trace de mes connaissances, découvertes et recherches. 

L'application est développée selon l'architecture [JAMstack](https://www.netlify.com/blog/2019/10/30/whats-angular-in-the-jamstack-it-sounds-delicious/) avec Angular, Scully et Material Design. Elle profite ainsi d'un temps de chargement initial très rapide, tout en ayant les fonctionnalités dynamiques des [SPA](https://fr.wikipedia.org/wiki/Application_web_monopage) Angular classiques.

## Lancement de l'application en local

### Prérequis

Pour utiliser Scully en local sur une machine Windows, vous devez installer Chrome. Vous devez ensuite spécifier dans la configuration de Scully `scully.desnote-book.config.ts` où se trouve Chrome de la façon suivante&nbsp;:

```typescript
export const config: ScullyConfig = {
  ...
  puppeteerLaunchOptions: {
    executablePath: <chemin-d-installation-de-Chrome>,
  },
};
```



Vous devez également mettre à jour la configuration du plugin `baseHrefRewrite` dans le fichier `scully.desnote-book.config.ts` en remplaçant cette instruction :

```typescript
setPluginConfig(baseHrefRewrite, { href: '/Desnote-Book/' });
```

par la suivante :

```typescript
setPluginConfig(baseHrefRewrite, { href: '/' });
```

### Serveur de développement avec Scully

La mise en place d'un serveur de développement avec Scully se fait en deux étapes&nbsp;:

1. Lancez `ng build --watch` pour compiler le projet automatiquement à chaque changement de fichier source.

2. Dans un second terminal, lancez `npm run scully -- --watch` pour pré-rendre automatiquement les pages de l'application à chaque fois qu'un fichier source, un plugin ou un fichier markdown est modifié.

   L'application est disponible à l'adresse `http://localhost:1668/`.

### Serveur de développement sans Scully

Il n'est pas toujours nécessaire de passer par Scully pour exécuter l'application sur un serveur de développement. Si le développement ne concerne ni les plugins de Scully, ni les pages markdown, vous pouvez simplement utiliser le serveur de développement du CLI d'Angular, qui est plus rapide. Il est toutefois nécessaire d'avoir scanné et pré-rendu au préalable les pages de l'application avec la commande `npm run scully -- --scan`.

Lancez `ng serve` pour démarrer le serveur de développement. Naviguez vers `http://localhost:4200/`. L'application se relancera automatiquement si vous changez n'importe quel fichier source.

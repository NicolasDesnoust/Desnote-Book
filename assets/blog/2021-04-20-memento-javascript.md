---
title: 'Mémento des concepts du langage Javascript'
description: 'Cette page est une liste non exhaustive des concepts à connaître à propos du langage Javascript.'
published: true
category: 'javascript'
createdAt: '2021-04-20'
---

# Mémento des concepts du langage Javascript

## Quelle est la différence entre les fonctions fléchées et les fonctions régulières ?

- **La valeur de `this` (contexte)** : dans une fonction régulière, la valeur de `this` n'a rien à voir avec la classe sur laquelle elle a été définie ; elle dépend plutôt de l'objet sur lequel elle a été appelée ; dans une fonction fléchée, cette valeur est toujours égale à la valeur de `this` de la fonction externe.
- **Les constructeurs** : les fonctions régulières peuvent facilement construire des objets, tandis qu'une fonction fléchée ne peut pas être utilisée comme constructeur.
- **L'objet `Arguments`**: il s'agit d'un objet spécial de type tableau contenant la liste des arguments avec lesquels la fonction a été invoquée. Dans une fonction fléchée, l'objet `Arguments` est résolu lexicalement : il accède aux arguments de la fonction externe.
- **Retour implicite** : les fonctions régulières utilisent l'expression `return` - sinon, elles renvoient simplement une valeur indéfinie, tandis qu'avec les fonctions fléchées, si elles contiennent une expression et que les accolades de la fonction sont absentes, l'expression est implicitement retournée.
- [Lire d'avantage](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/)

## Comment le mot-clé "this" fonctionne-t-il ?

- Ce mot-clé fait référence à un objet, celui qui exécute la partie courante de code javascript.
- Chaque fonction javascript en cours d'exécution possède une référence vers son contexte d'exécution actuel, appelé `this` - *contexte d'exécution* signifie que c'est ici que la fonction est appelée.
- Pour comprendre le mot-clé `this`, il suffit de savoir comment, quand et d'où la fonction est appelée, peu importe comment et où la fonction est déclarée ou définie.
- [Lire d'avantage et voir des exemples](https://codeburst.io/all-about-this-and-new-keywords-in-javascript-38039f71780c)

## Que sont les "callbacks" et les "closures" ?

- **Callback** : une fonction qui est accessible par une autre fonction et invoquée après la première fonction - si cette première fonction a terminé...
- [En savoir plus](https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/) sur les callbacks
- **Les closures** : sont créées chaque fois qu'une variable définie en dehors de la portée actuelle est accessible à partir d'une portée interne - elles vous donnent accès à la portée d'une fonction externe à partir d'une fonction interne.
- Pour utiliser une **closure**, il suffit de définir une fonction à l'intérieur d'une autre fonction et de l'exposer.
- [En savoir plus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#:~:text=A) closure is the combination,scope from an inner function.) sur les closures

## Qu'est-ce qu'une fonction anonyme ?

- Une fonction qui a été déclarée sans qu'aucun identifiant de fonction nommée ne s'y réfère - elle n'est généralement pas accessible après sa création initiale. Ces fonctions sont créées au moment de l'exécution du programme.
- [Lire la suite](https://www.javascripttutorial.net/javascript-anonymous-functions/)

## Que sont les fonctions d'ordre supérieur ?

- Fonctions qui **reçoivent une fonction en argument** ou **renvoient une fonction en sortie**.
- Par exemple, `Array.prototype.map`, `Array.prototype.filter` et `Array.prototype.reduce` sont quelques-unes des fonctions d'ordre supérieur intégrées au langage.
- [Plus d'informations ici](https://blog.bitsrc.io/understanding-higher-order-functions-in-javascript-75461803bad)

## Qu'est-ce que le mode "strict" en JS ?

- Le mode strict permet un contrôle plus rigoureux des erreurs dans votre code et facilite le débogage.
- Vous activez le mode strict en ajoutant `"use strict";` au début du fichier.
- [Lire la suite](https://www.educative.io/edpresso/what-is-use-strict-in-javascript?utm_source=Google%20AdWords&aid=5082902844932096&utm_medium=cpc&utm_campaign=kb-dynamic-edpresso&gclid=CjwKCAjwoc_8BRAcEiwAzJevtZyt8ueI8zRKbsnF5_b0OYQXvsk4kA5GMACgxLhBfJQH-XNfPt_WmRoCC0wQAvD_BwE)

## Promesses vs Async/Await ?

- **Portée** : dans une promesse, seule la chaîne de promesses est asynchrone - elle ne bloque pas l'exécution ; avec async/await, l'ensemble de la fonction wrapper est asynchrone.
- **Logique** : dans une promesse, le travail synchrone peut être traité dans le même callback, et plusieurs promesses peuvent être traitées en utilisant `Promise.all` ; avec async/await le travail synchrone doit être placé en dehors du callback, et plusieurs promesses peuvent être traitées avec des variables plus simples.
- **Gestion des erreurs** : Promesses : `then`, `catch`, `finally` ; Async/await : `try`, `catch`, `finally`.
- [Voir des exemples ici](https://levelup.gitconnected.com/async-await-vs-promises-4fe98d11038f)

## Mutable vs Immutable en JS

- La différence entre immuable et mutable : si un élément est mutable, lorsque l'on change la valeur de la variable de référence, cela affectera également la valeur de la variable référencée originale.
- Les types de données primaires tels que les nombres, les chaînes de caractères et les booléens sont **immuables** - il est impossible de modifier les valeurs de ces types en changeant la référence - vous pouvez les combiner et en dériver de nouvelles valeurs, mais lorsque vous attribuez une valeur spécifique, cette valeur restera toujours la même ; vous pouvez faire en sorte qu'un nom de variable pointe vers une nouvelle valeur, mais la valeur précédente est toujours conservée en mémoire.
- **Mutable** est un type de variable qui peut être modifié par sa référence - en JS, seuls les **objets et les tableaux** sont mutables : vous pouvez modifier leurs propriétés ; par exemple : faire en sorte que la valeur d'un seul objet ait un contenu différent à différents moments.
- [En savoir plus et voir des exemples](https://gomakethings.com/mutable-vs.-immutable-in-javascript/)

## Qu'est-ce qu'un langage typé ?

- Les valeurs sont associées à des valeurs et non à des variables - il peut être *statique ou dynamique*.
- **Statique** : la variable ne peut contenir qu'un seul type, comme en Java : une variable déclarée de type string ne peut contenir qu'un ensemble de caractères et rien d'autre.
- **Dynamique** : la variable peut contenir plusieurs types - comme en JS : une variable peut prendre un nombre, des caractères, etc...

## Qu'est-ce que le hoisting ?

- Le comportement par défaut de JavaScript qui consiste à déplacer toutes les déclarations vers le haut de la portée actuelle (vers le haut du script actuel ou de la fonction actuelle).
- JavaScript ne hisse que les *déclarations*, pas les *initialisations*.

## Qu'est-ce que la délégation d'événements en JS ?

- Une technique simple par laquelle vous ajoutez un seul gestionnaire d'événements à un élément parent afin d'éviter d'avoir à ajouter des gestionnaires d'événements à plusieurs éléments enfants.
- En utilisant la délégation d'événements, il est possible d'ajouter un gestionnaire d'événements à un élément, d'attendre qu'un événement surgisse d'un élément enfant et de déterminer facilement de quel élément provient l'événement.
- [Exemples](https://www.sitepoint.com/javascript-event-delegation-is-easier-than-you-think/#:~:text=JavaScript%20event%20delegation%20is%20a,handlers%20to%20multiple%20child%20elements.)

## Quelle est la différence entre call, apply et bind ?

- En les utilisant, vous pouvez déterminer explicitement à quoi **this** doit faire référence.
- `bind` peut être particulièrement utile lorsque vous souhaitez utiliser des événements pour accéder à des propriétés d'une classe dans une autre classe.
- La principale différence est que `apply` exécute la fonction immédiatement, tandis que `bind` renvoie une fonction.
- `call` et `apply` sont très similaires - ils invoquent une fonction avec un contexte *this* spécifié et des arguments facultatifs.
- La différence est que `call` exige que les arguments soient passés un par un, et `apply` prend les arguments sous forme de tableau.
- [Lire la suite et voir des exemples](https://www.taniarascia.com/this-bind-call-apply-javascript/)

## Quelle est la différence entre les objets host et native ?

- Les objets peuvent être divisés en ces deux catégories principales, en fonction de l'environnement et du langage.
- Objets hôtes : spécifiques à l'environnement - ex. Le navigateur fournit certains objets tels que `window`, Node fournit `NodeList`, etc.
- Objets natifs / intégrés : objets standard fournis par JS - parfois appelés objets globaux ; JS est principalement construit par ces objets natifs catégorisés (`String`, `Number`, etc).

## Qu'est-ce que le currying ?

- Le **currying** est un processus de programmation fonctionnelle dans lequel nous pouvons transformer une fonction à arguments multiples en une séquence de fonctions imbriquées - il retourne une nouvelle fonction qui attend l'argument suivant en ligne.
- Transformation de fonctions qui transforme une fonction appelable sous la forme `f(a, b, c)` en une fonction appelable sous la forme `f(a)(b)(c)`.
- Elle nous permet d'obtenir facilement des partiels, d'éviter de passer la même variable plusieurs fois.
- Il crée des fonctions imbriquées en fonction du nombre d'arguments de la fonction, ainsi chaque fonction reçoit un argument : s'il n'y a pas d'argument, il n'y a pas de **currying**.
- [Lire la suite](https://javascript.info/currying-partials)
- [Lire la suite 2](https://dev.to/suprabhasupi/currying-in-javascript-1k3l)

## Qu'est-ce que la boucle d'événements ?

- Dans la plupart des navigateurs, il existe **une boucle d'événements pour chaque onglet du navigateur**, afin d'isoler chaque processus et d'éviter qu'une page Web comportant des boucles infinies ou des traitements lourds ne bloque l'ensemble du navigateur.
- L'environnement gère plusieurs boucles d'événements simultanées, pour traiter les appels d'API.
- Les [Web Workers](https://flaviocopes.com/web-workers/) fonctionnent également dans leur propre boucle d'événements.
- Vous devez principalement vous préoccuper du fait que votre code s'exécutera sur une **boucle d'événements unique**, et écrire votre code en tenant compte de ce fait pour éviter de le bloquer.
- Tout code JavaScript qui prend trop de temps pour renvoyer le contrôle à la boucle d'événements **bloquera l'exécution** de tout code JavaScript dans la page, voire bloquera le thread de l'interface utilisateur, et l'utilisateur ne pourra pas cliquer, faire défiler la page, etc.
- [Lire la suite](https://flaviocopes.com/javascript-event-loop/#:~:text=The%20event%20loop%20continuously%20checks,executes%20each%20one%20in%20order.)

## Qu'est-ce que la propagation d'événements ?

- La propagation d'événements est un mécanisme qui définit la manière dont les événements se propagent ou voyagent dans l'arbre DOM pour arriver à leur cible et ce qui leur arrive ensuite.
- Dans les navigateurs modernes, la propagation des événements se déroule en deux phases : la phase de **capture**, et la phase de **bubbling**.
- **Capture** : les événements se propagent depuis la fenêtre et à travers l'arbre DOM jusqu'au nœud cible - cela ne fonctionne qu'avec les gestionnaires d'événements enregistrés avec la méthode **addEventListener()** lorsque le troisième argument vaut **true**.
- **Bubbling** : Dans cette phase, l'événement se propage ou remonte l'arbre du DOM, de l'élément cible jusqu'à la fenêtre, en visitant tous les ancêtres de l'élément cible un par un - supporté par tous les navigateurs, et fonctionne pour tous les gestionnaires, indépendamment de la façon dont ils sont enregistrés, par exemple en utilisant **onclick** ou **addEventListener()**.
- [Lire la suite](https://www.tutorialrepublic.com/javascript-tutorial/javascript-event-propagation.php#:~:text=Event%20propagation%20is%20a%20mechanism,what%20happens%20to%20it%20afterward)

## Quelle est la différence entre les cookies, le stockage local et le stockage de session ?

- Le **stockage du navigateur** : les données ne sont jamais transférées vers le serveur et ne peuvent être lues que du côté client ; la limite de stockage est d'environ **5 Mo**.
- **Stockage local ou de session** : la session n'est que temporaire - les données sont stockées jusqu'à la fermeture de l'onglet/navigateur ; le stockage local n'a pas de date d'expiration.
- Inconvénients pour le stockage : non sécurisé, limité aux chaînes de caractères, exposé au XSS.
- **Cookie** : stocke les données avec une date d'expiration, limite de stockage d'environ **4 Ko**, est envoyé au serveur pour chaque requête, lecture/écriture à la fois du côté client et du côté serveur (si `HttpOnly`, il est inaccessible aux scripts côté client).

## Qu'est-ce que la Content Security Policy (CSP) ?

- La content security policy (CSP) est un en-tête **HTTP** qui permet aux opérateurs de sites de contrôler avec précision l'origine des ressources de leur site.
- L'utilisation de cet en-tête est la meilleure méthode pour prévenir les vulnérabilités de type cross-site scripting (XSS).
- En raison de la difficulté d'adapter le CSP aux sites web existants, le CSP est **obligatoire** pour tous les nouveaux sites web et est fortement recommandé pour tous les sites existants à haut risque.
- [Lire la suite](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Qu'est-ce que le Cross-Site Scripting (XSS) ?

- Le **Cross-Site Scripting (XSS)** est une **attaque** qui se produit lorsqu'un attaquant utilise une application Web pour envoyer un code malveillant, généralement sous la forme d'un script côté navigateur, à un autre utilisateur final.
- La page fournie par le serveur lorsque quelqu'un la demande n'est pas modifiée ; en revanche, une attaque XSS exploite une **faiblesse** dans une page qui inclut une variable soumise dans une requête pour qu'elle apparaisse sous forme brute dans la réponse.
- [En savoir plus sur les attaques](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#Cross-site_scripting_XSS)

## Qu'est-ce que CORS (Cross-Origin Resource Sharing) ?

- Le **partage des ressources entre origines** ([CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS)) est un **mécanisme** qui utilise des en-têtes [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) supplémentaires pour indiquer aux navigateurs de donner à une application Web exécutée à une [origine](https://developer.mozilla.org/en-US/docs/Glossary/origin), l'accès à des ressources sélectionnées à partir d'une origine différente.
- Une application Web exécute une requête HTTP inter-origine lorsqu'elle demande une ressource qui a une **origine** (domaine, protocole ou port) différente de la sienne.
- [Lire la suite](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Source

Stefania Simon, S. S. (2021, 6 avril). *The JavaScript Cheatsheet you need in 2021 - JavaScript in Plain English*. Medium. https://javascript.plainenglish.io/a-javascript-cheatsheet-you-need-in-2020-d81b3dd89e09
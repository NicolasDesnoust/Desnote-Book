---
title: 'Structurer ses commits'
description: 'Comment rédiger des commits sémantiques. Il s''agit de messages de commit qui ont un sens, tant pour les développeurs que pour les outils, et qui suivent des conventions particulières.'
published: true
category: 'git'
createdAt: '2021-10-22'
---

# Structurer ses commits

Cette manière de structurer les commits s'inspire fortement de celle du framework [Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit). Elle permet de rendre l'historique des commits bien plus facile à parcourir.

Chaque message de commit consiste en une **en-tête (header)**, un **corps (body)** et un **pied de page (footer)**. 

```texte
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

L'en-tête et le corps sont **obligatoires**, le pied de page est optionnel. Ces trois parties doivent être séparées par une ligne vide et sont décrites d'avantage dans les sections suivantes.

## L'en-tête du commit

```texte
<type>(<scope>): <short summary>
```

Le **type** et le **résumé** sont obligatoires, la **portée** est optionnelle.

### Le type du commit

Voici une liste des types les plus communs, qui couvrent la grande majorité des types de changements possibles&nbsp;:

- 👷`build` : changements qui affectent le système de build ou des dépendances externes (npm, maven, make, gulp, broccoli, …).
- 💚`ci` : changements concernant les fichiers et scripts d’intégration ou de configuration (Gitlab CI/CD, Github Actions, Travis, Ansible, BrowserStack, CircleCI, SauceLabs, …).
- ✨`feat` : ajout d’une nouvelle fonctionnalité. Il s'agit des fonctionnalités destinées aux utilisateurs, et non pas des fonctionnalités dans des scripts de build.
- 🐛`fix` : correction d’un bug dans les fonctionnalités destinées aux utilisateurs, pas d'un bug dans les scripts de build.
- ⚡️`perf` : amélioration des performances.
- ♻️`refactor` : modification qui n’apporte ni nouvelle fonctionnalité ni d’amélioration de performances (suppression de code redondant, simplification, renommage de variable, ...).
- 🎨`style` : changement qui n’apporte aucune altération fonctionnelle ou sémantique (indentation, mise en forme, ajout d’espace, …).
- 📝`docs` : rédaction ou mise à jour de documentation.
- ✅`test` : ajout ou modification de tests.

### La portée / partie affectée

La portée permet de savoir immédiatement quelle partie du projet est affectée. Elle peut concerner une partie spécifique de l'application (*frontoffice*, *backoffice*, *backend*), des modules (*catalog*, *inventory*, *orders*, *payment*, *shipping*, *security*), des entités métier (*user*, *order*, *product*) ou des composants (*product*, *cart*, *checkout*).

La portée est facultative. En effet, elle n’est pas toujours pertinente.

### Le résumé

Le résumé est une description **succinte** des changements. Il respecte les consignes suivantes&nbsp;:

- Utiliser le présent, voir le présent impératif si les commits sont rédigés en anglais ("change" au lieu de "changed" ou "changes").
- Ne pas mettre en majscule la première lettre.
- Ne pas ajouter de point (.) à la fin.

## Le corps du commit 

Comme le résumé, il doit être au présent.

Il explique les motivations derrière le changement. Ce message devrait expliquer *pourquoi* le changement est effectué. Il est possible d'inclure une comparaison entre l'ancien comportement et le nouveau pour illustrer l'impact du changement.

## Le pied de page du commit

Le **pied de page (footer)** peut contenir des informations à propos des changements non rétro-compatibles (breaking changes) et les dépréciations. C'est également le bon endroit pour référencer les issues GitHub, les tickets Jira, et autres pull requests que ce commit ferme ou est relié à. Par exemple&nbsp;:

```texte
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

ou

```texte
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

La section *Breaking Change* devrait commencer par la phrase "BREAKING CHANGE: " suivie par un résumé des  changements, une ligne vide, et une description détaillée des changements qui inclut également les instructions de migration.

De manière similaire, la section *Deprecated* devrait commencer par la phrase "DEPRECATED: "  suivie par un résumé de ce qui est déprécié, une ligne vide, et une description détaillée de ce qui est déprécié qui mentionne également la nouvelle approche préconisée.

## Annuler des commits (revert)

Si le commit annule un ancien commit, son en-tête devrait commencer par le type `revert`, suivi par l'en-tête du commit annulé.

Le corps du commit devrait contenir&nbsp;:

- Le SHA du commit annulé dans le format suivant&nbsp;: `Annule le commit <SHA>`,
- Une description claire de la raison pour laquelle le commit doit être annulé.

## Sources

- Josh Buchea, J. B. (2019, 7 novembre). *Semantic Commit Messages*. Github. Consulté le 18 octobre 2021, à l’adresse https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
- *Contributing to Angular - Commit Message Format*. (s. d.). Github. Consulté le 18 octobre 2021, à l’adresse https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit
- Quentin Busuttil, Q. B. (s. d.). *Git : convention de nommage pour des commits parfaits – Buzut*. Buzut. Consulté le 18 octobre 2021, à l’adresse https://buzut.net/cours/versioning-avec-git/bien-nommer-ses-commits
- ConventionalCommits.org. (s. d.). *Conventional Commits*. ConventionalCommits. Consulté le 18 octobre 2021, à l’adresse https://www.conventionalcommits.org
- Nitay Neeman, N. N. (2019, 21 décembre). *Understanding Semantic Commit Messages Using Git and Angular*. 📚 Nitay Neeman’s Blog | JavaScript • Angular • RxJS. Consulté le 19 octobre 2021, à l’adresse https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular/


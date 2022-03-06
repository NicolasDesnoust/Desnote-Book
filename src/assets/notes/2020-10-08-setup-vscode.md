---
title: 'Setup de Visual Studio Code'
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
published: true
category: 'vscode'
createdAt: '2020-10-08'
---

# Setup de Visual Studio Code

## Extensions utiles à tout type de projet

| Nom                       | Auteur     | Description                                                  |
| ------------------------- | ---------- | ------------------------------------------------------------ |
| Better comments           | Aaron Bond | Permet de catégoriser les commentaires (alertes, questions, TODOs, commentaires importants, à ignorer). |
| Prettier - Code formatter | Prettier   | Formateur de code (nécessaire pour les langages CSS/SCSS non-supportés par défaut). |

## Installation d'une police avec ligatures

1. **Installer les polices** 

   Téléchargez la police Firacode ici : [https://github.com/tonsky/FiraCode](https://github.com/tonsky/FiraCode) et installez le contenu du dossier `ttf` sur votre système d'exploitation. 

2. **Configurer Visual Studio Code**

   Ouvrez les préférences utilisateur à l'aide de la commande **Ctrl+Shift+P** et recherchez `Preferences: Open Settings (UI)`. 

   Pour activer la police précédemment téléchargée, dans l'éditeur des paramètres, cliquez sur `Font` sous l'onglet `Text Editor`. Dans le champ `Font Family` ajoutez `'Fira Code'` avec les guillemets simple) en premier dans la liste. Cochez ensuite la case `Enable/Disable font ligatures` sous `Font Ligatures` pour activer les ligatures.
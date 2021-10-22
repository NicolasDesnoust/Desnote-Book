---
title: 'Mémento des propriétés CSS'
description: 'Cette page est une liste non exhaustive des propriétés CSS3 essentielles et souvent utilisées.'
published: true
category: 'css'
createdAt: '2021-03-04'
---

# Mémento des propriétés CSS

Cette page est une liste *non exhaustive* des propriétés CSS qui existent en CSS3. 

## Propriétés de mise en forme du texte

Je résume ici la plupart des propriétés de **mise en forme du texte**.

Qu'est-ce que la mise en forme de texte ? C'est tout ce qui touche à la présentation du texte proprement dit : le gras, l'italique, le souligné, la police, l'alignement, etc.

| Propriété         | Valeurs (exemples)                                          | Description                                                  |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| `font-family`     | *police1, police2, police3*, serif, sans-serif, monospace   | Nom de police                                                |
| `@font-face`      | *Nom et source de la police*                                | Police personnalisée                                         |
| `font-size`       | 1.3em, 16px, 120%...                                        | Taille du texte                                              |
| `font-weight`     | bold, normal                                                | Gras                                                         |
| `font-style`      | italic, oblique, normal                                     | Italique                                                     |
| `text-decoration` | underline, overline, line-through, blink, none              | Soulignement, ligne au-dessus, barré ou clignotant           |
| `font-variant`    | small-caps, normal                                          | Petites capitales                                            |
| `text-transform`  | capitalize, lowercase, uppercase                            | Capitales                                                    |
| `font`            | -                                                           | Super propriété de police. Combine : `font-weight`, `font-style`, `font-size`, `font-variant`, `font-family`. |
| `text-align`      | left, center, right, justify                                | Alignement horizontal                                        |
| `vertical-align`  | baseline, middle, sub, super, top, bottom                   | Alignement vertical (cellules de tableau ou éléments `inline-block` uniquement) |
| `line-height`     | 18px, 120%, normal...                                       | Hauteur de ligne                                             |
| `text-indent`     | 25px                                                        | Alinéa                                                       |
| `white-space`     | pre, nowrap, normal                                         | Césure                                                       |
| `word-wrap`       | break-word, normal                                          | Césure forcée                                                |
| `text-shadow`     | 5px 5px 2px blue *(horizontale, verticale, fondu, couleur)* | Ombre de texte                                               |

## Propriétés de couleur et de fond

| Propriété               | Valeurs (exemples)                                           | Description                                                  |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `color`                 | *nom*, rgb(rouge,vert,bleu), rgba(rouge,vert,bleu,transparence), #CF1A20... | Couleur du texte                                             |
| `background-color`      | *Identique à color*                                          | Couleur de fond                                              |
| `background-image`      | url('image.png')                                             | Image de fond                                                |
| `background-attachment` | fixed, scroll                                                | Fond fixe                                                    |
| `background-repeat`     | repeat-x, repeat-y, no-repeat, repeat                        | Répétition du fond                                           |
| `background-position`   | *(x y)*, top, center, bottom, left, right                    | Position du fond                                             |
| `background`            | -                                                            | Super propriété du fond. Combine :  `background-image`, `background-repeat`, `background-attachment`, `background-position`. |
| `opacity`               | 0.5                                                          | Transparence                                                 |

## Propriétés des boîtes

| Propriété        | Valeurs (exemples)                                           | Description                                                  |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `width`          | 150px, 80%...                                                | Largeur                                                      |
| `height`         | 150px, 80%...                                                | Hauteur                                                      |
| `min-width`      | 150px, 80%...                                                | Largeur minimale                                             |
| `max-width`      | 150px, 80%...                                                | Largeur maximale                                             |
| `min-height`     | 150px, 80%...                                                | Hauteur minimale                                             |
| `max-height`     | 150px, 80%...                                                | Hauteur maximale                                             |
| `margin-top`     | 23px                                                         | Marge en haut                                                |
| `margin-left`    | 23px                                                         | Marge à gauche                                               |
| `margin-right`   | 23px                                                         | Marge à droite                                               |
| `margin-bottom`  | 23px                                                         | Marge en bas                                                 |
| `margin`         | 23px 5px 23px 5px *(haut, droite, bas, gauche)*              | Super-propriété de marge.  Combine : `margin-top`, `margin-right`, `margin-bottom`, `margin-left`. |
| `padding-left`   | 23px                                                         | Marge intérieure à gauche                                    |
| `padding-right`  | 23px                                                         | Marge intérieure à droite                                    |
| `padding-bottom` | 23px                                                         | Marge intérieure en bas                                      |
| `padding-top`    | 23px                                                         | Marge intérieure en haut                                     |
| `padding`        | 23px 5px 23px 5px *(haut, droite, bas, gauche)*              | Super-propriété de marge intérieure.  Combine : `padding-top`, `padding-right`, `padding-bottom`, `padding-left`. |
| `border-width`   | 3px                                                          | Épaisseur de bordure                                         |
| `border-color`   | *nom*, rgb(rouge,vert,bleu), rgba(rouge,vert,bleu,transparence), #CF1A20... | Couleur de bordure                                           |
| `border-style`   | solid, dotted, dashed, double, groove, ridge, inset, outset  | Type de bordure                                              |
| `border`         | 3px solid black                                              | Super-propriété de bordure. Combine `border-width`, `border-color`, `border-style`.  Existe aussi en version `border-top`, `border-right`, `border-bottom`, `border-left`. |
| `border-radius`  | 5px                                                          | Bordure arrondie                                             |
| `box-shadow`     | 6px 6px 0px black *(horizontale, verticale, fondu, couleur)* | Ombre de boîte                                               |

## Propriétés de positionnement et d'affichage

| Propriété    | Valeurs (exemples)                                           | Description                                                  |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `display`    | block, inline, inline-block, table, table-cell, none...      | Type d'élément (`block`, `inline`, `inline-block`, `none`…)  |
| `visibility` | visible, hidden                                              | Visibilité                                                   |
| `clip`       | rect (0px, 60px, 30px, 0px) *rect (haut, droite, bas, gauche)* | Affichage d'une partie de l'élément                          |
| `overflow`   | auto, scroll, visible, hidden                                | Comportement en cas de dépassement                           |
| `float`      | left, right, none                                            | Flottant                                                     |
| `clear`      | left, right, both, none                                      | Arrêt d'un flottant                                          |
| `position`   | relative, absolute, static                                   | Positionnement                                               |
| `top`        | 20px                                                         | Position par rapport au haut                                 |
| `bottom`     | 20px                                                         | Position par rapport au bas                                  |
| `left`       | 20px                                                         | Position par rapport à la gauche                             |
| `right`      | 20px                                                         | Position par rapport à la droite                             |
| `z-index`    | 10                                                           | Ordre d'affichage en cas de superposition.  La plus grande valeur est affichée par-dessus les autres. |

## Propriétés des listes

| Propriété             | Valeurs (exemples)                                           | Description                                                  |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `list-style-type`     | disc, circle, square, decimal, lower-roman, upper-roman, lower-alpha, upper-alpha, none | Type de liste                                                |
| `list-style-position` | inside, outside                                              | Position en retrait                                          |
| `list-style-image`    | url('puce.png')                                              | Puce personnalisée                                           |
| `list-style`          | -                                                            | Super-propriété de liste. Combine `list-style-type`, `list-style-position`, `list-style-image`. |

## Propriétés des tableaux

| Propriété         | Valeurs (exemples) | Description                  |
| ----------------- | ------------------ | ---------------------------- |
| `border-collapse` | collapse, separate | Fusion des bordures          |
| `empty-cells`     | hide, show         | Affichage des cellules vides |
| `caption-side`    | bottom, top        | Position du titre du tableau |

#### Autres propriétés

| Propriété | Valeurs (exemple)                                            | Description       |
| --------- | ------------------------------------------------------------ | ----------------- |
| `cursor`  | crosshair, default, help, move, pointer, progress, text, wait, e-resize, ne-resize, auto... | Curseur de souris |

## Source

Mathieu Nebra, M. N. (2021, janvier 4). *Mémento des propriétés CSS*. OpenClassrooms. https://openclassrooms.com/fr/courses/1603881-apprenez-a-creer-votre-site-web-avec-html5-et-css3/1608902-memento-des-proprietes-css
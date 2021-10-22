---
title: 'Mémento des balises HTML'
description: 'Cette page est une liste non exhaustive des balises HTML essentielles et souvent utilisées.'
published: true
category: 'html'
createdAt: '2021-03-04'
---

# Mémento des balises HTML

Cette page est une liste non exhaustive des balises HTML essentielles et souvent utilisées.

## Balises de premier niveau

Les balises de premier niveau sont les principales balises qui structurent  une page HTML. Elles sont indispensables pour réaliser le « code minimal » d'une page web.

| Balise   | Description        |
| -------- | ------------------ |
| `<html>` | Balise principale  |
| `<head>` | En-tête de la page |
| `<body>` | Corps de la page   |

Code minimal d'une page HTML :

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Titre</title>
    </head>

    <body>

    </body>
</html>
```

## Balises d'en-tête

Ces balises sont toutes situées dans l'en-tête de la page web, c'est-à-dire entre `<head>` et `</head>` :

| Balise     | Description                                           |
| ---------- | ----------------------------------------------------- |
| `<link />` | Liaison avec une feuille de style                     |
| `<meta />` | Métadonnées de la page web (charset, mots-clés, etc.) |
| `<script>` | Code JavaScript                                       |
| `<style>`  | Code CSS                                              |
| `<title>`  | Titre de la page                                      |

## Balises de structuration du texte

| Balise         | Description                                           |
| -------------- | ----------------------------------------------------- |
| `<abbr>`       | Abréviation                                           |
| `<blockquote>` | Citation (longue)                                     |
| `<cite>`       | Citation du titre d'une œuvre ou d'un évènement       |
| `<q>`          | Citation (courte)                                     |
| `<sup>`        | Exposant                                              |
| `<sub>`        | Indice                                                |
| `<strong>`     | Mise en valeur forte                                  |
| `<em>`         | Mise en valeur normale                                |
| `<mark>`       | Mise en valeur visuelle                               |
| `<h1>`         | Titre de niveau 1                                     |
| `<h2>`         | Titre de niveau 2                                     |
| `<h3>`         | Titre de niveau 3                                     |
| `<h4>`         | Titre de niveau 4                                     |
| `<h5>`         | Titre de niveau 5                                     |
| `<h6>`         | Titre de niveau 6                                     |
| `<img />`      | Image                                                 |
| `<figure>`     | Figure (image, code, etc.)                            |
| `<figcaption>` | Description de la figure                              |
| `<audio>`      | Son                                                   |
| `<video>`      | Vidéo                                                 |
| `<source>`     | Format source pour les balises `<audio>` et `<video>` |
| `<a>`          | Lien hypertexte                                       |
| `<br />`       | Retour à la ligne                                     |
| `<p>`          | Paragraphe                                            |
| `<hr />`       | Ligne de séparation horizontale                       |
| `<address>`    | Adresse de contact                                    |
| `<del>`        | Texte supprimé                                        |
| `<ins>`        | Texte inséré                                          |
| `<dfn>`        | Définition                                            |
| `<kbd>`        | Saisie clavier                                        |
| `<pre>`        | Affichage formaté (pour les codes sources)            |
| `<progress>`   | Barre de progression                                  |
| `<time>`       | Date ou heure                                         |

## Balises de listes

Cette section énumère toutes les balises HTML permettant de créer des listes  (listes à puces, listes numérotées, listes de définitions…).

| Balise | Description                  |
| ------ | ---------------------------- |
| `<ul>` | Liste à puces, non numérotée |
| `<ol>` | Liste numérotée              |
| `<li>` | Élément de la liste à puces  |
| `<dl>` | Liste de définitions         |
| `<dt>` | Terme à définir              |
| `<dd>` | Définition du terme          |

## Balises de tableau

| Balise      | Description                     |
| ----------- | ------------------------------- |
| `<table>`   | Tableau                         |
| `<caption>` | Titre du tableau                |
| `<tr>`      | Ligne de tableau                |
| `<th>`      | Cellule d'en-tête               |
| `<td>`      | Cellule                         |
| `<thead>`   | Section de l'en-tête du tableau |
| `<tbody>`   | Section du corps du tableau     |
| `<tfoot>`   | Section du pied du tableau      |

## Balises de formulaire

| Balise       | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| `<form>`     | Formulaire                                                   |
| `<fieldset>` | Groupe de champs                                             |
| `<legend>`   | Titre d'un groupe de champs                                  |
| `<label>`    | Libellé d'un champ                                           |
| `<input />`  | Champ de formulaire (texte, mot de passe, case à cocher, bouton, etc.) |
| `<textarea>` | Zone de saisie multiligne                                    |
| `<select>`   | Liste déroulante                                             |
| `<option>`   | Élément d'une liste déroulante                               |
| `<optgroup>` | Groupe d'éléments d'une liste déroulante                     |

## Balises sectionnantes

Ces balises permettent de construire le squelette de notre site web.

| Balise      | Description                    |
| ----------- | ------------------------------ |
| `<header>`  | En-tête                        |
| `<nav>`     | Liens principaux de navigation |
| `<footer>`  | Pied de page                   |
| `<section>` | Section de page                |
| `<article>` | Article (contenu autonome)     |
| `<aside>`   | Informations complémentaires   |

## Balises génériques

Les balises génériques sont des balises qui n'ont pas de sens sémantique.

En effet, toutes les autres balises HTML ont un *sens* : `<p>` signifie « paragraphe », `<h2>` signifie « sous-titre », etc.
Parfois, on a besoin d'utiliser des balises génériques (aussi appelées ***balises universelles\***) car aucune des autres balises ne convient. On utilise le plus souvent des balises génériques pour construire son design.

Il y a deux balises génériques : l'une est inline, l'autre est block.

| Balise   | Description                     |
| -------- | ------------------------------- |
| `<span>` | Balise générique de type inline |
| `<div>`  | Balise générique de type block  |

Ces balises ont un intérêt uniquement si vous leur associez un attribut `class` , `id` ou `style` :

- `class ` : indique le nom de la classe CSS à utiliser.
- `id`  : donne un nom à la balise. Ce nom doit être unique sur toute la page  car il permet d'identifier la balise. Vous pouvez vous servir de l'ID  pour de nombreuses choses, par exemple pour créer un lien vers une  ancre, pour un style CSS de type ID, pour des manipulations en  JavaScript, etc.
- `style`  : cet attribut vous permet d'indiquer directement le code CSS à  appliquer. Vous n'êtes donc pas obligé d'avoir une feuille de style à  part, vous pouvez mettre directement les attributs CSS. Notez qu'il est  préférable de ne pas utiliser cet attribut et de passer à la place par  une feuille de style externe, car cela rend votre site plus facile à  mettre à jour par la suite.

Ces trois attributs ne sont pas réservés aux balises génériques : vous  pouvez aussi les utiliser sans aucun problème dans la plupart des autres balises.

## Source

Mathieu Nebra, M. N. (2021, 4 janvier). *Mémento des balises HTML*. OpenClassrooms. https://openclassrooms.com/fr/courses/1603881-apprenez-a-creer-votre-site-web-avec-html5-et-css3/1608357-memento-des-balises-html
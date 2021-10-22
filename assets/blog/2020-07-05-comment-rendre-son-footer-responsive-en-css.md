---
title: 'Comment rendre son footer responsive en CSS ?'
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
published: true
category: 'css'
createdAt: '2020-07-05'
---

# Comment rendre son footer responsive en CSS ?

Voici comment rendre un footer responsive uniquement en **CSS**. le footer sera toujours placé en dessous du contenu de la page. Si cette dernière déborde il ne sera pas fixé en bas et si le contenu est trop petit il se fixera en bas de la fenêtre du navigateur.

## Code

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.contenu {
  flex-grow: 1;
}
```

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />

    <title>Mon site</title>
    <meta name="description" content="Description de mon site" />
    <meta name="author" content="Moi-même" />

    <link rel="stylesheet" href="style.css" />
  </head>

  <body>
    <header></header>
    <section class="contenu">
      <h1>Bienvenue sur mon site !</h1>

      <p>
        Pour tester l'aspect responsive du footer, essayer de rajouter ou
        d'enlever du contenu ici et de redimensionner la fênetre du navigateur.
      </p>
    </section>
    <footer></footer>
  </body>
</html>
```

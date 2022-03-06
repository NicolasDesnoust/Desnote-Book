---
title: 'Développement d''une API REST avec Spring'
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
published: true
category: 'spring'
createdAt: '2020-07-05'
---

# Développement d'une API REST avec Spring

## Introduction

Ce mini-tutoriel permet d'explorer les possibilités de **Github Pages** et de la rédaction de tutoriels en **Markdown**.
Il s'agit principalement de présenter comment réaliser rapidement les fondements d'une **API REST** à l'aide du framework **Spring**.

> **Attention :** Ce tutoriel n'est actuellement pas complet.

### Technologies

Voici une liste exhaustive des technologies qui seront employées :

- Spring REST
- Spring Boot / Spring Initializr
- Spring Data
- Maven
- Lombok
- MySQL
- JPA / Hibernate

## Création du projet sur Spring Initializr

La première étape consite à créer les sources du projet Maven en remplissant le formulaire de [Spring Initializr](https://start.spring.io).

Ce dernier devrait se présenter sous la forme suivante :

![Aperçu de SPring Initializr](https://i.imgur.com/SBl70J1.png)

## Import sous Eclipse

## Configuration de la base de données

La configuration de la base de données se réalise dans le fichier `src/main/resources/app.properties` :

```properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.hibernate.show_sql=true

# Configuration pour MySQL 8 (L'url, le username et le password sont à changer).
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/<nom-de-la-BDD>?serverTimezone=Europe/Berlin
spring.datasource.username=<identifiant>
spring.datasource.password=<mot-de-passe>

######### Configuration pour HSQLDB
#spring.jpa.database-platform=org.hibernate.dialect.HSQLDialect
#spring.datasource.driver-class-name=org.hsqldb.jdbcDriver
#spring.datasource.url=jdbc:hsqldb:file:data/ADM;shutdown=true;hsqldb.write_delay=false
#spring.datasource.username=sa
#spring.datasource.password=
```

## Coloration syntaxique en Java

```java
package adm.entities.education;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import adm.entities.AbstractEntity;
import adm.entities.association.Association;
import adm.entities.referentials.domain.Domain;
import adm.entities.referentials.organism.Organism;
import adm.entities.referentials.teachingmodality.TeachingModality;
import adm.entities.referentials.teachingsite.TeachingSite;
import adm.entities.referentials.typeofdegree.TypeOfDegree;

@Entity
@Table(name = "FORMATION")
@Getter @Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
public class Education extends AbstractEntity {

	@Getter(AccessLevel.NONE) @Setter(AccessLevel.NONE)
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "CODE_TYPE_DIPLOME", referencedColumnName = "CODE")
	private TypeOfDegree type;

	@ManyToMany
	@JoinTable(
	  name = "ASSOC_FOR_DOM",
	  joinColumns = @JoinColumn(name = "CODE_FORMATION"),
	  inverseJoinColumns = @JoinColumn(name = "CODE_DOMAINE"))
	private Set<Domain> domains;

	@ManyToMany
	@JoinTable(
	  name = "ASSOC_FOR_ORG",
	  joinColumns = @JoinColumn(name = "CODE_FORMATION"),
	  inverseJoinColumns = @JoinColumn(name = "CODE_ORGANISME"))
	private Set<Organism> organisms;

	@ManyToMany
	@JoinTable(
	  name = "ASSOC_FOR_MOD",
	  joinColumns = @JoinColumn(name = "CODE_FORMATION"),
	  inverseJoinColumns = @JoinColumn(name = "CODE_MODALITE"))
	private Set<TeachingModality> modalities;

	@ManyToMany
	@JoinTable(
	  name = "ASSOC_FOR_SIT",
	  joinColumns = @JoinColumn(name = "CODE_FORMATION"),
	  inverseJoinColumns = @JoinColumn(name = "CODE_SITE"))
	private Set<TeachingSite> sites;

	@JsonIgnore
	@OneToMany(mappedBy = "id.education")
	private Collection<Association> associations;

	public Education() {
		domains = new HashSet<Domain>();
		organisms = new HashSet<Organism>();
		modalities = new HashSet<TeachingModality>();
	}
}
```

## Coloration syntaxique en HTML

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />

    <title>The HTML5 Herald</title>
    <meta name="description" content="The HTML5 Herald" />
    <meta name="author" content="SitePoint" />

    <link rel="stylesheet" href="css/styles.css?v=1.0" />
  </head>

  <body>
    <script src="js/scripts.js"></script>
  </body>
</html>
```

StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Switch to another file

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.

## Rename a file

You can rename the current file by clicking the file name in the navigation bar or by clicking the **Rename** button in the file explorer.

## Delete a file

You can delete the current file by clicking the **Remove** button in the file explorer. The file will be moved into the **Trash** folder and automatically deleted after 7 days of inactivity.

## Export a file

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.

# Synchronization

Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

There are two types of synchronization and they can complement each other:

- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.

  > To start syncing your workspace, just sign in with Google in the menu.

- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.
  > Before starting to sync files, you must link an account in the **Synchronize** sub-menu.

## Open a file

You can open a file from **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Open from**. Once opened in the workspace, any modification in the file will be automatically synced.

## Save a file

You can save any file of the workspace to **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Save on**. Even if a file in the workspace is already synced, you can save it to another location. StackEdit can sync one file with multiple locations and accounts.

## Synchronize a file

Once your file is linked to a synchronized location, StackEdit will periodically synchronize it by downloading/uploading any modification. A merge will be performed if necessary and conflicts will be resolved.

If you just have modified your file and you want to force syncing, click the **Synchronize now** button in the navigation bar.

> **Note:** The **Synchronize now** button is disabled if you have no file to synchronize.

## Manage file synchronization

Since one file can be synced with multiple locations, you can list and manage synchronized locations by clicking **File synchronization** in the **Synchronize** sub-menu. This allows you to list and remove synchronized locations that are linked to your file.

# Publication

Publishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http://handlebarsjs.com/), you have full control over what you export.

> Before starting to publish, you must link an account in the **Publish** sub-menu.

## Publish a File

You can publish your file by opening the **Publish** sub-menu and by clicking **Publish to**. For some locations, you can choose between the following formats:

- Markdown: publish the Markdown text on a website that can interpret it (**GitHub** for instance),
- HTML: publish the file converted to HTML via a Handlebars template (on a blog for example).

## Update a publication

After publishing, StackEdit keeps your file linked to that publication which makes it easy for you to re-publish it. Once you have modified your file and you want to update your publication, click on the **Publish now** button in the navigation bar.

> **Note:** The **Publish now** button is disabled if your file has not been published yet.

## Manage file publication

Since one file can be published to multiple locations, you can list and manage publish locations by clicking **File publication** in the **Publish** sub-menu. This allows you to list and remove publication locations that are linked to your file.

# Markdown extensions

StackEdit extends the standard Markdown syntax by adding extra **Markdown extensions**, providing you with some nice features.

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.

## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                  | ASCII                           | HTML                          |
| ---------------- | ------------------------------- | ----------------------------- |
| Single backticks | `'Isn't this fun?'`             | 'Isn't this fun?'             |
| Quotes           | `"Isn't this fun?"`             | "Isn't this fun?"             |
| Dashes           | `-- is en-dash, --- is em-dash` | -- is en-dash, --- is em-dash |

## KaTeX

You can render LaTeX mathematical expressions using [KaTeX](https://khan.github.io/KaTeX/):

The _Gamma function_ satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

> You can find more information about **LaTeX** mathematical expressions [here](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).

## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```

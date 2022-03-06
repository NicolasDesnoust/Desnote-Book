---
title: 'Petite introduction à Spring'
description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
published: true
category: 'spring'
createdAt: '2020-10-23'
---

# Une (petite) introduction à Spring

## Introduction

Le framework [Spring](http://www.springframework.org/) est une boite à outils très riche permettant de structurer, d'améliorer et de simplifier l'écriture d'application JEE. Spring est organisé en module :

- Gestion des instances de classes (JavaBean et/ou métier),
- Programmation orientée Aspect,
- Modèle MVC et outils pour les applications WEB,
- Outils pour la DAO (JDBC),
- Outils pour les ORM (Hibernate, iBatis, ...),
- Outils pour les applications JEE (JMX, JMA, JCA, EJB, ...).

[Plus d'informations ici](https://docs.spring.io/spring/docs/5.2.x/spring-framework-reference/overview.html).

## Programmation par contrat

Travail à faire :

- Lancez Eclipse JEE (commande eclipse). Si la commande n'est pas disponible, téléchargez directement [Eclipse JEE](http://jean-luc.massat.perso.luminy.univ-amu.fr/ens/jee-pour-M2/ress/).
- Préparez un projet Java standard pour tester les exemples présentés ci-dessous.

### Principe

La programmation par contrat consiste à séparer la spécification d'une couche logicielle (aussi appelée service) de sa réalisation. La spécification donne lieu à la création d'une interface et la réalisation fournit une classe qui implante cette interface. Ce ne sont pas nécessairement les mêmes personnes qui développent l'interface et son implantation. On peut également remarquer que la phase de réalisation peut produire plusieurs implantations différentes d'une même interface. Le choix entre ces implantations est réalisé à l'intégration entre les couches. Les objectifs de cette approche :

- **Réduire les dépendances.**

 Les classes d'implantation ne se connaissent pas. Elles dialoguent au moyen des interfaces. De ce fait, on peut facilement changer un implantation contre une autre sans avoir à mettre à jour la totalité du logiciel.

- **Faciliter les tests.**

 Chaque couche logicielle ayant une spécification claire, il est facile de lui associer un jeu de tests utilisable quelque soit la nature de l'implantation.

- **Simplifier le code.**

 Dans certains cas de figure, le code d'une méthode est une suite de considérations sans liaison directe entre-elles. La programmation par contrat va faciliter la construction d'implantations façade qui se chargent chacune d'une partie du travail.

- **Organiser le développement.**

### Spécifier un service logiciel

Prenons un exemple pour éclairer ces principes. Nous avons besoin dans nos applications de pouvoir tracer un certain nombre d'évènements. Nous allons donc créer un service de trace (un *logger* en anglais). Ce service est spécifié par l'interface ci-dessous :

```java
package myapp.services;

public interface ILogger {

    default void log(String message) {  };

}
```

### Une première implantation

Pour utiliser ce service, nous avons besoin d'une classe qui implante ce service. Il existe plusieurs manières de faire. Nous allons, dans une premier temps, envoyer les messages de trace sur la console de sortie d'erreur standard :

```java
package myapp.imp;

import java.util.Date;

import myapp.services.ILogger;

public class StderrLogger implements ILogger {

    public void start() {
        System.err.println("Start " + this);
    }

    public void stop() {
        System.err.println("Stop " + this);
    }

    @Override
    public void log(String message) {
        System.err.printf("%tF %1$tR | %s\n", new Date(), message);
    }

}
```

Les méthodes start et stop correspondent à la phase de démarrage et de terminaison du service. Nous retrouverons ces méthodes dans toutes les implantations (même si elles sont vides).

 A propos des packages. Vous pouvez noter dans cet exemple que l'interface est dans un package et que la classe d'implantation est dans un autre. Dans un cas réel, la spécification d'un service peut être composé de plusieurs interfaces accompagnées de javaBeans ou de classes d'exception. L'implantation de ce service peut également contenir plusieurs classes ce qui justifie clairement l'utilisation de plusieurs packages.

Nous pouvons maintenant utiliser ce service. Pour ce faire, nous allons construire une classe de test unitaire (avec JUnit 5 à ajouter dans le buildpath de votre projet Eclipse) :

```java
package myapp.tests;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import myapp.imp.StderrLogger;
import myapp.services.ILogger;

public class TestLoggerServices {

    @BeforeEach
    public void beforeEachTest() {
        System.err.println("====================");
    }

    @AfterEach
    public void afterEachTest() {
    }

    // use a logger
    void use(ILogger logger) {
        logger.log("Voila le résultat = hello");
    }

    // Test StderrLogger
    @Test
    public void testStderrLogger() {
        // create the service
        var logger = new StderrLogger();
        // start the service
        logger.start();
        // use the service
        use(logger);
        // stop the service
        logger.stop();
    }

}
```

A ce stade, nous pouvons remarquer que :

 Les utilisateurs (la méthode use ci-dessus) n'ont aucune connaissance des détails de l'implantation. Seule l'interface est utilisée.
 Il existe tout de même une dépendance puisque le nom de la classe d'implantation apparaît en clair dans le code de l'utilisateur (méthode testStderrLogger).
 L'intégrateur (methode testStderrLogger) est responsable du respect du contrat (on appelle d'abord start, puis on utilise, puis on appelle stop).

### Une deuxième implantation

Nous pouvons aussi donner une deuxième implantation qui stocke les traces dans un fichier :

```java
package myapp.imp;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.Date;

import myapp.services.ILogger;

public class FileLogger implements ILogger {

    // parameter: the writer
    private final PrintWriter writer;

    public FileLogger(String fileName) {
        try {
            this.writer = new PrintWriter(new FileOutputStream(fileName, true));
        } catch (FileNotFoundException e) {
            throw new IllegalArgumentException("bad fileName");
        }
    }

    public void start() {
        System.err.println("Start " + this);
    }

    public void stop() {
        writer.close();
        System.err.println("Stop " + this);
    }

    @Override
    public void log(String message) {
        writer.printf("%tF %1$tR | %s\n", new Date(), message);
    }

}
```

Cette nouvelle implantation a absolument besoin d'un paramètre (le nom du fichier) pour être fonctionnelle. La solution retenue est la plus simple : ajouter un argument au constructeur. Nous remarquons que de ce fait, la méthode start n'a plus vraiment d'intérêt.

On remarque que le code d'intégration est très peu modifié (une ligne), alors que le fonctionnement est totalement différent. On remarque également que le code d'utilisation (méthode use) n'est pas altéré. Les modifications portent uniquement sur le code d'intégration :

```java
@Test
public void testFileLogger() {
    var logger = new FileLogger("/tmp/myapp.log");
    logger.start();
    use(logger);
    logger.stop();
}
```

### Une troisième implantation

La plupart des classes d'implantation ont besoin de paramètres pour assurer leur service. Le choix de placer ces paramètres en argument du constructeur pose plusieurs problèmes :

-  La classe obtenue n'est pas un javaBean (pas de constructeur vide). C'est particulièrement gênant car l'intérêt de ces composants élémentaires est très important.
- Les paramètres du service sont fixés à sa création (par le constructeur). Il n'est donc pas possible de les changer en cours de route, voir même d'envisager un recyclage du service (changement des paramètres et nouvelle initialisation).
- Si nous avons beaucoup de paramètres, le constructeur est difficile à utiliser.
- Il n'est pas possible de prévoir des valeurs par défaut pour certains paramètres.

Nous allons donc introduire une nouvelle solution au problème des paramètres : les paramètres vont être codés comme des propriétés de la classe d'implantation et la méthode start devra les utiliser pour initialiser le service. Nous obtenons donc cette nouvelle version :

```java
package myapp.imp;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Date;

import myapp.services.ILogger;

public class BeanFileLogger implements ILogger {

    // parameter: writer name
    private String fileName;

    // property: writer
    private PrintWriter writer;

    // start service
    public void start() {
        if (fileName == null) {
            throw new IllegalStateException("no fileName");
        }
        try {
            OutputStream os = new FileOutputStream(fileName, true);
            this.writer = new PrintWriter(os);
        } catch (FileNotFoundException e) {
            throw new IllegalStateException("bad fileName");
        }
        System.err.println("Start " + this);
    }

    // stop service
    public void stop() {
        writer.close();
        System.err.println("Stop " + this);
    }

    @Override
    public void log(String message) {
        writer.printf("%tF %1$tR | %s\n", new Date(), message);
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

}
```

Le code d'intégration a maintenant la responsabilité de fixer les paramètres du service avant d'appeler la méthode d'initialisation. Cette solution est plus simple et plus systématique quand le nombre de paramètres est important :

```java
@Test
public void testBeanFileLogger() {
    // create the service
    var logger = new BeanFileLogger();
    // set parameter
    logger.setFileName("/tmp/myapp.log");
    // start
    logger.start();
    // use
    use(logger);
    // stop
    logger.stop();
}
```

Travail à faire : En donnant une valeur par défaut au paramètre de la classe BeanFileLogger nous pouvons rendre optionnelle la phase de paramétrage. mettez en oeuvre et testez ce principe.

## Injection des dépendances

L'injection des dépendances traite le délicat problème de la communication et de la dépendance entre services logiciels. Prenons l'exemple d'une classe métier :

```java
package myapp.services;

public interface ICalculator {

    int add(int a, int b);

}
```

Construisons maintenant une implantation de ce service qui génère une trace après chaque appel d'une méthode métier. Cette implantation a donc besoin d'une couche logger pour s'exécuter correctement. Nous pourrions envisager de placer dans cette implantation la propriétés suivante :

```java
package myapp.imp;

import myapp.services.ICalculator;
import myapp.services.ILogger;

public class SimpleCalculator implements ICalculator {

    private ILogger logger = new myapp.imp.StderrLogger();

    ...
}
```

Cette solution pose deux problèmes :

1. Une dépendance directe vient d'être introduite entre cette implantation de la calculatrice et une implantation particulière de la couche logger. Cette dépendance est regrettable car inutile. La calculatrice doit utiliser l'interface ILogger et pas une implantation.
2. Si nous avions choisi une couche de trace ayant besoin d'un paramètre (comme celle vue précédemment), nous aurions sans doute dû inclure ce paramètre (le fichier de sortie) comme un paramètre de la calculatrice. En d'autres termes, les paramètres d'une couche A doivent inclure tous les paramètres des couches utilisées par A.

Pour éviter ces problèmes, nous allons simplement introduire dans l'implantation de la calculatrice un paramètre faisant référence à une implantation de la couche logger. De ce fait, les deux implantations resteront indépendantes l'une de l'autre. Le seul point de contact sera l'interface ILogger :

```java
package myapp.imp;

import myapp.services.ICalculator;
import myapp.services.ILogger;

public class SimpleCalculator implements ICalculator {

    private ILogger logger;

    public void start() {
        if (logger == null) {
            throw new IllegalStateException("null logger");
        }
        System.err.println("Start " + this);
    }

    public void stop() {
        System.err.println("Stop " + this);
    }

    public int add(int a, int b) {
        logger.log(String.format("add(%d,%d)", a, b));
        return (a + b);
    }

    public ILogger getLogger() {
        return logger;
    }

    public void setLogger(ILogger logger) {
        this.logger = logger;
    }

}
```

La phase d'intégration devient plus délicate puisqu'il faut créer et initialiser deux couches logicielles (il faut ajouter une clause import pour assertEquals) :

```java
void use(ICalculator calc) {
    assertEquals(300, calc.add(100, 200));
}

@Test
public void testCalculorAndStderrLogger() {
    // create and start the logger service (on stderr)
    var logger = new StderrLogger();
    logger.start();
    // create, inject and start the calculator service
    var calculator = new SimpleCalculator();
    calculator.setLogger(logger);
    calculator.start();
    // use the calculator service
    use(calculator);
    // stop the calculator service
    calculator.stop();
    // stop the logger service
    logger.stop();
}
```

Nous pouvons très facilement et sans modifier la couche métier changer la politique de trace en utilisant un fichier. Il suffit de changer les quatre premières lignes du code d'intégration :

```java
// create file logger
var logger = new BeanFileLogger();
logger.setFileName("/tmp/myapp.log");
logger.start();
```

Nous venons de mettre en oeuvre le principe de l'injection de dépendances. C'est la partie intégration qui se charge d'injecter dans la couche métier la référence vers la couche logger. Initialiser une application revient à créer les couches logicielles, injecter les dépendances et appeler les méthodes d'initialisation.

## Gestion des beans par Spring

La création des instances de javaBeans, l'injection des dépendances et le nommage des instances sont le coeur du framework Spring. Nous allons donc reprendre ces exemples en utilisant les outils fournis par Spring.

### Installation de Spring

Pour intégrer à votre projet le framework Spring et ses dépendances, nous allons utiliser Maven :

-  Ajoutez Maven à votre projet : Sélectionnez votre projet / Bouton-droit / Configure / Convert to Maven Project. Vous devez à cette étape donner une numéro de version à votre projet. Laissez les valeurs par défaut.
- L'action précédente a généré un fichier pom.xml qui est le coeur de la configuration de Maven. L'éditeur de ce fichier doit être ouvert. Ajoutez la dépendance ci-dessous (tirée de la page de chargement du site WEB de Spring):

```xml
<dependencies>
    <!-- pour utiliser Spring -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.4.RELEASE</version>
    </dependency>
    
    <!-- pour utiliser la partie test de Spring -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.2.4.RELEASE</version>
    </dependency>
    
    <!-- pour les annotations (à partir de java 10) -->
    <dependency>
        <groupId>javax.annotation</groupId>
        <artifactId>javax.annotation-api</artifactId>
        <version>1.3.2</version>
    </dependency>
</dependencies>
```

-  Vous devez avoir dans votre projet un répertoire Maven dependencies qui liste les .jar de Spring.
- Préparez, dans un navigateur, un onglet vers la la documentation Spring.

### Callbacks par annotations

Nous allons commencer par utiliser des annotations standards (non liées directement à Spring) pour indiquer dans nos classes les méthodes d'initialisation (@PostConstruct) et de terminaison (@PreDestroy). Ces méthodes seront automatiquement appelées par Spring.

```java
package myapp.imp;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
...

    public class StderrLogger implements ILogger {

        ...

            // start service
            @PostConstruct
            public void start() {
            ...
        }

        // stop service
        @PreDestroy
        public void stop() {
            ...
        }

        ...

    }
```

À faire : ajoutez ces annotations à SimpleCalculator.java.

### Créer et utiliser des javaBeans

Dans Spring, la définition des javaBeans, leurs noms et leurs paramètres sont définis dans un fichier de configuration au format XML. Une fois ce fichier préparé, Spring est capable de créer les classes de service en effectuant les injections de dépendances et les initialisations nécessaires.

Préparez dans votre projet le fichier XML config.xml suivant dans le répertoire src :

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- pour utiliser les annotations -->
    <context:annotation-config />

    <!-- logger sur Stderr (logger par défaut)-->
    <bean id="stderrLogger" class="myapp.imp.StderrLogger" primary="true" />

    <!-- logger sur /tmp/myapp.log -->
    <bean id="fileLogger" class="myapp.imp.BeanFileLogger">
        <property name="fileName">
            <value>/tmp/myapp.log</value>
        </property>
    </bean>

    <!-- calculatrice qui trace sur Stderr -->
    <bean id="calculator" class="myapp.imp.SimpleCalculator">
        <property name="logger" ref="stderrLogger" />
    </bean>

</beans>
```

Nous allons pouvoir utiliser Spring pour exploiter la calculatrice et le logger :

```java
package myapp.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import myapp.services.ICalculator;
import myapp.services.ILogger;

public class TestSpring {

    @BeforeEach
    public void beforeEachTest() {
        System.err.println("====================");
    }

    void use(ILogger logger) {
        logger.log("Voila le résultat");
    }

    void use(ICalculator calc) {
        assertEquals(300, calc.add(100, 200));
    }

    @Test
    public void testStderrLogger() {
        System.err.println("+++ StderrLogger");
        var conf = "config.xml";

        // create a context and find beans
        try (var ctx = new ClassPathXmlApplicationContext(conf);) {
            var logger = ctx.getBean("stderrLogger", ILogger.class);
            use(logger);
        }
    }

    @Test
    public void testCalculatorWithLogger() {
        System.err.println("+++ CalculatorWithLogger");
        var conf = "config.xml";

        // create a context and find beans
        try (var ctx = new ClassPathXmlApplicationContext(conf);) {
            var calc = ctx.getBean("calculator", ICalculator.class);
            use(calc);
        }
    }

}
```

Si nous voulons changer le logger de la calculatrice, il n'est pas nécessaire de modifier notre programme. Il suffit de changer le fichier XML :

```xml
<!-- calculatrice qui trace sur un fichier -->
<bean id="calculator" class="myapp.imp.SimpleCalculator">
    <property name="logger" ref="fileLogger" />
</bean>
```

Testez cette nouvelle version.

Nous pouvons même avoir deux versions de la calculatrice en fonction de la trace choisie.

Vous pouvez parcourir avec profit les trois premières sections de ce chapitre.

## Utilisez les annotations de Spring

Depuis java 1.5, le framework Spring est également capable de décrire la configuration des beans par un jeu d'annotations. Nous allons pouvoir décrire l'injection de dépendances et la création des instances de manière déclarative et laisser le soin à Spring de réaliser les opérations.

### Injection par annotation

Dans la classe SimpleCalculator, indiquez par une annotation (@Autowired) que vous souhaitez l'injection d'un classe logger :

```java
package myapp.imp;

import org.springframework.beans.factory.annotation.Autowired;
...

    public class SimpleCalculator implements ICalculator {

        ...

            public ILogger getLogger() {
            return logger;
        }

        @Autowired
        public void setLogger(ILogger logger) {
            this.logger = logger;
        }

    }
```

Le code XML est maintenant simplifié :

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- pour utiliser les annotations -->
    <context:annotation-config />

    <!-- logger sur Stderr (logger par défaut)-->
    <bean id="stderrLogger" class="myapp.imp.StderrLogger" primary="true" />

    <!-- logger sur /tmp/myapp.log -->
    <bean id="fileLogger" class="myapp.imp.BeanFileLogger">
        <property name="fileName">
            <value>/tmp/myapp.log</value>
        </property>
    </bean>

    <!-- calculatrice qui trace sur Stderr -->
    <bean id="calculator" class="myapp.imp.SimpleCalculator" />

</beans>
```

L'injection, c'est à dire la liaison entre la classe utilisée et la classe utilisatrice, se réalise sur la base du type (ici l'interface ILogger) et du nom (ici « logger »).

Note : Il ya deux versions du logger (stderrLogger et fileLogger). L'attribut primary indique le service choisi par défaut.

### Déclarer les services par annotation

Nous pouvons également déclarer une classe comme étant un service. Cette annotation va permettre de l'instancier automatiquement en cas de besoin. Appliquons ce principe sur la classe StderrLogger (et faites la même chose sur SimpleCalculator) :

```java
package myapp.imp;

...
    
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service("stderrLogger")
@Primary
public class StderrLogger implements ILogger {

    ...

}
```

Le code XML devient maintenant beaucoup plus simple :

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- pour utiliser les annotations -->
    <context:annotation-config />

    <!-- pour trouver les classes de service -->
    <context:component-scan base-package="myapp.imp" />

    <!-- logger sur /tmp/myapp.log -->
    <bean id="fileLogger" class="myapp.imp.BeanFileLogger">
        <property name="fileName">
            <value>/tmp/myapp.log</value>
        </property>
    </bean>

</beans>
```

### Contrôler les implantations choisies

Il existe souvent plusieurs implantations concurrentes d'un même service et nous avons besoin de contrôler le choix lors des injections.

-  Supprimez l'annotation @Primary de StderrLogger.
- À ce stade vous devez obtenir une erreur indiquant que deux classes sont disponibles pour l'interface ILogger.
- Vous pouvez d'une part ajouter une clause @Qualifier à la classe StderrLogger:

```java
package myapp.imp;

...

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@Qualifier("test")
public class StderrLogger implements ILogger {

    ...

}
```

 et ajouter la même annotation dans la classe SimpleCalculator:

```java
package myapp.imp;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
...

    public class SimpleCalculator implements ICalculator {

        ...

            @Autowired
            @Qualifier("test")
            public void setLogger(ILogger logger) {
            this.logger = logger;
        }

    }
```

Découvrez d'autres possibilités de @Qualifier.

Découvrez d'autres possibilités des annotations.

## Intégration JUnit / Spring

Afin de rendre nos tests unitaires plus simples, nous pouvons utiliser une meilleure intégration de Spring et de Junit et injecter des beans directement dans la classe de test :

```java
package myapp.tests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import myapp.services.ICalculator;
import myapp.services.ILogger;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(locations = "/config.xml")
public class TestSpringJUnitIntegration {

    @Autowired
    ILogger logger;

    @Autowired
    ICalculator calc;

    @BeforeEach
    public void beforeEachTest() {
        System.err.println("====================");
    }

    void use(ILogger logger) {
        logger.log("Voila le résultat");
    }

    void use(ICalculator calc) {
        assertEquals(300, calc.add(100, 200));
    }

    @Test
    public void testStderrLogger() {
        System.err.println("+++ StderrLogger");
        use(logger);
    }

    @Test
    public void testCalculatorWithLogger() {
        use(calc);
    }

}
```

## Configurer en Java

Nous avons la possibilité, depuis la version 3, de configurer Spring en utilisant une classe et des annotations. Découvrez cette technique et créez de nouvelles versions de la couche BeanFileLogger.

1. Débutez par la création d'une classe de configuration. Elle remplace complètement le fichier XML et, via des méthodes annotées @Bean, propose la création de services :

   ```java
   package myapp.tests;
   
   import org.springframework.beans.factory.annotation.Qualifier;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.ComponentScan;
   import org.springframework.stereotype.Component;
   
   import myapp.imp.BeanFileLogger;
   import myapp.services.ILogger;
   
   @Component
   @ComponentScan("myapp.imp")
   public class AppConfig {
   
       @Bean
       @Qualifier("file")
       public ILogger myLogger() {
           var logger = new BeanFileLogger();
           logger.setFileName("/tmp/essai.log");
           System.err.println("Production de " + logger);
           return logger;
       }
   
   }
   ```

2. Nous pouvons créer un simple test pour construire un contexte et récupérer une instance :

   ```java
   package myapp.tests;
   
   import org.junit.jupiter.api.Test;
   import org.springframework.context.annotation.AnnotationConfigApplicationContext;
   
   import myapp.imp.StderrLogger;
   import myapp.services.ILogger;
   
   public class TestAppConfig {
   
       /*
        * Construction d'un contexte classique
        */
       @Test
       public void testStderrLogger() {
           try (var c = new AnnotationConfigApplicationContext(AppConfig.class)) {
               var logger = c.getBean(StderrLogger.class);
               logger.log("hello on stderr");
           }
       }
   }
   ```

3. Nous pouvons également utiliser l'intégration Spring/Junit pour récupérer et tester plusieurs services :

   ```java
   package myapp.tests;
   
   import static org.junit.jupiter.api.Assertions.assertEquals;
   
   import org.junit.jupiter.api.Test;
   import org.junit.jupiter.api.extension.ExtendWith;
   
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.beans.factory.annotation.Qualifier;
   import org.springframework.context.ApplicationContext;
   import org.springframework.test.context.ContextConfiguration;
   import org.springframework.test.context.junit.jupiter.SpringExtension;
   
   import myapp.imp.StderrLogger;
   import myapp.services.ICalculator;
   import myapp.services.ILogger;
   
   @ExtendWith(SpringExtension.class)
   @ContextConfiguration(classes = AppConfig.class)
   public class TestAppConfigJunit {
   
       @Autowired
       ApplicationContext context;
   
       @Autowired
       StderrLogger stderrLogger;
   
       @Autowired
       ICalculator calculator;
   
       @Test
       public void testStderrLogger() {
           stderrLogger.log("hello on stderr");
       }
   
       @Autowired
       @Qualifier("file")
       ILogger fileLogger;
   
       @Test
       public void testFileLogger() {
           fileLogger.log("hello on file");
       }
   
       @Test
       public void testCalculator() {
           assertEquals(30, calculator.add(10, 20));
       }
   
   }
   ```

## Nouvelles implantations

Notre première version de la calculatrice mélange du code métier (addition) et du code de trace. Ce n'est pas une très bonne idée. Proposez une nouvelle implantation de décoration de la calculatrice qui est construite sur deux paramètres :

-  une référence vers une autre implantation de la calculatrice (qui ne fait aucune trace),
- une référence vers une implantation de la couche logger,

Ce décorateur va retransmettre les requêtes et y associer une trace.
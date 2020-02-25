# Programmable Web
## FORAY Théo, LE ROUX Camille, MARGUERETTAZ Marion, STROBBE Nathan

## Répartition du travail
Pendant la durée du projet le travail a été répartie de manière équitable. Si ce n'est que chacun a travaillé plus dans un domaine, à savoir :
* Nathan : frontend & stockage utilisation avec les web audio plugin
* Marion : CSS & back-end & tests & authentification
* Théo : utilisation avec les web audio plugin & back-end
* Camille : front-end & back-end

## Démarrage de notre solution
Pour lancer le server :
* se placer dans le dossier ‘server’
* exécuter la commande ‘npm install’
* exécuter la commande ‘npm start’


Pour lancer la webapp :
* se placer dans le dossier ‘front-flms’
* exécuter la commande ‘npm install’
* exécuter la commande ‘npm start’

Pour lancer les tests : 
* arrêter le serveur
* se placer dans le dossier ‘server’
* exécuter la commande ‘npm install’
* exécuter la commande ‘npm test’

## Utilisation de notre solution 

La première page sur laquelle on arrive (non connecté) est le store officiel des plugins. Ici se trouvent tous les plugins ayant été validés par les tests.
Afin de naviguer plus facilement dans cette liste de plugins il y a une barre de recherche, et un système de filtre de plugin en fonction des différentes catégories.

L’utilisateur a la possibilité de se créer un compte pour avoir accès à plus de fonctionnalités sur notre site via le bouton inscription en haut à droite.
Un fois arrivé sur le formulaire d’inscription l’utilisateur doit entrer les informations demandées, à savoir un nom de compte, une adresse mail et un mot de passe, afin de pouvoir s’enregistrer. Une sécurité permet de vérifier qu’une adresse mail rentrée n’existe pas encore en base de données. Les données du mot de passe sont cryptés côté serveur.
Suite à la création de son compte l’utilisateur peut se connecter en entrant son adresse mail et son mot de passe. Cela va le rediriger sur le store communautaire des plugins.

Ce store communautaire contient tous les plugins validés ou non. En cliquant sur l’un d’eux il est possible d’accéder aux détails de ce dernier comme son nom, sa version, sa description mais aussi tous les liens à disposition (vidéo tutoriel et github). Dans cette page de détails de plugins deux fonctionnalités communautaires sont présentes, une gestion des likes (indicateurs permettant de mesurer la popularité d’un plugins chez les utilisateurs) mais aussi un espace commentaires où les utilisateurs peuvent donner leur avis concernant le plugin.
Cette page permet aussi d’essayer un plugin en cliquant sur le bouton correspondant ce qui va ouvrir un nouvel onglet avec le plugin chargé et prêt à être utilisé.
Pour finir, il est aussi possible de valider un plugin sur cette page en cliquant sur le bouton “valider le plugin” ouvrant lui aussi un nouvel onglet avec les tests automatiques à effectuer.

En haut à droite du site se trouve un bouton donnant accès au formulaire de publication des plugins. Ce formulaire contient toutes les informations nécessaires à l’enregistrement d’un plugin comme son nom, sa description, sa version, sa catégorie qui peut être personnalisée si elle ne se trouve pas dans la liste correspondante, ses tags pouvant être personnalisés aussi, sa photo (limitée à 100 Ko), son dossier zip contenant le plugin et aussi quelques informations supplémentaires (lien github si open source et lien youtube pour une vidéo tutoriel). Une fois ces informations entrées il suffit de valider en cliquant sur le bouton “enregistrer”.

Concernant la route exposée afin que quelqu’un puisse récupérer les plugin via notre site, il suffit d’effectuer une requête GET sur notre API vers la route “download” et en donnant l’id du plugin demandé.

(Exemple : http://localhost:3001/api/download?id=idPlugin) 

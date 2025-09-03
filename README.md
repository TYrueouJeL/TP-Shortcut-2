# React Shortcuts

## TODO

- [ ] Afficher la liste des raccourcis clavier sur la page d'accueil.
- [ ] Afficher la liste des logiciels sur la page Logiciels.
- [ ] Afficher un message "Chargement en cours..." lorsque les données sont en cours de chargement.

**Remarques**

- Les données doivent être récupérées via l'API. Pour cela, vous pouvez ré-utiliser le code (interfaces et fonctions) réalisées pendant le cours de TypeScript.
- La récupération des données peut se faire de plusieurs manières :
1. Charger les données dans un hook useEffect (pour éviter de recharger les données à chaque rendu du composant). Attention, la fonction en paramètre de useEffect ne peut pas être asynchrone et il faudra donc passer par une fonction intermédiaire.
2. Utiliser le composant Suspense et le hook use (ajouté récemment dans React 18) pour gérer le chargement des données de manière plus moderne.

Vous pouvez utiliser l'une des deux approches (ou même les deux si vous le souhaitez puisqu'il y a deux chargement de données à gérer).
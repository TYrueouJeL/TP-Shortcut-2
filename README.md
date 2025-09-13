# React Shortcuts

## TODO

- [ ] (6 pts) Afficher un formulaire avec une liste déroulantes des catégories de l'API.
- [ ] (6 pts) Lorsque l'utilisateur sélectionne une catégorie, afficher les raccourcis associés (faire un appel API de type GET /shortcuts?categories.id=1)
- [ ] (8 pts) Afficher une pagination avec une flèche "Précédent" et "Suivant" pour naviguer entre les pages de résultats (appel API de type GET /shortcuts?categories.id=1&page=2). Si l'utilisateur est sur la première page, désactiver la flèche "Précédent". Si l'utilisateur est sur la dernière page, désactiver la flèche "Suivant".
- [ ] BONUS (2 pts) : Ajouter des numéros de page cliquables entre les flèches "Précédent" et "Suivant" pour permettre à l'utilisateur de naviguer directement vers une page spécifique.

**Remarques**

La note prendra en compte la qualité du code, l'ergonomie de l'interface et le respect des consignes.
Pensez à bien organiser votre code en composants réutilisables (surtout pour la pagination).

Le composant ShortcutList utilise Suspense...

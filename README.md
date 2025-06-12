# NextRef

**NextRef** est une application née d’un besoin récurrent : retrouver facilement une œuvre mentionnée dans un podcast, une interview, une vidéo ou un article.  
Il arrive souvent qu’un livre, un film ou un auteur soit cité dans un contenu, sans que ce soit simple de le noter ou d’y revenir plus tard.  

Le projet a d’abord été pensé comme une bibliothèque personnelle de références liées à ma consommation de contenus.  
Il a depuis évolué vers l’idée de centraliser ces références dans une base collaborative, avec pour objectif à terme de proposer des recommandations de contenus, en se basant sur des références communes partagées par d’autres utilisateurs. 

Ce dépôt contient la solution **frontend** du projet. Le backend est accessible ici : ➡️ https://github.com/pineausimon/NextRef

---

## 🧱 Stack Technique

- **React 19 + TypeScript**
- **Architecture modulaire par fonctionnalités** (feature-based)
  - Chaque feature contient ses propres composants, hooks, contextes, etc.
- **React Router**
  - Routing dynamique structuré par feature
- **Context API**
  - Utilisé comme couche globale pour la gestion d’état léger et de hooks partagés
- **Tailwind CSS**
  - Styling utilitaire centralisé via des layouts de base
  - Couplé à **DaisyUI**
- **Axios**
  - Configuration centralisée (base URL, headers, interceptors) + Wrapper global avec gestion d’erreurs
- **ESLint** + **Prettier**
  - Linting et formatage automatiques avec des règles cohérentes sur tout le projet
- **Vite**

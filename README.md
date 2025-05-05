# Todo List App - Projet CI/CD

Ce projet est une application de Todo List complète avec un frontend React, un backend Express.js et une base de données MongoDB. Le projet est configuré pour être facilement déployé et intégré dans un pipeline CI/CD.

## Structure du Projet

```
todo-app/
├── backend/             # API REST Node.js/Express
│   ├── server.js        # Point d'entrée du serveur
│   ├── package.json     # Dépendances backend
│   └── Dockerfile       # Configuration Docker pour le backend
├── frontend/            # Application React
│   ├── src/
│   │   ├── App.js       # Composant principal
│   │   └── App.css      # Styles CSS
│   ├── package.json     # Dépendances frontend
│   └── Dockerfile       # Configuration Docker pour le frontend
├── docker-compose.yml   # Configuration Docker Compose
└── .github/workflows/   # Configuration GitHub Actions pour CI/CD
    └── ci-cd.yml        # Pipeline CI/CD
```

## Prérequis

- [Node.js](https://nodejs.org/) (v16 ou plus récent)
- [Docker](https://www.docker.com/get-started) et [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

## Installation et exécution (sans Docker)

### 1. Cloner le dépôt

```bash
git clone <URL_DU_REPO>
cd todo-app
```

### 2. Configurer et démarrer le backend

```bash
cd backend
npm install
# Créer un fichier .env avec la configuration MongoDB si nécessaire
# Par défaut, on utilise mongodb://localhost:27017/todoapp
npm start
```

Le serveur backend sera accessible sur http://localhost:5000

### 3. Configurer et démarrer le frontend

Dans un nouveau terminal :

```bash
cd frontend
npm install
npm start
```

L'application frontend sera accessible sur http://localhost:3000

## Installation et exécution (avec Docker)

Avec Docker, vous pouvez démarrer toute l'application (backend, frontend et MongoDB) en une seule commande:

```bash
docker-compose up
```

Cela va:
- Démarrer MongoDB sur le port 27017
- Construire et démarrer le backend sur le port 5000
- Construire et démarrer le frontend sur le port 3000

Pour arrêter tous les services:

```bash
docker-compose down
```

## Fonctionnalités de l'application

1. **Ajouter une tâche**: Entrez votre tâche et cliquez sur "Ajouter"
2. **Marquer comme terminée**: Cliquez sur la tâche ou sur le bouton rond à côté
3. **Supprimer une tâche**: Cliquez sur le bouton "×" à côté de la tâche

## CI/CD avec GitHub Actions

Le projet est configuré avec un workflow GitHub Actions qui:

1. **Teste** le code à chaque push ou pull request
2. **Construit** les images Docker
3. Est prêt pour le **déploiement** (commenté par défaut)

Pour activer pleinement le CI/CD:

1. Poussez votre code vers un dépôt GitHub
2. Allez dans l'onglet "Actions" de votre dépôt GitHub
3. Vous verrez les workflows s'exécuter automatiquement à chaque push

## Personnalisation pour le déploiement

Pour un déploiement en production, vous devrez probablement:

1. Configurer des variables d'environnement sécurisées (dans GitHub Secrets)
2. Décommenter et configurer la partie "deploy" dans le fichier `.github/workflows/ci-cd.yml`
3. Ajouter une configuration pour votre hébergeur (Heroku, AWS, Azure, etc.)

## Contribution

Les contributions sont les bienvenues! N'hésitez pas à ouvrir des issues ou des pull requests.
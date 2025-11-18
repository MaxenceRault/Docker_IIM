#  Application docker de recette random

Petit projet fullstack pour gérer des recettes avec :
- **Backend** : Node.js + Express + MongoDB (Mongoose)
- **Frontend** : React
- **Base de données** : MongoDB
- Orchestration avec **Docker Compose**

---

##  Prérequis

Avant de lancer le projet, tu dois avoir installé :

- [Docker Desktop](https://www.docker.com/products/docker-desktop)  
  (inclut Docker Engine + Docker Compose)

Vérifier que Docker fonctionne :

```bash
docker --version
docker compose version
````

---

## 📦 Installation & lancement

Cloner le projet (ou télécharger le dossier) puis, dans le dossier racine :

```bash
docker compose up --build
```

Cette commande :

* construit les images `backend`, `frontend` et `mongodb`
* lance les 3 containers ensemble

---

## 🌐 Accès à l'application

Une fois `docker compose up --build` lancé, tu peux accéder à :

* **Frontend (React)** :
  👉 [http://localhost:3000](http://localhost:3000)

* **Backend API (Express)** :
  👉 [http://localhost:5000/api/recipes](http://localhost:5000/api/recipes)

* **MongoDB** :
  exposé sur `localhost:27018` (si tu veux te connecter avec un client type MongoDB Compass)

---

## 🔍 Test rapide de l’API

### 1. Récupérer toutes les recettes

```bash
curl http://localhost:5000/api/recipes
```

### 2. Créer une recette

```bash
curl -X POST http://localhost:5000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pâtes carbonara",
    "ingredients": ["pâtes", "œufs", "lardons", "parmesan"],
    "instructions": "Cuire les pâtes, préparer la sauce, mélanger."
  }'
```

---

## 🧱 Architecture Docker

* **mongodb**

  * image : `mongo:7`
  * port exposé : `27018 -> 27017`
* **backend**

  * Node.js / Express
  * écoute sur `5000`
  * communique avec Mongo via `mongodb://mongodb:27017/recipedb`
* **frontend**

  * React
  * écoute sur `3000`
  * consomme l’API : `http://localhost:5000/api/recipes`

---

## ⏹ Arrêt des containers

Pour arrêter et supprimer les containers (et le réseau associé) :

```bash
docker compose down
```

Pour tout supprimer **y compris les volumes MongoDB** (données effacées) :

```bash
docker compose down -v
```

---

## 📝 Notes

* Le projet est pensé pour être lancé **uniquement** via Docker Compose.
* Le code **backend** se trouve dans `/backend`
* Le code **frontend** se trouve dans `/frontend`


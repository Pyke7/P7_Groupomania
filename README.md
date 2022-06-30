
# P7 Groupomania

Ce projet consiste à créer un MVP d'une application intranet de
l'entreprise Groupomania. Il permettrait d'améliorer l'ambiance entre collègues ainsi que les échanges entre les départements.  

Ceci est le dernier projet de mon parcours de formation __Web développeur__  chez Openclassrooms.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Pyke7/P7_Groupomania.git
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Create .env file and add this

```bash
MYSQL_HOST = "localhost"
MYSQL_USER = "YOUR_SQL_USER"
MYSQL_PASSWORD = "YOUR_SQL_PASSWORD"
MYSQL_DB = "groupomania"

TOKEN_KEY = "RANDOM_SECRET_KEY"
```

Import database ( /backend/database/dump.sql )

```bash
mysql -u <NOM_D'UTILISATEUR> -p groupomania < dump-groupomania-202206281636.sql
```

Start the server

```bash
  nodemon server
```

__With a new terminal__, Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```
Start the server

```bash
  npm start
```
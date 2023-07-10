const config = require("config.json");      //Cette ligne importe le fichier de configuration config.json qui contient les informations de configuration pour la base de données.
const mysql = require("mysql2/promise");    //Cette ligne importe le module mysql2/promise, qui fournit des fonctionnalités pour se connecter à une base de données MySQL à l'aide de promesses.
const { Sequelize } = require("sequelize"); //Cette ligne importe la classe Sequelize du module sequelize. Sequelize est un ORM qui permet de gérer les modèles et les opérations de base de données.

module.exports = db = {};     //Cette ligne exporte un objet vide appelé db pour y stocker les modèles.

initialize();                 //Cette ligne appelle la fonction initialize() pour initialiser la connexion à la base de données.

async function initialize() {
  // create db if it doesn't already exist
  //Cette fonction initialize() crée une connexion à la base de données MySQL 
  //en utilisant les informations de configuration fournies dans config.database. 
  //Ensuite, elle exécute une requête pour créer la base de données si elle n'existe pas déjà.
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  //Cette ligne crée une instance de Sequelize en utilisant les informations de la base de données 
  //(nom, utilisateur, mot de passe) et en spécifiant le dialecte MySQL.
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // init models and add them to the exported db object
  //Cette ligne initialise le modèle d'utilisateur en utilisant le fichier user.model.js 
  //situé dans le répertoire ../users/. Le modèle d'utilisateur est stocké dans db.User.
  db.User = require("../users/user.model")(sequelize);

  // sync all models with database
  //Cette ligne synchronise tous les modèles définis avec la base de données. 
  //L'option alter: true permet à Sequelize de mettre à jour le schéma de la base de données en fonction des définitions de modèle.
  await sequelize.sync({ alter: true });
}

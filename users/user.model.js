const { DataTypes } = require("sequelize");

//Le code défini un modèle Sequelize pour l'entité User dans l'application 

function model(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}

module.exports = model;


//Ce code définit un modèle Sequelize pour l'entité User. Le modèle a les attributs suivants :

//email : de type STRING et non nullable.
//passwordHash : de type STRING et non nullable.
//title : de type STRING et non nullable.
//firstName : de type STRING et non nullable.
//lastName : de type STRING et non nullable.
//role : de type STRING et non nullable.
//Le modèle est défini à l'aide de la méthode define de Sequelize, en spécifiant les attributs 
//et les options. Les options utilisent les scopes pour gérer les attributs inclus 
//et exclus par défaut lors des requêtes. Par défaut, le hash du mot de passe (passwordHash) 
//est exclu des résultats, mais il peut être inclus en utilisant le scope withHash.


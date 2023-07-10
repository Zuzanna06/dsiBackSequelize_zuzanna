const bcrypt = require("bcryptjs");
const db = require("_helpers/db");

//Le code défini un service utilisateur qui interagit avec la base de données pour 
//effectuer des opérations CRUD (Create, Read, Update, Delete) sur les utilisateurs. 

async function getAll() {
  return await db.User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is already registered';
  }

  const user = new db.User(params);

  // hash password
  user.passwordHash = await bcrypt.hash(params.password, 10);

  // save user
  await user.save();
}

async function update(id, params) {
  const user = await getUser(id);

  // validate
  const emailChanged = params.email && user.email !== params.email;
  if (
    emailChanged &&
    (await db.User.findOne({ where: { email: params.email } }))
  ) {
    throw 'Email "' + params.email + '" is already registered';
  }

  // hash password if it was entered
  if (params.password) {
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};


//Ce code définit un service utilisateur qui utilise le modèle d'utilisateur fourni par db.User 
//pour effectuer des opérations sur la base de données. 
//Le service fournit les fonctions suivantes :

//getAll : Récupère tous les utilisateurs de la base de données.
//getById : Récupère un utilisateur par son ID.
//create : Crée un nouvel utilisateur en utilisant les paramètres fournis. Avant de créer l'utilisateur, il vérifie si l'email est déjà enregistré dans la base de données. Le mot de passe fourni est haché avant d'être enregistré.
//update : Met à jour un utilisateur existant avec l'ID spécifié en utilisant les paramètres fournis. Avant de mettre à jour l'utilisateur, il effectue des vérifications similaires à la fonction create pour s'assurer que l'email n'est pas déjà enregistré. Si un nouveau mot de passe est fourni, il est haché avant d'être enregistré.
//delete : Supprime un utilisateur avec l'ID spécifié.

//Il y a également une fonction auxiliaire getUser qui récupère un utilisateur 
//par son ID et génère une erreur si aucun utilisateur correspondant n'est trouvé.

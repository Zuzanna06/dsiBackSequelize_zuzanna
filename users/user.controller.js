const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const Role = require("_helpers/role");
const userService = require("./user.service");
const jwt = require("jsonwebtoken");
const authenticateToken = require("_middleware/token");

// Ce code définir un module qui gère les routes liées aux utilisateurs dans une application Node.js 
//avec l'utilisation de l'express.Router()


// routes

router.get("/", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);
router.post("/", authenticateToken, createSchema, create);
router.put("/:id", authenticateToken, updateSchema, update);
router.delete("/:id", authenticateToken, _delete);

// route functions

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function create(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "User created" }))
    .catch(next);
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: "User updated" }))
    .catch(next);
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({ message: "User deleted" }))
    .catch(next);
}

// schema functions

function createSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().empty(""),
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    role: Joi.string().valid(Role.Admin, Role.User).empty(""),
    email: Joi.string().email().empty(""),
    password: Joi.string().min(6).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  }).with("password", "confirmPassword");
  validateRequest(req, next, schema);
}

module.exports = router;


//Ce code définit les routes suivantes pour les utilisateurs :

//GET / : Récupère tous les utilisateurs.
//GET /:id : Récupère un utilisateur par son ID.
//POST / : Crée un nouvel utilisateur en utilisant les données fournies dans le corps de la requête.
//PUT /:id : Met à jour un utilisateur existant avec l'ID spécifié dans les paramètres de la requête.
//DELETE /:id : Supprime un utilisateur avec l'ID spécifié dans les paramètres de la requête.

//Les fonctions de route correspondantes (getAll, getById, create, update, _delete) 
//appellent les fonctions appropriées du service utilisateur pour effectuer les opérations 
//correspondantes sur la base de données.

//De plus, il existe des fonctions de schéma (createSchema, updateSchema) 
//qui définissent les schémas de validation pour les données d'entrée lors de la création 
//et de la mise à jour d'un utilisateur. Ces fonctions utilisent la bibliothèque Joi pour valider les données.
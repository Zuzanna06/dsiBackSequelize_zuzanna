function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    req.body = value;
    next();
  }
}

//Cette fonction prend trois paramètres : req (la requête HTTP), 
//next (la fonction suivante à appeler dans le pipeline de traitement de la requête) 
//et schema (le schéma de validation). Voici son fonctionnement :

//-La fonction crée un objet options contenant différentes options de validation. 
//abortEarly: false indique de ne pas arrêter la validation après la première erreur 
//et d'inclure toutes les erreurs. allowUnknown: true spécifie d'ignorer 
//les propriétés inconnues dans l'objet à valider. stripUnknown: 
//true indique de supprimer les propriétés inconnues de l'objet validé.

//-Ensuite, la fonction utilise le schéma fourni (schema) pour valider req.body 
//(le corps de la requête HTTP) en utilisant schema.validate(). 
//Cette méthode retourne un objet contenant deux propriétés : error 
//(s'il y a une erreur de validation) et value (la valeur validée).

//-Si une erreur de validation est présente (error n'est pas null), 
//la fonction invoque next en lui passant un message d'erreur formaté 
//à partir des détails de l'erreur (error.details). 
//Le message d'erreur est généré en utilisant map() pour extraire 
//le message de chaque détail d'erreur, puis join(", ") 
//pour les concaténer avec une virgule et un espace.

//-Si aucune erreur de validation n'est présente, la fonction met à jour req.body 
//avec la valeur validée (value) et invoque next pour passer 
//à la fonction suivante dans le pipeline de traitement de la requête.

//Ensuite, le code suivant exporte la fonction validateRequest en tant que module :

module.exports = validateRequest;

//Cela permet d'importer et d'utiliser la fonction validateRequest 
//dans d'autres parties de l'application pour valider les requêtes HTTP 
//en fonction de schémas spécifiques. Par exemple, dans une route Express, 
//vous pouvez utiliser validateRequest(req, next, schema) pour valider le corps 
//de la requête (req.body) avant de passer à la fonction suivante dans 
//le pipeline de traitement de la requête.

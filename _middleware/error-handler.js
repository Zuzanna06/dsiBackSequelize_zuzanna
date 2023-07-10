function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === "string":
      // custom application error
      const is404 = err.toLowerCase().endsWith("not found");
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ message: err });
    default:
      return res.status(500).json({ message: err.message });
  }
}
//Cette fonction prend quatre paramètres : err, req, res, et next. 
//Elle est utilisée comme middleware d'erreur dans une application Express 
//pour gérer les erreurs. Voici son fonctionnement :

//Si l'erreur (err) est de type string, cela signifie qu'il s'agit 
//d'une erreur spécifique à l'application. Dans ce cas, la fonction vérifie 
//si l'erreur se termine par la chaîne de caractères "not found" 
//en utilisant endsWith("not found"). Si c'est le cas, 
//cela peut indiquer une erreur 404 (ressource non trouvée). 
//Sinon, l'erreur est considérée comme une erreur 400 (mauvvaise requête). 
//En fonction de cela, la fonction détermine le code d'état approprié (statusCode) 
//et renvoie une réponse JSON avec le message d'erreur (err). Par exemple, 
//si err est "User not found", la fonction renvoie une réponse avec 
//le code d'état 404 et le message { message: "User not found" }.

//Si l'erreur n'est pas de type string (c'est-à-dire une autre erreur générée par 
//le système), la fonction renvoie une réponse avec le code d'état 500 (erreur interne du serveur) 
//et le message d'erreur générique (err.message).

//Cela permet d'importer et d'utiliser la fonction errorHandler dans d'autres parties de l'application 
//pour gérer les erreurs de manière centralisée. Par exemple, dans une route Express, 
//vous pouvez utiliser app.use(errorHandler) pour appliquer ce middleware d'erreur 
//à toutes les requêtes et réponses.
module.exports = errorHandler;

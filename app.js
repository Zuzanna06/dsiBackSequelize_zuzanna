//Ce code configure et démarre le serveur

const { app, port } = require("./server");
//Importe l'instance d'application "app" et le numéro de port "port" à partir du module "server". 

const path = require("./routes");
//Importe le module routes qui contient les définitions des "routes" de serveur.

const cors = require("cors");
//Importe le module cors pour gérer les autorisations CORS (Cross-Origin Resource Sharing).

app.use(cors());
//Active le middleware cors pour toutes les routes de  serveur, ce qui permettra les requêtes 
//cross-origin.

path.articlesPath(app);
//Ajoute les routes liées aux articles à l'application en utilisant la fonction articlesPath 
//définie dans le module routes.

path.mediasPath(app);
//Ajoute les routes liées aux médias à l'application en utilisant la fonction mediasPath 
//définie dans le module routes.

path.loginPath(app);
//Ajoute les routes liées à l'authentification à l'application en utilisant la fonction loginPath 
//définie dans le module routes.


app.listen(port, () => {
  console.log("Server listening on port " + port);
});

//Démarre le serveur en écoutant sur le port spécifié. 
//Lorsque le serveur démarre, la fonction de rappel est exécutée et affiche un message 
//dans la console indiquant que le serveur écoute sur le port spécifié.

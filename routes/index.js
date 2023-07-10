const articlesPath = require('./articles'); //Cette ligne importe le contenu du fichier articles.js situé dans le même répertoire et l’assigne à la variable articlesPath.
const mediasPath = require('./medias'); //Cette ligne importe le contenu du fichier medias.js situé dans le même répertoire et l’assigne à la variable mediasPath.
const loginPath = require('./login');   //Cette ligne importe le contenu du fichier login.js situé dans le même répertoire et l’assigne à la variable loginPath.

module.exports = {articlesPath, mediasPath, loginPath}; //Cette ligne exporte les variables articlesPath, mediasPath et usersPath pour qu’elles puissent être utilisées dans d’autres fichiers en utilisant la méthode require.


//module qui exporte plusieurs chemins de routes pour différents domaines de mon application

//Ce code importe les modules articlesPath, mediasPath et loginPath depuis les fichiers correspondants 
//(articles.js, medias.js et login.js respectivement), puis exporte ces modules en tant qu'objets.

//Cela me permet d'organiser tmon code en séparant les routes liées aux articles, aux médias 
//et à la connexion dans des fichiers séparés, 
//et d'importer ces chemins de routes dans mes fichier principal pour les utiliser dans ton application.
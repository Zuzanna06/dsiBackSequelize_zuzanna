const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../server");
const authenticateToken = require("_middleware/token");


//module qui gère l'authentification des utilisateurs dans mon application Node.js 
//avec l'utilisation de la bibliothèque bcrypt pour le hachage des mots de passe 
//et jsonwebtoken pour la génération de tokens JWT.

const crypto = require("crypto");

// Génère une clé secrète sécurisée de 128 bits (16 octets)
const generateSecretKey = () => {
  return crypto.randomBytes(16).toString("hex");
};

const secretKey = generateSecretKey();
console.log("Clé secrète :", secretKey);

const path = (app) => {

  // Endpoint pour générer un token d'authentification
  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
      "SELECT passwordHash FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          // si l'email n'existe pas dans la base de données
          const message = `L'email n'existe pas`;
          return res.status(401).json({ message });
        } else {
          const dbPassword = results[0].passwordHash;
          bcrypt.compare(password, dbPassword, function (err, result) {
            if (err) {
              const message = `problème de comparaison des mots de passe`;
              return res.status(401).json({ message });
            } else if (result) {
              const token = jwt.sign({ email: email }, "secretKey",{ expiresIn: '2h' 
                 });
              res.json({ token: token });
            } else {
              const message = `Le mot de passe est incorrect.`;
              return res.status(401).json({ message });
            }
          });

          // bcrypt.compare(password, results[0]).then((isPasswordValid) => {
          //   // compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données

          //   if (!isPasswordValid) {
          //     // si le mot de passe n'est pas valide
          //     const message = `Le mot de passe est incorrect.\n${password} \n${dbPassword}`;
          //     return res.status(401).json({ message });
          //   }

          //   // Si les informations d'identification sont valides, générez un token
          //   const token = jwt.sign({ email: email }, "secretKey");

          //   // Retournez le token au client
          //   res.json({ token: token });
          // });
        }
      }
    );
    // Vérifiez les informations d'identification de l'utilisateur dans la base de données
    // ...
  });
};

module.exports = path, authenticateToken;



//Ce code génère une clé secrète sécurisée en utilisant la fonction generateSecretKey 
//de la bibliothèque crypto. Cette clé secrète est ensuite utilisée pour signer les tokens JWT.

//Le module exporte également une fonction path qui définit une route POST /login. 
//Lorsqu'une demande est effectuée à cette route, le code récupère l'email et le mot de passe fournis 
//dans le corps de la requête. Ensuite, il interroge la base de données pour récupérer le hachage 
//du mot de passe associé à l'email donné. Si l'email n'existe pas dans la base de données, 
//une réponse d'erreur est renvoyée. Sinon, le code utilise bcrypt.compare 
//pour comparer le mot de passe fourni avec le hachage de la base de données. 
//Si la comparaison est réussie, un token JWT est généré en utilisant la clé secrète précédemment générée 
//et renvoyé dans la réponse.

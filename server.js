//Ce code configure et démarre le serveur. 

require("rootpath")();              //Cette ligne est utilisée pour définir le chemin racine du projet en utilisant le package rootpath.
const express = require("express"); //Importe le framework Express pour la création de l'application web.
const cors = require("cors");       //Importe le module cors pour gérer les autorisations CORS (Cross-Origin Resource Sharing).
const multer = require("multer");   //Importe le module multer pour la gestion des téléchargements de fichiers.
const mysql = require("mysql");     //Importe le module mysql pour interagir avec la base de données MySQL.
const app = express();              //Crée une instance de l'application Express.
const errorHandler = require("_middleware/error-handler");  // Importe le middleware error-handler pour gérer les erreurs globalement dans l'application.
const port = 3004;                  //Définit le numéro de port sur lequel le serveur écoutera les requêtes.

app.use(cors());                    //Active le middleware cors pour toutes les routes de ton serveur, ce qui permettra les requêtes cross-origin.
app.use(express.json());            //Active le middleware express.json() pour analyser le corps des requêtes au format JSON.
app.use(express.urlencoded({ extended: true }));    //Active le middleware express.urlencoded() pour analyser le corps des requêtes avec des données encodées au format URL.

// api routes
app.use("/users", require("./users/user.controller")); //Associe les routes définies dans le fichier ./users/user.controller.js aux URL qui commencent par "/users".

// global error handler
app.use(errorHandler); //Active le middleware errorHandler pour gérer les erreurs globalement dans l'application.

const db = mysql.createConnection({     
  //Crée une connexion à la base de données MySQL en utilisant les informations de connexion fournies.
  host: "localhost",
  user: "root",
  password: "rootroot",
  port: 3306,
  database: "dsimed",
});


db.connect((err) => {
  //Se connecte à la base de données en utilisant la connexion créée et affiche un message dans la console si la connexion est réussie.
  if (err) throw err;
  console.log("Connecté à la base de données");
});


const storage = multer.diskStorage({
//Configure le stockage pour les téléchargements de fichiers en utilisant le module multer. Dans cet exemple, les fichiers télécharg
  destination: "uploads/",
  upload: (req, fichier, cb) => {
    //  Générer un nom de fichier unique en ajoutant un horodatage au nom de fichier d’origine
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Créer une instance Multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Définir un itinéraire pour le téléchargement de fichiers
app.post("/upload", upload.single("file"), (req, res) => {
  //  Obtenir les détails du fichier téléchargé
  const file = req.file;

  // Insérer le chemin d’accès au fichier dans la base de données
  const filePath = file.path;
  db.query(
    "INSERT INTO media_files (file_path) VALUES (?)",
    [filePath],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            "Erreur lors de l’insertion d’un fichier dans la base de données"
          );
      } else {
        res.send("Fichier téléchargé et inséré dans la base de données");
      }
    }
  );
});

module.exports = { app, port, db };

//les propriétés app, port et db. Cela permet à d'autres fichiers de les importer 
//en utilisant la syntaxe require et d'accéder à ces valeurs. 



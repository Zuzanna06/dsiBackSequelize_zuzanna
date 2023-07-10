const { db } = require("../server");  //Cette ligne importe l’objet db à partir du fichier server.js situé dans le répertoire parent.
const authenticateToken = require("_middleware/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const path = (app) => { //Cette ligne définit une fonction nommée path qui prend en paramètre un objet app.
   // GET route pour récupérer tous les articles
  app.get("/articles", authenticateToken, (req, res) => {
    const q = "SELECT * FROM articles";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });

  // POST route pour créer un nouvel article
  app.post("/articles", authenticateToken, (req, res) => {
    // Récupérer les données de la requête
    const titre = req.body.titre;
    const content = req.body.content;
    const date_publication = req.body.date_publication;
    const id_users = req.body.id_users;
    const id_medias = req.body.id_medias;

    // Vérifier si les champs obligatoires sont présents
    if (!titre) {
      res.status(400).json({ error: "Le titre de l'article est obligatoire" });
      return;
    }
    if (!content) {
      res.status(400).json({ error: "Le contenu de l'article est obligatoire" });
      return;
    }
    if (!date_publication) {
      res.status(400).json({ error: "La date de publication de l'article est obligatoire" });
      return;
    }
    if (!id_users) {
      res.status(400).json({ error: "La date de publication de l'article est obligatoire" });
      return;
    }
    if (!id_medias) {
      res.status(400).json({ error: "La date de publication de l'article est obligatoire" });
      return;
    }

    // Insérer les données dans la base de données
    db.query(
      "INSERT INTO articles(titre, content, date_publication, id_users, id_medias) VALUES(?, ?, ?, ?, ?)",
      [titre, content, date_publication, id_users, id_medias],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Articles créé avec succès" });
        }
      }
    );
  });

  // PUT route pour mettre à jour un article existant
  app.put("/articles/:id", authenticateToken, (req, res) => {
    // Récupérer l'ID de l'article à mettre à jour
    const id_articles = req.params.id;
    // Récupérer les données de la requête
    const { titre, content, date_publication, id_users, id_medias } = req.body;
    
    // Mettre à jour les données dans la base de données
    db.query(
      "UPDATE articles SET titre = ?, content = ?, date_publication = ?, id_users = ?, id_medias = ?  WHERE id_articles = ?",
      [titre, content, date_publication, id_users, id_medias, id_articles],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Article modifié avec succès" });
        }
      }
    );
  });

  // PATCH route pour mettre à jour partiellement un article existant
  app.patch("/articles/:id/:value", authenticateToken, (req, res) => {
    // Récupérer l'ID de l'article à mettre à jour
    const id_articles = req.params.id;

    // Récupérer la valeur à mettre à jour
    let value = {};
    if (req.params.value === "titre") {
      value = req.body.titre;
      reqSql = "UPDATE articles SET titre = ? WHERE id_articles = ?";
    } else if (req.params.value === "content") {
      value = req.body.content;
      reqSql = "UPDATE articles SET content = ? WHERE id_articles = ?";
    } else if (req.params.value === "date_publication") {
      value = req.body.date_publication;
      reqSql = "UPDATE articles SET date_publication = ? WHERE id_articles = ?";
    } else if (req.params.value === "id_users") {
      value = req.body.id_users;
      reqSql = "UPDATE articles SET id_users = ? WHERE id_articles = ?";
    } else if (req.params.value === "id_medias") {
      value = req.body.id_medias;
      reqSql = "UPDATE articles SET id_medias = ? WHERE id_articles = ?";
    } else {
      console.error("error");
    }

    // Mettre à jour les données dans la base de données
    db.query(reqSql, [value, id_articles], (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Articles modifié avec succès" });
      }
    });
  });

  // DELETE route pour supprimer un article existant
  app.delete("/articles/:id", authenticateToken, (req, res) => {
    // Récupérer l'ID de l'article à supprimer
    const id = req.params.id;

    // Supprimer l'article de la base de données
    db.query(
      "DELETE FROM articles WHERE id_articles = ?",
      [id],
      (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
          res.status(404).send("Articles non trouvé");
        } else {
          res.status(200).json({ message: "Articles supprimé avec succès" });
        }
      }
    );
  });
};

module.exports = path;


//Ce code définit les routes suivantes :

//GET /articles : Récupère tous les articles de la base de données.
//POST /articles : Crée un nouvel article en utilisant les données fournies dans le corps de la requête.
//PUT /articles/:id : Met à jour un article existant avec l'ID spécifié dans les paramètres de la requête.
//PATCH /articles/:id/:value : Met à jour partiellement un article existant avec l'ID spécifié dans les paramètres de la requête et la valeur spécifiée pour le champ à mettre à jour.
//DELETE /articles/:id : Supprime l'article avec l'ID spécifié dans les paramètres de la requête.

//Je m'assure d'adapter ce code en fonction de ta configuration de base de données et des dépendances nécessaires.
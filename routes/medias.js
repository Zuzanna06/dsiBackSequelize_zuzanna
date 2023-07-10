const { db } = require("../server");
const authenticateToken = require("_middleware/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Ce code  définir un module qui gère les routes liées aux médias dans une application Node.js 
//avec l'utilisation d'une base de données


const path = (app) => {
  // GET route pour récupérer tous les médias
  app.get("/medias", authenticateToken, (req, res) => {
    const q = "SELECT * FROM medias";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  // POST route pour créer un nouveau média
  app.post("/medias", authenticateToken, (req, res) => {
    // Récupérer les données de la requête
    const reference_media = req.body.reference_media;
    const url = req.body.url;

    // Vérifier si les champs obligatoires sont présents
    if (!reference_media) {
      res.status(400).json({ error: "La reference du média est obligatoire" });
      return;
    }
    if (!url) {
      res.status(400).json({ error: "L'url du média est obligatoire" });
      return;
    }

    // Insérer les données dans la base de données
    db.query(
      "INSERT INTO medias(reference_media, url) VALUES(?, ?)",
      [reference_media, url],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Média créé avec succès" });
        }
      }
    );
  });

  // PUT route pour mettre à jour un média existant
  app.put("/medias/:id", authenticateToken, (req, res) => {
    // Récupérer les données de la requête
    const { reference_media, url } = req.body;
    // Récupérer l'ID du média à mettre à jour
    const id_medias = req.params.id;

    // Mettre à jour les données dans la base de données
    db.query(
      "UPDATE medias SET reference_media = ?, url = ? WHERE id_medias = ?",
      [reference_media, url, id_medias],
      (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send("Erreur du serveur");
        } else {
          res.status(201).json({ message: "Media modifié avec succès" });
        }
      }
    );
  });

  // PATCH route pour mettre à jour partiellement un média existant
  app.patch("/medias/:id/:value", authenticateToken, (req, res) => {
    // Récupérer l'ID du média à mettre à jour
    const id_medias = req.params.id;

    // Récupérer la valeur à mettre à jour
    let value = {};
    if (req.params.value === "reference_media") {
      value = req.body.reference_media;
      reqSql = "UPDATE medias SET reference_media = ? WHERE id_medias = ?";
    } else if (req.params.value === "url") {
      value = req.body.url;
      reqSql = "UPDATE medias SET url = ? WHERE id_medias = ?";
    } else {
      console.error("error");
    }

    // Mettre à jour les données dans la base de données
    db.query(reqSql, [value, id_medias], (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Média modifié avec succès" });
      }
    });
  });

  // DELETE route pour supprimer un média existant
  app.delete("/medias/:id", authenticateToken, (req, res) => {
    // Récupérer l'ID du média à supprimer
    const id = req.params.id;

    // Supprimer le média de la base de données
    db.query("DELETE FROM medias WHERE id_medias = ?", [id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).send("Média non trouvé");
      } else {
        res.status(200).json({ message: "Média supprimé avec succès" });
      }
    });
  });
};

module.exports = path;



//Ce code définit les routes suivantes pour les médias :

//GET /medias : Récupère tous les médias de la base de données.
//POST /medias : Crée un nouveau média en utilisant les données fournies dans le corps de la requête.
//PUT /medias/:id : Met à jour un média existant avec l'ID spécifié dans les paramètres de la requête.
//PATCH /medias/:id/:value : Met à jour partiellement un média existant avec l'ID spécifié dans les paramètres de la requête et la valeur spécifiée pour le champ à mettre à jour.
//DELETE /medias/:id : Supprime le média avec l'ID spécifié dans les paramètres de la requête.
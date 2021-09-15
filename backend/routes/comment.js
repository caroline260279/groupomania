//création de routes pour dissocier la logique de routing de la logique métier

//importation du package express
const express = require("express");
//création du router express
const router = express.Router();

//importation de la "logique métier" des commentaires
const commentCtrl = require("../controllers/comment");
//importation du middelware d'authentification
const auth = require("../middelware/auth");

//création des routes avec les différents endpoints de l'application et les middelwares necessaires

//route pour créer un commentaire, nécessite l'authentification
router.post("/comment/:id", auth, commentCtrl.createComment);
//route pour créer un commentaire, nécessite l'authentification
router.put("/comment/modify/:id", auth, commentCtrl.modifyComment);
//route pour accéder à un commentaire, nécessite l'authentification
router.get("/comment/getOne/:id", auth, commentCtrl.getOneComment);
//route pour accéder à tous les commentaires, nécessite l'authentification
router.post("/comment/getAll/:id", auth, commentCtrl.getAllComment);

//exportation du router
module.exports = router;

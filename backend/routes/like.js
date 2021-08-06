//création de routes pour dissocier la logique de routing de la logique métier

//importation du package express
const express = require("express");
//création du router express
const router = express.Router();

//importation de la "logique métier" des likes
const likeCtrl = require("../controllers/like");
//importation du middelware d'authentification
const auth = require("../middelware/auth");

//route pour créer le like/dislike
router.post("/like/:id", auth, likeCtrl.createLike);

//route modifier un like ou un dislike, necessite l'authentification
router.put("/like/modify/:id", auth, likeCtrl.likeGif);

//exportation du router
module.exports = router;

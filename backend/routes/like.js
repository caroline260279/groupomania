//création de routes pour dissocier la logique de routing de la logique métier

//importation du package express
const express = require("express");
//création du router express
const router = express.Router();

//importation de la "logique métier" des likes
const likeCtrl = require("../controllers/like");
//importation du middelware d'authentification
const auth = require("../middelware/auth");

//route pour récupérer les likes
router.get("/getOneLike/:id", auth, likeCtrl.getOneLike);

//route pour récupérer les likes
router.get("/getOneLikeUser/:id", auth, likeCtrl.getOneLikeUser);

//route pour récupérer les likes
router.get("/getAllLike/:id", auth, likeCtrl.getAllLike);

//route pour récupérer les likes
router.get("/getAllLikeUser/:id", auth, likeCtrl.getAllLikeUser);

//route pour créer le like
router.post("/like/:id", auth, likeCtrl.createLike);

//route modifier un like, necessite l'authentification
router.delete("/like/delete/:id", auth, likeCtrl.dislikeGif);

//exportation du router
module.exports = router;

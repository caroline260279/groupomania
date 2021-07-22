//création de routes pour dissocier la logique de routing de la logique métier

//importation du package express
const express = require("express");
//création du router express
const router = express.Router();

//importation de la "logique métier" des sauces (les fonctions)
const gifCtrl = require("../controllers/gif");
//importation du middelware d'authentification
const auth = require("../middelware/auth");
//importation du middelware multer
const multer = require("../middelware/multer-config");

//création des routes avec les différents endpoints de l'application et les middelwares necessaires

//route pour créer une sauce nécessite l'authentification et multer pour l'image
router.post("/", multer, gifCtrl.createGif);
//route pour récupérer toutes les sauces, necessite l'authentification
router.get("/gif", gifCtrl.getAllGif);
//route pour récupérer une sauce, necessite l'authentification
router.get("/gifid", gifCtrl.getOneGif);
//route pour modifier une sauce, necessite l'authentification et multer pour l'image
router.put("/gifid/modify", multer, gifCtrl.modifyGif);
//route pour supprime une sauce, necessite l'authentification
router.delete("/gifid/delete", gifCtrl.deleteGif);
//route pour liker ou disliker une sauce, necessite l'authentification
router.post("/like", gifCtrl.likeGif);

//exportation du router
module.exports = router;

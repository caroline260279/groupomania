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
router.post("/", auth, multer, gifCtrl.createGif);
//route pour récupérer une sauce, necessite l'authentification
router.get("/:id", auth, gifCtrl.getOneGif);
//route pour modifier une sauce, necessite l'authentification et multer pour l'image
router.put("/modify/:id", auth, multer, gifCtrl.modifyGif);
//route pour supprime une sauce, necessite l'authentification
router.delete("/delete/:id", auth, gifCtrl.deleteGif);
//route pour récupérer toutes les sauces d'un user, necessite l'authentification
router.get("/gif/:username", gifCtrl.getAllGifUser);
//route pour récupérer toutes les sauces, necessite l'authentification
router.post("/gif", gifCtrl.getAllGif);

//exportation du router
module.exports = router;

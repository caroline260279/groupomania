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

//route pour créer un gif nécessite l'authentification et multer pour l'image
router.post("/", auth, multer, gifCtrl.createGif);
//route pour récupérer un gif, necessite l'authentification
router.get("/:id", auth, gifCtrl.getOneGif);
//route pour modifier un gif, necessite l'authentification et multer pour l'image
router.put("/modify/:id", auth, multer, gifCtrl.modifyGif);
//route pour supprime un gif, necessite l'authentification
router.delete("/delete/:id", auth, gifCtrl.deleteGif);
//route pour récupérer tous les gifs d'un user, necessite l'authentification
router.get("/gif/:username", auth, gifCtrl.getAllGifUser);
//route pour récupérer tous les gifs, necessite l'authentification
router.post("/gif", auth, gifCtrl.getAllGif);

//exportation du router
module.exports = router;

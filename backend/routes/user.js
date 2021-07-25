//importation du package express
const express = require("express");
//création du router express
const router = express.Router();

const auth = require("../middelware/auth");

//importation de la "logique métier" des sauces (les fonctions)
const userCtrl = require("../controllers/user");

//importation du package express-rate-limit
const rateLimit = require("express-rate-limit");

//constante pour limiter le nombre de tentatives de login
const limiter = rateLimit({
    // Voici l’équivalent de 5 minutes
    windowMs: 2 * 60 * 1000,
    // Le client pourra donc faire 5 requêtes toutes les 2 minutes
    max: 5,
    //message informant l'utilisateur
    message:
        " Trop de tentatives de connexion ! Essayez à nouveau dans 2 minutes. ",
});

//constante pour valider le password
const validPassword = require("../middelware/password");

//création des routes avec les différents endpoints de l'application

//route de création du user
router.post("/signup", userCtrl.signup);
//route de login
router.post("/login", limiter, userCtrl.login);
//route de suppression du user
router.delete("/delete", auth, limiter, userCtrl.delete);

//exportation du router
module.exports = router;

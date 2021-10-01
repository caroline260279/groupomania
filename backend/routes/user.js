//importation du package express
const express = require("express");
//création du router express
const router = express.Router();

const auth = require("../middelware/auth");

//importation de la "logique métier" des users
const userCtrl = require("../controllers/user");

//importation du package express-rate-limit
const rateLimit = require("express-rate-limit");
//importation du middelware multer
const multer = require("../middelware/multer-config");

//constante pour limiter le nombre de tentatives de login
const limiter = rateLimit({
    // Le client pourra faire 5 requêtes toutes les 2 minutes
    windowMs: 2 * 60 * 1000,
    max: 5,
    message:
        " Trop de tentatives de connexion ! Essayez à nouveau dans 2 minutes. ",
});

//constante pour valider le password
const validPassword = require("../middelware/password");

//création des routes avec les différents endpoints de l'application

//route pour l'inscription
router.post("/signup", validPassword, multer, userCtrl.signup);
//route pour se loguer
router.post("/login", limiter, userCtrl.login);
//route de suppression de compte
router.delete("/delete", auth, userCtrl.delete);
//route pour trouver un utilisateur
router.get("/user", auth, userCtrl.findUser);
//route pour renvoyer l'utilisateur connecté
router.get("/user/connected", auth, userCtrl.userConnected);
//route pour trouver un utilisateur avec son id
router.get("/:id", auth, userCtrl.findOneUser);
//route pour trouver un utilisateur avec son username
router.get("/user/:username", auth, userCtrl.findOneUserUsername);
//route pour trouver tous les utilisateurs
router.post("/allUser", auth, userCtrl.findAllUser);
//route pour modifier un utilisateur
router.put("/modify/:id", auth, multer, userCtrl.modify);
//route pour modifier le mot de passe
router.put("/modify/pw/:id", auth, multer, userCtrl.updatePw);

//exportation du router
module.exports = router;

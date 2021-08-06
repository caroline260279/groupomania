//importation du package express
const express = require("express");
//création du router express
const router = express.Router();

const auth = require("../middelware/auth");

//importation de la "logique métier" des sauces (les fonctions)
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
router.post("/signup", multer, userCtrl.signup);
router.post("/login", limiter, userCtrl.login);
router.delete("/delete", auth, limiter, userCtrl.delete);
router.get("/user", auth, userCtrl.findUser);
router.get("/user/connected", auth, userCtrl.userConnected);
router.get("/:id", auth, userCtrl.findOneUser);
router.post("/allUser", auth, userCtrl.findAllUser);
router.put("/modify/:id", auth, multer, userCtrl.modify);
router.put("/modify/pw/:id", auth, multer, userCtrl.updatePw);

//exportation du router
module.exports = router;

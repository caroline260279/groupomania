//middelware pour vérifier le token d'authenfication et sécuriser les routes sensibles de l'application

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//exportation du middelware d'authentification
module.exports = (req, res, next) => {
    try {
        //on récuperer le token qui se trouve dans le header autorisation
        //on recupere un tableau avec 2 éléments (séparés par l'espace)
        //on veut le 2eme élément
        const token = req.headers.authorization.split(" ")[1];

        //on décode le token avec la clef secrète
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

        //on recupere le userId encodé
        const userId = decodedToken.userid;

        //si il y a un userid et qu'il ne correspond pas à celui de la requête, renvoie "Utilisateur non valie"
        if (req.body.userid && req.body.userid !== userId) {
            throw "Utilisateur non valide";
        }
        //sinon on passe au middelware suivant
        else {
            next();
        }
    } catch (error) {
        //revoie une erreur ou "requête non authentifiée"
        res.status(401).json({
            message: "Requête non authentifiée !",
        });
    }
};

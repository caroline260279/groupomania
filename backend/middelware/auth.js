//middelware pour vérifier le token d'authenfication et sécuriser les routes sensibles de l'application

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//exportation du middelware d'authentification
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userid;
        if (req.body.userid && req.body.userid !== userId) {
            throw "Utilisateur non valide";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({
            message: "Requête non authentifiée !",
        });
    }
};

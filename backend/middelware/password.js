//importation du model de données pour le password
const passwordValid = require("../models/password");

module.exports = (req, res, next) => {
    if (!passwordValid.validate(req.body.password)) {
        return res.status(401).json({
            error: "mot de passe requis:majuscule, minuscule, 1 chiffre,1 symbole !",
        });
    } else {
        next();
    }
};

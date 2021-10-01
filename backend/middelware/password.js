//importation du model de données pour le password
const passwordValid = require("../models/password");

module.exports = (req, res, next) => {
    if (!passwordValid.validate(req.body.password)) {
        console.log(req.body.password);
        return res.status(401).json({
            error: "mot de passe requis:majuscule, minuscule, 2 chiffres,1 symbole, pas d'espace !",
        });
    } else {
        next();
    }
};

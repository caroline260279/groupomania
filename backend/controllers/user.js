//création de la logique métier pour les users

//importation du package bcrypt (cryptage)
const bcrypt = require("bcrypt");
//importation du model user
const model = require("../models/index");

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//création du middelware signup
exports.signup = (req, res, next) => {
    //hachage du mdp avec 10 tours de l'algorithme
    /* bcrypt
        .hash(req.body.password, 10)
        //recupation du hash
        .then((hash) => {*/
    //création du nouvel utilisateur
    model.User.create({
        //avec l'email recupéré dans le body de la requete
        email: req.body.email,
        name: req.body.name,
        firstname: req.body.firstname,
        username: req.body.username,
        //et avec le hash comme mdp
        password: req.body.password,
    })
        .then(() =>
            res.status(201).json({
                message: "Utilisateur créé !",
            })
        )
        .catch((error) =>
            res.status(400).json({
                error,
            })
        );
    /* })
        //sinon retourne une erreur
        .catch((error) =>
            res.status(500).json({
                error: "erreur",
            })
        );*/
};

//création du middelware login
exports.login = (req, res, next) => {
    res.status(200).send("login");
};

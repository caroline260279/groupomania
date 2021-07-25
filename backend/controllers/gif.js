//création de la logique métier pour les sauces

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//importation du model de données pour les sauces
const model = require("../models/index");

//importation du package fs (file system)
const fs = require("fs");

//création d'une nouvelle sauce
exports.createGif = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    console.log(req.body.userid && req.body.userid !== userId);
    model.Gif.create({
        userid: userId,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
    })
        .then(() =>
            res.status(201).json({
                message: "Gif créé !",
            })
        )
        .catch((error) =>
            res.status(400).json({
                error,
            })
        );
};

//accéder aux informations d'une sauce en particulier
exports.getOneGif = (req, res, next) => {
    res.status(200).send("getOneGif");
};

//modification de la sauce selectionnée
exports.modifyGif = (req, res, next) => {
    res.status(200).send("modifyGif");
};

//suppression de la sauce selectionnée
exports.deleteGif = (req, res, next) => {
    res.status(200).send("deleteGif");
};

//récupération de toutes les sauces
exports.getAllGif = (req, res, next) => {
    res.status(200).send("getAllGif");
};

//mettre un like ou un dislike, ajouter l'utilisateur
exports.likeGif = (req, res, next) => {
    res.status(200).send("likeGif");
};

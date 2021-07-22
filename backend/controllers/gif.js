//création de la logique métier pour les sauces

//importation du model de données pour les sauces
const Gif = require("../models/gif");

//importation du package fs (file system)
const fs = require("fs");

//création d'une nouvelle sauce
exports.createGif = (req, res, next) => {
    res.status(200).send("createGif");
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

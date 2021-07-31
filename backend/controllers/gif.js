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
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
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

//accéder aux informations d'un gif en particulier
exports.getOneGif = (req, res, next) => {
    model.Gif.findOne({ where: { id: req.params.id } })
        .then((gifs) => res.status(200).send(gifs))
        .catch((error) => res.status(400).json({ error }));
};

//modification du gif selectionné
exports.modifyGif = (req, res, next) => {
    const gifObject = req.file
        ? {
              ...req.body,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    model.Gif.update(
        { ...gifObject, id: req.params.id },
        { where: { id: req.params.id } }
    )
        .then(() => res.status(200).json({ message: "Gif modifié !" }))
        .catch((error) =>
            res.status(400).json({
                error,
            })
        );
};

//suppression du gif selectionné
exports.deleteGif = (req, res, next) => {
    console.log(req.params.id);
    model.Gif.findOne({ where: { id: req.params.id } })
        .then((gifs) => {
            const filename = gifs.imageUrl.split("/images/")[1];
            //on utilise la fonction unlink du package fs pour supprimer ce fichier
            fs.unlink(`images/${filename}`, () => {
                //une fois le fichier supprimer on supprime le gif de la base de données
                model.Gif.destroy({ where: { id: req.params.id } })
                    .then(() =>
                        res.status(200).json({ message: "gif supprimé !" })
                    )
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

//récupération de tous les gifs
exports.getAllGif = (req, res, next) => {
    model.Gif.findAll({ order: ["updateAt", "ASC"] }).then((gifs) => {
        res.status(200).json(gifs);
    });
    /* .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });*/
};

//récupération de tous les gifs d'un user
exports.getAllGifUser = (req, res, next) => {
    res.status(200).send("gifUser");
};
//mettre un like ou un dislike, ajouter l'utilisateur
exports.likeGif = (req, res, next) => {
    res.status(200).send("likeGif");
};

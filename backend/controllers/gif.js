//création de la logique métier pour les gifs

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//importation du model de données pour les gifs
const model = require("../models/index");

//importation du package fs (file system)
const fs = require("fs");

//création d'un gif
exports.createGif = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
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
exports.getOneGif = (req, res) => {
    model.Gif.findOne({ where: { id: req.params.id } })
        .then((gifs) => res.status(200).send(gifs))
        .catch((error) => res.status(400).json({ error }));
};

//modification du gif selectionné
exports.modifyGif = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;

    const result = await model.Gif.findOne({
        where: { id: req.params.id },
    });
    if (userId !== result.userid) {
        return res.status(401).json({
            error: "Vous n'êtes pas autorisé à modifier ce gif !",
        });
    } else {
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
    }
};

//suppression du gif selectionné
exports.deleteGif = (req, res) => {
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

//récupération de tous les gifs avec le username
exports.getAllGifUser = async (req, res) => {
    const userTofind = await model.User.findOne({
        where: { username: req.params.username },
    });
    const userId = userTofind.id;
    model.Gif.findAll({
        where: { userid: userId },
        order: [["updatedAt", "DESC"]],
        include: [model.User, model.Gif_like],
    })
        .then((gifs) => {
            res.status(200).send(gifs);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

//récupération de tous les gifs
exports.getAllGif = (req, res) => {
    model.Gif.findAll({
        order: [["updatedAt", "DESC"]],
        include: [model.User, model.Gif_like],
    })
        .then((gifs) => {
            res.status(200).send(gifs);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

//création de la logique métier pour les sauces

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//importation du model de données pour les sauces
const model = require("../models/index");

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    let commentGif = req.body.comment;
    model.Gif_comment.create({
        comment: commentGif,
        userid: userId,
        gifid: req.params.id,
    })
        .then(() =>
            res.status(201).json({
                message: "commentaire créé !",
            })
        )
        .catch((error) =>
            res.status(400).json({
                error,
            })
        );
};
exports.modifyComment = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;

    const result = await model.Gif_comment.findOne({
        where: { id: req.params.id },
    });
    if (!(userId === result.userid)) {
        return res.status(401).json({
            error: "Vous n'êtes pas autorisé à modifier ce commentaire !",
        });
    } else {
        model.Gif_comment.update(
            { comment: req.body.comment },
            {
                where: { id: req.params.id },
            }
        )
            .then(() =>
                res.status(200).json({
                    message: "commentaire modifié!",
                })
            )
            .catch((error) =>
                res.status(400).json({
                    error,
                })
            );
    }
};
//accéder aux informations d'un commentaire en particulier
exports.getOneComment = (req, res, next) => {
    model.Gif_comment.findOne({ where: { id: req.params.id } })
        .then((Gif_comment) => res.status(200).send(Gif_comment))
        .catch((error) => res.status(400).json({ error }));
};

//accéder à tous les commentaires
exports.getAllComment = async (req, res, next) => {
    const gifTofind = await model.Gif.findOne({
        where: { id: req.params.id },
    });
    console.log(gifTofind);
    gifId = gifTofind.id;
    model.Gif_comment.findAll({
        where: { gifid: gifId },
        order: [["updatedAt", "DESC"]],
        include: [model.User],
    })
        .then((Gif_comment) => {
            res.status(200).send(Gif_comment);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
//supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    model.Gif_comment.findOne({ where: { id: req.params.id } })
        .then((Gif_comment) => {
            Gif_comment.destroy({ where: { id: req.params.id } })
                .then(() =>
                    res.status(200).json({ message: "commentaire supprimé !" })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

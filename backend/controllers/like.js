//création de la logique métier pour les likes/dislikes

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//importation du model de données pour les likes/dislikes
const model = require("../models/index");

//récupération du like d'un user pour un un gif
exports.getOneLike = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    model.Gif_like.findOne({
        where: { userid: userId, gifid: req.params.id },
    })
        .then((gif_likes) => {
            res.status(200).send(gif_likes);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};
//récupération de tous les likes pour un gif
exports.getAllLike = (req, res, next) => {
    model.Gif_like.findAll({
        where: { gifid: req.params.id },
    })
        .then((gif_likes) => {
            res.status(200).send(gif_likes);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

//création du like
exports.createLike = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    model.Gif_like.create({
        jaime: true,
        userid: userId,
        gifid: req.params.id,
    })
        .then(() =>
            res.status(201).json({
                message: "like créé !",
            })
        )
        .catch((error) =>
            res.status(400).json({
                error,
            })
        );
};

//suppression du like
exports.dislikeGif = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;

    model.Gif_like.findOne({ where: { gifid: req.params.id, userid: userId } })
        .then((gif_likes) => {
            gif_likes
                .destroy({ where: { gifid: req.params.id, userid: userId } })
                .then(() =>
                    res.status(200).json({ message: "like supprimé !" })
                )
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

//récupération de tous les likes pour un user
exports.getAllLikeUser = (req, res, next) => {
    model.Gif_like.findAll({
        where: { userid: req.params.id },
    })
        .then((gif_likes) => {
            res.status(200).send(gif_likes);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

//récupération du like d'un user pour un un gif
exports.getOneLikeUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    model.Gif_like.findOne({
        where: { userid: userId, gifid: req.params.id },
        include: [model.Gif],
    }).then((gif_likes) => {
        if (gif_likes) {
            res.status(200).send(gif_likes.jaime);
        } else {
            res.status(200).send(false);
        }
    });
};

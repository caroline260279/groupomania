//création de la logique métier pour les likes/dislikes

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//importation du model de données pour les likes/dislikes
const model = require("../models/index");

//récupération des likes/dislikes d'un user pour un un gif
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
//récupération de tous les likes/dislikes pour un gif
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

//création du like/dislike
exports.createLike = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    let like = req.body.like;
    let dislike = req.body.dislike;
    let idGif = await model.Gif_like.findOne({
        where: { userid: userId, gifid: req.params.id },
    });
    console.log(like);
    console.log(idGif != null);
    if (idGif) {
        return res.status(401).json({
            error: "Vous avez déjà liké ou disliké ce gif !",
        });
    } else {
        model.Gif_like.create({
            jaime: like,
            jaimepas: dislike,
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
    }
};

//m
exports.likeGif = (req, res, next) => {
    let like = req.body.like;
    let dislike = req.body.dislike;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    const gifId = req.params.id;

    model.Gif_like.update(
        { jaime: like, jaimepas: dislike },
        {
            where: { gifid: gifId, userid: userId },
        }
    )
        .then(() =>
            res.status(200).json({
                message: "changement effectué!",
            })
        )
        .catch((error) =>
            res.status(400).json({
                error,
            })
        );
};

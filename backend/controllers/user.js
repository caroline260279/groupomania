//création de la logique métier pour les users

//importation du package bcrypt (cryptage)
const bcrypt = require("bcrypt");
//importation du model user
const model = require("../models/index");

//importation du package jsonwebtoken
const jwt = require("jsonwebtoken");

//création du middelware signup
exports.signup = (req, res, next) => {
    console.log(req.body);
    //hachage du mdp avec 10 tours de l'algorithme
    bcrypt
        .hash(req.body.password, 10)
        //recupation du hash
        .then((hash) => {
            //création du nouvel utilisateur
            model.User.create({
                //avec l'email recupéré dans le body de la requete
                email: req.body.email,
                name: req.body.name,
                firstname: req.body.firstname,
                username: req.body.username,
                bio: req.body.bio,
                photo: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                }`,
                //et avec le hash comme mdp
                password: hash,
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
        })
        //sinon retourne une erreur
        .catch((error) =>
            res.status(500).json({
                error: "erreur",
            })
        );
};

//création du middelware login
exports.login = (req, res, next) => {
    //utilisation de la méthode findOne pour trouver un seul utilisateur (qui est forcément unique)
    model.User.findOne({
        //l'adresse mail doit correspondre à l'adresse mail de la requête
        where: { email: req.body.email },
    })
        //renvoie le user
        .then((users) => {
            //si pas de user alors renvoie "utilisateur non trouvé"
            if (!users) {
                return res.status(401).json({
                    error: "Utilisateur non trouvé !",
                });
            }
            //si un user est trouvé on utilise bcrypt pour comparer le mdp
            bcrypt
                //compare le mpd du user et le mdp de la requête
                .compare(req.body.password, users.password)
                //reception d'un booléen
                .then((valid) => {
                    //si mauvais mdp alors "mdp incorrect"
                    if (!valid) {
                        return res.status(401).json({
                            error: "Mot de passe incorrect !",
                        });
                    }
                    //sinon requête ok
                    res.status(200).json({
                        //renvoie le userId
                        userid: users.id,
                        //renvoie un token avec jsonwebtoken
                        //appel de la fonction sign de jsonwebtoken
                        //le userId encoder permettra de ne pas pouvoir modifier un objet si on ne l'a pas crée
                        token: jwt.sign(
                            //les données que l'on souhaite encoder
                            {
                                userid: users.id,
                            },
                            //clef secrète d'encodage
                            "RANDOM_TOKEN_SECRET",
                            //on applique une expiration
                            { expiresIn: "24h" }
                        ),
                    });
                })
                //sinon renvoie un probème de connexion
                .catch((error) =>
                    res.status(500).json({
                        error,
                    })
                );
        })
        //sinon renvoie un probème de connexion
        .catch((error) =>
            res.status(500).json({
                error,
            })
        );
};
//suppression de la sauce selectionnée
exports.delete = (req, res, next) => {
    model.User.findOne({
        //l'adresse mail doit correspondre à l'adresse mail de la requête
        where: { email: req.body.email },
    })
        //renvoie le user
        .then((users) => {
            users
                .destroy({ userid: users.userid })
                .then(() =>
                    res.status(200).json({ message: "Utilisateur supprimé !" })
                );
        })
        .catch((error) =>
            res.status(500).json({
                error,
            })
        );
};

//Trouver un user avec un username
exports.findUser = (req, res, next) => {
    model.User.findOne({ where: { username: req.body.username } })
        .then((users) => {
            if (!users) {
                return res.status(401).json({
                    error: "Utilisateur non trouvé !",
                });
            }
            res.status(200).send(users);
        })
        .catch((error) => res.status(400).json({ error }));
};
//revoyer un utilisateur si le jeton est valide
exports.userConnected = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;

    model.User.findOne({
        where: { id: userId },
    })
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).json({ error }));
};

//Trouver un user avec un clic
exports.findOneUser = (req, res, next) => {
    model.User.findOne({ where: { id: req.params.id } })
        .then((users) => {
            if (!users) {
                return res.status(401).json({
                    error: "Utilisateur non trouvé !",
                });
            }
            res.status(200).send(users);
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.findAllUser = (req, res, next) => {
    model.User.findAll()
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).json({ error }));
};

exports.modify = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    console.log(userId != req.params.id);
    if (userId != req.params.id) {
        return res.status(401).json({
            error: "Vous n'êtes pas autorisé à modifier cette utilisateur !",
        });
    } else {
        const userObject = req.file
            ? {
                  ...req.body,
                  photo: `${req.protocol}://${req.get("host")}/images/${
                      req.file.filename
                  }`,
              }
            : { ...req.body };

        model.User.update(
            { ...userObject, id: req.params.id },
            { where: { id: req.params.id } }
        )
            .then(() =>
                res.status(200).json({ message: "Utilisateur modifié !" })
            )
            .catch((error) =>
                res.status(400).json({
                    error,
                })
            );
    }
};
//modification du mot de passe
exports.updatePw = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
    if (userId != req.params.id) {
        return res.status(401).json({
            error: "Vous n'êtes pas autorisé à modifier le mot de passe !",
        });
    } else {
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                model.User.update(
                    { password: hash, id: req.params.id },
                    { where: { id: req.params.id } }
                );
            })
            .then(() =>
                res.status(200).json({ message: "Mot de passe modifié !" })
            )
            .catch((error) =>
                res.status(400).json({
                    error,
                })
            );
    }
};

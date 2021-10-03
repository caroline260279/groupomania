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
                .then(() => {
                    res.status(201).json({
                        message: "Utilisateur créé !",
                    });
                })
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
    model.User.findOne({
        where: { email: req.body.email },
    })
        .then((users) => {
            if (!users) {
                return res.status(401).json({
                    error: "Utilisateur non trouvé !",
                });
            }
            bcrypt
                .compare(req.body.password, users.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: "Mot de passe incorrect !",
                        });
                    }
                    res.status(200).json({
                        userid: users.id,
                        token: jwt.sign(
                            {
                                userid: users.id,
                            },
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: "24h" }
                        ),
                    });
                })
                .catch((error) =>
                    res.status(500).json({
                        error,
                    })
                );
        })
        .catch((error) =>
            res.status(500).json({
                error,
            })
        );
};

//suppression du user
exports.delete = (req, res, next) => {
    model.User.findOne({
        where: { email: req.body.email },
    })
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
//Trouver un user avec un clic
exports.findOneUserUsername = (req, res, next) => {
    model.User.findOne({ where: { username: req.params.username } })
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

//trouver tous les utilisateurs
exports.findAllUser = (req, res, next) => {
    model.User.findAll()
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(400).json({ error }));
};

//modifier un utilisateur
exports.modify = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userid;
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

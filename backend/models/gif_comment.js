//model pour les commentaires des gifs
const Sequelize = require("sequelize");
const db = require("../config/config");

const Gif_comments = db.define("gif_comments", {
    comment: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    userid: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    gifid: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
});

//exportation du model
module.exports = Gif_comments;

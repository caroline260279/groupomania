const Sequelize = require("sequelize");
const db = require("../config/config");

const Gif_comments = db.define("gifs", {
    comment: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = Gif_comments;

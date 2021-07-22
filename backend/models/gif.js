"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Gif extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            this.belongsTo(User, { foreignKey: "userid" });
        }
        static associate(Gif_like) {
            this.hasMany(Gif_like, { foreignKey: "gifid" });
        }
        static associate(Gif_comment) {
            this.hasMany(Gif_comment, { foreignKey: "gifid" });
        }
    }
    Gif.init(
        {
            userid: DataTypes.NUMBER,
            title: DataTypes.STRING,
            imageurl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Gif",
        }
    );
    return Gif;
};

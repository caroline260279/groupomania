const User = require("../models/user");
const Gif = require("../models/gif");
const Gif_comment = require("../models/gif_comment");
const Gif_like = require("../models/gif_like");

User.hasMany(Gif);
User.hasMany(Gif_comment);
User.hasMany(Gif_like);
Gif.hasMany(Gif_comment);
Gif.hasMany(Gif_like);
Gif.belongsTo(User);
Gif_comment.belongsTo(User);
Gif_comment.belongsTo(Gif);
Gif_like.belongsTo(User);
Gif_like.belongsTo(Gif);

module.exports = {
    User,
    Gif,
    Gif_comment,
    Gif_like,
};

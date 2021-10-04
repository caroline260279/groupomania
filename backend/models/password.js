var passwordValidator = require("password-validator");

// Create a schema
var schema = new passwordValidator();

schema
    // Minimum 8 caractères
    .is()
    .min(8)
    // Maximum 20 caractères
    .is()
    .max(20)
    // au moins une majuscule
    .has()
    .uppercase()
    // au moins une minuscule
    .has()
    .lowercase()
    // au moins 1 chiffres
    .has()
    .digits(1)
    // ne doit pas contenir d'espace
    .has()
    .not()
    .spaces()
    // au moins 1 symbol
    .has()
    .symbols(1);

module.exports = schema;

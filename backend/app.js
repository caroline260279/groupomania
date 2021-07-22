//importation du package express
const express = require("express");

//importation du package path
const path = require("path");

//importation du packae helmet
const helmet = require("helmet");

//importation du router sauces
const gifRoutes = require("./routes/gif");
//importation du router user
const userRoutes = require("./routes/user");

const db = require("./config/config");

db.authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Error: " + err));
//crétion de la constante app qui appelle la méthode express (création de l'application express)
const app = express();

//éviter les erreurs de CORS
app.use((req, res, next) => {
    //permettre d'accéder à notre API depuis n'importe quelle origine '*'
    res.setHeader("Access-Control-Allow-Origin", "*");
    //permettre d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    //permettre d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

//permet de parser les données
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//création d'un middelware qui permet de servir le dossier image lors d'une requête
app.use("/images", express.static(path.join(__dirname, "images")));

//routeur pour toutes les demandes effectuées vers /api/sauces
app.use("/", gifRoutes);
//routeur pour toutes les demandes effectuées vers /api/auth
app.use("/auth", userRoutes);

//sécurise l'applications Express en définissant divers en-têtes HTTP
app.use(helmet());

//exportation de l'application pour pouvoir y accéder depuis les autres fichiers
module.exports = app;

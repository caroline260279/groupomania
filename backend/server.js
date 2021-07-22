//importation du package http
const http = require("http");
//importation de l'application
const app = require("./app");

//la fonction normalizePort renvoie un port valide,
//qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//création de la constante port
const port = normalizePort(process.env.PORT || "8080");

//on dit a l'application sur quel port elle doit tourner
app.set("port", port);

//la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée.
//Elle est ensuite enregistrée dans le serveur ;
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
//constante pour appeler la methode createServer avec notre application
const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

//ecoute du serveur
server.listen(port);

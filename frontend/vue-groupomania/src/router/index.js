import { createRouter, createWebHashHistory } from "vue-router";

//importation des vues
import Accueil from "../views/Accueil.vue";
import Signup from "../views/Signup.vue";
import welcome from "../views/welcome.vue";
import allgifs from "../views/allGifs.vue";
import modifgif from "../views/modifgif.vue";
import modifuser from "../views/modifuser.vue";
import userdelete from "../views/userdelete.vue";
import modifPassword from "../views/modifpassword.vue";
import userpage from "../views/userpage.vue";

const routes = [
    //page login
    {
        path: "/",
        name: "Accueil",
        component: Accueil,
    },
    //page signup
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
    },
    //page "mon compte"
    {
        path: "/welcome",
        name: "user_page",
        component: welcome,
    },
    //page acceuil
    {
        path: "/allgifs",
        name: "gifs_page",
        component: allgifs,
    },
    //page de modification des gifs
    {
        path: "/gif/:id",
        name: "modif_gif",
        component: modifgif,
    },
    //page de modification de l'utilisateur
    {
        path: "/user/:id",
        name: "modif_user",
        component: modifuser,
    },
    //page d'un utilisateur
    {
        path: "/username/:username",
        name: "page_finduser",
        component: userpage,
    },
    //page de suppression d'un utilisateur
    {
        path: "/userdelete",
        name: "delete_user",
        component: userdelete,
    },
    //page de modification du mot de passe
    {
        path: "/password",
        name: "modif_passwod",
        component: modifPassword,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import Accueil from "../views/Accueil.vue";
import Signup from "../views/Signup.vue";
import welcome from "../views/welcome.vue";
import allgifs from "../views/allGifs.vue";

const routes = [
    {
        path: "/",
        name: "Accueil",
        component: Accueil,
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
    },
    {
        path: "/welcome/:username",
        name: "user_page",
        component: welcome,
    },
    {
        path: "/allgifs",
        name: "gifs_page",
        component: allgifs,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

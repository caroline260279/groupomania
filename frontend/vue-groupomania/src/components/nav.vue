// ./components/HomeLink.vue
<script>
export default {
    name: "navigation",
};
</script>

<template>
    <div id="navigation_header">
        <img src="../assets/icon-left-font.svg" alt="" />
        <div id="nav_link">
            <div id="nav"><router-link to="/">Accueil</router-link> |</div>
            <div id="nav"><router-link to="/">Se connecter</router-link> |</div>
            <div id="nav">
                <router-link to="/signup">S'inscrire</router-link>
            </div>
        </div>

        <router-view />
    </div>
</template>

<style lang="scss">
#navigation_header {
    height: 100px;
    position: relative;
    img {
        position: absolute;
        left: -15px;
        width: 100%;
        height: 100px;
        overflow: hidden;
        object-fit: cover;
    }
    #nav_link {
        position: absolute;
        bottom: 5px;
        right: 15px;
        display: flex;
        #nav {
            padding-left: 5px;
            font-size: 17px;
        }
    }
    a {
        text-decoration: none;
    }
}
</style>

<template>
    <div>
        <div id="navigation_connected">
            <img
                class="navigation_connected_image"
                src="../assets/icon-left-font-monochrome-black.png"
                alt=""
            />
            <button
                class="navigation_connected_button"
                @click="showNavigation = !showNavigation"
            >
                <i class="fas fa-bars fa-2x"></i>
            </button>
            <div v-show="showNavigation" class="modal">
                <ul class="navigation_connected_menu">
                    <li class="navigation_connected_list">
                        <router-link to="/allgifs" class="menu"
                            >Acceuil</router-link
                        >
                    </li>
                    <li class="navigation_connected_list">
                        <router-link to="/signup" class="menu"
                            >S'inscrire</router-link
                        >
                    </li>
                    <li class="navigation_connected_list ">
                        <router-link to="/" class="menu"
                            >Se connecter</router-link
                        >
                    </li>

                    <li class="navigation_connected_list">
                        Rechercher un utilisateur
                    </li>

                    <li class="navigation_connected_list">
                        <a v-on:click="createPostAppear">Créer un post</a>
                    </li>
                </ul>
            </div>
        </div>
        <form action="">
            <div class="post_title">
                <label class="label_title" for="title"
                    >Email* :
                    <p class="input_valid_title" v-if="!this.title">
                        *Champ obligatoire
                    </p>
                </label>

                <input id="post_title" type="text" v-model="title" />
            </div>

            <div class="post_gif">
                <label class="label_gif" for="gif"
                    >Titre* :
                    <p class="input_valid_gif" v-if="!this.gif">
                        *Champ obligatoire
                    </p></label
                >

                <input id="post_gif" type="file" />
            </div>

            <button class="button_login" @click="submit()">Poster</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "welcome",
    data() {
        return {
            showNavigation: false,
            showModal: false,
            display: "none",
        };
    },
    methods: {
        createPostAppear: function() {
            this.display = "block";
        },
    },
};
</script>

<style lang="scss">
#navigation_connected {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    line-height: 100px;
    margin-bottom: 20px;

    .navigation_connected_image {
        flex-grow: 1;
        height: 100px;
        object-fit: cover;
        max-width: 0 10px;
    }
    .modal {
        width: 100%;
        position: relative;
        margin-top: 10px;
        .navigation_connected_menu {
            display: flex;
            flex-direction: wrap;
            text-align: left;
            justify-content: space-around;
            margin: 0;
            padding: 0;
            height: 50px;
            line-height: 50px;
            .navigation_connected_list {
                list-style-type: none;
                text-decoration: none;
                font-size: 12px;
                height: 50px;
                color: black;
                position: relative;
                a:link {
                    text-decoration: none;
                    color: black;
                }
                a:visited {
                    text-decoration: none;
                    color: black;
                }
            }
        }
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 45%;
            margin-left: 32.5%;
            border-bottom: 2px solid black;
            margin-top: 40px 0;
        }
        &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: "";
            width: 45%;
            margin-left: 32.5%;
            border-top: 2px solid black;
            margin-top: 40px 0;
        }
    }
    .navigation_connected_button {
        height: 50px;
        vertical-align: middle;
        background-color: white;
        border: 4px solid black;
        margin: 25px 10px;
    }
}
</style>

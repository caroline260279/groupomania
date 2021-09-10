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
                            >Mon compte</router-link
                        >
                    </li>

                    <li class="navigation_connected_list">
                        Rechercher un utilisateur
                    </li>

                    <li class="navigation_connected_list">
                        <a v-on:click="appearGifWindow">Créer un post</a>
                    </li>
                    <li class="navigation_connected_list ">
                        <router-link to="/" class="menu"
                            >Se deconnecter</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
        <form
            id="form_welcome"
            action=""
            v-bind:style="{ display: createPostAppear }"
        >
            <h1>Qu'avez vous a dire?</h1>
            <div class="post_title">
                <label class="label_title" for="post_title"
                    >Titre* :
                    <p class="input_valid_title" v-if="!this.title">
                        *Champ obligatoire
                    </p>
                </label>

                <input id="post_title" type="text" v-model="title" />
            </div>

            <div class="post_gif">
                <label class="label_gif" for="post_gif"
                    >Gif* :
                    <p
                        class="input_valid_gif"
                        v-if="this.selectedFileGif.length === 0"
                    >
                        *Champ obligatoire
                    </p></label
                >

                <input
                    id="post_gif"
                    type="file"
                    class="input_gif"
                    @change="onFileSelectedGif"
                />
            </div>

            <div class="button_gif">
                <button class="button_post_gif" @click="submitGif()">
                    Poster
                </button>
                <button
                    class="button_close_gifwindow"
                    @click="closeGifWindow()"
                >
                    Finallement, je n'ai rien à dire...
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "welcome",
    data() {
        return {
            showNavigation: false,
            showModal: false,
            display: "none",
            title: "",
            selectedFileGif: [],
        };
    },
    computed: {
        createPostAppear: function() {
            return this.display;
        },
    },
    methods: {
        onFileSelectedGif(event) {
            this.selectedFileGif = event.target.files[0];
        },
        createPostAppear: function() {
            this.display = "block";
        },
        appearGifWindow: function() {
            this.display = "block";
        },
        closeGifWindow: function() {
            this.display = "none";
        },
        submitGif() {
            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("image", this.selectedFileGif);
            instance
                .post("http://localhost:3000/", formData)
                .then(() => this.$router.push("/allgifs"))
                .catch(() => {
                    console.log("Oups, votre gif n'a pas pu être publié...");
                });
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
                font-size: 10px;
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
#form_welcome {
    border: 2px solid black;
    display: flex;
    flex-direction: wrap;
    flex-wrap: wrap;
    margin: 0 10px 20px 10px;
    h1 {
        display: block;
        width: 100%;
        padding-left: 10px;
        font-size: 20px;
    }
    .post_title {
        display: flex;
        flex-direction: wrap;
        flex-wrap: wrap;
        width: 80%;
        margin: 0 10% 20px 10%;
        #post_title {
            border: 2px solid black;
            width: 150px;
        }
        .label_title {
            flex-grow: 1;
            position: relative;
            .input_valid_title {
                color: red;
                font-size: 10px;
                position: absolute;
                top: 10px;
                left: 0;
            }
        }
    }
    .post_gif {
        display: flex;
        flex-direction: wrap;
        flex-wrap: wrap;
        width: 80%;
        margin: 0 10% 20px 10%;
        #post_gif {
            border: 2px solid black;
            width: 150px;
        }
        .label_gif {
            flex-grow: 1;
            position: relative;
            .input_valid_gif {
                color: red;
                font-size: 10px;
                position: absolute;
                top: 10px;
                left: 0;
            }
        }
    }
    .button_gif {
        display: flex;
        flex-direction: wrap;
        flex-wrap: nowrap;
        justify-content: space-between;
        width: 80%;
        margin: 0 10% 20px 10%;
    }
}
</style>

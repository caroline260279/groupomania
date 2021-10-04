<!--composant pour le logo, le menu, la création d'un gif et recherche d'un utilisateur-->
<template>
    <div>
        <!--logo-->
        <div id="navigation_connected">
            <img
                class="navigation_connected_image"
                src="../assets/logo3.png"
                alt=""
            />
            <button
                class="navigation_connected_button"
                @click="showNavigation = !showNavigation"
            >
                <i class="fas fa-bars fa-2x"></i>
                <i class="fas fa-bars fa-3x"></i>
            </button>
            <!--menu-->
            <div v-show="showNavigation" class="modal">
                <ul class="navigation_connected_menu">
                    <li class="navigation_connected_list">
                        <router-link to="/allgifs" class="menu"
                            >Acceuil</router-link
                        >
                    </li>
                    <li class="navigation_connected_list">
                        <router-link to="/welcome" class="menu"
                            >Mon compte</router-link
                        >
                    </li>

                    <li class="navigation_connected_list">
                        <a v-on:click="appearFinduser" class="menu">
                            Rechercher un utilisateur</a
                        >
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
        <!--création d'un gif-->
        <form
            id="form_welcome"
            action=""
            v-bind:style="{ display: postAppear }"
        >
            <h1>Qu'avez vous à dire?</h1>
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
        <!--rechercher un utilisateur-->
        <form id="form_welcome_finduser" v-if="this.finduser === 1">
            <div class="div_form_finduser">
                <input
                    class="input_form_finduser"
                    type="text"
                    placeholder="pseudo"
                    v-model="user"
                />
                <button
                    class="button_form_finduser"
                    type="button"
                    @click="search()"
                >
                    Rechercher un utilisateur
                </button>
            </div>
            <p class="p_form_finduser" v-if="unknown === 1">
                Utilisateur inconnu
            </p>
            <a class="a_form_finduser" v-on:click="disappearFinduser">Fermer</a>
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
            finduser: 0,
            unknown: 0,
            user: "",
        };
    },
    computed: {
        postAppear() {
            return this.display;
        },
    },
    methods: {
        onFileSelectedGif(event) {
            this.selectedFileGif = event.target.files[0];
        },
        appearGifWindow: function() {
            this.display = "block";
        },
        appearFinduser() {
            return (this.finduser = 1);
        },
        disappearFinduser() {
            return (this.finduser = 0);
        },
        closeGifWindow: function() {
            this.display = "none";
        },
        //valider la création d'un gif
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
        //rechercher un utilisateur
        search() {
            const user = this.user;
            instance
                .get("http://localhost:3000/auth/user/" + user)
                .then(() => this.$router.push("/username/" + user))
                .then(() => location.reload())
                .catch(() => (this.unknown = 1));
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
    margin-bottom: 40px;

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
            border-bottom: 2px solid #224070;
            margin-top: 40px 0;
        }
        &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: "";
            width: 45%;
            margin-left: 32.5%;
            border-top: 2px solid #224070;
            margin-top: 40px 0;
        }
    }
    .navigation_connected_button {
        height: 50px;
        vertical-align: middle;
        background-color: white;
        border: 4px solid #fd2d01;
        background-color: #d7d7d7;
        border-radius: 10px;
        margin: 25px 10px;
        .fa-2x {
            color: #fd2d01;
        }
        .fa-3x {
            display: none;
            color: #fd2d01;
        }
    }
}
#form_welcome {
    border: 2px solid #224070;
    border-radius: 10px;
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
            border: 2px solid #224070;
            width: 150px;
        }
        .label_title {
            flex-grow: 1;
            position: relative;
            .input_valid_title {
                color: #fd2d01;
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
            border: 2px solid #224070;
            width: 150px;
        }
        .label_gif {
            flex-grow: 1;
            position: relative;
            .input_valid_gif {
                color: #fd2d01;
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
        width: 70%;
        margin: 0 15% 20px 15%;
        .button_post_gif {
            background-color: white;
            border: 2px solid #224070;
            box-shadow: 3px 3px #224070;
            margin-right: 5%;
        }
        .button_close_gifwindow {
            background-color: white;
            border: 2px solid #224070;
            box-shadow: 3px 3px #224070;
        }
    }
}
#form_welcome_finduser {
    border: 2px solid #224070;
    border-radius: 10px;
    width: 80%;
    margin: 0 10% 20px 10%;
    .div_form_finduser {
        width: 90%;
        margin: 20px 5% 0 5%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        .input_form_finduser {
            border: 2px solid #224070;
            width: 65%;
            margin-right: 5%;
        }
        .button_form_finduser {
            width: 30%;
            background-color: white;
            border: 2px solid #224070;
            box-shadow: 3px 3px #224070;
            font-size: 12px;
            text-align: center;
        }
    }
    .p_form_finduser {
        text-align: center;
        width: 100%;
        color: #fd2d01;
        font-size: 12px;
    }
    .a_form_finduser {
        display: block;
        width: 94%;
        text-align: right;
        font-size: 10px;
        margin: 10px 3% 5px 3%;
    }
}
@media screen and (min-width: 481px) {
    #navigation_connected {
        line-height: 150px;
        .navigation_connected_image {
            height: 150px;
        }
        .navigation_connected_button {
            height: 60px;
            margin: 45px 20px;
        }
        .modal {
            .navigation_connected_menu {
                .navigation_connected_list {
                    font-size: 13px;
                }
            }
        }
    }
    #form_welcome {
        width: 80%;
        margin: 0 10% 20px 10%;
        font-size: 15px;
        h1 {
            width: 80%;
            margin: 20px 10%;
            font-size: 23px;
        }
    }
    #form_welcome_finduser {
        width: 70%;
        margin: 0 15% 20px 15%;
        .div_form_finduser {
            width: 90%;
            margin: 20px 5% 0 5%;

            .input_form_finduser {
                font-size: 14px;
            }
            .button_form_finduser {
                font-size: 14px;
            }
        }
        .p_form_finduser {
            font-size: 14px;
        }
        .a_form_finduser {
            font-size: 12px;
        }
    }
}

@media screen and (min-width: 769px) {
    #navigation_connected {
        line-height: 200px;
        .navigation_connected_image {
            height: 200px;
        }
        .navigation_connected_button {
            height: 80px;
            margin: 60px 40px;
            .fa-2x {
                display: none;
                color: #fd2d01;
            }
            .fa-3x {
                display: block;
            }
        }
        .modal {
            .navigation_connected_menu {
                .navigation_connected_list {
                    font-size: 20px;
                }
            }
        }
    }
    #form_welcome {
        width: 70%;
        margin: 40px 15% 40px 15%;
        font-size: 20px;
        h1 {
            width: 80%;
            margin: 20px 10%;
            font-size: 23px;
        }
        .post_title {
            margin: 0 10% 30px 10%;
        }
        .post_gif {
            margin: 0 10% 30px 10%;
        }
    }
    .button_gif {
        margin: 30px 15%;

        .button_post_gif {
            font-size: 15px;
        }
        .button_close_gifwindow {
            font-size: 15px;
        }
    }
    #form_welcome_finduser {
        width: 60%;
        margin: 20px 20% 40px 20%;
        .div_form_finduser {
            width: 90%;
            margin: 20px 5% 0 5%;

            .input_form_finduser {
                font-size: 15px;
            }
            .button_form_finduser {
                font-size: 15px;
            }
        }
        .p_form_finduser {
            font-size: 15px;
        }
        .a_form_finduser {
            font-size: 12px;
        }
    }
}

@media screen and (min-width: 1280px) {
    #navigation_connected {
        width: 70%;
        margin: 0 15% 40px 15%;
    }
    #form_welcome {
        width: 40%;
        margin: 40px 30% 40px 30%;
        font-size: 25px;
        h1 {
            width: 80%;
            margin: 20px 10%;
            font-size: 35px;
        }
        .post_title {
            margin: 0 10% 25px 10%;
            .label_title {
                .input_valid_title {
                    top: 15px;
                }
            }
        }
        .post_gif {
            margin: 0 10% 25px 10%;
            .label_gif {
                .input_valid_gif {
                    top: 15px;
                }
            }
        }
    }
    .button_gif {
        margin: 30px 15%;

        .button_post_gif {
            font-size: 15px;
        }
        .button_close_gifwindow {
            font-size: 15px;
        }
    }
    #form_welcome_finduser {
        width: 50%;
        margin: 20px 25% 60px 25%;
        .div_form_finduser {
            width: 90%;
            margin: 20px 5% 0 5%;

            .input_form_finduser {
                font-size: 15px;
            }
            .button_form_finduser {
                font-size: 15px;
            }
        }
        .p_form_finduser {
            font-size: 15px;
        }
        .a_form_finduser {
            font-size: 12px;
        }
    }
}
</style>

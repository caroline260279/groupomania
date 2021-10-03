<!--composant pour la présentation de l'utilisateur-->
<template>
    <div>
        <div class="user_img">
            <img v-bind:src="object.photo" alt="" id="img_user" />

            <div class="user_username_bio">
                <p class="user_username">{{ object.username }}</p>
                <p class="user_bio">
                    {{ object.bio }}
                    <a v-on:click="continu" class="user_click">...</a>
                </p>
                <div
                    class="user_bio_two"
                    v-bind:style="{ display: computeddisplay }"
                >
                    {{ object.bio }}
                    <p v-on:click="close" class="close_user_bio_two">fermer</p>
                </div>
            </div>
        </div>

        <div class="button_user">
            <button class="button_modif_user" @click="modifUser(object.id)">
                Modifier mon compte
            </button>
            <button class="button_delete_user" @click="deleteUser()">
                Supprimer mon compte
            </button>
            <button class="button_modif_password" @click="modifPassword()">
                Changer mon mot de passe
            </button>
        </div>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "user",
    data() {
        return {
            object: {
                id: "",
                firstname: "",
                name: "",
                username: "",
                imageUrl: "",
                bio: "",
                email: "",
                password: "",
                photo: "",
            },
            imageprofil: "",
            display: "none",
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },
    created() {
        this.user();
    },
    methods: {
        //récupération de l'utilisateur connecté
        async user() {
            const userConnected = await instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => resp.data.id)
                .catch(() => this.$router.push("/"));

            instance
                .get("http://localhost:3000/auth/" + userConnected)
                .then((response) => (this.object = response.data))

                .catch(() => this.$router.push("/"));
        },
        continu: function() {
            this.display = "block";
        },
        close: function() {
            this.display = "none";
        },
        //envoie à la page de modification du compte
        modifUser(id) {
            this.$router.push("/user/" + id);
        },
        //envoie à la page de suppression de compte
        deleteUser() {
            this.$router.push("/userdelete");
        },
        //envoie à la page de modification du mot de passe
        modifPassword() {
            this.$router.push("/password");
        },
    },
};
</script>

<style lang="scss">
.user_img {
    width: 80%;
    margin: 0 10% 20px 10%;
    display: flex;
    flex-direction: wrap;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: relative;
    .user_bio_two {
        width: 80%;
        margin: 0 10%;
        background-color: white;
        text-align: center;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        border: 2px solid #224070;
        border-radius: 10px;
        display: none;
        .close_user_bio_two {
            font-size: 13px;
            width: 10%;
            text-align: center;
            margin: 0 5% 0 85%;
            font-weight: bolder;
        }
    }
    .user_click {
        position: absolute;
        bottom: 0;
        right: 0;
        font-weight: bolder;
    }

    #img_user {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border: 2px solid #224070;
        border-radius: 50%;
        margin: 0 50px 0 0;
    }
    .user_username_bio {
        flex: 1;
        .user_username {
            border-bottom: 2px solid #224070;
            margin: 0;
            font-size: 25px;
            height: 50px;
            line-height: 50px;
            text-align: center;
        }
        .user_bio {
            height: 50px;
            font-size: 12px;
            text-align: center;
            overflow: hidden;
        }
    }
}
.button_user {
    display: flex;
    flex-direction: wrap;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0 5% 20px 5%;
    .button_modif_user {
        width: 30%;
        font-size: 10px;
        background-color: white;
        border: 2px solid #224070;
        box-shadow: 3px 3px #224070;
    }
    .button_delete_user {
        width: 30%;
        font-size: 10px;
        background-color: white;
        border: 2px solid #224070;
        box-shadow: 3px 3px #224070;
    }
    .button_modif_password {
        width: 30%;
        font-size: 10px;
        background-color: white;
        border: 2px solid #224070;
        box-shadow: 3px 3px #224070;
    }
}
@media screen and (min-width: 481px) {
    .user_img {
        width: 80%;
        margin: 0 10% 20px 10%;
        .user_bio_two {
            width: 80%;
            margin: 0 10%;
            font-size: 20px;
            .close_user_bio_two {
                font-size: 13px;
                width: 10%;

                margin: 5px 5% 5px 85%;
            }
        }
        .user_click {
            font-size: 13px;
        }

        #img_user {
            width: 160px;
            height: 160px;
            margin: 0 20px;
            margin: 0 50px 0 0;
        }
        .user_username_bio {
            .user_username {
                margin: 0;
                font-size: 35px;
                height: 70px;
                line-height: 70px;
            }
            .user_bio {
                height: 50px;
                font-size: 20px;
            }
        }
    }
    .button_user {
        margin: 0 5% 20px 5%;
        .button_modif_user {
            font-size: 13px;
        }
        .button_delete_user {
            font-size: 13px;
        }
        .button_modif_password {
            font-size: 13px;
        }
    }
}
@media screen and (min-width: 769px) {
    .user_img {
        width: 70%;
        margin: 0 15% 20px 15%;
        .user_bio_two {
            width: 70%;
            margin: 0 15%;
            font-size: 25px;
            .close_user_bio_two {
                font-size: 16px;
                width: 10%;

                margin: 0 5% 0 85%;
            }
        }
        .user_click {
            font-size: 16px;
        }

        #img_user {
            width: 220px;
            height: 220px;
            margin: 0 20px;
            margin: 0 50px 0 0;
        }
        .user_username_bio {
            .user_username {
                margin: 0;
                font-size: 42px;
                height: 50px;
                line-height: 50px;
            }
            .user_bio {
                height: 50px;
                font-size: 25px;
            }
        }
    }
    .button_user {
        margin: 0 10% 20px 10%;
        .button_modif_user {
            font-size: 16px;
        }
        .button_delete_user {
            font-size: 16px;
        }
        .button_modif_password {
            font-size: 16px;
        }
    }
}
@media screen and (min-width: 1280px) {
    .user_img {
        width: 60%;
        margin: 0 20% 20px 20%;
        .user_bio_two {
            width: 60%;
            margin: 0 20%;
            font-size: 25px;
            .close_user_bio_two {
                font-size: 16px;
                width: 10%;

                margin: 0 5% 0 85%;
            }
        }
        .user_click {
            font-size: 16px;
        }

        #img_user {
            width: 220px;
            height: 220px;
            margin: 0 20px;
            margin: 0 50px 0 0;
        }
        .user_username_bio {
            .user_username {
                margin: 0;
                font-size: 42px;
                height: 50px;
                line-height: 50px;
            }
            .user_bio {
                height: 50px;
                font-size: 25px;
            }
        }
    }
    .button_user {
        margin: 0 20% 20px 20%;
        .button_modif_user {
            font-size: 16px;
        }
        .button_delete_user {
            font-size: 16px;
        }
        .button_modif_password {
            font-size: 16px;
        }
    }
}
</style>

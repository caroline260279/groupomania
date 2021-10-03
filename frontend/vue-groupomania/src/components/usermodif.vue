<!--composant pour la modification de l'utilisateur-->
<template>
    <div id="user">
        <form class="modif_account">
            <div class="class_modif">
                <label class="label_modif" for="modif_username"
                    >Pseudo :
                </label>
                <input
                    class="input_modif"
                    id="modif_username"
                    type="text"
                    v-model="object.username"
                />
            </div>
            <div class="class_modif">
                <label class="label_modif" for="modif_photo"
                    >Photo de profil :
                </label>

                <input
                    type="file"
                    id="modif_photo"
                    class="input_modif"
                    @change="onFileSelectedModifUser"
                />
            </div>
            <div class="class_modif">
                <label class="label_modif" for="modif_bio">Bio : </label>
                <input
                    class="input_modif"
                    id="modif_bio"
                    type="text"
                    v-model="object.bio"
                />
            </div>
            <div class="class_modif">
                <label class="label_modif" for="modif_email">Email : </label>
                <input
                    class="input_modif"
                    id="modif_email"
                    type="text"
                    v-model="object.email"
                />
            </div>
            <p
                class="p_echec_modif"
                v-bind:style="{ display: computeddisplay }"
            >
                Veuillez vérifier les informations et réessayer...
            </p>
            <button class="button_valid_modif" @click="validModifUser()">
                Valider les modifications
            </button>
        </form>
        <div></div>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "usermodif",
    data() {
        return {
            object: {
                username: "",
                bio: "",
                email: "",
            },
            display: "none",
            selectedFileModifUser: [],
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },
    created() {
        this.user();
        this.verif();
    },

    methods: {
        //selection du fichier pour la modification de la photo de profil
        onFileSelectedModifUser(event) {
            this.selectedFileModifUser = event.target.files[0];
        },
        //récupération de l'utilisateur à modifier (préremplissage des inputs)
        async user() {
            const userConnected = await instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => resp.data.id)
                .catch(() => this.$router.push("/"));
            instance
                .get("http://localhost:3000/auth/" + userConnected)
                .then((response) => (this.object = response.data));
        },
        continu: function() {
            this.display = "block";
        },
        close: function() {
            this.display = "none";
        },
        //validation des modifications
        async validModifUser() {
            let user = await instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => resp.data.id);
            const formData = new FormData();
            formData.append("username", this.object.username);
            formData.append("bio", this.object.bio);
            formData.append("email", this.object.email);
            formData.append("image", this.selectedFileModifUser);
            instance
                .put("http://localhost:3000/auth/modify/" + user, formData)
                .then(() => this.$router.push("/welcome"))
                .catch(() => {
                    this.display = "block";
                });
        },
        //vérification que l'utilisateur connecté est l'utilisateur à modifier
        async verif() {
            let id = await instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => resp.data.id)
                .catch(() => console.log("erreur"));
            let idparams = this.$route.params.id;
            if (idparams != id) {
                this.$router.push("/allgifs");
            } else {
                console.log("vous n'avez pas à etre redirigé");
            }
        },
    },
};
</script>

<style lang="scss">
.modif_account {
    border: 2px solid #224070;
    width: 90%;
    margin: 0 5% 20px 5%;
    border-radius: 10px;
    .class_modif {
        display: flex;
        flex-direction: wrap;
        justify-content: space-between;
        margin: 15px 20px;
        .label_modif {
            min-width: 120px;
        }
        .input_modif {
            width: 120px;
            border: 2px solid #224070;
        }
    }
    .button_valid_modif {
        width: 50%;
        margin: 20px 25%;
        background-color: white;
        border: 2px solid #224070;
        box-shadow: 3px 3px #224070;
    }
    .p_echec_modif {
        width: 80%;
        margin: 30px 10% 15px 10%;
        color: red;
        text-align: center;
        font-size: 15px;
    }
}
@media screen and (min-width: 481px) {
    .modif_account {
        width: 80%;
        margin: 0 10% 20px 10%;
        .class_modif {
            margin: 15px 20px;
            .label_modif {
                min-width: 120px;
                font-size: 20px;
            }
            .input_modif {
                width: 190px;
            }
        }
        .button_valid_modif {
            width: 50%;
            margin: 20px 25%;
            font-size: 18px;
        }
        .p_echec_modif {
            width: 80%;
            margin: 30px 10% 15px 10%;
            font-size: 18px;
        }
    }
}
@media screen and (min-width: 769px) {
    .modif_account {
        width: 70%;
        margin: 0 15% 20px 15%;
        .class_modif {
            margin: 30px 10%;
            .label_modif {
                min-width: 120px;
                font-size: 25px;
            }
            .input_modif {
                width: 250px;
                font-size: 15px;
            }
        }
        .button_valid_modif {
            width: 50%;
            margin: 20px 25%;
            font-size: 25px;
        }
        .p_echec_modif {
            width: 80%;
            margin: 30px 10% 15px 10%;
            font-size: 25px;
        }
    }
}
@media screen and (min-width: 1280px) {
    .modif_account {
        width: 60%;
        margin: 0 20% 20px 20%;
        .class_modif {
            margin: 30px 10%;
            .label_modif {
                min-width: 120px;
                font-size: 30px;
            }
            .input_modif {
                width: 350px;
                font-size: 20px;
            }
        }
        .button_valid_modif {
            width: 50%;
            margin: 20px 25%;
            font-size: 30px;
        }
        .p_echec_modif {
            width: 80%;
            margin: 30px 10% 15px 10%;
            font-size: 30px;
        }
    }
}
</style>

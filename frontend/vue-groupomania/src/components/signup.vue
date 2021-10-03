<!--composant pour la création d'un utilisateur-->
<template>
    <form id="classSignup">
        <div class="firstname_signup">
            <label class="label_signup" for="name"
                >Nom* :
                <p class="input_valid_signup" v-if="!this.name">
                    *Champ obligatoire
                </p>
            </label>
            <input class="input_signup" id="name" type="tex" v-model="name" />
        </div>
        <div class="firstname_signup">
            <label class="label_signup" for="firstname"
                >Prénom* :
                <p class="input_valid_signup" v-if="!this.firstname">
                    *Champ obligatoire
                </p>
            </label>
            <input
                class="input_signup"
                id="firstname"
                type="text"
                v-model="firstname"
            />
        </div>

        <div class="firstname_signup">
            <label class="label_signup" for="username"
                >Pseudo* :
                <p class="input_valid_signup" v-if="!this.username">
                    *Champ obligatoire
                </p>
            </label>
            <input
                class="input_signup"
                id="username"
                type="text"
                v-model="username"
            />
        </div>
        <div class="firstname_signup">
            <label class="label_signup" for="photo"
                >Photo de profil* :
                <p
                    class="input_valid_signup"
                    v-if="this.selectedFile.length === 0"
                >
                    *Champ obligatoire
                </p>
            </label>

            <input
                type="file"
                id="photo"
                class="input_signup"
                @change="onFileSelected"
            />
        </div>
        <div class="firstname_signup">
            <label class="label_signup" for="bio"
                >Bio* :
                <p class="input_valid_signup" v-if="!this.bio">
                    *Champ obligatoire
                </p>
            </label>
            <input class="input_signup" id="bio" type="text" v-model="bio" />
        </div>

        <div class="firstname_signup">
            <label class="label_signup" for="email"
                >Email* :
                <p class="input_valid_signup" v-if="!this.email">
                    *Champ obligatoire
                </p>
            </label>
            <input
                class="input_signup"
                id="email"
                type="text"
                v-model="email"
            />
        </div>
        <div class="firstname_signup">
            <label class="label_signup" for="password"
                >Mot de passe* :
                <p class="input_valid_signup" v-if="!this.password">
                    *Champ obligatoire
                </p>
            </label>
            <input
                class="input_signup"
                id="password"
                type="password"
                v-model="password"
            />
        </div>
        <div class="echec_signup" v-bind:style="{ display: computeddisplay }">
            <p class="p_echec_signup">La création du compte a échouée</p>
            <p v-on:click="close" class="close_echec_signup">fermer</p>
        </div>
        <button class="button_signup" type="button" @click="createUser()">
            Valider
        </button>
    </form>
</template>
<script>
import instance from "../instance.js";
export default {
    name: "signup",
    data() {
        return {
            firstname: "",
            name: "",
            username: "",
            imageUrl: "",
            bio: "",
            email: "",
            password: "",
            selectedFile: [],
            display: "none",
        };
    },
    created() {
        this.clearStorage();
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },

    methods: {
        //selection du fichier photo de profil
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        //vide le local storage au chargement de la page
        clearStorage() {
            localStorage.removeItem("token");
        },
        //création du compte
        async createUser() {
            const formData = new FormData();
            formData.append("firstname", this.firstname);
            formData.append("name", this.name);
            formData.append("username", this.username);
            formData.append("bio", this.bio);
            formData.append("email", this.email);
            formData.append("password", this.password);
            formData.append("image", this.selectedFile);
            const user = { email: this.email, password: this.password };
            instance
                .post("http://localhost:3000/auth/signup", formData)
                .then(() => {
                    instance
                        .post("http://localhost:3000/auth/login", user)
                        .then((response) => response.data)
                        .then((data) => {
                            if (data.userid > 0) {
                                localStorage.setItem("token", data.token);
                                this.$router.push("/welcome");
                            }
                        });
                })
                .catch(() => {
                    return (this.display = "block");
                });
        },
        close: function() {
            this.display = "none";
        },
    },
};
</script>
<style scoped lang="scss">
#classSignup {
    padding-top: 50px;
    margin: 30px 0 0 0;
    position: relative;
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 40%;
        margin-left: 30%;
        padding-top: 60px;
        border-top: 2px solid #224070;
    }

    .firstname_signup {
        display: flex;
        flex-direction: row;
        width: 75%;
        margin: auto;
        padding-bottom: 20px;
        .input_signup {
            border: 2px solid #224070;
            width: 120px;
            font-size: 15px;
        }
        .label_signup {
            flex-grow: 1;
            position: relative;
            font-size: 15px;
            .input_valid_signup {
                color: red;
                font-size: 10px;
                position: absolute;
                top: 10px;
                left: 0;
            }
        }
    }
    .echec_signup {
        color: red;
        height: 50px;
        text-align: center;
        border: 2px solid #224070;
        margin: 20px 10% 20px 10%;
        position: relative;
        .p_echec_signup {
            height: 50px;
            line-height: 50px;
            margin: auto;
        }
        .close_echec_signup {
            color: black;
            font-size: 10px;
            position: absolute;
            top: 25px;
            right: 5px;
        }
    }
    .button_signup {
        font-size: 15px;
        width: 30%;
        margin-left: 35%;
        background-color: white;
        border: 2px solid #224070;
        margin-top: 20px;
        box-shadow: 3px 3px #224070;
    }
}

@media screen and (min-width: 481px) {
    #classSignup {
        width: 80%;
        margin: 30px 10% 0 10%;
        .firstname_signup {
            .input_signup {
                width: 160px;
            }
        }
        .echec_signup {
            width: 60%;
            margin: 20px 20% 0 20%;
            position: relative;
            .p_echec_signup {
                height: 50px;
                line-height: 50px;
                margin: auto;
            }
            .close_echec_signup {
                color: black;
                font-size: 10px;
                position: absolute;
                top: 25px;
                right: 5px;
            }
        }
    }
}
@media screen and (min-width: 769px) {
    #classSignup {
        width: 70%;
        margin: 30px 15% 0 15%;
        .firstname_signup {
            .input_signup {
                width: 200px;
                font-size: 23px;
            }
            .label_signup {
                font-size: 23px;
                .input_valid_signup {
                    font-size: 12px;
                    top: 12px;
                }
            }
        }
        .echec_signup {
            width: 60%;
            margin: 20px 20% 0 20%;
            position: relative;
            .p_echec_signup {
                height: 50px;
                line-height: 50px;
                margin: auto;
            }
            .close_echec_signup {
                color: black;
                font-size: 10px;
                position: absolute;
                top: 25px;
                right: 5px;
            }
        }
        .button_signup {
            font-size: 23px;
            width: 40%;
            margin-left: 30%;
            margin-top: 20px;
            box-shadow: 3px 3px black;
        }
    }
}
@media screen and (min-width: 1280px) {
    #classSignup {
        width: 60%;
        margin: 30px 20% 0 20%;
        .firstname_signup {
            .input_signup {
                width: 250px;
                font-size: 25px;
            }
            .label_signup {
                font-size: 25px;
                .input_valid_signup {
                    font-size: 12px;
                    top: 12px;
                    padding: 0 2px;
                }
            }
        }
        .echec_signup {
            width: 50%;
            margin: 20px 25% 0 25%;
            position: relative;
            .p_echec_signup {
                font-size: 25px;
                height: 50px;
                line-height: 50px;
                margin: auto;
            }
            .close_echec_signup {
                color: black;
                font-size: 12px;
                position: absolute;
                top: 25px;
                right: 5px;
            }
        }
        .button_signup {
            font-size: 25px;
        }
    }
}
</style>

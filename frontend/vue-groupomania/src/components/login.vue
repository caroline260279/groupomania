<template>
    <div class="classLogin">
        <form action="">
            <div class="login_email">
                <label class="label_login" for="email"
                    >Email* :
                    <p class="input_valid_login" v-if="!this.email">
                        *Champ obligatoire
                    </p>
                </label>

                <input id="email" type="text" v-model="email" />
            </div>

            <div class="login_mdp">
                <label class="label_login" for="password"
                    >Mot de passe* :
                    <p class="input_valid_login" v-if="!this.password">
                        *Champ obligatoire
                    </p></label
                >

                <input id="password" type="password" v-model="password" />
            </div>
            <div
                class="echec_login"
                v-bind:style="{ display: computeddisplay }"
            >
                <p class="p_echec_login">identifiants non valides</p>
                <p v-on:click="close" class="close_echec_login">fermer</p>
            </div>
            <button class="button_login" @click="submit()">Se connecter</button>
        </form>
        <div class="inscription_login">
            <p class="p_login">Pas encore membre ?</p>
            <router-link to="/signup" class="router_login"
                >S'inscrire</router-link
            >
        </div>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "login",
    data() {
        return {
            errors: [],
            email: "",
            password: "",
            display: "none",
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },
    created() {
        this.clearStorage();
    },
    Mounted() {
        this.submit();
    },
    methods: {
        clearStorage() {
            localStorage.removeItem("token");
        },
        submit() {
            const user = { email: this.email, password: this.password };

            instance
                .post("http://localhost:3000/auth/login", user)
                .then((response) => response.data)
                .then((data) => {
                    console.log(data.userid);
                    if (data.userid > 0) {
                        console.log(data.token);
                        localStorage.setItem("token", data.token);
                        this.$router.push("/allgifs");
                    }
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
.classLogin {
    form {
        padding-top: 80px;
        padding-bottom: 80px;
        position: relative;
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 40%;
            margin-left: 30%;
            border-bottom: 2px solid black;
            margin-top: 40px;
            margin-bottom: 40px;
        }
        &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: "";
            width: 40%;
            margin-left: 30%;
            border-top: 2px solid black;
            margin-top: 40px;
            margin-bottom: 40px;
        }
    }
}
.echec_login {
    color: red;
    height: 50px;
    text-align: center;
    border: 2px solid black;
    margin: 0 10% 20px 10%;
    position: relative;
    .p_echec_login {
        height: 50px;
        line-height: 50px;
        margin: auto;
    }
    .close_echec_login {
        color: black;
        font-size: 10px;
        position: absolute;
        top: 25px;
        right: 5px;
    }
}
.login_email {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space between;
    width: 75%;
    margin: auto;
    padding-bottom: 30px;
    position: relative;

    #email {
        border: 2px solid black;
        width: 120px;
    }
    .label_login {
        flex-grow: 1;
        position: relative;
        .input_valid_login {
            color: red;
            font-size: 10px;
            position: absolute;
            top: 10px;
            left: 0;
        }
    }
}
.login_mdp {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space between;
    width: 75%;
    margin: auto;
    padding-bottom: 40px;
    position: relative;
    #password {
        border: 2px solid black;
        width: 120px;
    }
    .label_login {
        flex-grow: 1;
        position: relative;
        .input_valid_login {
            color: red;
            font-size: 10px;
            position: absolute;
            top: 10px;
            left: 0;
        }
    }
}
.button_login {
    width: 30%;
    margin-left: 35%;
    background-color: white;
    border: 2px solid black;
    box-shadow: 3px 3px black;
}
.inscription_login {
    text-align: center;
    .router_login {
        font-weight: bold;
        text-decoration: none;
        text-decoration-color: black;
        color: black;
        &:hover {
            font-size: 15px;
        }
    }
}

@media screen and (min-width: 481px) {
    .classLogin {
        width: 80%;
        margin: 0 10%;
        font-size: 20px;
        .login_email {
            padding-bottom: 50px;
            #email {
                width: 170px;
                font-size: 15px;
            }
            .label_login {
                font-size: 15px;
                .input_valid_login {
                    width: 170px;
                    font-size: 13px;
                    position: absolute;
                    top: 10px;
                    left: 0;
                }
            }
        }
        .login_mdp {
            #password {
                width: 170px;
                font-size: 15px;
            }
            .label_login {
                font-size: 15px;
                .input_valid_login {
                    width: 170px;
                    font-size: 13px;
                    position: absolute;
                    top: 10px;
                    left: 0;
                }
            }
        }
    }
}
@media screen and (min-width: 769px) {
    .classLogin {
        width: 70%;
        margin: 0 15%;
        font-size: 23px;
        .login_email {
            padding-bottom: 50px;
            margin-top: 50px;
            #email {
                width: 240px;
                font-size: 23px;
            }
            .label_login {
                font-size: 23px;
                .input_valid_login {
                    width: 240px;
                    font-size: 16px;
                    position: absolute;
                    top: 10px;
                    left: 0;
                }
            }
        }
        .login_mdp {
            margin-bottom: 50px;
            #password {
                width: 240px;
                font-size: 23px;
            }
            .label_login {
                font-size: 23px;
                .input_valid_login {
                    width: 240px;
                    font-size: 16px;
                    position: absolute;
                    top: 10px;
                    left: 0;
                }
            }
        }
    }
    .button_login {
        width: 40%;
        margin-left: 30%;
        font-size: 20px;
    }
    .echec_login {
        height: 60px;
        margin: 0 10% 40px 10%;
        .p_echec_login {
            height: 50px;
            line-height: 50px;
            margin: auto;
        }
        .close_echec_login {
            font-size: 12px;
            top: 35px;
        }
    }
}
@media screen and (min-width: 1280px) {
    .echec_login {
        width: 50%;
        height: 60px;
        margin: 0 25% 40px 25%;
        .p_echec_login {
            height: 50px;
            line-height: 50px;
            margin: auto;
        }
        .close_echec_login {
            font-size: 12px;
            top: 35px;
        }
    }
}
</style>

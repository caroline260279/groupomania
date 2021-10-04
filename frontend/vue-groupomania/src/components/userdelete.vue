<!--composant pour la suppression de l'utilisateur-->
<template>
    <div id="delete_user">
        <h1 class="title_delete_user">
            Attention, cette action est irréversible!
        </h1>
        <button class="button_delete_user" @click="deleteUser()">
            Je supprime mon compte
        </button>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "userdelete",
    data() {
        return {
            email: "",
            autorisation: 0,
        };
    },
    created() {
        this.connect();
    },
    methods: {
        //suppression de l'utilisateur
        async deleteUser() {
            const emailUserDelete = await instance.get(
                "http://localhost:3000/auth/user/connected/"
            );

            const emailUserDeleteTwo = emailUserDelete.data.email;
            const user = { email: emailUserDeleteTwo };
            instance
                .delete("http://localhost:3000/auth/delete", {
                    data: user,
                })
                .then(() => {
                    this.$router.push("/");
                })
                .catch(() => {
                    console.log("l'utilisateur n'a pas été supprimé");
                });
        },
        //renvoie à la page login s'il n'y a pas d'utilisateur connecté
        connect() {
            instance
                .get("http://localhost:3000/auth/user/connected/")
                .then(() => console.log("Vous êtes connecté"))
                .catch(() => this.$router.push("/"));
        },
    },
};
</script>

<style lang="scss">
#delete_user {
    .title_delete_user {
        color: red;
        font-size: 20px;
        width: 80%;
        margin: 50px 10% 20px 10%;
        text-align: center;
    }
    .button_delete_user {
        width: 50%;
        margin: 0 25%;
        text-align: center;
        background-color: white;
        border: 2px solid #224070;
        box-shadow: 3px 3px #224070;
    }
}
@media screen and (min-width: 481px) {
    #delete_user {
        .deleteUser {
            .label_delete {
                font-size: 22px;
            }
            #delete {
                width: 80%;
                margin: 40px 10%;
                font-size: 18px;
            }
            .button_delete_user {
                width: 40%;
                margin: 0 30%;
                font-size: 18px;
            }
        }
    }
}
@media screen and (min-width: 769px) {
    #delete_user {
        .deleteUser {
            .label_delete {
                margin: 20px 0;
                font-size: 30px;
            }
            #delete {
                width: 70%;
                margin: 40px 15%;
                font-size: 25px;
            }
            .no_autorisation {
                font-size: 25px;
                margin: 0 0 30px 0;
            }
            .button_delete_user {
                width: 40%;
                margin: 0 30%;
                text-align: center;
                font-size: 25px;
            }
        }
    }
}
@media screen and (min-width: 1280px) {
    #delete_user {
        .deleteUser {
            width: 70%;
            margin: 0 15%;
            display: flex;
            flex-direction: column;
            .label_delete {
                width: 100%;
                margin: 20px 0;
                font-size: 30px;
            }
            #delete {
                width: 70%;
                margin: 40px 15%;
                font-size: 25px;
            }
            .no_autorisation {
                font-size: 25px;
                margin: 0 0 30px 0;
            }
            .button_delete_user {
                width: 40%;
                margin: 0 30%;
                text-align: center;
                font-size: 25px;
            }
        }
    }
}
</style>

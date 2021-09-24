<template>
    <div id="delete_user">
        <form class="deleteUser" action="">
            <label class="label_delete" for="delete"
                >Confirmer votre adresse email :
            </label>

            <input id="delete" type="text" v-model="email" />
            <button class="button_delete_user" @click="deleteUser()">
                Je supprime mon compte
            </button>
        </form>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "userdelete",
    data() {
        return {
            email: "",
        };
    },
    methods: {
        deleteUser() {
            const user = { email: this.email };
            instance
                .delete("http://localhost:3000/auth/delete", {
                    data: user,
                })
                .then(() => this.$router.push("/"))
                .catch(() => {
                    console.log("l'utilisateur n'a pas été supprimé");
                });
        },
    },
};
</script>

<style lang="scss">
#delete_user {
    width: 80%;
    margin: 50px 10% 0 10%;

    font-size: 20px;
    .deleteUser {
        text-align: center;
        .label_delete {
            margin: 20px 0;
        }
        #delete {
            width: 100%;
            margin: 20px 0;
            border: 2px solid black;
        }
        .button_delete_user {
            width: 50%;
            margin: 0 25%;
            text-align: center;
            background-color: white;
            border: 2px solid black;
            box-shadow: 3px 3px black;
        }
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

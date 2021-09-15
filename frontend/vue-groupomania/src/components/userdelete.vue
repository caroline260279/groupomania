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
</style>

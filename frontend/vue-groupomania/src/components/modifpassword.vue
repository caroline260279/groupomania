<template>
    <div id="delete_user">
        <form class="mdp_modif" action="">
            <label class="label_mdp_modif" for="password_modif"
                >Mon nouveau mot de passe :
            </label>

            <input id="password_modif" type="password" v-model="password" />
            <button class="button_modif_password" @click="submit()">
                Je change de mot de passe
            </button>
        </form>
        <div v-bind:style="{ display: computeddisplay }">
            <p class="modif_ok">votre mot de passe a été modifié</p>
            <router-link to="/welcome" class="link_modif_password"
                >retouner sur mon compte...
            </router-link>
        </div>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "modifpassword",
    data() {
        return {
            password: "",
            display: "none",
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },
    methods: {
        async submit() {
            const userConnected = await instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => resp.data.id);
            const userConnectedemail = await instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => resp.data.email);
            const user = { email: userConnectedemail, password: this.password };
            console.log(userConnected);
            const formData = new FormData();
            formData.append("password", this.password);
            instance
                .put(
                    "http://localhost:3000/auth/modify/Pw/" + userConnected,
                    formData
                )
                .then(
                    instance
                        .post("http://localhost:3000/auth/login", user)
                        .then((response) =>
                            localStorage.setItem("token", response.data.token)
                        )
                        .then(() => (this.display = "block"))
                );
        },
    },
};
</script>

<style lang="scss">
#delete_user {
    width: 80%;
    margin: 50px 10% 0 10%;

    font-size: 20px;
    .mdp_modif {
        text-align: center;
        .label_mdp_modif {
            margin: 20px 0;
        }
        #password_modif {
            width: 100%;
            margin: 20px 0;
        }
        .button_modif_password {
            width: 50%;
            margin: 0 25%;
            text-align: center;
            background-color: white;
            border: 2px solid black;
            box-shadow: 3px 3px black;
        }
    }
    .link_modif_password {
        display: block;
        width: 100%;
        color: black;
        text-decoration: none;
        font-size: 12px;
        text-align: right;
        margin: 30px 0 0 0;
    }
    .modif_ok {
        widows: 100%;
        text-align: center;
        margin: 20px 0;
        color: red;
    }
}
</style>

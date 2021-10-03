<!--composant pour la présentation d'un utilisateur-->
<template>
    <div id="userpage">
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
        <!--affichage d'un bouton pour supprimer l'utilisateur si l'utilisateur connecté est administrateur-->
        <button
            v-if="this.admin === true"
            class="button_delete_admin_userpage"
            type="button"
            @click="supprim()"
        >
            Supprimer ce compte
        </button>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "finduser",
    data() {
        return {
            object: { name: "", firstame: "", username: "", photo: "" },
            display: "none",
            show: 0,
            admin: false,
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },
    created() {
        this.user();
        this.admintodelete();
    },
    methods: {
        //récupération de l'utilisateur
        async user() {
            let user = this.$route.params.username;
            instance
                .get("http://localhost:3000/auth/user/" + user)
                .then((response) => (this.object = response.data))

                .catch(() => this.$router.push("/"));
        },
        continu: function() {
            this.display = "block";
        },
        close: function() {
            this.display = "none";
        },
        //suppression de l'utilisateur
        async supprim() {
            let user = this.$route.params.username;
            let emailUserDelete = await instance
                .get("http://localhost:3000/auth/user/" + user)
                .then((response) => response.data.email);
            const useremail = { email: emailUserDelete };
            instance
                .delete("http://localhost:3000/auth/delete", {
                    data: useremail,
                })
                .then(() => {
                    this.$router.push("/welcome");
                })
                .catch(() => {
                    console.log("l'utilisateur n'a pas été supprimé");
                });
        },
        //renvoie si l'utilisateur connecté est administrateur
        admintodelete() {
            instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => (this.admin = resp.data.admin))
                .catch(() => console.log("erreur"));
        },
    },
};
</script>

<style lang="scss">
#userpage {
    .button_delete_admin_userpage {
        width: 50%;
        margin: 20px 25% 20px 25%;
        text-align: center;
        background-color: white;
        border: 2px solid #224070;
        box-shadow: 3px 3px #224070;
    }
}
</style>

<template>
    <form id="classSignup">
        <div class="firstname_signup">
            <label class="label_signup" for="name">Nom :</label>
            <input class="input_signup" id="name" type="tex" v-model="name" />
        </div>
        <div class="firstname_signup">
            <label class="label_signup" for="firstname">Prénom :</label>
            <input
                class="input_signup"
                id="firstname"
                type="text"
                v-model="firstname"
            />
        </div>

        <div class="firstname_signup">
            <label class="label_signup" for="username">Pseudo :</label>
            <input
                class="input_signup"
                id="username"
                type="text"
                v-model="username"
            />
        </div>
        <div class="firstname_signup">
            <label class="label_signup" for="photo">Photo de profil :</label>

            <input
                type="file"
                id="photo"
                class="input_signup"
                @change="onFileSelected"
            />
        </div>
        <div class="firstname_signup">
            <label class="label_signup" for="bio">Bio :</label>
            <input class="input_signup" id="bio" type="text" v-model="bio" />
        </div>

        <div class="firstname_signup">
            <label class="label_signup" for="email">Email :</label>
            <input
                class="input_signup"
                id="email"
                type="text"
                v-model="email"
            />
        </div>
        <div class="firstname_signup">
            <label class="label_signup" for="password">Mot de passe :</label>
            <input
                class="input_signup"
                id="password"
                type="password"
                v-model="password"
            />
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
        };
    },

    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        async createUser() {
            const formData = new FormData();
            console.log(formData);
            formData.append("firstname", this.firstname);
            formData.append("name", this.name);
            formData.append("username", this.username);
            formData.append("bio", this.bio);
            formData.append("email", this.email);
            formData.append("password", this.password);
            formData.append("image", this.selectedFile);

            instance
                .post("http://localhost:3000/auth/signup", formData)
                .then(() => this.$router.push("/welcome/" + this.username))
                .catch(() => {
                    console.log("la création de l'utilisateur a échouée");
                });
        },
    },
};
</script>
<style scoped lang="scss">
#classSignup {
    padding-top: 50px;
    margin-top: 30px;
    position: relative;
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 40%;
        margin-left: 30%;
        padding-top: 60px;
        border-top: 2px solid black;
    }

    .firstname_signup {
        display: flex;
        flex-direction: row;
        width: 75%;
        margin: auto;
        padding-bottom: 20px;
        .input_signup {
            border: 2px solid black;
            width: 120px;
        }
        .label_signup {
            flex-grow: 1;
        }
    }
    .button_signup {
        width: 30%;
        margin-left: 35%;
        background-color: white;
        border: 2px solid black;
        margin-top: 20px;
        box-shadow: 3px 3px black;
    }
}

@media screen and (min-width: 480px) and (max-width: 965px) {
    #classSignup {
        .firstname_signup {
            .input_signup {
                width: 200px;
            }
        }
    }
}
</style>

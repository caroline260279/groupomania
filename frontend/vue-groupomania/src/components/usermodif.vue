<template>
    <div id="user">
        <div class="button_user">
            <button class="button_modif_user" @click="modifUser()">
                Modifier mon compte
            </button>
            <button class="button_delete_user" @click="deleteUser()">
                Supprimer mon compte
            </button>
            <button class="button_modif_password" @click="modifPassword()">
                Changer mon mot de passe
            </button>
        </div>
        <div class="modif_account">
            <div class="class_modif">
                <label class="label_modif" for="modif_username"
                    >Pseudo* :
                    <p class="p_modif" v-if="!this.username">
                        *Champ obligatoire
                    </p>
                </label>
                <input
                    class="input_modif"
                    id="modif_username"
                    type="text"
                    v-model="username"
                />
            </div>
            <div class="class_modif">
                <label class="label_modif" for="modif_photo"
                    >Photo de profil* :
                    <p class="p_modif" v-if="!this.selectedFileModifPhoto">
                        *Champ obligatoire
                    </p>
                </label>

                <input
                    type="file"
                    id="modif_photo"
                    class="input_modif"
                    @change="onFileSelectedModifUser"
                />
            </div>
            <div class="class_modif">
                <label class="label_modif" for="modif_bio"
                    >Bio* :
                    <p class="p_modif" v-if="!this.bio">
                        *Champ obligatoire
                    </p>
                </label>
                <input
                    class="input_modif"
                    id="modif_bio"
                    type="text"
                    v-model="bio"
                />
            </div>
            <div class="class_modif">
                <label class="label_modif" for="modif_email"
                    >Email* :
                    <p class="p_modif" v-if="!this.email">
                        *Champ obligatoire
                    </p>
                </label>
                <input
                    class="input_modif"
                    id="modif_email"
                    type="text"
                    v-model="email"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "usermodif",
    data() {
        return {
            display: "none",
            displaymodif: "",
            username: "",
            bio: "",
            email: "",
            selectedFileModifPhoto: [],
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },

    methods: {
        continu: function() {
            this.display = "block";
        },
        close: function() {
            this.display = "none";
        },
    },
};
</script>

<style lang="scss">
.button_user {
    display: flex;
    flex-direction: wrap;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 0 5% 20px 5%;
    .button_modif_user {
        width: 30%;
        font-size: 10px;
        border: 2px solid black;
        background-color: white;
    }
    .button_delete_user {
        width: 30%;
        font-size: 10px;
        border: 2px solid black;
        background-color: white;
    }
    .button_modif_password {
        width: 30%;
        font-size: 10px;
        border: 2px solid black;
        background-color: white;
    }
}
#user {
    position: relative;
    .modif_account {
        border: 2px solid black;
        width: 90%;
        margin: 0 5% 20px 5%;
        /* position: absolute;
        top: 0;
        right: 0;*/
        .class_modif {
            display: flex;
            flex-direction: wrap;
            justify-content: space-between;
            margin: 15px 20px;
            .label_modif {
                position: relative;
                min-width: 120px;
                .p_modif {
                    position: absolute;
                    top: 10px;
                    left: 0;
                    font-size: 8px;
                    color: red;
                }
            }
            .input_modif {
                width: 120px;
                border: 2px solid black;
            }
        }
    }
}
</style>

<template>
    <div id="user">
        <form class="modif_account">
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
            <button class="button_valid_modif" @click="validModifUser()">
                Valider les modifications
            </button>
        </form>
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
#user {
    position: relative;
    .modif_account {
        border: 2px solid black;
        width: 90%;
        margin: 0 5% 20px 5%;
        border-radius: 10px;
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
        .button_valid_modif {
            width: 50%;
            margin: 20px 25%;
            background-color: white;
            border: 2px solid black;
            box-shadow: 3px 3px black;
        }
    }
}
</style>

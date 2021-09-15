<template>
    <div id="gifToModif">
        <div class="gifToModif">
            <h1 class="title_gifToModif">{{ object.title }}</h1>
            <img v-bind:src="object.imageUrl" alt="" class="img_gifToModif" />
        </div>
        <form class="form_modif" action="">
            <h1 class="h1_gifToModif">Que souhitez-vous changer?</h1>
            <div class="gifToModif_title">
                <label class="title_gifToModif" for="title_gifToModif"
                    >Titre :
                </label>

                <input id="title_gifToModif" type="text" v-model="title" />
            </div>

            <div class="gifToModif_file">
                <label class="file_gifToModif" for="file_gifToModif"
                    >Gif :</label
                >

                <input
                    id="file_gifToModif"
                    type="file"
                    @change="onFileSelected"
                />
            </div>

            <div class="button_gifToModif">
                <button class="button_post_gif" @click="updateGif()">
                    Valider les modifications
                </button>
                <button class="button_close_gifwindow" @click="closefModif()">
                    Tout me convient!
                </button>
            </div>
        </form>
        <a href="">
            <router-link to="/welcome" class="menu"
                >tout me convient, retour à mon compte...
            </router-link></a
        >
    </div>
</template>
<script>
import instance from "../instance.js";
export default {
    name: "gifToModif",
    data() {
        return {
            object: {
                id: "",
                title: "",
                imageUrl: "",
                createdAt: "",
            },
            title: "",
            selectedFile: [],
        };
    },
    created() {
        this.gifModif();
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        gifModif() {
            let gifIdToModif = this.$route.params.id;
            instance
                .get("http://localhost:3000/" + gifIdToModif)
                .then((response) => (this.object = response.data))
                .catch(() => {
                    console.log("echec");
                });
        },

        updateGif() {
            let gifIdToModif = this.$route.params.id;
            const formData = new FormData();
            console.log(this.title === "");
            if (!(this.title === "")) {
                formData.append("title", this.title);
                formData.append("image", this.selectedFile);
                instance
                    .put(
                        "http://localhost:3000/modify/" + gifIdToModif,
                        formData
                    )
                    .then(() => location.reload())
                    .catch(() => {
                        console.log("echec");
                    });
            } else {
                formData.append("image", this.selectedFile);
                instance
                    .put(
                        "http://localhost:3000/modify/" + gifIdToModif,
                        formData
                    )
                    .then(() => location.reload())
                    .catch(() => {
                        console.log("echec");
                    });
            }
        },

        closefModif() {
            this.$router.push("/welcome");
        },
    },
};
</script>
<style lang="scss">
.gifToModif {
    list-style-type: none;
    margin: 0;
    padding: 0;
    border: 2px solid black;
    border-radius: 10px;
    width: 70%;
    margin: 0 15% 20px 15%;

    .title_gifToModif {
        font-size: 25px;
        text-align: center;
        padding: 10px 10% 5px 10%;
    }
    .img_gifToModif {
        width: 90%;
        margin: 0 5% 20px 5%;
        height: 200px;
        object-fit: cover;
    }
}
.form_modif {
    width: 90%;
    margin: 0 5%;
    border: 2px solid black;
    border-radius: 10px;
    .h1_gifToModif {
        margin: 20px 10%;
        font-size: 25px;
    }
    .gifToModif_title {
        width: 90%;
        margin: 0 5% 10px 5%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space between;
        .title_gifToModif {
            flex-grow: 1;
            font-size: 20px;
        }
        #title_gifToModif {
            border: 2px solid black;
            width: 200px;
        }
    }
    .gifToModif_file {
        width: 90%;
        margin: 0 5% 10px 5%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space between;
        .file_gifToModif {
            flex-grow: 1;
            font-size: 20px;
        }
        #file_gifToModif {
            border: 2px solid black;
            width: 200px;
        }
    }
    .button_gifToModif {
        width: 80%;
        margin: 20px 10% 10px 10%;
        display: flex;
        flex-direction: wrap;
        flex-wrap: nowrap;
        justify-content: space-between;
        .button_post_gif {
            background-color: white;
            border: 2px solid black;
            box-shadow: 3px 3px black;
            margin-right: 5%;
            font-size: 12px;
            width: 50%;
        }
        .button_close_gifwindow {
            width: 50%;
            background-color: white;
            border: 2px solid black;
            box-shadow: 3px 3px black;
            font-size: 12px;
        }
    }
}
</style>

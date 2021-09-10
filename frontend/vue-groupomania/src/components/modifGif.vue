<template>
    <div>
        <form action="">
            <h1>un changement?</h1>
            <div>
                <label class="label_title_modif" for="post_title_modif"
                    >Titre :
                </label>

                <input id="post_title_modif" type="text" v-model="title" />
            </div>

            <div class="post_gif_modif">
                <label class="label_gif_modif" for="post_gif_modif"
                    >Gif :</label
                >

                <input
                    id="post_gif_modif"
                    type="file"
                    class="input_gif_modif"
                    @change="onFileSelected"
                />
            </div>

            <div class="button_gif">
                <button class="button_post_gif" @click="updateGif()">
                    Valider les modifications
                </button>
                <button class="button_close_gifwindow" @click="closefModif()">
                    Finallement, je ne change rien!
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import instance from "../instance.js";
export default {
    name: "gifToModif",
    data() {
        return {
            title: "",
            selectedFile: [],
        };
    },

    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },

        updateGif() {
            const formData = new FormData();
            console.log(this.title === "");
            if (!(this.title === "")) {
                formData.append("title", this.title);
                formData.append("image", this.selectedFile);
                instance
                    .put("http://localhost:3000/modify/30", formData)
                    .then((response) => console.log(response))
                    .catch(() => {
                        console.log("echec");
                    });
            } else {
                formData.append("image", this.selectedFile);
                instance
                    .put("http://localhost:3000/modify/30", formData)
                    .then((response) => console.log(response))
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
#gifuser {
    list-style-type: none;
    margin: 0;
    padding: 0;
    .date_gifuser {
        text-align: right;
    }
    .list_gifuser {
        border: 2px solid black;
        margin: 0 5% 30px 5%;
        .title_gifuser {
            font-size: 25px;
            text-align: center;
            padding: 10px 0;
        }
        .img_gifuser {
            width: 90%;
            margin: 0 5%;
            height: 200px;
            object-fit: cover;
        }
        .form_modif {
            border: 2px solid black;
        }
    }
}
</style>

<!--composant pour la modification d'un gif-->
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
                <button class="button_close_gifwindow" @click="deleteGif()">
                    Supprimer ce gif
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
        this.verif();
        this.nogif();
    },
    methods: {
        //selection du fichier
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        //affichage du gif à modifier
        gifModif() {
            const gifIdToModif = this.$route.params.id;
            instance
                .get("http://localhost:3000/" + gifIdToModif)
                .then((response) => (this.object = response.data))
                .catch(() => this.$router.push("/"));
        },
        //suppression du gif
        deleteGif() {
            const gif = this.$route.params.id;
            instance
                .delete("http://localhost:3000/delete/" + gif)
                .then(() => this.$router.push("/allgifs"))
                .catch(() => {
                    console.log("echec");
                });
        },
        //mise à jour du gif
        updateGif() {
            const gifIdToModif = this.$route.params.id;
            const formData = new FormData();
            if (!(this.title === "")) {
                formData.append("title", this.title);
                formData.append("image", this.selectedFile);
                instance
                    .put(
                        "http://localhost:3000/modify/" + gifIdToModif,
                        formData
                    )
                    .then(() => this.$router.push("/welcome"))
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
                    .then(() => this.$router.push("/welcome"))
                    .catch(() => {
                        console.log("echec");
                    });
            }
        },
        //redirection aprés suppression du gif selon admin ou non
        async verif() {
            const gifIdToModif = this.$route.params.id;

            const userid = await instance.get(
                "http://localhost:3000/" + gifIdToModif
            );

            const useridTwo = userid.data.userid;

            const useridFromToken = await instance.get(
                "http://localhost:3000/auth/user/connected/"
            );

            const useridFromTokenTwo = useridFromToken.data.id;
            const admin = await instance.get(
                "http://localhost:3000/auth/user/connected/"
            );

            const adminTwo = admin.data.admin;
            if (adminTwo != true && useridTwo != useridFromTokenTwo) {
                this.$router.push("/allgifs");
            } else {
                console.log("vous n'avez pas à etre redirigé");
            }
        },
        closefModif() {
            this.$router.push("/welcome");
        },
        //redirection si le gif n'existe pas
        async nogif() {
            const gif = this.$route.params.id;
            const gifexist = await instance.get("http://localhost:3000/" + gif);

            const gifexistTwo = gifexist.data.id;
            if (gifexistTwo > 0) {
                console.log("vous n'avez pas à etre redirigé");
            } else {
                this.$router.push("/allgifs");
            }
        },
    },
};
</script>
<style lang="scss">
.gifToModif {
    list-style-type: none;
    border: 2px solid #224070;
    border-radius: 10px;
    width: 70%;
    margin: 0 15% 20px 15%;
    background-color: white;

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
        border: 2px solid #224070;
        border-radius: 10px;
    }
}
.form_modif {
    width: 90%;
    margin: 0 5%;
    border: 2px solid #224070;
    border-radius: 10px;
    .h1_gifToModif {
        margin: 20px 10%;
        font-size: 25px;
        text-align: center;
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
            border: 2px solid #224070;
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
            border: 2px solid #224070;
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
            border: 2px solid #224070;
            box-shadow: 3px 3px #224070;
            margin-right: 5%;
            font-size: 12px;
            width: 50%;
        }
        .button_close_gifwindow {
            width: 50%;
            background-color: white;
            border: 2px solid #224070;
            box-shadow: 3px 3px #224070;
            font-size: 12px;
        }
    }
}
@media screen and (min-width: 481px) {
    .gifToModif {
        width: 70%;
        margin: 0 15% 20px 15%;
        .title_gifToModif {
            font-size: 30px;
            padding: 10px 10% 5px 10%;
        }
        .img_gifToModif {
            width: 90%;
            margin: 0 5% 20px 5%;
            height: 350px;
        }
    }
    .form_modif {
        width: 90%;
        margin: 0 5%;
        .h1_gifToModif {
            margin: 20px 10%;
            font-size: 30px;
        }
        .gifToModif_title {
            width: 70%;
            margin: 0 15% 30px 15%;
            .title_gifToModif {
                font-size: 20px;
            }
            #title_gifToModif {
                width: 230px;
            }
        }
        .gifToModif_file {
            width: 70%;
            margin: 0 15% 30px 15%;
            .file_gifToModif {
                font-size: 20px;
            }
            #file_gifToModif {
                width: 230px;
            }
        }
        .button_gifToModif {
            width: 60%;
            margin: 20px 20% 30px 20%;
            .button_post_gif {
                margin-right: 10%;
                font-size: 15px;
                width: 50%;
            }
            .button_close_gifwindow {
                width: 50%;
                font-size: 15px;
            }
        }
    }
}
@media screen and (min-width: 769px) {
    .gifToModif {
        width: 70%;
        margin: 0 15% 20px 15%;
        .title_gifToModif {
            font-size: 40px;
            padding: 10px 10% 5px 10%;
        }
        .img_gifToModif {
            width: 90%;
            margin: 0 5% 20px 5%;
            height: 500px;
        }
    }
    .form_modif {
        width: 90%;
        margin: 0 5%;
        .h1_gifToModif {
            margin: 30px 10% 50px 10%;
            font-size: 40px;
        }
        .gifToModif_title {
            width: 70%;
            margin: 0 15% 30px 15%;
            .title_gifToModif {
                font-size: 30px;
            }
            #title_gifToModif {
                width: 350px;
                font-size: 20px;
            }
        }
        .gifToModif_file {
            width: 70%;
            margin: 0 15% 50px 15%;
            .file_gifToModif {
                font-size: 30px;
            }
            #file_gifToModif {
                width: 350px;
                font-size: 20px;
            }
        }
        .button_gifToModif {
            width: 60%;
            margin: 20px 20% 30px 20%;
            .button_post_gif {
                margin-right: 10%;
                font-size: 20px;
                width: 50%;
            }
            .button_close_gifwindow {
                width: 50%;
                font-size: 20px;
            }
        }
    }
}
@media screen and (min-width: 1280px) {
    .gifToModif {
        width: 60%;
        margin: 0 20% 20px 20%;
        .title_gifToModif {
            font-size: 40px;
            padding: 10px 10% 5px 10%;
        }
        .img_gifToModif {
            width: 90%;
            margin: 0 5% 20px 5%;
            height: 500px;
        }
    }
    .form_modif {
        width: 70%;
        margin: 0 15%;
        .h1_gifToModif {
            margin: 30px 20% 50px 20%;
            font-size: 40px;
        }
        .gifToModif_title {
            width: 70%;
            margin: 0 15% 30px 15%;
            .title_gifToModif {
                font-size: 30px;
            }
            #title_gifToModif {
                width: 400px;
                font-size: 20px;
            }
        }
        .gifToModif_file {
            width: 70%;
            margin: 0 15% 50px 15%;
            .file_gifToModif {
                font-size: 30px;
            }
            #file_gifToModif {
                width: 400px;
                font-size: 20px;
            }
        }
        .button_gifToModif {
            width: 60%;
            margin: 20px 20% 30px 20%;
            .button_post_gif {
                margin-right: 10%;
                font-size: 20px;
                width: 50%;
            }
            .button_close_gifwindow {
                width: 50%;
                font-size: 20px;
            }
        }
    }
}
</style>

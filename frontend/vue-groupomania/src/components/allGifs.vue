<!--composant pour la page présentant l'ensemble des gifs des utilisateurs-->
<template>
    <div id="allGif">
        <ul id="ul_all_gif">
            <!--itération de la liste de gifs -->
            <li v-for="value in object" v-bind:key="value" class="all_gif">
                <router-link
                    v-bind:to="`/username/` + value.user.username"
                    class="user_allgif"
                >
                    <div class="user_allgif">
                        <img
                            v-bind:src="value.user.photo"
                            alt="photo de profil de l'utilisateur partageant le gif"
                            class="photo_user_allgif"
                        />
                        <div class="username_allgif">
                            <p class="p_user_allgif">
                                {{ value.user.username }}
                            </p>
                            <p class="date_allgif">
                                le
                                {{
                                    new Date(
                                        value.updatedAt
                                    ).toLocaleDateString("fr-FR")
                                }}
                            </p>
                        </div>
                    </div>
                </router-link>
                <div class="title_allgif">
                    <button
                        class="button_title_allgif"
                        type="button"
                        @click="linkadmin(value.id)"
                    >
                        <h2>{{ value.title }}</h2>
                    </button>
                </div>
                <div>
                    <img
                        v-bind:src="value.imageUrl"
                        alt=""
                        class="img_allgif"
                    />
                </div>
                <div class="row1_allgif">
                    <div class="like_allgif">
                        <button
                            class="button_heart_allgif"
                            type="button"
                            @click="like(value.id)"
                        >
                            <i
                                class="far fa-heart empty"
                                v-if="!blue(value)"
                            ></i>
                            <i class="fas fa-heart full" v-if="blue(value)"></i>
                        </button>
                        <p class="number_like">{{ value.gif_likes.length }}</p>
                    </div>
                </div>
                <form class="row2_allgif" action="">
                    <label class="label_gifuser" for="comment"></label>
                    <input
                        class="input_comment_allgif"
                        id="comment_allgif"
                        type="text"
                        v-model="comment"
                    />
                    <button
                        class=" button_comment_allgif"
                        type="button"
                        @click="createcomment(value.id)"
                    >
                        Commenter
                    </button>
                </form>
                <button
                    class="button_show_comment"
                    type="button"
                    @click="showcomment(value.id)"
                >
                    voir les commentaires
                </button>
                <ul
                    class="ul_comment_allgif"
                    :id="`gifuser` + value.id"
                    v-if="value.id === this.show"
                >
                    <!--itération des commentaire pour chaque gif -->
                    <li
                        class="list_comment_allgif"
                        v-for="valeur in object.message"
                        v-bind:key="valeur"
                    >
                        <p class="p_user_comment_allgif">
                            <span class="span_user_comment_allgif"
                                >{{ valeur.user.username }}
                            </span>
                            :
                        </p>

                        <p class="p_comment_allgif">{{ valeur.comment }}</p>

                        <div
                            v-if="
                                valeur.userid === this.userconnect ||
                                    1 === this.admin
                            "
                            class="div_form_comment_allgif"
                        >
                            <form
                                class="form_modif_comment"
                                v-if="valeur.id === this.showmodif"
                            >
                                <input
                                    type="text"
                                    class="input_modif_comment"
                                    v-model="commentmodif"
                                /><button
                                    class="button_valid_modif_comment_allgif"
                                    type="button"
                                    @click="
                                        validModifComment(valeur.id, value.id)
                                    "
                                >
                                    Valider les modifications
                                </button>
                            </form>
                            <button
                                class="button_modif_comment_allgif"
                                type="button"
                                @click="modifComment(valeur.id)"
                            >
                                modifier ce commentaire</button
                            ><button
                                class="button_supprim_comment_allgif"
                                type="button"
                                @click="supprimComment(valeur.id, value.id)"
                            >
                                supprimer ce commentaire
                            </button>
                        </div>
                    </li>
                </ul>
                <p class="p_nocomment_allgif" v-if="value.id === -this.show">
                    Ce gif n'a pas encore de commentaire, soyez le premier...
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "allGifs",
    data() {
        return {
            object: [
                {
                    id: "",
                    userid: "",
                    title: "",
                    imageUrl: "",
                    createdAt: "",
                    updatedAt: "",
                    gif_likes: {
                        jaime: "",
                    },
                    user: {
                        username: "",
                        photo: "",
                    },
                    message: [
                        {
                            id: "",
                            userid: "",
                            comment: "",
                            commentmodif: "",
                            gifid: "",
                            createdAt: "",
                            updatedAt: "",
                            user: {
                                username: "",
                                photo: "",
                            },
                        },
                    ],
                },
            ],
            display: "none",
            show: 0,
            blueheart: 0,
            showmodif: 0,
            userconnect: 0,
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },
    created() {
        this.userid();
        this.allGifs();
        this.adminComment();
        this.adminOrNot();
    },

    mounted() {},
    methods: {
        //récupération de tous les gifs
        allGifs() {
            instance
                .post("http://localhost:3000/gif")
                .then((response) => (this.object = response.data))
                .catch(() => this.$router.push("/"));
        },
        //créer un commentaire
        createcomment(gif) {
            const comment = { comment: this.comment };
            instance
                .post("http://localhost:3000/comment/" + gif, comment)
                .then(() => {
                    this.comment = "";
                    this.showcomment(gif);
                })
                .catch(() =>
                    console.log("le commentaire n'a pas été pris en compte")
                );
        },
        //montrer les commentaires
        showcomment(gifid) {
            instance
                .post("http://localhost:3000/comment/getAll/" + gifid)
                .then((resp) => (this.object.message = resp.data))
                .then((resp) => {
                    if (resp.length > 0) {
                        this.show = gifid;
                    } else {
                        this.show = -gifid;
                    }
                });
        },
        //afficher les boutons de modification des commentaires
        modifComment(gifid) {
            return (this.showmodif = gifid);
        },
        //valider les modifications des commentaires
        validModifComment(commentid, gif) {
            const modif = { comment: this.commentmodif };
            instance
                .put("http://localhost:3000/comment/modify/" + commentid, modif)
                .then(() => {
                    this.showcomment(gif);
                    this.commentmodif = "";
                    this.showmodif = 0;
                })
                .catch(() => {
                    console.log("echec");
                });
        },
        close: function() {
            this.display = "none";
        },
        //liker le gif
        async like(gifid) {
            const like = await instance.get(
                "http://localhost:3000/getOneLike/" + gifid
            );

            const likeTwo = like.data.jaime;

            if (likeTwo != true) {
                instance
                    .post("http://localhost:3000/like/" + gifid)
                    .then(() => {
                        this.allGifs();
                    });
            } else {
                instance
                    .delete("http://localhost:3000/like/delete/" + gifid)
                    .then(() => {
                        this.allGifs();
                    });
            }
        },
        //lien administrateur pour supprimer un gif
        async linkadmin(gifid) {
            const admin = await instance.get(
                "http://localhost:3000/auth/user/connected/"
            );

            const adminTwo = admin.data.admin;
            if (adminTwo) {
                this.$router.push("/gif/" + gifid);
            } else {
                console.log(
                    "ce lien ne fonctionne que pour les administrateurs"
                );
            }
        },
        //permettre a l'administrateur de supprimer un commentaire
        async adminComment() {
            const userid = await instance.get(
                "http://localhost:3000/auth/user/connected/"
            );
            const useridTwo = userid.data.id;

            const email = await instance.get(
                "http://localhost:3000/auth/user/connected/"
            );

            const emailTwo = email.data.email;
            if (emailTwo) {
                this.userconnect = useridTwo;
            } else {
                this.userconnect = -useridTwo;
            }
        },
        //renvoie si l'utilisateur connecté est l'administrateur
        async adminOrNot() {
            const admin = await instance.get(
                "http://localhost:3000/auth/user/connected/"
            );

            const adminTwo = admin.data.admin;
            if (adminTwo) {
                this.admin = 1;
            } else {
                this.admin = 0;
            }
        },
        //supprimer un commentaire
        supprimComment(commentid, gifid) {
            instance
                .delete("http://localhost:3000/comment/delete/" + commentid)
                .then(() => {
                    this.showcomment(gifid);
                })
                .catch(() => {
                    console.log("echec");
                });
        },
        //renvoie le userid de l'utilisateur connecté
        userid() {
            instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => (this.userconnect = resp.data.id));
        },
        //colore en bleu le coeur si l'utilisateur connecté a liké le gif
        blue(value) {
            if (Array.isArray(value.gif_likes)) {
                return value.gif_likes.some(
                    (like) => like.userid === this.userconnect
                );
            }
            return false;
        },
    },
};
</script>

<style lang="scss">
body {
    background-color: #d7d7d7;
}
#allGif {
    width: 80%;
    margin: 0 10%;
    color: 224070;
    background-color: #d7d7d7;
    #ul_all_gif {
        list-style-type: none;
        margin: 0;
        padding: 0;
        .all_gif {
            border: 2px solid #224070;
            border-radius: 10px;
            margin: 0 0 20px 0;
            background-color: white;

            .user_allgif {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                text-decoration: none;
                color: black;

                .photo_user_allgif {
                    width: 50px;
                    margin: 20px 20px 0 20px;
                    object-fit: cover;
                    object-position: 50% 50%;
                    border: 2px solid #224070;
                    border-radius: 10px;
                }
                .username_allgif {
                    display: flex;
                    flex-direction: column;
                    .p_user_allgif {
                        width: 50%;
                        font-size: 25px;
                        font-weight: bold;
                        margin: 20px 0 0 0;
                    }

                    .date_allgif {
                        margin: 0;
                        text-align: left;
                        font-size: 12px;
                    }
                }
            }

            .title_allgif {
                text-align: center;
                .button_title_allgif {
                    border: none;
                    background-color: white;
                    font-size: 20px;
                    font-weight: bold;

                    margin: 20px 0;
                    h2 {
                        margin: 0;
                    }
                }
            }
            .img_allgif {
                width: 90%;
                margin: 0 5%;
                height: 200px;
                object-fit: cover;
                border: 2px solid #224070;
                border-radius: 10px;
            }
            .row1_allgif {
                width: 90%;
                margin: 0 5% 10px 5%;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                font-size: 12px;

                .like_allgif {
                    margin: 0;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    background-color: white;

                    .button_heart_allgif {
                        background-color: white;
                        border: none;
                        position: relative;
                        .empty {
                            color: black;
                        }
                        .full {
                            color: #224070;
                        }
                    }
                    .number_like {
                        margin: 0;
                    }
                }
            }
            .row2_allgif {
                width: 90%;
                margin: 0 5% 10px 5%;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                #comment_allgif {
                    width: 60%;
                    margin-right: 5%;
                    border: 2px solid #224070;
                }
                .button_comment_allgif {
                    flex-grow: 1;
                    width: 30%;
                    font-size: 12px;
                    padding: 0;
                    background-color: white;
                    border: 2px solid #224070;
                    box-shadow: 3px 3px #224070;
                }
            }
        }
    }
    .button_show_comment {
        cursor: pointer;
        border: none;
        background-color: white;
        width: 90%;
        margin: 0 5% 5px 5%;
        text-align: left;
    }
    .ul_comment_allgif {
        margin: 10px 5% 0 5%;
        .list_comment_allgif {
            margin: 0;
            padding: 0;
            list-style-type: disc;

            .p_user_comment_allgif {
                margin: 0;
                padding: 0;
                .span_user_comment_allgif {
                    font-weight: bold;
                }
            }
            .p_comment_allgif {
                margin: 0 20px 10px 20px;
                padding: 0;
            }
            .div_form_comment_allgif {
                width: 80%;
                margin: 0 10% 10px 10%;
                .form_modif_comment {
                    width: 100%;
                    margin: 10px 0;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    .input_modif_comment {
                        width: 65%;
                        border: 2px solid #224070;
                        font-size: 10px;
                        margin-right: 5%;
                    }
                    .button_valid_modif_comment_allgif {
                        font-size: 10px;
                        width: 30%;
                        background-color: white;
                        border: 2px solid #224070;
                        box-shadow: 3px 3px #224070;
                    }
                }
                .button_modif_comment_allgif {
                    width: 45%;
                    font-size: 10px;
                    margin: 0 10% 0 0;
                    background-color: white;
                    border: 2px solid #224070;
                    box-shadow: 3px 3px #224070;
                }
                .button_supprim_comment_allgif {
                    width: 45%;
                    font-size: 10px;
                    background-color: white;
                    border: 2px solid #224070;
                    box-shadow: 3px 3px #224070;
                }
            }
        }
    }
    .p_nocomment_allgif {
        margin: 10px 10%;
        text-align: center;
        font-size: 12px;
    }
}
@media screen and (min-width: 481px) {
    #allGif {
        width: 70%;
        margin: 0 15%;
        #ul_all_gif {
            .all_gif {
                .user_allgif {
                    .photo_user_allgif {
                        width: 60px;
                        margin: 20px 20px 0 20px;
                    }
                    .username_allgif {
                        .p_user_allgif {
                            width: 50%;
                            font-size: 28px;
                            font-weight: bold;
                            margin: 20px 0 0 0;
                        }

                        .date_allgif {
                            margin: 0;
                            font-size: 14px;
                        }
                    }
                }
                .button_title_allgif {
                    font-size: 22px;
                    margin: 20px 0 20px 0;
                }

                .img_allgif {
                    height: 320px;
                }
                .row1_allgif {
                    font-size: 14px;
                }
                .row2_allgif {
                    font-size: 14px;
                }
                .div_form_comment_gifuser {
                    font-size: 14px;
                    width: 80%;
                    margin: 0 10% 10px 10%;

                    .button_modif_comment_allgif {
                        font-size: 11px;
                    }
                    .button_supprim_comment_allgif {
                        font-size: 11px;
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 769px) {
    #allGif {
        width: 60%;
        margin: 0 20%;
        #ul_all_gif {
            .all_gif {
                .button_title_allgif {
                    font-size: 28px;
                    margin: 20px 0 25px 0;
                }
                .img_allgif {
                    height: 450px;
                }
                .row1_allgif {
                    font-size: 18px;
                    .like_allgif {
                        .button_heart_allgif {
                            font-size: 15px;
                        }
                    }
                }
                .row1_allgif {
                    margin: 5px 5% 20px 5%;
                }
                .row2_allgif {
                    margin: 0 5% 20px 5%;
                    .button_comment_allgif {
                        font-size: 18px;
                    }
                }
                .button_comment_allgif {
                    width: 80%;
                    margin: 0 10% 10px 10%;
                    .form_modif_comment {
                        margin: 20px 0;

                        .input_modif_comment {
                            font-size: 14px;
                        }
                        .button_valid_modif_comment_allgif {
                            font-size: 14px;
                        }
                    }
                    .button_modif_comment_allgif {
                        font-size: 14px;
                    }
                    .button_supprim_comment_allgif {
                        font-size: 14px;
                    }
                }
            }
        }
        .button_show_comment {
            font-size: 18px;
        }
        .ul_comment_allgif {
            margin: 10px 5% 0 5%;
            .list_comment_allgif {
                font-size: 18px;
            }
        }
        .p_nocomment_allgif {
            font-size: 18px;
        }
    }
}
@media screen and (min-width: 1280px) {
    #allGif {
        width: 60%;
        margin: 0 20%;
        #ul_all_gif {
            .all_gif {
                .user_allgif {
                    margin: 0 5%;
                    .photo_user_allgif {
                        width: 75px;
                        height: 75px;
                    }
                    .username_allgif {
                        .p_user_allgif {
                            width: 50%;
                            font-size: 35px;
                            font-weight: bold;
                            margin: 20px 0 0 0;
                        }

                        .date_allgif {
                            margin: 0;
                            font-size: 20px;
                        }
                    }
                }
                .title_allgif {
                    .button_title_allgif {
                        font-size: 35px;
                    }
                }
                .img_allgif {
                    height: 450px;
                }
                .row1_allgif {
                    font-size: 22px;
                    .like_allgif {
                        .button_heart_allgif {
                            font-size: 20px;
                        }
                    }
                }
                .row2_allgif {
                    .button_comment_allgif {
                        font-size: 22px;
                    }
                }
                .button_comment_allgif {
                    width: 80%;
                    margin: 0 10% 10px 10%;

                    .button_modif_comment_allgif {
                        font-size: 14px;
                    }
                    .button_supprim_comment_allgif {
                        font-size: 14px;
                    }
                }
                .button_show_comment {
                    font-size: 22px;
                }
                .p_nocomment_allgif {
                    font-size: 22px;
                }
            }
        }
    }
}
</style>

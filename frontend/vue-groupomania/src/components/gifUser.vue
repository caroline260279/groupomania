<template>
    <div>
        <ul id="gifuser">
            <li v-for="value in object" v-bind:key="value" class="list_gifuser">
                <div class="title_gifuser">{{ value.title }}</div>
                <div>
                    <img
                        v-bind:src="value.imageUrl"
                        alt=""
                        class="img_gifuser"
                    />
                </div>
                <div class="row1_gifuser">
                    <div class="like_gifuser">
                        <button
                            class="button_heart_gifuser"
                            @click="like(value.id)"
                        >
                            <i
                                class="far fa-heart empty"
                                v-if="!blue(value)"
                            ></i>
                            <i class="fas fa-heart full" v-if="blue(value)"></i>
                        </button>
                        <p class="number_like_gifuser">
                            {{ value.gif_likes.length }}
                        </p>
                    </div>
                    <p class="date_gifuser">
                        le
                        {{
                            new Date(value.updatedAt).toLocaleDateString(
                                "fr-FR"
                            )
                        }}
                    </p>
                </div>
                <form class="comment_gifuser">
                    <label class="label_gifuser" for="comment_gifuser"></label>
                    <input id="comment_gifuser" type="text" v-model="comment" />
                    <button
                        class="button_comment_gifuser"
                        type="button"
                        @click="createcomment(value.id)"
                    >
                        Commenter
                    </button>
                </form>
                <button
                    class="button_show_comment_gifuser"
                    @click="showcomment(value.id)"
                >
                    voire les commentaires
                </button>

                <ul class="ul_comment_gifuser" v-if="value.id === this.show">
                    <li
                        class="list_comment_gifuser"
                        v-for="valeur in object.message"
                        v-bind:key="valeur"
                    >
                        <p class="p_user_comment_gifuser">
                            <span class="span_user_comment_gifuser"
                                >{{ valeur.user.username }}
                            </span>
                            :
                        </p>
                        <p class="p_comment_gifuser">{{ valeur.comment }}</p>
                        <div
                            v-if="
                                valeur.user.id === value.userid ||
                                    valeur.user.admin === true
                            "
                            class="div_form_comment_gifuser"
                        >
                            <form
                                class="form_modif_comment_gifuser"
                                v-if="valeur.id === this.showmodif"
                            >
                                <input
                                    type="text"
                                    class="input_modif_comment_gifuser"
                                    v-model="commentmodif"
                                /><button
                                    class="button_valid_modif_comment_gifuser"
                                    type="button"
                                    @click="
                                        validModifComment(valeur.id, value.id)
                                    "
                                >
                                    Valider les modifications
                                </button>
                            </form>
                            <button
                                class="button_modif_comment_gifuser"
                                type="button"
                                @click="modifComment(valeur.id)"
                            >
                                modifier ce commentaire</button
                            ><button
                                class="button_supprim_comment_gifuser"
                                type="button"
                                @click="supprimComment(valeur.id, value.id)"
                            >
                                supprimer ce commentaire
                            </button>
                        </div>
                    </li>
                </ul>
                <p class="p_nocomment_gifuser" v-if="value.id === -this.show">
                    Ce gif n'a pas encore de commentaire, soyez le premier...
                </p>

                <div class="button_gifuser_modif">
                    <button
                        class="button_modifGif"
                        type="button"
                        v-on:click="update(value.id)"
                    >
                        Modifier mon gif
                    </button>
                    <button
                        class="button_deleteGif"
                        type="button"
                        v-on:click="deleteGif(value.id)"
                    >
                        Supprimer ce gif
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "gifuser",
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
            show: 0,
            heart: 0,
            showmodif: 0,
            userconnect: 0,
        };
    },

    created() {
        this.userid();
        this.user();
    },
    methods: {
        user() {
            instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) =>
                    instance
                        .get("http://localhost:3000/gif/" + resp.data.username)
                        .then((response) => (this.object = response.data))
                        .catch(() => this.$router.push("/"))
                );
        },
        update(x) {
            this.$router.push("/gif/" + x);
        },
        deleteGif(y) {
            instance
                .delete("http://localhost:3000/delete/" + y)
                .then(() => this.user())
                .catch(() => {
                    console.log("echec");
                });
        },
        createcomment(y) {
            let comment = { comment: this.comment };
            console.log(comment);
            instance
                .post("http://localhost:3000/comment/" + y, comment)
                .then(() => {
                    this.comment = "";
                    this.showcomment(y);
                })
                .catch(() =>
                    console.log("le commentaire n'a pas été pris en compte")
                );
        },
        showcomment(x) {
            instance
                .post("http://localhost:3000/comment/getAll/" + x)
                .then((resp) => (this.object.message = resp.data))
                .then((resp) => {
                    if (resp.length > 0) {
                        this.show = x;
                    } else {
                        this.show = -x;
                    }
                });
        },
        modifComment(x) {
            return (this.showmodif = x);
        },
        validModifComment(v, g) {
            const modif = { comment: this.commentmodif };
            instance
                .put("http://localhost:3000/comment/modify/" + v, modif)
                .then(() => {
                    this.showcomment(g);
                    this.commentmodif = "";
                    this.showmodif = 0;
                })
                .catch(() => {
                    console.log("echec");
                });
        },
        supprimComment(comment, gif) {
            instance
                .delete("http://localhost:3000/comment/delete/" + comment)
                .then(() => {
                    this.showcomment(gif);
                })
                .catch(() => {
                    console.log("echec");
                });
        },
        async like(z) {
            let like = await instance
                .get("http://localhost:3000/getOneLike/" + z)
                .then((resp) => resp.data.jaime);
            if (like != true) {
                instance.post("http://localhost:3000/like/" + z).then(() => {
                    this.heart = z;
                    this.user();
                });
            } else {
                instance
                    .delete("http://localhost:3000/like/delete/" + z)
                    .then(() => this.user());
            }
        },
        userid() {
            instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => (this.userconnect = resp.data.id));
        },
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
#gifuser {
    list-style-type: none;
    margin: 0;
    padding: 0;
    .list_gifuser {
        border: 2px solid black;
        border-radius: 10px;
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
        .row1_gifuser {
            width: 90%;
            margin: 0 5% 10px 5%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            font-size: 12px;
            .like_gifuser {
                margin: 0;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                .button_heart_gifuser {
                    background-color: white;
                    border: none;
                    position: relative;
                    .empty {
                        color: black;
                    }
                    .full {
                        color: blue;
                    }
                }
                .number_like_gifuser {
                    margin: 0;
                }
            }
            .date_gifuser {
                flex-grow: 1;
                margin: 0;
                text-align: right;
            }
        }
        .comment_gifuser {
            width: 90%;
            margin: 0 5% 10px 5%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            #comment_gifuser {
                width: 60%;
                margin-right: 5%;
                border: 2px solid black;
            }
            .button_comment_gifuser {
                flex-grow: 1;
                width: 30%;
                font-size: 12px;
                padding: 0;
                background-color: white;
                border: 2px solid black;
                box-shadow: 3px 3px black;
            }
        }
        .button_show_comment_gifuser {
            border: none;
            background-color: white;
            width: 90%;
            margin: 0 5% 5px 5%;
            text-align: left;
            cursor: pointer;
        }
        .button_gifuser_modif {
            width: 80%;
            display: flex;
            flex-direction: wrap;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin: 10px 10%;
            .button_modifGif {
                width: 40%;
                background-color: white;
                border: 2px solid black;
                box-shadow: 3px 3px black;
            }
            .button_deleteGif {
                width: 40%;
                background-color: white;
                border: 2px solid black;
                box-shadow: 3px 3px black;
            }
        }
        .ul_comment_gifuser {
            margin: 10px 5% 0 5%;
            .list_comment_gifuser {
                margin: 0;
                padding: 0;
                list-style-type: disc;
                .p_user_comment_gifuser {
                    margin: 0;
                    padding: 0;
                    .span_user_comment_gifuser {
                        font-weight: bold;
                    }
                }
                .p_comment_gifuser {
                    margin: 0 20px 10px 20px;
                    padding: 0;
                }
                .div_form_comment_gifuser {
                    width: 80%;
                    margin: 0 10% 10px 10%;
                    .form_modif_comment_gifuser {
                        width: 100%;
                        margin: 10px 0;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        .input_modif_comment_gifuser {
                            width: 65%;
                            border: 2px solid black;
                            font-size: 10px;
                            margin-right: 5%;
                        }
                        .button_valid_modif_comment_gifuser {
                            font-size: 10px;
                            width: 30%;
                            background-color: white;
                            border: 2px solid black;
                            box-shadow: 3px 3px black;
                        }
                    }
                    .button_modif_comment_gifuser {
                        width: 45%;
                        font-size: 10px;
                        margin: 0 10% 0 0;
                        background-color: white;
                        border: 2px solid black;
                        box-shadow: 3px 3px black;
                    }
                    .button_supprim_comment_gifuser {
                        width: 45%;
                        font-size: 10px;
                        background-color: white;
                        border: 2px solid black;
                        box-shadow: 3px 3px black;
                    }
                }
            }
        }
        .p_nocomment_gifuser {
            margin: 10px 10%;
            text-align: center;
            font-size: 12px;
        }
    }
}
@media screen and (min-width: 481px) {
    #gifuser {
        width: 70%;
        margin: 0 15%;
        .list_gifuser {
            .title_gifuser {
                font-size: 25px;
                text-align: center;
                padding: 20px 0;
            }
            .img_gifuser {
                margin: 0 5%;
                height: 320px;
            }
            .row1_gifuser {
                font-size: 14px;
            }

            .comment_gifuser {
                width: 90%;
                margin: 0 5% 10px 5%;
                font-size: 14px;
                #comment_gifuser {
                    width: 60%;
                    margin-right: 5%;
                }
                .button_comment_gifuser {
                    width: 30%;
                    font-size: 12px;
                }
            }
            .button_show_comment_gifuser {
                width: 90%;
                margin: 0 5% 5px 5%;
            }
            .ul_comment_gifuser {
                .list_comment_gifuser {
                    .div_form_comment_gifuser {
                        width: 80%;
                        margin: 0 10% 10px 10%;
                        .form_modif_comment_gifuser {
                            margin: 10px 0;

                            .input_modif_comment_gifuser {
                                font-size: 11px;
                            }
                            .button_valid_modif_comment_gifuser {
                                font-size: 11px;
                            }
                        }
                        .button_modif_comment_gifuser {
                            font-size: 11px;
                            margin: 0 10% 0 0;
                        }
                        .button_supprim_comment_gifuser {
                            font-size: 11px;
                        }
                    }
                }
            }
            .button_gifuser_modif {
                width: 80%;
                margin: 10px 10%;
                .button_modifGif {
                    width: 40%;
                }
                .button_deleteGif {
                    width: 40%;
                }
            }
        }
    }
}
@media screen and (min-width: 769px) {
    #gifuser {
        width: 60%;
        margin: 0 20%;
        .list_gifuser {
            .title_gifuser {
                font-size: 28px;
                text-align: center;
                padding: 20px 0;
            }
            .img_gifuser {
                margin: 0 5%;
                height: 450px;
            }
            .row1_gifuser {
                font-size: 18px;
                margin: 5px 5% 20px 5%;
                .button_heart_gifuser {
                    font-size: 15px;
                }
            }

            .comment_gifuser {
                width: 90%;
                margin: 0 5% 10px 5%;

                #comment_gifuser {
                    width: 60%;
                    margin-right: 5%;
                }
                .button_comment_gifuser {
                    width: 30%;
                    font-size: 18px;
                }
            }
            .button_show_comment_gifuser {
                width: 90%;
                margin: 0 5% 5px 5%;
                font-size: 18px;
            }
            .ul_comment_gifuser {
                .list_comment_gifuser {
                    .div_form_comment_gifuser {
                        width: 80%;
                        margin: 0 10% 10px 10%;
                        .form_modif_comment_gifuser {
                            margin: 10px 0;

                            .input_modif_comment_gifuser {
                                font-size: 12px;
                            }
                            .button_valid_modif_comment_gifuser {
                                font-size: 12px;
                            }
                        }
                        .button_modif_comment_gifuser {
                            font-size: 12px;
                            margin: 0 10% 0 0;
                        }
                        .button_supprim_comment_gifuser {
                            font-size: 12px;
                        }
                    }
                }
            }
            .button_gifuser_modif {
                width: 80%;
                margin: 10px 10%;
                .button_modifGif {
                    width: 40%;
                    font-size: 18px;
                }
                .button_deleteGif {
                    width: 40%;
                    font-size: 18px;
                }
            }
            .ul_comment_gifuser {
                margin: 10px 5% 0 5%;
                .list_comment_gifuser {
                    font-size: 18px;
                }
            }
            .p_nocomment_gifuser {
                font-size: 18px;
            }
        }
    }
}
@media screen and (min-width: 1280px) {
    #gifuser {
        .list_gifuser {
            .title_gifuser {
                font-size: 35px;
            }
            .img_gifuser {
                margin: 0 5%;
                height: 450px;
            }
            .row1_gifuser {
                font-size: 22px;
                margin: 5px 5% 20px 5%;
                .button_heart_gifuser {
                    font-size: 20px;
                }
            }

            .comment_gifuser {
                width: 90%;
                margin: 0 5% 10px 5%;

                #comment_gifuser {
                    width: 60%;
                    margin-right: 5%;
                }
                .button_comment_gifuser {
                    width: 30%;
                    font-size: 22px;
                }
            }
            .button_show_comment_gifuser {
                width: 90%;
                margin: 0 5% 5px 5%;
                font-size: 22px;
            }
            .ul_comment_gifuser {
                .list_comment_gifuser {
                    .div_form_comment_gifuser {
                        width: 80%;
                        margin: 0 10% 10px 10%;
                        .form_modif_comment_gifuser {
                            margin: 10px 0;

                            .input_modif_comment_gifuser {
                                font-size: 14px;
                            }
                            .button_valid_modif_comment_gifuser {
                                font-size: 14px;
                            }
                        }
                        .button_modif_comment_gifuser {
                            font-size: 14px;
                            margin: 0 10% 0 0;
                        }
                        .button_supprim_comment_gifuser {
                            font-size: 14px;
                        }
                    }
                }
            }
            .button_gifuser_modif {
                width: 80%;
                margin: 10px 10%;
                .button_modifGif {
                    width: 40%;
                    font-size: 22px;
                }
                .button_deleteGif {
                    width: 40%;
                    font-size: 22px;
                }
            }
            .p_nocomment_gifuser {
                font-size: 22px;
            }
        }
    }
}
</style>

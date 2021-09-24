<template>
    <div id="allGif">
        <ul id="ul_all_gif">
            <li v-for="value in object" v-bind:key="value" class="all_gif">
                <div class="user_allgif">
                    <img
                        v-bind:src="value.user.photo"
                        alt=""
                        class="photo_user_allgif"
                    />
                    <div class="username_allgif">
                        <p class="p_user_allgif">
                            {{ value.user.username }}
                        </p>
                        <p class="date_allgif">
                            le
                            {{
                                new Date(value.updatedAt).toLocaleDateString(
                                    "fr-FR"
                                )
                            }}
                        </p>
                    </div>
                </div>
                <div class="title_allgif">
                    <h2>{{ value.title }}</h2>
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
                                v-if="this.heart !== value.id"
                            ></i>
                            <i
                                class="fas fa-heart full"
                                v-if="this.heart === value.id"
                            ></i>
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
                    <li
                        class="list_comment_allgif"
                        v-for="valeur in object.message"
                        v-bind:key="valeur"
                    >
                        <p class="p_user_comment_allgif">
                            <span class="span_user_comment_allgif"
                                >{{ valeur.user.username }}
                            </span>
                            a commenté:
                        </p>
                        <p class="p_comment_allgif">{{ valeur.comment }}</p>
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
            heart: 0,
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },
    created() {
        this.allGifs();
        this.blue();
    },

    mounted() {},
    methods: {
        allGifs() {
            instance
                .post("http://localhost:3000/gif")
                .then((response) => (this.object = response.data))
                .catch(() => this.$router.push("/"));
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
            console.log(this.show);
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
        close: function() {
            this.display = "none";
        },
        async like(z) {
            let like = await instance
                .get("http://localhost:3000/getOneLike/" + z)
                .then((resp) => resp.data.jaime);
            console.log(like);
            if (like != true) {
                instance.post("http://localhost:3000/like/" + z).then(() => {
                    this.allGifs();
                });
            } else {
                instance
                    .delete("http://localhost:3000/like/delete/" + z)
                    .then(() => {
                        this.allGifs();
                    });
            }
        },
        async blue(h) {
            let response = await instance
                .get("http://localhost:3000/getOneLike/" + h)
                .then((resp) => resp);

            let heart = await response.data.gifid;
            return (this.heart = heart);
        },
    },
};
</script>

<style lang="scss">
#allGif {
    width: 80%;
    margin: 0 10%;
    #ul_all_gif {
        list-style-type: none;
        margin: 0;
        padding: 0;
        .all_gif {
            border: 2px solid black;
            border-radius: 10px;
            margin: 0 0 20px 0;
            .user_allgif {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                .photo_user_allgif {
                    width: 50px;
                    margin: 20px 20px 0 20px;
                    object-fit: cover;
                    object-position: 50% 50%;
                    border: 2px solid black;
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
                font-size: 20px;
                text-align: center;
                margin: 5px 0 10px 0;
                font-weight: bold;
                h2 {
                    margin: 0;
                }
            }
            .img_allgif {
                width: 90%;
                margin: 0 5%;
                height: 200px;
                object-fit: cover;
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
                            color: blue;
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
                    border: 2px solid black;
                }
                .button_comment_allgif {
                    flex-grow: 1;
                    width: 30%;
                    font-size: 12px;
                    padding: 0;
                    background-color: white;
                    border: 2px solid black;
                    box-shadow: 3px 3px black;
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
                .title_allgif {
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
                    .button_comment_allgif {
                        font-size: 14px;
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
                .title_allgif {
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
                    font-size: 35px;
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

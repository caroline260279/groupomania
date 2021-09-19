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
                        <button class="button_heart_gifuser">
                            <i class="far fa-heart"></i>
                        </button>
                        <p class="number_like_gifuser">17</p>
                    </div>
                    <p class="date_gifuser">
                        dernière mise à jour le
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
                        @click="createcomment()"
                    >
                        Commenter
                    </button>
                </form>
                <button class="button_show_comment_gifuser">
                    voire les commentaires
                </button>
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
            object: {
                id: "",
                title: "",
                imageUrl: "",
                updatedAt: "",
            },
        };
    },

    created() {
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
                );
        },
        update(x) {
            this.$router.push("/gif/" + x);
        },
        deleteGif(y) {
            instance
                .delete("http://localhost:3000/delete/" + y)
                .then(() => location.reload())
                .catch(() => {
                    console.log("echec");
                });
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
        }
    }
}
</style>

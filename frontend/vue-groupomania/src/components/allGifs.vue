<template>
    <div id="allGif">
        <ul id="ul_all_gif">
            <li v-for="value in object" v-bind:key="value" class="all_gif">
                <div class="title_allgif">{{ value.title }}</div>
                <div>
                    <img
                        v-bind:src="value.imageUrl"
                        alt=""
                        class="img_allgif"
                    />
                </div>
                <div class="row1_allgif">
                    <div class="like_allgif">
                        <button class="button_heart_allgif">
                            <i class="far fa-heart"></i>
                        </button>
                        <p class="number_like">17</p>
                    </div>
                    <p class="date_allgif">publié le 26/02/1979</p>
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
                        @click="createcomment()"
                    >
                        Commenter
                    </button>
                </form>
                <button class="button_show_comment">
                    voire les commentaires
                </button>
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
            object: {
                id: "",
                userid: "",
                title: "",
                imageUrl: "",
                createdAt: "",
                updatedAt: "",
            },
        };
    },
    computed: {
        modifDate() {
            return this.createdAt.getDay();
        },
    },
    created() {
        this.allGifs();
    },
    methods: {
        allGifs() {
            instance
                .post("http://localhost:3000/gif")
                .then((response) => (this.object = response.data));
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
            .title_allgif {
                font-size: 20px;
                text-align: center;
                margin: 20px 0 10px 0;
                font-weight: bold;
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
                    .button_heart_allgif {
                        background-color: white;
                        border: none;
                    }
                    .number_like {
                        margin: 0;
                    }
                }
                .date_allgif {
                    flex-grow: 1;
                    margin: 0;
                    text-align: right;
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
            .button_show_comment {
                border: none;
                background-color: white;
                width: 90%;
                margin: 0 5% 5px 5%;
                text-align: left;
            }
        }
    }
}
@media screen and (min-width: 481px) {
    #allGif {
        width: 70%;
        margin: 0 15%;
        #ul_all_gif {
            .all_gif {
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
                .button_show_comment {
                    font-size: 14px;
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
                .button_show_comment {
                    font-size: 18px;
                }
            }
        }
    }
}
@media screen and (min-width: 1280px) {
    #allGif {
        width: 60%;
        margin: 0 20%;
        #ul_all_gif {
            .all_gif {
                .title_allgif {
                    font-size: 35px;
                }
                .img_allgif {
                    height: 450px;
                }
                .row1_allgif {
                    font-size: 22px;
                }
                .row2_allgif {
                    .button_comment_allgif {
                        font-size: 22px;
                    }
                }
                .button_show_comment {
                    font-size: 22px;
                }
            }
        }
    }
}
</style>

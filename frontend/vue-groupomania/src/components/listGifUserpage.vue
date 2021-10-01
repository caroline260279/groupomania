<template>
    <div id="lisstGifUserpage">
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
                            v-if="1 === this.admin"
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
            </li>
        </ul>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "listGifUserpage",
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
            admin: 0,
            showmodif: 0,
            userconnect: 0,
        };
    },

    created() {
        this.userid();
        this.adminOrNot();
        this.listGif();
    },
    methods: {
        listGif() {
            let username = this.$route.params.username;
            console.log(username);
            instance
                .get("http://localhost:3000/gif/" + username)
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
        async adminOrNot() {
            let admin = await instance
                .get("http://localhost:3000/auth/user/connected/")
                .then((resp) => resp.data.admin);

            if (admin === true) {
                this.admin = 1;
            } else {
                this.admin = 0;
            }
        },
        async like(z) {
            let like = await instance
                .get("http://localhost:3000/getOneLike/" + z)
                .then((resp) => resp.data.jaime);
            if (like != true) {
                instance.post("http://localhost:3000/like/" + z).then(() => {
                    this.heart = z;
                    this.listGif();
                });
            } else {
                instance
                    .delete("http://localhost:3000/like/delete/" + z)
                    .then(() => this.listGif());
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

<style lang="scss"></style>

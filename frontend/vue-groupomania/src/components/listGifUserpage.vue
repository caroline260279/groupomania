<!--composant pour la page présentant l'ensemble des gifs d'un utilisateur-->
<template>
    <div id="lisstGifUserpage">
        <ul id="gifuser">
            <!--itération de la liste de gifs -->
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
                    voir les commentaires
                </button>
                <ul class="ul_comment_gifuser" v-if="value.id === this.show">
                    <!--itération des commentaire pour chaque gif -->
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
        //récupère l'ensemble de ses gifs de l'utilisateur sélectionné
        listGif() {
            const username = this.$route.params.username;
            instance
                .get("http://localhost:3000/gif/" + username)
                .then((response) => (this.object = response.data))
                .catch(() => this.$router.push("/"));
        },
        //commenter un gif
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
        //afficher les commentaires
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
        //supprimer un commentaire
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
                        this.heart = gifid;
                        this.listGif();
                    });
            } else {
                instance
                    .delete("http://localhost:3000/like/delete/" + gifid)
                    .then(() => this.listGif());
            }
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

<style lang="scss"></style>

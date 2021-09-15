<template>
    <div>
        <ul id="gifuser" class="demo">
            <li v-for="value in object" v-bind:key="value" class="list_gifuser">
                <div class="title_gifuser">{{ value.title }}{{ value.id }}</div>
                <div>
                    <img
                        v-bind:src="value.imageUrl"
                        alt=""
                        class="img_gifuser"
                    />
                </div>
                <div class="data_gifuser">
                    <p>ajouté le:</p>
                    {{ value.createdAt }}
                </div>
                <div class="comment_gifuser">
                    <label class="label_giifuser" for="comment"></label>
                    <input
                        class="input_comment_gifuser"
                        id="comment"
                        type="text"
                        v-model="comment"
                    />
                    <button
                        class="button_comment_gifuser"
                        type="button"
                        @click="createcomment()"
                    >
                        Commenter
                    </button>
                </div>
                <button
                    class="button_modifGif"
                    type="button"
                    v-on:click="update(value.id)"
                >
                    Modifier mon gif
                </button>
                <button
                    class="button_modifGif"
                    type="button"
                    v-on:click="deleteGif(value.id)"
                >
                    Supprimer ce gif
                </button>
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
                createdAt: "",
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

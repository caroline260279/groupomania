<template>
    <div>
        <ul id="gifuser" class="demo">
            <li v-for="value in object" v-bind:key="value" class="list_gifuser">
                <div class="title_gifuser">{{ value.title }}</div>
                <div>
                    <img src="@/assets/moi.jpg" alt="" class="img_gifuser" />
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
                </div>
                <button
                    class="button_comment_gifuser"
                    type="button"
                    @click="createcomment()"
                >
                    Commenter
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "gifuser",
    data() {
        return {
            object: {
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
            let username = localStorage.getItem("usernameToUserPage");
            //recuperer userid dans localhost puis mettre la variable dans l'url
            fetch("http://localhost:3000/gif/" + username)
                .then((response) => response.json())
                .then((data) => (this.object = data));
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
    }
}
</style>

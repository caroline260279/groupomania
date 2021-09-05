<template>
    <div class="user_img">
        <div id="img_user">{{ object.imageUrl }}</div>
        <div class="user_username_bio">
            <p class="user_username">{{ object.username }}</p>
            <p class="user_bio">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto ipsa voluptas impedit dicta eius dolore libero quo
                quidem, quas vero asperiores tempore temporibus nostrum eligendi
                veritatis laborum et delectus rem.
                <a v-on:click="continu" class="user_click">la suite...</a>
            </p>
            <div
                class="user_bio_two"
                v-bind:style="{ display: computeddisplay }"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto ipsa voluptas impedit dicta eius dolore libero quo
                quidem, quas vero asperiores tempore temporibus nostrum eligendi
                veritatis laborum et delectus rem.
                <p v-on:click="close" class="close_user_bio_two">fermer</p>
            </div>
        </div>
    </div>
</template>

<script>
/*import instance from "../instance.js";*/
export default {
    name: "user",
    data() {
        return {
            object: {
                firstname: "",
                name: "",
                username: "",
                imageUrl: "",
                bio: "",
                email: "",
                password: "",
                photo: "",
            },
            display: "none",
        };
    },
    computed: {
        computeddisplay: function() {
            return this.display;
        },
    },
    beforeMount() {
        this.user();
        /*  this.tokenToHeader();*/
    },
    methods: {
        /*  tokenToHeader() {
            instance
                .get("http://localhost:3000/auth/1")
                .then((resp) => console.log(resp));
        },*/
        user() {
            let usernameUrl = req.params.username;
            //recuperer userid dans localhost puis mettre la variable dans l'url
            fetch("http://localhost:3000/auth/" + usernameUrl)
                .then((response) => response.json())
                .then((data) => (this.object = data));
        },
        continu: function() {
            this.display = "block";
        },
        close: function() {
            this.display = "none";
        },
    },
};
</script>

<style lang="scss">
.user_img {
    width: 80%;
    margin: 0 10% 50px 10%;
    display: flex;
    flex-direction: wrap;
    flex-wrap: nowrap;
    justify-content: space-between;
    position: relative;
    .user_bio_two {
        width: 80%;
        margin: 30px 10% 0 10%;
        background-color: white;
        text-align: center;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        border: 2px solid black;
        display: none;
        .close_user_bio_two {
            font-size: 13px;
            width: 10%;
            text-align: center;
            border-radius: 50%;
            margin: 0 5% 0 85%;
            font-weight: bolder;
        }
    }
    .user_click {
        position: absolute;
        bottom: 0;
        right: 0;
        font-weight: bolder;
    }

    #img_user {
        min-width: 120px;
        height: 120px;
        margin: auto;
        overflow: hidden;
        object-fit: cover;
        border: 2px solid black;
        border-radius: 50%;
        margin: 0 50px 0 0;
    }
    .user_username_bio {
        .user_username {
            border-bottom: 2px solid black;
            margin: 0;
            font-size: 25px;
            height: 50px;
            line-height: 50px;
            text-align: center;
        }
        .user_bio {
            height: 50px;
            font-size: 12px;
            text-align: center;
            overflow: hidden;
        }
    }
}
</style>

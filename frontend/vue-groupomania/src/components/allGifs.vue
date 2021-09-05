<template>
    <div>
        <ul id="v-for-object" class="demo">
            <li v-for="value in object" v-bind:key="value">
                <div>{{ value.id }}{{ value.title }}</div>
                <div></div>
            </li>
        </ul>
        <button class="button_login" @click="findUserid()">Se connecter</button>
    </div>
</template>

<script>
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
    created() {
        this.allGifs();
    },
    methods: {
        allGifs() {
            fetch("http://localhost:3000/gif", {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((data) => (this.object = data));
            console.log(this.object);
        },
        async findUserid() {
            let findusername = await fetch("http://localhost:3000/gif", {
                method: "POST",
                body: JSON.stringify({}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((data) => (this.object = data));
            let useridfind = [];
            for (let i = 0; i < findusername.length; i++) {
                useridfind += findusername[i].userid;
            }
            console.log(useridfind);
        },
    },
};
</script>

<style lang="scss"></style>

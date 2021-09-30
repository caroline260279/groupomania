<template>
    <p>page utilisateur</p>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "finduser",
    data() {
        return { object: { name: "", firstame: "", username: "", photo: "" } };
    },
    created() {
        this.user();
    },
    methods: {
        async user() {
            console.log(this.$route.params);
            let user = this.$route.params.username;
            console.log(user);
            const userConnected = await instance
                .get("http://localhost:3000/auth/user/" + user)
                .then((resp) => resp.data.id);
            /*  .catch(() => this.$router.push("/"));*/

            console.log(userConnected);
            instance
                .get("http://localhost:3000/auth/" + userConnected)
                .then((response) => (this.object = response.data));

            /*  .catch(() => this.$router.push("/"));*/
        },
    },
};
</script>

<style lang="scss"></style>

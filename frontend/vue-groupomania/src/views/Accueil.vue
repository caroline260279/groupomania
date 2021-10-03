<!--page login-->
<template>
    <div><logo /><login /></div>
</template>
<script>
import Login from "../components/login.vue";
import Logo from "../components/logo.vue";

export default {
    name: "accueil",
    components: {
        Login,
        Logo,
    },
};
</script>

<style lang="scss"></style>

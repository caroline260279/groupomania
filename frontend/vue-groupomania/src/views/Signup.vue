<template>
    <div><logo /><signup /></div>
</template>

<script>
import Signup from "../components/signup.vue";
import Logo from "../components/logo.vue";
export default {
    name: "Login",
    components: {
        Signup,
        Logo,
    },
};
</script>

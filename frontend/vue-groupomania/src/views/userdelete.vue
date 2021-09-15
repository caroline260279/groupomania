<template>
    <div><welcome /><userdelete /></div>
</template>

<script>
import Welcome from "../components/welcome.vue";
import userdelete from "../components/userdelete.vue";
export default {
    name: "modifUserdelete",
    components: {
        Welcome,
        userdelete,
    },
};
</script>

<template>
    <div><welcome /><finduser /></div>
</template>

<script>
import Welcome from "../components/welcome.vue";
import finduser from "../components/finduser.vue";
export default {
    name: "user_page",
    components: {
        Welcome,
        finduser,
    },
};
</script>

<template>
    <div><welcome /><userpage /></div>
</template>

<script>
import Welcome from "../components/welcome.vue";
import userpage from "../components/userpage.vue";

export default {
    name: "user_page",
    components: {
        Welcome,
        userpage,
    },
};
</script>

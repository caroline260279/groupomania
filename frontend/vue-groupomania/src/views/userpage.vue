<template>
    <div><welcome /><userpage /><listGifUserpage /></div>
</template>

<script>
import Welcome from "../components/welcome.vue";
import userpage from "../components/userpage.vue";
import listGifUserpage from "../components/listGifUserpage.vue";

export default {
    name: "user_page",
    components: {
        Welcome,
        userpage,
        listGifUserpage,
    },
};
</script>

<!--page "mon compte"-->
<template>
    <div><welcome /><user /><gifuser /></div>
</template>

<script>
import Welcome from "../components/welcome.vue";
import User from "../components/user.vue";
import Gifuser from "../components/gifUser.vue";
export default {
    name: "user_page",
    components: {
        Welcome,
        User,
        Gifuser,
    },
};
</script>

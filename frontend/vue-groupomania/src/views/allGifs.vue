<template>
    <div><welcome /><allgifs /></div>
</template>

<script>
import Welcome from "../components/welcome.vue";
import Allgifs from "../components/allGifs.vue";

export default {
    name: "allgifs_page",
    components: {
        Welcome,
        Allgifs,
    },
};
</script>

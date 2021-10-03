<!--page pour la modification d'un gif-->
<template>
    <div><welcome /><modif /></div>
</template>

<script>
import Welcome from "../components/welcome.vue";
import modif from "../components/modifGif.vue";
export default {
    name: "modifGif",
    components: {
        Welcome,
        modif,
    },
};
</script>

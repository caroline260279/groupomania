<!--page pour la modification d'un utilisateur-->
<template>
    <div><welcome /><usermodif /></div>
</template>

<script>
import Welcome from "../components/welcome.vue";
import usermodif from "../components/usermodif.vue";
export default {
    name: "modifUser",
    components: {
        Welcome,
        usermodif,
    },
};
</script>

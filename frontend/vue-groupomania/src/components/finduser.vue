<template>
    <div id="finduser">
        <form class="form_finduser" action="">
            <input
                class="input_form_finduser"
                type="text"
                placeholder="pseudo"
            />
            <button type="button" @click="finduser()">
                Rechercher l'utilisateur
            </button>
        </form>

        <div class="list_alluser">
            <h1 class="title_list_alluser">
                Ces utilisateurs sont présents sur notre réseaux
            </h1>
            <ul class="ul_finduser">
                <li
                    class="li_finduser"
                    v-for="value in object"
                    v-bind:key="value"
                >
                    <router-link
                        v-bind:to="`/user/` + value.username"
                        class="link_finduser"
                    >
                        <img
                            v-bind:src="value.photo"
                            alt=""
                            class="photo_user_finduser"
                        />

                        <div class="name_date_finduser">
                            <p class="p_name_finduser">
                                {{ value.firstname }} {{ value.name }} alias
                                <span class="span_finduser">
                                    {{ value.username }}</span
                                >
                            </p>
                            <p class="date_finduser">
                                inscrit depuis le
                                {{
                                    new Date(
                                        value.createdAt
                                    ).toLocaleDateString("fr-FR")
                                }}
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import instance from "../instance.js";
export default {
    name: "finduser",
    data() {
        return { object: { name: "", firstame: "", username: "", photo: "" } };
    },
    created() {
        this.findall();
    },
    methods: {
        findall() {
            instance
                .post("http://localhost:3000/auth/allUser")
                .then((response) => (this.object = response.data))
                .catch(() => this.$router.push("/"));
        },
        finduser() {},
    },
};
</script>

<style lang="scss">
.li_finduser {
    list-style-type: none;
    .link_finduser {
        display: flex;
        flex-direction: wrap;
        margin: 0 0 10px 0;
        text-decoration: none;
        color: black;
        .photo_user_finduser {
            width: 50px;
            height: 30px;
            border: 2px solid black;
            border-radius: 10px;
            object-fit: cover;
            margin-right: 5px;
        }
        .name_date_finduser {
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
            .p_name_finduser {
                margin: 0;
                font-size: 12px;
                .span_finduser {
                    font-weight: bold;
                }
            }
            .date_finduser {
                margin: 0;
                font-size: 12px;
            }
        }
    }
}
</style>

<script>
export default {
    name: "Logo",
};
</script>

<template>
    <div class="logo">
        <img src="../assets/icon-left-font-monochrome-black.png" alt="" />
        <div class="p_logo">
            <p class="welcome_logo">
                Bienvenue sur le réseau social interne du groupe
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.logo {
    position: relative;
    img {
        width: 90%;
        height: 100px;
        margin: 0 5% 10px 5%;

        overflow: hidden;
        object-fit: cover;
    }
    .p_logo {
        position: absolute;
        bottom: 0;
        margin: auto;
        width: 100%;
        .welcome_logo {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: relative;
            margin: 0;
            padding: 0;
            font-size: 10px;
        }
    }
}
@media screen and (min-width: 500px) {
    .logo {
        .p_logo {
            .welcome_logo {
                font-size: 15px;
            }
        }
    }
}
@media screen and (min-width: 650px) {
    .logo {
        img {
            height: 140px;
        }
        .p_logo {
            .welcome_logo {
                font-size: 15px;
            }
        }
    }
}
@media screen and (min-width: 800px) {
    .logo {
        img {
            height: 160px;
        }
        .p_logo {
            .welcome_logo {
                font-size: 22px;
            }
        }
    }
}
@media screen and (min-width: 1000px) {
    .logo {
        img {
            width: 80%;
            height: 160px;
            margin: 0 5% 20px 5%;
        }
        .p_logo {
            .welcome_logo {
                font-size: 24px;
            }
        }
    }
}
</style>

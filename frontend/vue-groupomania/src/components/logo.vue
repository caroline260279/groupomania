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
@media screen and (min-width: 481px) {
    .logo {
        img {
            height: 140px;
            width: 80%;
            margin: 0 10% 20px 10%;
        }
        .p_logo {
            .welcome_logo {
                margin: 20px 10% 20px 10%;
                font-size: 15px;
            }
        }
    }
}
@media screen and (min-width: 769px) {
    .logo {
        img {
            height: 160px;
            width: 80%;
            margin: 0 10% 20px 10%;
        }
        .p_logo {
            .welcome_logo {
                margin: 20px 10% 20px 10%;
                font-size: 22px;
                height: 30px;
            }
        }
    }
}
@media screen and (min-width: 1280px) {
    .logo {
        img {
            height: 250px;
            width: 80%;
            margin: 10px 10% 20px 10%;
        }
        .p_logo {
            .welcome_logo {
                font-size: 26px;
                height: 30px;
            }
        }
    }
}
</style>

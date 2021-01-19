<template>
    <div class="container">
        <div class="content">
            <div class="head">
                <img
                    src="/images/core/logo.svg"
                    class="brand"
                    :alt="WEB.name"
                />
            </div>
            <div class="auth-container">
                <a
                    class="auth-btn spotify"
                    :href="
                        `${config.authorize}?client_id=${Spotify.clientId}&response_type=token&scope=${config.scopes}&redirect_uri=${config.redirect}`
                    "
                >
                    Login with Spotify
                </a>
                <p class="note">You will be redirected to Spotify for login.</p>
            </div>
        </div>
        <Loader v-if="isRedirected" />
    </div>
</template>

<script>
import { uris } from "@/constants";
import { auth } from "@/helpers";
import Loader from "@/components/shared/Loader";
import { hashParams } from "@/helpers/utils";

export default {
    name: "Authentication",
    components: { Loader },
    data() {
        return {
            isRedirected: false,
            config: {
                authorize: uris.authorize,
                redirect: encodeURI("http://localhost:8080/login"),
                scopes: [
                    "user-read-recently-played",
                    "user-top-read",
                    "user-read-playback-position",
                    "user-read-playback-state",
                    "user-modify-playback-state",
                    "user-read-currently-playing",
                    "playlist-modify-public",
                    "playlist-modify-private",
                    "playlist-read-private",
                    "playlist-read-collaborative",
                    "user-follow-modify",
                    "user-follow-read",
                    "user-library-modify",
                    "user-library-read",
                    "app-remote-control",
                    "streaming",
                    "user-read-email",
                    "user-read-private"
                ].join(" ")
            }
        };
    },
    methods: {
        login(token) {
            auth.setLocalData(token);
            auth.setHeaders(token);
            this.$store.dispatch("user/getProfile");
            this.$router.push({ name: "home" });
        }
    },
    created() {
        if (this.$route.hash) {
            const params = hashParams(this.$route.hash);
            if (params.access_token) {
                this.isRedirected = true;
                this.login(params.access_token);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    padding: 0 map-get($sizing, sm);
    @include flex();
    min-height: 100vh;

    .content {
        width: 450px;
        margin: map-get($sizing, base);

        .head {
            text-align: center;
            padding-bottom: map-get($sizing, lg);

            img.brand {
                height: 42px;
            }
        }

        .auth-container {
            @include flex-column();

            .auth-btn {
                padding: map-get($sizing, sm);
                @include flex();
                flex-wrap: nowrap;
                cursor: pointer;
                flex: 1;
                border-radius: 32px;
                min-width: 264px;

                .icon {
                    @include dimension(20px);
                    margin-right: map-get($sizing, xs);
                }

                &:first-child {
                    margin-bottom: map-get($sizing, base);
                }

                &.spotify {
                    background-color: #fff;
                }
            }
            .note {
                font-size: calc(#{map-get($sizing, base) / 2});
                color: map-get($colors, darkgray);
            }
        }
    }
}
</style>

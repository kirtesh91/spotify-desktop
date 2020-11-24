<template>
    <div id="google-button" class="google-button" />
</template>

<script>
export default {
    name: "Google",
    methods: {
        renderButton() {
            // eslint-disable-next-line
            gapi.signin2.render("google-button", {
                scope: "profile email",
                longtitle: true,
                onsuccess: this.success,
                onfailure: this.failure
            });
        },
        success(user) {
            this.$store.dispatch("login", {
                method: "GL",
                token: user.getAuthResponse().id_token
            });
        },
        failure() {}
    },
    mounted() {
        window.addEventListener("load", () => {
            this.renderButton();
        });
    }
};
</script>

<style lang="scss">
.google-button {
    margin-bottom: map-get($sizing, base);

    .abcRioButton {
        height: 48px !important;
        flex-wrap: nowrap;
        border-radius: 32px;
        color: white;
        min-width: 264px;

        .abcRioButtonContentWrapper {
            @include flex();
        }

        .abcRioButtonContents {
            span {
                @include font-weight(700);
                letter-spacing: 0.15px;
                @include font-size(14px);
                color: map-get($colors, facebook) !important;
            }
        }
    }
}
</style>

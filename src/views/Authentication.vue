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
                <google />
                <button class="auth-btn facebook">
                    <Icon :size="20" class="icon" ionicons name="facebook" />
                    Facebook
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Google from "@/components/authentication/Google";
export default {
    name: "Authentication",
    components: { Google }
};
</script>

<style lang="scss" scoped>
.container {
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

            ::v-deep .auth-btn {
                padding: map-get($sizing, sm);
                @include flex();
                flex-wrap: nowrap;
                flex: 1;
                border-radius: 32px;
                color: white;
                min-width: 264px;

                .icon {
                    @include dimension(20px);
                    margin-right: map-get($sizing, xs);
                }

                &:first-child {
                    margin-bottom: map-get($sizing, base);
                }

                &.google {
                    background-color: #ffffff;
                    color: map-get($colors, darkgray);
                }

                &.facebook {
                    background-color: map-get($colors, facebook);
                }
            }
        }
    }
}
</style>

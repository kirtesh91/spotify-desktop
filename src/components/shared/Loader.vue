<template>
    <div class="loader-container">
        <div class="loader" />
        <img src="/images/core/logo-icon.svg" class="logo" :alt="WEB.name" />
    </div>
</template>

<script>
export default {
    name: "Loader"
};
</script>

<style lang="scss" scoped>
$loader-size: 96px;
$border-size: 4px;
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.loader-container {
    @include absolute(top 0 left 0 right 0 bottom 0);
    background: rgba(0, 0, 0, 0.8);
    @include flex();

    .loader {
        position: relative;
        @include dimension($loader-size);
        border-radius: 50%;
        animation: spin 1s infinite linear;
        background: linear-gradient(
            45deg,
            map-get($colors, success) 30%,
            #ffffff
        );

        &::before {
            content: "";
            border-radius: 50%;
            @include absolute(
                top $border-size right $border-size bottom $border-size left
                    $border-size
            );
            background: #000;
            z-index: 1;
            background-clip: content-box;
        }

        &::after {
            content: "";
            border-radius: 50%;
            @include absolute(top 0 left 0 right 0 bottom 0);
            background: linear-gradient(
                45deg,
                map-get($colors, success) 30%,
                #ffffff
            );
            opacity: 0.7;
            filter: blur($loader-size / 3);
        }
    }

    .logo {
        @include absolute(top 50% left 50%);
        transform: translate(-50%, -50%);
        z-index: 2;
        @include dimension(map-get($sizing, lg));
    }
}
</style>

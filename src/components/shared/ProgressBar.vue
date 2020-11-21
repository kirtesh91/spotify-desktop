<template>
    <div class="container">
        <span class="left counter" v-if="music">0:24</span>
        <div class="progress-bar">
            <span class="progress"></span>
        </div>
        <span class="right counter" v-if="music">3:28</span>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    props: {
        music: Boolean
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    @include flex();
    color: white;

    .counter {
        @include font-weight(100);
        @include font-size(11px);

        &.left {
            margin-right: map-get($sizing, sm);
        }

        &.right {
            margin-left: map-get($sizing, sm);
        }
    }

    .progress-bar {
        height: 4px;
        border-radius: 2px;
        flex: 1;
        background: #535353;
        outline: none;
        position: relative;
        cursor: pointer;
        @include transition(0.1s);

        .progress {
            @include absolute(top 0 left 0 bottom 0);
            background: #b3b3b3;
            border-radius: 2px;
            width: 30%;

            &::after {
                content: "";
                opacity: 0;
                @include absolute(right 0 top 50%);
                transform: translate(50%, -50%);
                @include dimension(12px);
                border-radius: 50%;
                @include transition(0.1s);
                background: #ffffff;
            }
        }

        &:hover {
            .progress {
                background: map-get($colors, success);
                &::after {
                    opacity: 1;
                }
            }
        }
    }
}
</style>

<template>
    <div class="container">
        <div class="progress-bar">
            <span
                class="progress"
                :style="{ width: `${progressPercentage}%` }"
            ></span>
            <input
                type="range"
                class="progress-input"
                :min="min"
                :max="max"
                :value="value"
                @input="oninput"
                @mousedown="$emit('mousedown')"
                @mouseup="$emit('mouseup')"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    emits: ["change", "mousedown", "mouseup"],
    props: {
        value: [String, Number],
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            progressPercentage: 0
        };
    },
    watch: {
        value(newVal) {
            this.progressPercentage = ((newVal * 100) / this.max).toFixed(2);
        }
    },
    methods: {
        oninput(e) {
            this.$emit("change", e.target.value);
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;

    .progress-bar {
        height: 4px;
        border-radius: 2px;
        background: #535353;
        position: relative;
        flex: 1;
        cursor: pointer;

        input.progress-input {
            -webkit-appearance: none;
            opacity: 0;
            appearance: none;
            cursor: pointer;
            background: transparent;
            width: 100%;
            @include absolute(top 0 left 0 right 0 bottom 0);

            @include range-track() {
                opacity: 0;
                height: 4px;
                border-radius: 2px;
            }

            @include range-thumb() {
                -webkit-appearance: none;
                appearance: none;
                border-radius: 50%;
                @include dimension(12px);
                transform: translateY(calc(-50% + 2px));
                background: #ffffff !important;
            }
        }

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
                @include transition(0.2s);
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

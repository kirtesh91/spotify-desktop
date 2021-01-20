<template>
    <i class="icon">
        <img
            class="icon-svg"
            :class="{
                white: !dark,
                'pure-white': ionicons && !dark,
                success: success
            }"
            :src="`/images/icons/${family}/${name}.svg`"
            :style="{ height: `${size}px`, width: `${size}px` }"
        />
    </i>
</template>

<script>
export default {
    name: "Icon",
    props: {
        name: String,
        size: {
            type: Number,
            default: 24
        },
        dark: {
            type: Boolean,
            default: false
        },
        success: {
            type: Boolean,
            default: false
        },
        ionicons: Boolean
    },
    computed: {
        family() {
            if (this.ionicons) {
                return "ionicons";
            }
            return "feather";
        }
    }
};
</script>

<style lang="scss" scoped>
i.icon {
    @include flex();
}
.icon-svg {
    &.white {
        filter: invert(0.8);
    }
    &.pure-white {
        filter: invert(1);
    }
    &.success {
        filter: invert(54%) sepia(90%) saturate(424%) hue-rotate(89deg)
            brightness(90%) contrast(89%);
    }
}
</style>

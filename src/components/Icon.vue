<template>
    <i class="icon">
        <object
            class="icon-svg"
            :class="{ white: !dark, 'pure-white': ionicons && !dark }"
            :data="`/images/icons/${family}/${name}.svg`"
            type="image/svg+xml"
            :style="{ height: `${size}px`, width: `${size}px` }"
        ></object>
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
}
</style>

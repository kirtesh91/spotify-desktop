<template>
    <div class="navigation">
        <div class="content-left">
            <button class="action-btn">
                <icon name="chevron-left"></icon>
            </button>
            <button class="action-btn">
                <icon name="chevron-right"></icon>
            </button>
        </div>
        <div class="content-right">
            <button class="upgrade">UPGRADE</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navigation"
};
</script>

<style lang="scss" scoped>
.navigation {
    //background: #070707;
    z-index: 2;
    @include fixed(top 0 left 0 right 0);
    padding: 0 map-get($sizing, "lg");
    @include flex(space-between);
    height: map-get($components, "topbar-height");
    margin-left: map-get($components, "sidebar-width");

    .content-left {
        @include flex();
        button.action-btn {
            @include dimension(map-get($sizing, "lg"));
            @include flex();
            background: rgba(0, 0, 0, 0.7);
            border-radius: 50%;
            margin-right: map-get($sizing, "sm");
        }
    }
    .content-right {
        @include flex();

        .upgrade {
            color: white;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: map-get($sizing, "base");
            padding: map-get($sizing, "xs") map-get($sizing, "lg");
        }
    }
}
</style>

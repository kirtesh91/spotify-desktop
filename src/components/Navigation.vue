<template>
    <div class="navigation">
        <div class="content-left">
            <button class="action-btn" @click="prev">
                <icon name="chevron-left"></icon>
            </button>
            <button class="action-btn" @click="next">
                <icon name="chevron-right"></icon>
            </button>
        </div>
        <div class="content-right">
            <button class="profile">
                <img
                    :src="
                        profile.images.length
                            ? profile.images[0].url
                            : 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80'
                    "
                    alt=""
                />
                {{ profile.display_name }}
            </button>
            <button class="upgrade" @click="logout">LOG OUT</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { removeLocalData } from "@/helpers/auth";
export default {
    name: "Navigation",
    methods: {
        prev() {
            this.$router.go(-1);
        },
        next() {
            this.$router.go(1);
        },
        logout() {
            removeLocalData();
            window.location.reload();
        }
    },
    computed: {
        ...mapGetters({
            profile: "user/profile"
        })
    }
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

        .upgrade,
        .profile {
            color: white;
            height: 32px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: map-get($sizing, "base");
            padding: map-get($sizing, "xs") map-get($sizing, "lg");
        }

        .profile {
            margin-right: 16px;
            padding: 4px 16px 4px 4px;
            @include flex();

            img {
                @include dimension(20px);
                border-radius: 50%;
                margin-right: 8px;
            }
        }
    }
}
</style>

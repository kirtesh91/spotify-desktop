<template>
    <loader v-if="authorized === 'loading'" />
    <div v-else>
        <router-view v-if="$route.name === 'login'" />
        <div v-else>
            <sidebar></sidebar>
            <navigation></navigation>
            <main class="wrapper">
                <router-view />
            </main>
            <songbar></songbar>

            <create-playlist v-if="isCreateVisible" />
            <edit-playlist v-if="isEditVisible" />
        </div>
    </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import Songbar from "@/components/Songbar";
import { setHeaders } from "@/helpers/auth";
import { mapGetters } from "vuex";
import Loader from "@/components/shared/Loader";
import CreatePlaylist from "@/views/modals/CreatePlaylist";
import EditPlaylist from "@/views/modals/EditPlaylist";

export default {
    components: {
        EditPlaylist,
        CreatePlaylist,
        Loader,
        Sidebar,
        Navigation,
        Songbar
    },
    computed: {
        ...mapGetters({
            authorized: "user/authorized",
            isEditVisible: "playlist/isEditVisible",
            isCreateVisible: "playlist/isCreateVisible"
        })
    },
    created() {
        if (setHeaders()) {
            this.$store.dispatch("user/getProfile");
        } else {
            this.$store.dispatch("user/setInitialized", true);
        }
    },
    mounted() {
        this.$store.dispatch("player/init");
    }
};
</script>

<style lang="scss">
.wrapper {
    height: calc(100vh - #{map-get($components, songbar-height)});
    overflow-y: auto;
    color: #ffffff;
    padding: calc(
            #{map-get($sizing, sm)} + #{map-get($components, topbar-height)}
        )
        map-get($sizing, lg) map-get($sizing, sm) map-get($sizing, lg);
    margin: 0 0 map-get($components, songbar-height)
        map-get($components, sidebar-width);
}

@media (max-width: 1024px) {
    .wrapper {
        padding: map-get($sizing, sm) map-get($sizing, sm);
    }
}
</style>

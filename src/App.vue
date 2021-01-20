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

            <transition name="fade">
                <create-playlist v-if="isCreateVisible" />
            </transition>
            <transition name="fade">
                <edit-playlist v-if="isEditVisible" />
            </transition>
            <song-card-menu v-if="isSongMenuVisible" />
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
import SongCardMenu from "@/components/contexts/SongCardMenu";

export default {
    components: {
        SongCardMenu,
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
            isCreateVisible: "playlist/isCreateVisible",
            isSongMenuVisible: "menu/isSongVisible"
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

        document.addEventListener("contextmenu", event =>
            event.preventDefault()
        );

        document.addEventListener("click", () => {
            if (this.isSongMenuVisible) {
                this.$store.dispatch("menu/toggle", {
                    name: "song",
                    visible: false
                });
            }
        });
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

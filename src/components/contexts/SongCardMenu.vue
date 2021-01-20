<template>
    <div
        class="context-menu"
        @click="e => e.stopPropagation()"
        :style="{ left: `${position.left}px`, top: `${position.top}px` }"
    >
        <ul class="context-list">
            <li class="context-item" @click="onAddQueue">Add to Queue</li>
            <li class="item-group-title">Add to Playlist</li>
            <li
                class="context-item"
                v-for="(playlist, index) in playlists"
                :key="`P${index}`"
                @click="onAddToPlaylistClick(playlist.id)"
            >
                {{ playlist.name }}
            </li>
            <li class="context-item" @click="onCreatePlaylistClick">
                New Playlist
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addToPlaylist, addToQueue } from "@/helpers/song";
export default {
    name: "SongCardMenu",
    computed: {
        ...mapGetters({
            data: "menu/songData",
            position: "menu/songPosition",
            playlists: "playlist/playlists"
        })
    },
    methods: {
        close() {
            this.$store.dispatch("menu/toggle", {
                name: "song",
                visible: false
            });
        },
        onAddQueue() {
            addToQueue(this.data.uri).finally(() => {
                this.close();
            });
        },
        onAddToPlaylistClick(id) {
            addToPlaylist(id, [this.data.uri]).finally(() => {
                this.close();
            });
        },
        onCreatePlaylistClick() {
            this.$store.dispatch("playlist/route", {
                mode: "create",
                visible: true
            });
        }
    }
};
</script>

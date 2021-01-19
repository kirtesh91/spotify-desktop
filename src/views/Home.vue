<template>
    <div class="content">
        <section class="song-group">
            <div class="head">
                <h2 class="title">Recently played</h2>
                <a href="">See All</a>
            </div>
            <div class="body body-grid">
                <song-card
                    v-for="(item, index) in recent.items"
                    :key="`R${index}`"
                    :item="item.track"
                />
            </div>
        </section>
        <section class="song-group">
            <div class="head">
                <h2 class="title">Shortcuts</h2>
                <a href="">See All</a>
            </div>
            <div class="body body-grid">
                <song-card
                    v-for="(item, index) in top.tracks"
                    :item="item"
                    :key="`S${index}`"
                />
            </div>
        </section>
        <section class="song-group">
            <div class="head">
                <h2 class="title">New releases for you</h2>
                <a href="">See All</a>
            </div>
            <div class="body body-grid">
                <song-card
                    v-for="(item, index) in releases.albums"
                    :item="item"
                    :key="`S${index}`"
                />
            </div>
        </section>
        <section class="song-group">
            <div class="head">
                <h2 class="title">Your favourite artists</h2>
                <a href="">See All</a>
            </div>
            <div class="body body-grid">
                <song-card
                    v-for="(item, index) in top.artists"
                    :item="item"
                    :key="`S${index}`"
                />
            </div>
        </section>
    </div>
</template>

<script>
import SongCard from "@/components/shared/SongCard";
import { getRecent, getReleases, getShortcuts } from "@/helpers/song";
export default {
    name: "Home",
    components: {
        SongCard
    },
    data() {
        return {
            recent: {
                cursors: null,
                items: []
            },
            top: {
                cursors: null,
                tracks: [],
                artists: []
            },
            releases: {
                albums: []
            }
        };
    },
    created() {
        getRecent(6).then(response => {
            console.log(response);

            this.recent.cursors = response.cursors;
            this.recent.items = response.items;
        });

        getShortcuts("artists", 6).then(response => {
            this.top.artists = response.items;
        });

        getShortcuts("tracks", 6).then(response => {
            this.top.tracks = response.items;
        });

        getReleases({ limit: 6, country: "IN" }).then(response => {
            this.releases.albums = response.albums.items;
        });
    }
};
</script>

<style lang="scss">
.song-group {
    margin-bottom: map-get($sizing, lg);
    .head {
        @include flex(space-between);
        margin-bottom: map-get($sizing, sm);

        a {
            @include font-size(12px);
            color: map-get($colors, gray);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-left: map-get($sizing, sm);
        }
    }

    .body.body-grid {
        display: grid;
        grid-gap: 24px;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        overflow-y: hidden;
        grid-auto-rows: 0;
        grid-template-rows: 1fr;
    }
}
</style>

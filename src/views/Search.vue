<template>
    <div class="search-bar">
        <icon name="search" :size="20"></icon>
        <input
            type="text"
            class="search"
            placeholder="Search Here..."
            v-model="query"
        />
    </div>
    <div class="content">
        <div class="song-group" v-if="tracks.length">
            <div class="head">
                <h2 class="title">Songs</h2>
                <a href="">See All</a>
            </div>
            <div class="body">
                <song-card-horizon
                    v-for="(item, index) in tracks"
                    :item="item"
                    :index="index + 1"
                    :key="`S${index}`"
                />
            </div>
        </div>
        <div class="song-group" v-if="artists.length">
            <div class="head">
                <h2 class="title">Artists</h2>
                <a href="">See All</a>
            </div>
            <div class="body body-grid">
                <song-card
                    v-for="(item, index) in artists"
                    :item="item"
                    :key="`A${index}`"
                />
            </div>
        </div>
        <div class="song-group" v-if="albums.length">
            <div class="head">
                <h2 class="title">Albums</h2>
                <a href="">See All</a>
            </div>
            <div class="body body-grid">
                <song-card
                    v-for="(item, index) in albums"
                    :item="item"
                    :key="`AB${index}`"
                />
            </div>
        </div>
    </div>
</template>

<script>
import SongCardHorizon from "@/components/shared/SongCardHorizon";
import { getSearchResults } from "@/helpers/song";
import SongCard from "@/components/shared/SongCard";

export default {
    name: "Search",
    components: { SongCard, SongCardHorizon },
    data() {
        return {
            query: "",
            tracks: [],
            albums: [],
            artists: []
        };
    },
    watch: {
        query(_query) {
            if (_query) this.updateResults(_query);
        }
    },
    computed: {
        isResultAvailable() {
            return (
                this.tracks.length || this.albums.length || this.artists.length
            );
        }
    },
    methods: {
        getResults(query, type) {
            const arrayName = `${type}s`;
            getSearchResults({ query: query, type: type, limit: 6 }).then(
                response => {
                    this[arrayName] = [];
                    this[arrayName] = response[arrayName].items;
                }
            );
        },
        updateResults(query) {
            this.getResults(query, "track");
            this.getResults(query, "artist");
            this.getResults(query, "album");
        }
    }
};
</script>

<style lang="scss" scoped>
.search-bar {
    @include flex(flex-start);
    display: inline-flex;
    padding-bottom: map-get($sizing, xm);
    border-bottom: 1px solid map-get($colors, darkgray);

    ::v-deep .icon {
        margin-right: map-get($sizing, xm);
    }

    .search {
        background: transparent;
        @include font-size(16px);
        border: none;
        color: white;
    }
}

.content {
    margin-top: map-get($sizing, base);
}
</style>

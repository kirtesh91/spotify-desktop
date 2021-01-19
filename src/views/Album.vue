<template>
    <div v-if="album">
        <div class="header">
            <div class="cover-art">
                <img :src="_album.picture" alt="" class="cover" />
            </div>
            <div class="details">
                <span class="type">{{ _album.type }}</span>
                <h2 class="name">{{ _album.name }}</h2>
                <span class="artist">{{
                    _album.artists.map(a => a.name).join(", ")
                }}</span>
            </div>
        </div>
        <div class="content">
            <div class="actions">
                <button class="play-btn">
                    <icon name="play" ionicons :size="24"></icon>
                </button>
                <button class="like-btn">
                    <icon name="heart" :size="30"></icon>
                </button>
                <button class="action-btn">
                    <icon name="more-horizontal" :size="30"></icon>
                </button>
            </div>
            <div class="songs">
                <section class="song-group">
                    <div class="head">
                        <h2 class="title">Tracks</h2>
                    </div>
                    <div class="body ">
                        <song-card-horizon
                            v-for="(track, index) in album.tracks.items"
                            :item="track"
                            :album="_album"
                            :index="index + 1"
                            :key="`S${index}`"
                        ></song-card-horizon>
                    </div>
                </section>
                <section
                    class="song-group"
                    v-for="artist in artists"
                    :key="`A${artist}`"
                >
                    <div class="head">
                        <h2 class="title">More from {{ artist.name }}</h2>
                        <a href="">See All</a>
                    </div>
                    <div class="body body-grid">
                        <song-card
                            v-for="(item, index) in artist.tracks.tracks.slice(
                                0,
                                6
                            )"
                            :item="item"
                            :key="`S${index}`"
                        />
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { getAlbum, getArtistTopTracks } from "@/helpers/song";
import SongCardHorizon from "@/components/shared/SongCardHorizon";
import SongCard from "@/components/shared/SongCard";

export default {
    name: "Album",
    components: { SongCard, SongCardHorizon },
    data() {
        return {
            album: null,
            artists: []
        };
    },
    computed: {
        albumId() {
            return this.$route.params.id;
        },
        _album() {
            if (!this.album) return null;

            return {
                name: this.album.name,
                type: this.album.album_type,
                picture: this.album.images[0].url,
                artists: this.album.artists.map(artist => ({
                    name: artist.name,
                    id: artist.id
                }))
            };
        }
    },
    watch: {
        albumId(id) {
            this.initialize(id);
        }
    },
    methods: {
        async initialize(id) {
            try {
                this.album = await getAlbum(id);

                const artists = [];

                for (const artist of this.album.artists) {
                    const tracks = await getArtistTopTracks(artist.id);

                    artists.push({
                        ...artist,
                        tracks
                    });
                }

                this.artists = artists;
                console.log(this.artists);
            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        this.initialize(this.albumId);
    }
};
</script>

<style lang="scss" scoped>
.header {
    @include flex(flex-start, flex-end);
    padding-top: 36px;

    .cover-art {
        width: 192px;
        margin-right: 24px;
        height: 192px;

        img {
            @include dimension(100%);
            @include object-fit();
            border-radius: 3px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }
    }

    .details {
        .type {
            @include font-size(14px);
            text-transform: uppercase;
            color: map-get($colors, midgray);
        }
        .name {
            margin: 4px 0;
            @include font-size(72px);
            @include text-overflow-ellipsis();
        }
    }
}

.content {
    margin-top: 36px;
    padding: 36px 0;
    border-top: 1px solid #333333;

    .actions {
        @include flex(flex-start);
        margin-bottom: 16px;
    }

    .play-btn {
        @include dimension(42px);
        background-color: map-get($colors, success);
        border-radius: 50%;
        @include flex();
        padding-left: 5px;
    }

    .like-btn {
        margin: 0 28px;
    }
}
</style>

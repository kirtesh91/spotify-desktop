<template>
    <div v-if="artist">
        <div class="header">
            <div class="cover-art">
                <img :src="_artist.picture" alt="" class="cover" />
            </div>
            <div class="details">
                <span class="type">{{ _artist.followers }} Followers</span>
                <h2 class="name">{{ _artist.name }}</h2>
                <span class="artist">{{ _artist.genres }}</span>
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
                        <h2 class="title">Popular</h2>
                        <a href="">See All</a>
                    </div>
                    <div class="body ">
                        <song-card-horizon
                            v-for="(track, index) in popular.tracks"
                            :item="track"
                            :artist="_artist"
                            :index="index + 1"
                            :key="`S${index}`"
                        ></song-card-horizon>
                    </div>
                </section>
                <section class="song-group">
                    <div class="head">
                        <h2 class="title">Fans also like</h2>
                        <a href="">See All</a>
                    </div>
                    <div class="body body-grid">
                        <song-card
                            v-for="(item, index) in related.artists.slice(0, 6)"
                            :item="item"
                            :key="`S${index}`"
                        />
                    </div>
                </section>
                <section class="song-group">
                    <div class="head">
                        <h2 class="title">Appears On</h2>
                        <a href="">See All</a>
                    </div>
                    <div class="body body-grid">
                        <song-card
                            v-for="(item, index) in appearsOn.items.slice(0, 6)"
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
import {
    getArtist,
    getArtistAlbums,
    getArtistTopTracks,
    getRelatedArtists
} from "@/helpers/song";
import SongCardHorizon from "@/components/shared/SongCardHorizon";
import SongCard from "@/components/shared/SongCard";

export default {
    name: "Artist",
    components: { SongCard, SongCardHorizon },
    data() {
        return {
            artist: null,
            popular: [],
            related: [],
            appearsOn: []
        };
    },
    computed: {
        artistId() {
            return this.$route.params.id;
        },
        _artist() {
            if (!this.artist) return null;

            return {
                name: this.artist.name,
                followers: this.artist.followers.total,
                picture: this.artist.images[0].url,
                genres: this.artist.genres.join(", ")
            };
        }
    },
    watch: {
        artistId(id) {
            this.initialize(id);
        }
    },
    methods: {
        async initialize(id) {
            try {
                this.artist = await getArtist(id);
                this.popular = await getArtistTopTracks(id);
                this.related = await getRelatedArtists(id);
                this.appearsOn = await getArtistAlbums(id, {
                    include_groups: "appears_on",
                    limit: 6
                });
            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        this.initialize(this.artistId);
    }
};
</script>

<style lang="scss" scoped>
.header {
    @include flex(flex-start, flex-end);
    padding-top: 56px;

    .cover-art {
        width: 192px;
        margin-right: 24px;
        height: 192px;

        img {
            @include dimension(100%);
            @include object-fit();
            border-radius: 50%;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }
    }

    .details {
        .type {
            @include font-size(12px);
            text-transform: uppercase;
            color: map-get($colors, midgray);
        }
        .name {
            margin: 4px 0;
            @include font-size(48px);
            @include text-overflow-ellipsis();
        }
        .artist {
            text-transform: capitalize;
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

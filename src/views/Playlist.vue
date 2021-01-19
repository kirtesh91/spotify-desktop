<template>
    <div v-if="playlist">
        <div class="header">
            <div class="cover-art">
                <img :src="_playlist.picture" alt="" class="cover" />
            </div>
            <div class="details">
                <span class="type" @click="onedit">{{ _playlist.type }}</span>
                <h2 class="name" @click="onedit">{{ _playlist.name }}</h2>
                <span class="artist">{{ _playlist.owner }}</span>
            </div>
        </div>
        <div class="content">
            <div class="empty-section" v-if="!playlist.tracks.items.length">
                <icon name="disc" :size="56"></icon>
                <h3 class="title">It's a bit empty here...</h3>
                <h6 class="subtitle">
                    Let's find some songs for your playlist
                </h6>
            </div>
            <div v-else>
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
                                v-for="(item, index) in playlist.tracks.items"
                                :item="item.track"
                                :index="index + 1"
                                :key="`S${index}`"
                            ></song-card-horizon>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getPlaylist } from "@/helpers/song";
import SongCardHorizon from "@/components/shared/SongCardHorizon";
import Icon from "@/components/Icon";

export default {
    name: "Album",
    components: { Icon, SongCardHorizon },
    data() {
        return {
            playlist: null
        };
    },
    computed: {
        playlistId() {
            return this.$route.params.id;
        },
        _playlist() {
            if (!this.playlist) return null;

            return {
                name: this.playlist.name,
                type: this.playlist.type,
                picture: this.playlist.images.length
                    ? this.playlist.images[0].url
                    : "https://i.scdn.co/image/25fc1aca3d27f2aaa90e04595c93dc9b8cdde596",
                owner: this.playlist.owner.display_name
            };
        }
    },
    watch: {
        playlistId(id) {
            this.initialize(id);
        }
    },
    methods: {
        async initialize(id) {
            try {
                this.playlist = await getPlaylist(id);
            } catch (err) {
                console.log(err);
            }
        },
        onedit() {
            this.$store.dispatch("playlist/route", {
                mode: "edit",
                visible: true,
                data: {
                    name: this._playlist.name
                }
            });
        }
    },
    mounted() {
        this.initialize(this.playlistId);
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

    .empty-section {
        @include flex-column();
        padding: map-get($sizing, sm) 0;

        .title {
            @include font-size(32px);
            margin: map-get($sizing, sm) 0 map-get($sizing, xs) 0;
            @include font-weight(700);
        }

        .subtitle {
            @include font-size(14px);
            @include font-weight(500);
        }
    }
}
</style>

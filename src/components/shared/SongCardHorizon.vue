<template>
    <div class="song-card-horizon" @click="onclick">
        <div class="index">
            <span>{{ index }}</span>
            <icon name="play" :size="14" ionicons></icon>
        </div>
        <div class="song-details">
            <img :src="song.picture" class="cover" alt="" />
            <div class="general">
                <h3 class="name">{{ song.name }}</h3>
                <div class="others">
                    <span v-if="song.explicit" class="explicit">E</span>
                    <span class="artist">{{ song.artist }}</span>
                </div>
            </div>
        </div>
        <div class="album">
            <span>{{ song.album.name }}</span>
        </div>
        <div class="duration">
            <span>{{ song.duration }}</span>
        </div>
    </div>
</template>

<script>
import { time } from "@/helpers/utils";
import Icon from "@/components/Icon";
import { playTrack } from "@/helpers/player";
import { mapGetters } from "vuex";

export default {
    name: "SongCardHorizon",
    components: { Icon },
    props: {
        index: Number,
        item: Object,
        album: Object
    },
    computed: {
        ...mapGetters({
            currentTrack: "player/track"
        }),
        type() {
            return this.item.type;
        },
        song() {
            const item = this.item;

            return {
                picture:
                    this.type === "track"
                        ? this.album
                            ? this.album.picture
                            : item.album.images[0].url
                        : item.images[0].url,
                name: item.name,
                album: {
                    name: this.album ? this.album.name : item.album.name
                },
                artist: item.artists.map(artist => artist.name).join(", "),
                duration: time.millisToMS(item.duration_ms),
                explicit: item.explicit
            };
        }
    },
    methods: {
        onclick() {
            if (this.type !== "track") return;

            if (!this.currentTrack) {
                playTrack({ uris: [this.item.uri] });
                return;
            }

            if (this.currentTrack.id === this.item.id) return;
            playTrack({ uris: [this.item.uri] });
        }
    }
};
</script>

<style lang="scss" scoped>
.song-card-horizon {
    display: grid;
    height: 56px;
    margin: map-get($sizing, xs) 0;
    border: 1px solid transparent;
    border-radius: map-get($sizing, xxs);
    padding: 0 map-get($sizing, sm);
    grid-gap: map-get($sizing, sm);
    cursor: default;
    grid-template-columns: [index] 16px [first] 4fr [var1] 2fr [last] minmax(
            120px,
            1fr
        );

    &:hover {
        background-color: rgba(map-get($colors, white), 0.1);
    }

    .index {
        @include flex(flex-start);
        color: map-get($colors, darkgray);

        ::v-deep .icon {
            display: none;
        }
    }

    .song-details {
        @include flex(flex-start);
        .cover {
            @include dimension(40px);
            margin-right: map-get($sizing, sm);
        }

        .general {
            .name {
                @include font-size(16px);
                @include text-overflow-ellipsis();
                margin-bottom: map-get($sizing, xxs);
            }

            .others {
                @include flex(flex-start);
                flex-wrap: nowrap;
                .explicit {
                    @include flex();
                    @include dimension(16px);
                    @include font-size(9px);
                    margin-right: map-get($sizing, xs);
                    @include font-weight(400);
                    color: #000000;
                    background: map-get($colors, midgray);
                    border-radius: 2px;
                }

                .artist {
                    color: map-get($colors, midgray);
                    @include text-overflow-ellipsis();
                    @include font-size(14px);
                }
            }
        }
    }

    .album,
    .duration {
        @include flex(flex-start);
        @include font-size(14px);
        color: map-get($colors, gray);
        @include text-overflow-ellipsis();
    }

    &:hover {
        .index {
            span {
                display: none;
            }
            ::v-deep .icon {
                display: block;
            }
        }
    }
}
</style>

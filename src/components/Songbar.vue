<template>
    <div class="songbar">
        <div class="song-details-container">
            <div class="song-details" v-if="track">
                <div class="cover-art">
                    <img :src="track.picture" alt="Still" class="cover" />
                </div>
                <div class="content">
                    <h2 class="title">{{ track.name }}</h2>
                    <h5 class="artist">{{ track.artist }}</h5>
                </div>
                <div class="actions">
                    <Icon name="heart" class="action-icon" :size="16" />
                    <Icon name="maximize" class="action-icon" :size="16" />
                </div>
            </div>
        </div>
        <Player />
        <div class="song-options">
            <button class="control-btn">
                <Icon name="type" :size="16"></Icon>
            </button>
            <button class="control-btn">
                <Icon name="layers" :size="16"></Icon>
            </button>
            <button class="control-btn">
                <Icon name="volume-2" :size="16"></Icon>
            </button>
            <ProgressBar class="volume-bar" />
        </div>
    </div>
</template>

<script>
import ProgressBar from "@/components/shared/ProgressBar";
import Player from "@/components/songbar/Player";
import { mapGetters } from "vuex";

export default {
    name: "Songbar",
    components: {
        Player,
        ProgressBar
    },
    computed: {
        ...mapGetters({
            playback: "player/playback"
        }),
        track() {
            if (!this.playback) return null;
            const song = this.playback.item;

            return {
                name: song.name,
                picture: song.album.images[0].url,
                artist: song.artists.map(artist => artist.name).join(", ")
            };
        }
    }
};
</script>

<style lang="scss" scoped>
.songbar {
    background: #282828;
    @include fixed(bottom 0 left 0 right 0);
    height: map-get($components, songbar-height);
    padding: 0 map-get($sizing, sm);
    @include flex();

    ::v-deep .control-btn {
        @include dimension(32px);
        @include flex();
        cursor: pointer;
        border-radius: 50%;
    }

    .song-details-container {
        flex: 3;
    }
    .song-details {
        @include flex(flex-start);
        flex-wrap: nowrap;

        .cover-art {
            @include dimension(56px);
            border-radius: 2px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

        img.cover {
            @include dimension(100%);
            @include object-fit();
        }

        .content {
            margin: 0 map-get($sizing, sm);
            min-width: 1px;
            color: white;
        }

        .title {
            @include font-size(14px);
            margin-bottom: map-get($sizing, xs);
            @include text-overflow-ellipsis();
        }

        .artist {
            @include font-size(12px);
            @include font-weight(400);
            color: map-get($colors, gray);
            @include text-overflow-ellipsis();
        }

        .actions {
            @include flex();
            margin-left: map-get($sizing, sm);

            .action-icon {
                cursor: pointer;
                margin-right: map-get($sizing, sm);
            }
        }
    }

    .song-options {
        @include flex(flex-end);
        flex-wrap: nowrap;
        flex: 3;

        .volume-bar {
            margin-left: map-get($sizing, sm);
            width: 96px;
        }
    }
}
</style>

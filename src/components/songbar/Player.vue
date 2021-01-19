<template>
    <div class="player" :class="{ playing: playing }">
        <div class="controls">
            <button class="control-btn" @click="shuffle">
                <Icon name="shuffle" :size="16"></Icon>
            </button>
            <button class="control-btn" @click="prev">
                <Icon name="skip-back" :size="16"></Icon>
            </button>
            <button class="control-btn play-btn" @click="play">
                <Icon v-if="playing" name="pause" :size="16" />
                <Icon v-else name="play" :size="16" />
            </button>
            <button class="control-btn" @click="next">
                <Icon name="skip-forward" :size="16"></Icon>
            </button>
            <button class="control-btn" @click="repeat">
                <Icon name="repeat" :size="16"></Icon>
            </button>
        </div>
        <PlayBar ref="player" />
    </div>
</template>

<script>
import PlayBar from "@/components/shared/PlayBar";
import Icon from "@/components/Icon";
import * as player from "@/helpers/player";
import { mapGetters } from "vuex";
export default {
    name: "Player",
    components: {
        Icon,
        PlayBar
    },
    data() {
        return {
            playing: false,
            shuffling: false,
            repeating: false,
            playBarRefresh: false
        };
    },
    computed: {
        ...mapGetters({
            playback: "player/playback",
            track: "player/track"
        })
    },
    watch: {
        track() {
            this.playBarRefresh = true;
            setTimeout(() => {
                this.playBarRefresh = false;
            }, 100);
        }
    },
    methods: {
        play() {
            if (this.playing) {
                player.pauseTrack();
            } else {
                player.playTrack();
            }
            // if (this.playing) {
            //     this.$refs.player.pause();
            // } else {
            //     this.$refs.player.play();
            // }
            this.playing = !this.playing;
        },
        next() {
            console.log("next");
            player.nextTrack(this.$store.getters["player/deviceId"]);
        },
        prev() {
            player.previousTrack();
        },
        shuffle() {
            player.shuffle(!this.shuffling);
            this.shuffling = !this.shuffling;
        },
        repeat() {
            player.repeat(!this.repeating);
            this.repeating = !this.repeating;
        }
    }
};
</script>

<style lang="scss" scoped>
.player {
    flex: 4;
    @include flex-column();

    .controls {
        width: 224px;
        margin-bottom: map-get($sizing, "sm");
        @include flex(space-between);

        .play-btn {
            border: 1px solid #ffffff;
            padding-left: 2px;
        }

        .control-btn {
            ::v-deep svg {
                cursor: pointer;
            }
        }
    }

    &.playing {
        .controls .play-btn {
            padding-left: 0;
        }
    }
}
</style>

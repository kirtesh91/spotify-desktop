<template>
    <div class="player" :class="{ playing: playing }">
        <div class="controls">
            <button class="control-btn">
                <Icon name="shuffle" :size="16"></Icon>
            </button>
            <button class="control-btn">
                <Icon name="skip-back" :size="16"></Icon>
            </button>
            <button class="control-btn play-btn" @click="play">
                <Icon v-if="playing" name="pause" :size="16" />
                <Icon v-else name="play" :size="16" />
            </button>
            <button class="control-btn">
                <Icon name="skip-forward" :size="16"></Icon>
            </button>
            <button class="control-btn">
                <Icon name="repeat" :size="16"></Icon>
            </button>
        </div>
        <PlayBar
            ref="player"
            source="https://il.ilill.li/mp3/Russ_Paid_Off.mp3?t=_1607937238"
        />
    </div>
</template>

<script>
import PlayBar from "@/components/shared/PlayBar";
import Icon from "@/components/Icon";
export default {
    name: "Player",
    components: {
        Icon,
        PlayBar
    },
    data() {
        return {
            playing: false
        };
    },
    methods: {
        play() {
            if (this.playing) {
                this.$refs.player.pause();
            } else {
                this.$refs.player.play();
            }
            this.playing = !this.playing;
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
    }

    &.playing {
        .controls .play-btn {
            padding-left: 0;
        }
    }
}
</style>

<template>
    <div class="container" v-if="context">
        <span class="left counter">{{ meta.completed }}</span>
        <ProgressBar
            @change="onchange"
            @mousedown="onmousedown"
            @mouseup="onmouseup"
            :value="value"
            :min="0"
            :max="meta.durationDilation"
        />
        <span class="right counter">{{ meta.duration }}</span>
    </div>
</template>

<script>
import ProgressBar from "@/components/shared/ProgressBar";
import { time } from "@/helpers/utils";
import { mapGetters } from "vuex";
import { seekToPosition } from "@/helpers/player";

export default {
    name: "PlayBar",
    components: { ProgressBar },
    data() {
        return {
            dilation: 10,
            seeking: false,
            isPlaying: false,
            trackId: null,
            value: 0,
            progressInterval: null,
            meta: {
                durationDilation: 0,
                durationMS: 0,
                completedMS: 0,
                completed: "0:00",
                duration: "0:00"
            }
        };
    },
    computed: {
        ...mapGetters({
            track: "player/song",
            playback: "player/playback",
            context: "player/playbackContext",
            isPlaying: "player/isPlaying"
        })
    },
    watch: {
        track() {},
        playback() {
            this.initialize();
        },
        isPlaying() {
            this.updateProgress();
        }
    },
    methods: {
        updateProgress() {
            if (!this.context) return;

            clearInterval(this.progressInterval);
            this.meta.completedMS = this.context.position;

            if (!this.context.paused) {
                this.progressInterval = setInterval(() => {
                    if (
                        this.playback &&
                        this.meta.completedMS + 1000 <= this.meta.durationMS
                    ) {
                        this.meta.completedMS = this.meta.completedMS + 1000;
                        this.ontimeupdate();
                    }
                }, 1000);
            }
        },
        onchange(value) {
            this.value = value;

            const completed = Math.round(parseInt(value) / this.dilation);
            this.meta.completedMS = completed;
            this.meta.completed = time.millisToMS(completed);
        },
        onmousedown() {
            this.seeking = true;
        },
        onmouseup() {
            seekToPosition(this.meta.completedMS);
            this.seeking = false;
        },
        ontimeupdate() {
            if (this.seeking) return;

            this.value = this.meta.completedMS;
            this.meta.completed = time.millisToMS(this.meta.completedMS);
        },
        initialize() {
            if (!this.playback) return;
            if (this.playback.item.id === this.trackId) return;
            const duration = Math.round(this.meta.durationMS);

            this.trackId = this.playback.item.id;
            this.dilation = 1;
            this.value = 0;
            this.meta.completedMS = 0;
            this.meta.durationMS = this.playback.item.duration_ms;
            this.meta.completed = "0:00";
            this.meta.duration = time.millisToMS(duration);
            this.meta.durationDilation = duration * this.dilation;

            this.updateProgress();
        }
    },
    created() {
        this.initialize();
    }
};
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    @include flex();
    flex-wrap: nowrap;
    color: white;

    .counter {
        @include font-weight(100);
        @include font-size(11px);

        &.left {
            margin-right: map-get($sizing, sm);
        }

        &.right {
            margin-left: map-get($sizing, sm);
        }
    }
}
</style>

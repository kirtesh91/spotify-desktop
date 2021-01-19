<template>
    <div class="container">
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
import { animate, time } from "@/helpers/utils";

export default {
    name: "PlayBar",
    components: { ProgressBar },
    props: {
        source: String
    },
    data() {
        return {
            dilation: 10,
            seeking: false,
            audio: null,
            value: 0,
            meta: {
                durationDilation: 0,
                completedSeconds: 0,
                completed: "0:00",
                duration: "0:00"
            }
        };
    },
    methods: {
        onchange(value) {
            this.value = value;

            const completed = Math.round(parseInt(value) / this.dilation);
            this.meta.completedSeconds = completed;
            this.meta.completed = time.format(completed);
        },
        onmousedown() {
            this.seeking = true;
        },
        onmouseup() {
            this.audio.currentTime = this.meta.completedSeconds;
            this.seeking = false;
        },
        ontimeupdate() {
            if (this.seeking) return;

            this.value = this.audio.currentTime.toFixed(2) * this.dilation;

            const completed = Math.round(this.audio.currentTime);
            this.meta.completedSeconds = completed;
            this.meta.completed = time.format(completed);
        },
        onloadedmetadata() {
            const duration = Math.round(this.audio.duration);

            this.dilation = Math.round(512 / duration);
            this.meta.duration = time.format(duration);
            this.meta.durationDilation = duration * this.dilation;
        },
        play() {
            this.audio.volume = 1;
            this.audio.play();
        },
        pause() {
            animate.pause(this.audio, 500).then(() => {
                this.audio.pause();
                this.audio.volume = 1;
            });
        }
    },
    created() {
        this.audio = new Audio(this.source);
        this.audio.onloadedmetadata = this.onloadedmetadata;
        this.audio.ontimeupdate = this.ontimeupdate;
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

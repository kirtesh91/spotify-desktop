<template>
    <div class="songbar">
        <div class="song-details">
            <div class="cover-art">
                <img
                    src="https://i.scdn.co/image/ab67616d0000b273abbd90b610db22f52190eb8c"
                    alt="Still"
                    class="cover"
                />
            </div>
            <div class="content">
                <h2 class="title">Missin You Crazy</h2>
                <h5 class="artist">Russ</h5>
            </div>
            <div class="actions">
                <Icon name="heart" class="action-icon" :size="16" />
                <Icon name="maximize" class="action-icon" :size="16" />
            </div>
        </div>
        <div class="play-bar">
            <div class="controls">
                <button class="control-byn">
                    <Icon name="shuffle" :size="16"></Icon>
                </button>
                <button class="control-btn">
                    <Icon name="skip-back" :size="16"></Icon>
                </button>
                <button class="control-btn play-btn">
                    <Icon name="play" :size="16"></Icon>
                </button>
                <button class="control-btn">
                    <Icon name="skip-forward" :size="16"></Icon>
                </button>
                <button class="control-btn">
                    <Icon name="repeat" :size="16"></Icon>
                </button>
            </div>
            <ProgressBar music />
        </div>
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
export default {
    components: {
        ProgressBar
    },
    name: "Songbar"
};
</script>

<style lang="scss" scoped>
.songbar {
    background: #282828;
    @include fixed(bottom 0 left 0 right 0);
    height: map-get($components, songbar-height);
    padding: 0 map-get($sizing, sm);
    @include flex();

    .control-btn {
        cursor: pointer;
        @include dimension(32px);
        @include flex();
        border-radius: 50%;

        &.play-btn {
            border: 1px solid #ffffff;
            padding-left: 1.5px;
        }
    }

    .song-details {
        flex: 3;
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
            color: white;
        }

        .title {
            @include font-size(14px);
            margin-bottom: map-get($sizing, xs);
        }

        .artist {
            @include font-size(12px);
            @include font-weight(400);
            color: map-get($colors, gray);
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

    .play-bar {
        flex: 4;
        @include flex-column();

        .controls {
            width: 224px;
            margin-bottom: map-get($sizing, "sm");
            @include flex(space-between);
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

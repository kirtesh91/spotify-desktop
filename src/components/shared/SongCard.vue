<template>
    <div class="card">
        <div class="cover-art">
            <img
                src="https://i.scdn.co/image/ab67706f000000029e7a22aa0a886e0e01df9171"
                alt="This is RUSS"
                class="cover"
            />
            <button class="play-btn">
                <Icon name="play" ionicons :size="16" />
            </button>
        </div>
        <div class="content">
            <h2 class="title">This is Russ Russ Russ Russ</h2>
            <h5 class="artist">Russ</h5>
        </div>
    </div>
</template>

<script>
export default {
    name: "SongCard"
};
</script>

<style lang="scss" scoped>
.card {
    cursor: pointer;
    position: relative;
    padding: 16px;
    background: #181818;
    border-radius: 4px;
    @include transition();

    .cover-art {
        width: 100%;
        padding-bottom: 100%;
        position: relative;
        margin-bottom: map-get($sizing, sm);
        background-color: #333;
        border-radius: 3px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);

        .cover {
            @include absolute(top 0 left 0);
            height: 100%;
            width: 100%;
            @include object-fit();
            border-radius: 3px;
        }

        .play-btn {
            @include absolute(bottom 8px right 8px);
            background: map-get($colors, success);
            border-radius: 50%;
            @include dimension(40px);
            @include flex();
            box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
            padding-left: 2px;
            transform: translateY(8px);
            opacity: 0;
            @include transition();
        }
    }

    .title {
        @include font-size(16px);
        line-height: 24px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .artist {
        margin-top: map-get($sizing, xxs);
        text-overflow: ellipsis;
        overflow: hidden;
        @include font-weight(500);
        color: map-get($colors, gray);
    }

    &:hover {
        background: #282828;

        .play-btn {
            transform: translateY(0);
            opacity: 1;
        }
    }
}
</style>

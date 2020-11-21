<template>
    <div class="content">
        <section class="song-group" v-for="i in 12" :key="`Group${i}`">
            <div class="head">
                <h2 class="title">Shortcuts</h2>
                <a href="">See All</a>
            </div>
            <div class="body">
                <song-card />
                <song-card />
                <song-card />
                <song-card />
                <song-card />
                <song-card />
            </div>
        </section>
    </div>
</template>

<script>
import SongCard from "@/components/shared/SongCard";
export default {
    name: "Home",
    components: {
        SongCard
    }
};
</script>

<style lang="scss" scoped>
.song-group {
    margin-bottom: map-get($sizing, lg);
    .head {
        @include flex(space-between);
        margin-bottom: map-get($sizing, sm);

        a {
            @include font-size(12px);
            color: map-get($colors, gray);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-left: map-get($sizing, sm);
        }
    }

    .body {
        display: grid;
        grid-gap: 24px;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        overflow-y: hidden;
        grid-auto-rows: 0;
        grid-template-rows: 1fr;
    }
}
</style>

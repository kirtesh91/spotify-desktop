<template>
    <div class="modal playlist-modal">
        <div class="content">
            <div class="container">
                <form @submit.prevent="onsubmit">
                    <div>
                        <img
                            src="https://i.scdn.co/image/25fc1aca3d27f2aaa90e04595c93dc9b8cdde596"
                            alt=""
                            class="cover"
                        />
                    </div>
                    <div class="body">
                        <label class="title" for="playlist-name"
                            >Playlist</label
                        >
                        <input
                            class="playlist-name"
                            placeholder="Playlist Name"
                            id="playlist-name"
                            type="text"
                            v-model="name"
                        />
                        <div class="actions">
                            <button class="submit-btn">
                                Edit Playlist
                            </button>
                            <button
                                type="button"
                                class="close-btn"
                                @click="onclose"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditPlaylist",
    data() {
        return {
            name: null
        };
    },
    methods: {
        onsubmit() {
            this.$store.dispatch("playlist/create", {
                name: this.name
            });
        },
        onclose() {
            this.$store.dispatch("playlist/route", {
                mode: "edit",
                visible: false
            });
        }
    },
    mounted() {
        const playlist = this.$store.getters["playlist/editPlaylist"];
        this.name = playlist.name;
    }
};
</script>

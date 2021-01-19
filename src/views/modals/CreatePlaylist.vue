<template>
    <div class="modal playlist-modal">
        <div class="content">
            <div class="container">
                <form @submit.prevent="onsubmit">
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
                                Create Playlist
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
    name: "CreatePlaylist",
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
                mode: "create",
                visible: false
            });
        }
    }
};
</script>

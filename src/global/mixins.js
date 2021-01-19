export const mixins = {
    data() {
        return {
            Spotify: {
                clientId: process.env.VUE_APP_SPOTIFY_CLIENT_ID
            },
            WEB: {
                name: process.env.VUE_APP_NAME
            },
            directory: {
                images: "http://localhost:8080/images",
                icons: "http://localhost:8080/images/icons/"
            }
        };
    }
};

export const uris = {
    authorize: "https://accounts.spotify.com/en/authorize",
    users: {
        me: "/me"
    },
    search: "/search",
    player: {
        current: "/me/player/currently-playing",
        resume: "/me/player/play",
        pause: "/me/player/pause",
        next: "/me/player/next",
        prev: "/me/player/previous",
        recent: "/me/player/recently-played",
        top: type => `me/top/${type}`
    },
    browse: {
        releases: "/browse/new-releases"
    },
    tracks: {
        single: id => `/tracks/${id}`
    },
    albums: {
        single: id => `/albums/${id}`
    },
    artists: {
        multiple: "/artists",
        single: id => `/artists/${id}`,
        top: id => `/artists/${id}/top-tracks`,
        related: id => `/artists/${id}/related-artists`,
        albums: id => `/artists/${id}/albums`
    },
    playlists: {
        single: id => `/playlists/${id}`,
        create: id => `/users/${id}/playlists`,
        retrieve: "/me/playlists"
    }
};

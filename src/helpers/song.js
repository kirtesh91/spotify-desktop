import axios from "axios";
import { uris } from "@/constants";

export const getRecent = (limit, before) => {
    const params = { limit: limit };
    if (before) params.before = before;

    return new Promise((resolve, reject) => {
        axios
            .get(uris.player.recent, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getShortcuts = (type = "tracks", limit, offset = 0) => {
    return new Promise((resolve, reject) => {
        axios
            .get(uris.player.top(type), {
                params: {
                    limit: limit,
                    offset: offset
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getReleases = ({ limit, offset, country }) => {
    const params = {};

    if (limit) params.limit = limit;
    if (country) params.country = country;
    if (offset) params.offset = offset;

    return new Promise((resolve, reject) => {
        axios
            .get(uris.browse.releases, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getRecommendations = () => {};

export const getSearchResults = ({ query, type, limit, offset }) => {
    const params = {
        type: type,
        q: query
    };

    if (limit) params.limit = limit;
    if (offset) params.offset = offset;

    return new Promise((resolve, reject) => {
        axios
            .get(uris.search, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getPlaylist = id => {
    return new Promise((resolve, reject) => {
        axios
            .get(uris.playlists.single(id))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getAlbum = id => {
    return new Promise((resolve, reject) => {
        axios
            .get(uris.albums.single(id))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getArtist = id => {
    return new Promise((resolve, reject) => {
        axios
            .get(uris.artists.single(id))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getArtists = ids => {
    return new Promise((resolve, reject) => {
        axios
            .get(uris.artists.multiple, {
                params: {
                    ids: ids.join(",")
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getArtistTopTracks = id => {
    return new Promise((resolve, reject) => {
        axios
            .get(uris.artists.top(id), {
                params: {
                    market: "IN"
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getRelatedArtists = id => {
    return new Promise((resolve, reject) => {
        axios
            .get(uris.artists.related(id))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const getArtistAlbums = (id, params) => {
    return new Promise((resolve, reject) => {
        axios
            .get(uris.artists.albums(id), {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

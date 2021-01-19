import axios from "axios";
import { uris } from "@/constants";
import { getCurrentPlayback, transferUsersPlayback } from "@/helpers/player";

export const actions = {
    play({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios
                .get(uris.tracks.single(id))
                .then(response => {
                    commit("setSong", response.data);
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    init: async function({ commit, dispatch }) {
        window.onSpotifyWebPlaybackSDKReady = () => {};

        async function waitForSpotifyWebPlaybackSDKToLoad() {
            return new Promise(resolve => {
                if (window.Spotify) {
                    resolve(window.Spotify);
                } else {
                    window.onSpotifyWebPlaybackSDKReady = () => {
                        resolve(window.Spotify);
                    };
                }
            });
        }

        async function waitUntilUserHasSelectedPlayer(sdk) {
            return new Promise(resolve => {
                let interval = setInterval(async () => {
                    let state = await sdk.getCurrentState();
                    if (state !== null) {
                        resolve(state);
                        clearInterval(interval);
                    }
                });
            });
        }

        await (async () => {
            const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
            const token = localStorage.getItem("@spotify:access_token");

            // eslint-disable-next-line
            const player = new Player({
                name: "Vue Spotify Web Player",
                getOAuthToken: cb => {
                    cb(token);
                }
            });

            // Error handling
            player.addListener("initialization_error", ({ message }) => {
                console.error(message);
            });

            player.addListener("authentication_error", ({ message }) => {
                console.error(message);
                dispatch("auth/login", null, { root: true });
            });

            player.addListener("account_error", ({ message }) => {
                console.error(message);
            });

            player.addListener("playback_error", ({ message }) => {
                console.error(message);
            });

            // Playback status updates
            player.addListener("player_state_changed", state => {
                if (state) {
                    dispatch("setPlaybackContext", state);
                    dispatch("setPlayback");
                }
            });

            // Ready
            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);
                commit("SET_DEVICE_ID", device_id);

                transferUsersPlayback([device_id], false);
            });

            // Not Ready
            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });

            // Connect to the player!
            let connected = await player.connect();

            if (connected) {
                await waitUntilUserHasSelectedPlayer(player);
                await player.pause();
            }
        })();
    },

    async setPlayback({ commit }) {
        try {
            const response = await getCurrentPlayback();
            commit("SET_PLAYBACK", response.data);
        } catch (e) {
            console.log(e);
        }
    },

    setPlaybackContext({ commit }, context) {
        commit("SET_PLAYBACK_CONTEXT", context);
    }
};

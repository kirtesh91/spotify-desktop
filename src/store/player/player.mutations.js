export const mutations = {
    setSong(state, song) {
        state.song = song;
    },
    SET_DEVICE_ID(state, deviceID) {
        state.deviceID = deviceID;
    },
    SET_PLAYBACK(state, playback) {
        state.playback = playback;
    },
    SET_PLAYBACK_CONTEXT(state, playback) {
        state.playbackContext = playback;
    }
};

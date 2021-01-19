export const getters = {
    profile(state) {
        return state.profile;
    },
    authorized(state) {
        return !state.initialized ? "loading" : state.authorized;
    },
    deviceId: state => state.deviceID,
    playback: state => state.playback,
    playbackContext: state => state.playbackContext,
    isPlaying: state => state.playback.is_playing
};

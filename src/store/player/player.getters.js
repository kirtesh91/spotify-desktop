export const getters = {
    track: state => (state.playback ? state.playback.item : null),
    song: state => (state.playback ? state.playback.item : null),
    deviceID: state => state.deviceId,
    playback: state => state.playback,
    playbackContext: state => state.playbackContext,
    isPlaying: state => state.playback.is_playing
};

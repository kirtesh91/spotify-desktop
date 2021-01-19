export const mutations = {
    SET_PROFILE(state, profile) {
        state.profile = profile;
        state.authorized = !!profile;
    },
    SET_INITIALIZED(state, status) {
        state.initialized = status;
    }
};

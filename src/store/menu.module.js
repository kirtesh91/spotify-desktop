export default {
    namespaced: true,
    state: {
        song: {
            visible: false,
            data: null,
            position: { left: 0, right: 0 }
        }
    },
    actions: {
        toggle({ commit }, data) {
            commit("TOGGLE_MENU", data);
        }
    },
    mutations: {
        TOGGLE_MENU(state, { name, visible, data, position }) {
            if (typeof visible === "boolean") {
                state[name].visible = visible;
            } else {
                state[name].visible = !state[name].visible;
            }

            if (data) state[name].data = data;
            if (position) state[name].position = position;
        }
    },
    getters: {
        isSongVisible: state => state.song.visible,
        songData: state => state.song.data,
        songPosition: state => state.song.position
    }
};

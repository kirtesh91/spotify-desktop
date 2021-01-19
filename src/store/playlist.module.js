import axios from "axios";
import { uris } from "@/constants";

export default {
    namespaced: true,
    state: {
        create: {
            visible: false
        },
        edit: {
            visible: false,
            playlist: null
        },
        playlists: []
    },
    actions: {
        create({ rootGetters, commit }, data) {
            const user = rootGetters["user/profile"];

            console.log(data);

            return new Promise((resolve, reject) => {
                axios
                    .post(uris.playlists.create(user.id), data)
                    .then(response => {
                        commit("ADD_PLAYLIST", response.data);
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        retrieve({ commit }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(uris.playlists.retrieve)
                    .then(response => {
                        const playlists = response.data.items;
                        commit("SET_PLAYLISTS", playlists);
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        route({ commit }, { mode, visible, data }) {
            if (mode === "edit" && data) {
                commit("SET_EDIT_PLAYLIST", data);
            }
            commit("TOGGLE_VISIBILITY", { mode: mode, visible: visible });
        }
    },
    mutations: {
        SET_PLAYLISTS(state, playlists) {
            console.log(playlists);
            state.playlists = playlists;
        },
        ADD_PLAYLIST(state, playlist) {
            state.playlists.push(playlist);
        },
        REMOVE_PLAYLIST(state, id) {
            state.playlists = state.playlists.filter(
                playlist => playlist.id === id
            );
        },
        TOGGLE_VISIBILITY(state, { mode, visible }) {
            if (typeof visible === "boolean") {
                state[mode].visible = visible;
                return;
            }
            state[mode].visible = !state[mode].visible;
        },
        SET_EDIT_PLAYLIST(state, data) {
            state.edit.playlist = data;
        }
    },
    getters: {
        playlists: state => state.playlists,
        isCreateVisible: state => state.create.visible,
        isEditVisible: state => state.edit.visible,
        editPlaylist: state => state.edit.playlist
    }
};

import axios from "axios";
import { uris } from "@/constants";
import { removeLocalData } from "@/helpers/auth";

export const actions = {
    getProfile({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(uris.users.me)
                .then(response => {
                    commit("SET_PROFILE", response.data);
                    commit("SET_INITIALIZED", true);
                    resolve(response);
                })
                .catch(error => {
                    removeLocalData();
                    window.location.reload();
                    reject(error);
                });
        });
    },
    setInitialized({ commit }, status) {
        commit("SET_INITIALIZED", status);
    }
};

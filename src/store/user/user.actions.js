import axios from "axios";
import { uris } from "@/constants";

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
                    console.log("Token Expired");
                    localStorage.removeItem("@spotify:access_token");
                    window.location.reload();
                    reject(error);
                });
        });
    },
    setInitialized({ commit }, status) {
        commit("SET_INITIALIZED", status);
    }
};

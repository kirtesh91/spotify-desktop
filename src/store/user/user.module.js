import { actions } from "@/store/user/user.actions";
import { mutations } from "@/store/user/user.mutations";
import { getters } from "@/store/user/user.getters";

export default {
    namespaced: true,
    state: {
        profile: null,
        isLoggedIn: false,
        initialized: false
    },
    mutations: mutations,
    getters: getters,
    actions: actions
};

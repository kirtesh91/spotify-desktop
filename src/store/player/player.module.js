import { actions } from "@/store/player/player.actions";
import { mutations } from "@/store/player/player.mutations";
import { getters } from "@/store/player/player.getters";
import { state } from "@/store/player/player.state";

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
};

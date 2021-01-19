import { createStore } from "vuex";
import axios from "axios";

import AuthModule from "./auth/auth.module";
import UserModule from "./user/user.module";
import PlayerModule from "./player/player.module";
import PlaylistModule from "./playlist.module";

axios.defaults.baseURL = `${process.env.VUE_APP_API_SERVER}`;

export default createStore({
    modules: {
        auth: AuthModule,
        user: UserModule,
        player: PlayerModule,
        playlist: PlaylistModule
    }
});

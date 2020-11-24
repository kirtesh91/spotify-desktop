import { createStore } from "vuex";
import axios from "axios";

import AuthModule from "./auth/auth.module";

axios.defaults.baseURL = `${process.env.VUE_APP_SERVER}api/`;

export default createStore({
    modules: {
        auth: AuthModule
    }
});

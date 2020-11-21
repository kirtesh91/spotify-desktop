import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { mixins } from "@/global/mixins";

//import { setupComponents } from "@/components";

import Icon from "@/components/Icon";

import "@/assets/scss/app.scss";

const app = createApp(App)
    .use(store)
    .use(router)
    .mixin(mixins);

app.component("Icon", Icon);

app.mount("#app");

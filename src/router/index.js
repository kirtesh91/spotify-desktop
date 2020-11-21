import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Authentication from "@/views/Authentication";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Authentication
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;

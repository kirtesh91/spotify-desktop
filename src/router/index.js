import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Authentication from "@/views/Authentication";
import Search from "@/views/Search";
import Album from "@/views/Album";
import Artist from "@/views/Artist";
import Playlist from "@/views/Playlist";
import { middleware } from "@/router/middleware";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Authentication,
        meta: {
            middleware: {
                guest: true
            }
        }
    },
    {
        path: "/search",
        name: "search",
        component: Search
    },
    {
        path: "/album/:id",
        name: "album",
        component: Album
    },
    {
        path: "/artist/:id",
        name: "artist",
        component: Artist
    },
    {
        path: "/playlist/:id",
        name: "playlist",
        component: Playlist
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(middleware);

export default router;

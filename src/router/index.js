import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Authentication from "@/views/Authentication";
import Search from "@/views/Search";
import Album from "@/views/Album";
import Artist from "@/views/Artist";
import Playlist from "@/views/Playlist";

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

export default router;

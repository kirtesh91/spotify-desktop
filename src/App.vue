<template>
    <router-view v-if="$route.name === 'login'" />
    <div v-else>
        <sidebar></sidebar>
        <navigation></navigation>
        <main class="wrapper">
            <router-view />
        </main>
        <songbar></songbar>
    </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import Songbar from "@/components/Songbar";

export default {
    components: { Sidebar, Navigation, Songbar }
};
</script>

<style lang="scss">
.wrapper {
    height: calc(100vh - #{map-get($components, songbar-height)});
    overflow-y: auto;
    color: #ffffff;
    padding: calc(
            #{map-get($sizing, sm)} + #{map-get($components, topbar-height)}
        )
        map-get($sizing, lg) map-get($sizing, sm) map-get($sizing, lg);
    margin: 0 0 map-get($components, songbar-height)
        map-get($components, sidebar-width);
}

@media (max-width: 1024px) {
    .wrapper {
        padding: map-get($sizing, sm) map-get($sizing, sm);
    }
}
</style>

<template>
    <nav class="sidebar">
        <div class="brand">
            <img src="/images/core/logo.svg" :alt="WEB.name" />
        </div>
        <div class="navigation">
            <div class="nav-item">
                <icon name="home" :size="24"></icon>
                <span>Home</span>
            </div>
            <div class="nav-item">
                <icon name="search" :size="24"></icon>
                <span>Search</span>
            </div>
            <div class="nav-item">
                <icon name="disc" :size="24"></icon>
                <span>Your Library</span>
            </div>
        </div>
        <div class="navigation playlists">
            <div class="header"><span>Playlists</span></div>
            <div class="item-group">
                <div class="nav-item playlist-item">
                    <div class="item-icon add-icon">
                        <icon dark name="plus" :size="18"></icon>
                    </div>
                    <span>Create Playlist</span>
                </div>
                <div class="nav-item playlist-item">
                    <div class="item-icon like-icon">
                        <icon name="heart" :size="18"></icon>
                    </div>
                    <span>Liked Songs</span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Sidebar"
};
</script>

<style lang="scss" scoped>
nav.sidebar {
    @include fixed(top 0 left 0 bottom 0);
    width: map-get($components, "sidebar-width");
    background-color: #040404;
    color: #b3b3b3;

    .brand {
        padding: map-get($sizing, "base");

        img {
            height: 40px;
            filter: grayscale(1) brightness(500%);
        }
    }

    .navigation {
        padding: 0 map-get($sizing, "xs");

        .nav-item {
            cursor: pointer;
            @include flex(flex-start);
            padding: map-get($sizing, "xs") map-get($sizing, "sm");
            @include font-size(14px);

            span {
                margin-left: map-get($sizing, "sm");
            }
        }
    }

    .playlists {
        margin-top: map-get($sizing, "base");

        .header {
            padding: 0 map-get($sizing, "sm") map-get($sizing, "sm")
                map-get($sizing, "sm");
            text-transform: uppercase;
            letter-spacing: 1px;
            @include font-size(12px);
        }

        .item-icon {
            @include dimension(32px);
            background-color: white;
            border-radius: 1px;
            @include flex();
            opacity: 0.8;
            @include transition();

            &.like-icon {
                background: linear-gradient(135deg, #ed1d39, #ed1d85);
            }
        }

        .nav-item {
            &:hover {
                .item-icon {
                    opacity: 1;
                }
            }
        }
    }
}
</style>

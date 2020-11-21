module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/scss/abstract/_variables.scss";
                              @import "@/assets/scss/abstract/_mixins.scss";`
            }
        }
    }
};

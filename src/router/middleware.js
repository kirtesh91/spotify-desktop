import store from "@/store";

export const middleware = (to, from, next) => {
    if (to.matched.some(record => record.meta.guest)) {
        if (store.getters["user/authorized"]) {
            return next({ name: "home" });
        }
        return next();
    }

    if (!store.getters["user/authorized"]) {
        return next({
            name: "login"
        });
    }

    return next();
};

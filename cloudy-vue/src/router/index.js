"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const HomeView_vue_1 = require("../views/HomeView.vue");
const router = vue_router_1.createRouter({
    history: vue_router_1.createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView_vue_1.default,
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => Promise.resolve().then(() => require("../views/AboutView.vue")),
        },
    ],
});
exports.default = router;
//# sourceMappingURL=index.js.map
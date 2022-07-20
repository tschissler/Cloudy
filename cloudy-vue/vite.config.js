"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_url_1 = require("node:url");
const vite_1 = require("vite");
const plugin_vue_1 = require("@vitejs/plugin-vue");
const plugin_vue_jsx_1 = require("@vitejs/plugin-vue-jsx");
// https://vitejs.dev/config/
exports.default = vite_1.defineConfig({
    plugins: [plugin_vue_1.default(), plugin_vue_jsx_1.default()],
    resolve: {
        alias: {
            "@": node_url_1.fileURLToPath(new node_url_1.URL("./src", import.meta.url)),
        },
    },
});
//# sourceMappingURL=vite.config.js.map
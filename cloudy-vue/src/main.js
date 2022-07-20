"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("../App.vue");
const router_1 = require("./router");
require("./assets/main.css");
const app = vue_1.createApp(App_vue_1.default);
app.use(router_1.default);
app.mount("#app");
//# sourceMappingURL=main.js.map
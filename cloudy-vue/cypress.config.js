"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cypress_1 = require("cypress");
exports.default = cypress_1.defineConfig({
    e2e: {
        specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
        baseUrl: "http://localhost:4173",
    },
});
//# sourceMappingURL=cypress.config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const test_utils_1 = require("@vue/test-utils");
const HelloWorld_vue_1 = require("../HelloWorld.vue");
vitest_1.describe("HelloWorld", () => {
    vitest_1.it("renders properly", () => {
        const wrapper = test_utils_1.mount(HelloWorld_vue_1.default, { props: { msg: "Hello Vitest" } });
        vitest_1.expect(wrapper.text()).toContain("Hello Vitest");
    });
});
//# sourceMappingURL=HelloWorld.spec.js.map
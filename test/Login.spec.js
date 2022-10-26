import { mount } from "@vue/test-utils";
import Login from "@/components/Login.vue";

describe("Login", () => {
  // Inspect the raw component options
  it("has data", () => {
    expect(typeof Login.data).toBe("function");
  });
});

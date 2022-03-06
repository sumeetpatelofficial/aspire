import { shallowMount } from "@vue/test-utils";
import MainContentArea from "@/components/MainContentArea.vue";

describe("MainContentArea.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(MainContentArea, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

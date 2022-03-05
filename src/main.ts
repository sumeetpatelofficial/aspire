import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//bootstrap-vue
import { BootstrapVue } from "bootstrap-vue";
//common SCSS
import "./assets/scss/app.scss";
Vue.use(BootstrapVue);

//vue-screen to obtain screen-size
import VueScreen from "vue-screen";
Vue.use(VueScreen, "bootstrap");

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

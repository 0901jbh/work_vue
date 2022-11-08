import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App), //App 대상으로 돔트리 만드는 render
}).$mount("#app"); //강제 마운트

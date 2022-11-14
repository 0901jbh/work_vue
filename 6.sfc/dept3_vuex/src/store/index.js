import Vue from "vue";
import Vuex from "vuex";
import Constant from "@/common/Constant.js";
import restApi from "@/util/http-common.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    depts: [],
  },
  getters: {},
  mutations: {
    [Constant.SET_DEPTS](state, payload) {
      state.depts = payload;
    },
  },
  actions: {
    [Constant.GET_DEPTS](context) {
      restApi("/api/depts").then(({ data }) => {
        // this.depts = data;
        // console.log(data);
        context.commit(Constant.SET_DEPTS, data);
      });
    },

    [Constant.REGIST_DEPT](dept) {
      restApi
      .post(`/api/depts`, {
        ...dept,
      })
      .then((res) => {
        if (res.status == 201) {
          // this.$emit("regist", true);
          this.$router.push("/dept");
        }
      });


    },


  },
  // modules: {},
});

import Vue from "vue";
import Vuex from "vuex";
import Constant from "@/common/Constant.js";
import restApi from "@/util/http-common.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    depts: [],
    dept: {},
  },

  getters: {
    depts(state) {
      return state.depts;
      //return state.depts.filter((item) => item.deptno > 70);
    },
  },

  mutations: {                                            
    [Constant.SET_DEPTS](state, payload) {
      state.depts = payload;
    },
    [Constant.SET_DEPT](state, payload) {
      state.dept = payload;
    },
  },
  actions: {
    [Constant.GET_DEPTS](context) {
      restApi.get("/api/depts").then(({ data }) => {
        // commit
        context.commit(Constant.SET_DEPTS, data);
      });
    },
    [Constant.REGISTER_DEPT](context, payload) {
      return restApi
        .post(`/api/depts`, payload)
        .then(() => console.log(`store action ${Constant.REGISTER_DEPT}`));
    },
    [Constant.GET_DEPT](context, deptno) {
      console.log(deptno);
      return restApi.get(`/api/depts/${deptno}/emps`).then(({ data }) => {
        console.log(data);
        context.commit(Constant.SET_DEPT, data);
      });
    },

    [Constant.MODIFY_DEPT](context, dept) {
      return restApi.put(`/api/depts/${dept.deptno}`, dept).then(() => {
        console.log(`modifyDept success`);
      });
    },
    [Constant.REMOVE_DEPT](context, dept) {
      return restApi.delete(`/api/depts/${dept.deptno}`).then(() => {
        console.log(`removeDept index  success`);
      });
    },
  },
});

<template>
  <div class="container">
    <div class="row mt-3">
      <h2 class="bg-info text-light text-center">부서 목록</h2>
    </div>
    <div class="row">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>순번</th>
            <th>부서번호</th>
            <th>부서이름</th>
            <th>부서지역</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="depts.length == 0">
            <td class="text-center" colspan="4">등록된 부서정보가 없습니다.</td>
          </tr>
          <template v-else>
            <tr v-for="(dept, index) in depts" :key="dept.deptno" @click="sendData(dept.deptno)">
              <td>{{ index + 1 }}</td>
              <td>{{ dept.deptno }}</td>
              <td>
                <a>{{ dept.dname }}</a>
              </td>
              <td>{{ dept.loc }}</td>
            </tr>
          </template>
          <input class="btn btn-primary" type="button" value="등록" @click="changeForm" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import restApi from "@/util/http-common";
import Constant from "@/common/Constant";
export default {
  props: {
    flag: {
      type: Boolean,
      required: false,
    },
  },
  // data() {
  //   return {
  //     depts: [],
  //   };
  // },
  computed: {
    depts() {
      return this.$store.state.depts;
    },
  },
  methods: {
    getDepts() {
      // axios("https://jsonplaceholder.typicode.com/users").then((response) => {
      //   // 익명 함수면? this는 window가 된다.
      //   this.users = response.data;
      // });
      // 구조 분해 할당을 쓰면 원하는 데이터만 가져올 수 있다.
      // axios("http://localhost:8080/api/depts").then(({ data }) => {
      //   this.depts = data;
      // });
      // restApi("/api/depts").then(({ data }) => {
      //   this.depts = data;
      // });

      //Store's Action을 호출해야함.
      this.$store.dispatch(Constant.GET_DEPTS);
    },
    sendData(no) {
      // this.$emit("deptSelect", no);
      this.$router.push(`/dept/detail/${no}`);
    },

    changeForm() {
      this.$router.push("/dept/regForm");
    },
  },
  created() {
    this.getDepts();
  },

  watch: {
    flag() {
      this.getDepts();
    },
    $route(to) {
      console.log("DeptList watch route...");
      // this.getDepts();
      if (to.path == "/dept") {
        this.getDepts();
      }
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="container" id="app">
    <div class="row mt-3">
      <h2 class="bg-primary text-light text-center">사원 목록</h2>
    </div>
    <div class="row mt-3">
      <form class="text-center">
        <input type="text" name="ename" value="" />
        <input type="text" name="job" value="" />
        <input type="submit" value="검색" />
      </form>
    </div>
    <div class="row">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>번호</th>
            <th>사원번호</th>
            <th>사원이름</th>
            <th>직무</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="empList.length == 0">
            <tr>
              <td colspan="4">등록된 사원정보가 없습니다.</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(emp, index) in empList" :key="emp.empno" @click="pickEmp(emp.empno)">
              <td>{{ index + 1 }}</td>
              <td>{{ emp.empno }}</td>
              <td>{{ emp.ename }}</td>
              <td>{{ emp.job }}</td>
            </tr>
          </template>
          <input class="btn btn-primary" type="button" value="등록" @click="changeForm" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import restApi from "@/util/http-common.js";

export default {
  props: {
    flag: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      empList: [],
    };
  },
  methods: {
    getEmps() {
      console.log("getEmps()..");
      restApi
        .get("/api/emps")
        //.then((response) => (this.deptList = response.data));
        .then(({ data }) => (this.empList = data));
    },
    pickEmp(empno) {
      this.$router.push(`/emp/detail/${empno}`);
    },
    changeForm() {
      this.$router.push("/emp/regForm");
    },
  },
  created() {
    console.log("emp created..");
    this.getEmps();
  },

  watch: {
    flag() {
      this.getEmps();
    },
    $route(to) {
      console.log("EmpList route");
      if (to.path == "/emp") {
        console.log("get Emps...");
        this.getEmps();
      }
    },
  },
};
</script>

<style scoped></style>

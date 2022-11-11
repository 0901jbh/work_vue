<template>
  <div class="container">
    <div class="row mt-3">
      <h2 class="bg-secondary text-light text-center">사원 등록</h2>
    </div>
    <table class="table">
      <tbody>
        <tr>
          <th>
            <label for="empno">사원번호</label>
          </th>
          <td>
            <input type="text" name="empno" id="empno" v-model="emp.empno" />
          </td>
        </tr>
        <tr>
          <th><label for="ename">부서이름</label></th>
          <td><input type="text" name="ename" id="ename" v-model="emp.ename" /></td>
        </tr>
        <tr>
          <th><label for="job">지역</label></th>
          <td><input type="text" name="job" id="job" v-model="emp.job" /></td>
        </tr>
        <tr>
          <th><label for="sal">연봉</label></th>
          <td><input type="text" name="sal" id="sal" v-model="emp.sal" /></td>
        </tr>
        <tr>
          <th><label for="deptno">부서번호</label></th>
          <td><input type="text" name="deptno" id="deptno" v-model="emp.deptno" /></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            <input type="button" value="등록" @click="registEmp(emp)" />
            <input type="reset" value="취소" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import restApi from "@/util/http-common.js";

export default {
  data() {
    return {
      emp: {},
    };
  },
  methods: {
    registEmp(emp) {
      restApi
        .post(`/api/emps`, {
          ...emp,
        })
        .then(() => {
          this.$router.push("/emp");
        });
    },
  },
  created() {},
};
</script>

<style scoped></style>

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
          <th><label for="ename">사원이름</label></th>
          <td><input type="text" name="ename" id="ename" v-model="emp.ename" /></td>
        </tr>
        <tr>
          <th><label for="job">직무</label></th>
          <td><input type="text" name="job" id="job" v-model="emp.job" /></td>
        </tr>
        <tr>
          <th><label for="sal">월 급여</label></th>
          <td><input type="number" name="sal" id="sal" v-model="emp.sal" /></td>
        </tr>
        <tr>
          <th><label for="deptno">소속 부서</label></th>
          <td>
            <select id="deptno" name="deptno" v-model="emp.deptno"></select>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            <input type="button" value="등록" @click="registEmp" />
            <input type="reset" value="취소" @click="closeForm" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import restApi from "@/util/http-common";
export default {
  data() {
    return {
      emp: {},
    };
  },
  methods: {
    getDeptInfo() {
      restApi.get(`/api/depts`).then(({ data }) => {
        console.log(data);
        let selectDOM = document.querySelector("#deptno");
        let opt = "";
        for (let dept of data) {
          opt += `<option value=` + dept.deptno + `>` + dept.dname + `</option>`;
        }
        selectDOM.innerHTML = opt;
      });
    },

    registEmp() {
      restApi.post(`/api/emps`, this.emp).then((res) => {
        console.log(res);
        if (res.status == 201) {
          this.$router.push("/emp");
        }
      });
    },
    closeForm() {
      this.$router.push("/emp");
    },
  },
  created() {
    this.getDeptInfo();
  },
};
</script>

<style scoped></style>

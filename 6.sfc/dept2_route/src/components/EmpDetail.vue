<template>
  <div class="container" id="app">
    <div class="row mt-3">
      <h2 class="bg-primary text-light text-center">부서 조회 with emp</h2>
    </div>

    <table class="table">
      <tbody>
        <tr>
          <th><label for="empno">사원번호</label></th>
          <td><input type="text" id="empno" name="empno" v-model.lazy="emp.empno" /></td>
        </tr>
        <tr>
          <th><label for="ename">사원이름</label></th>
          <td><input type="text" id="ename" name="ename" v-model.lazy="emp.ename" /></td>
        </tr>
        <tr>
          <th><label for="job">직무</label></th>
          <td><input type="text" id="job" name="job" v-model.lazy="emp.job" /></td>
        </tr>
        <tr>
          <th><label for="sal">연봉</label></th>
          <td><input type="text" id="sal" name="sal" v-model.lazy="emp.sal" /></td>
        </tr>
        <tr>
          <th><label for="deptno">부서번호</label></th>
          <td><input type="text" id="deptno" name="deptno" v-model.lazy="emp.deptno" /></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            <input type="submit" value="수정" @click="modifyEmp(emp)" />
            <input type="submit" value="삭제" @click="removeEmp" />
            <input type="reset" value="취소" />
          </td>
        </tr>
      </tfoot>
    </table>

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>사원번호</th>
          <th>사원이름</th>
          <th>직무</th>
          <th>월급여</th>
          <th></th>
        </tr>
      </thead>
      <template v-if="emp.dept != null && emp.dept.length > 0">
        <tbody>
          <td>{{ dept.deptno }}</td>
          <td>{{ dept.dname }}</td>
          <td>{{ dept.loc }}</td>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="5">
              <input
                type="submit"
                value="삭제"
                @click="removeEmp"
                :disabled="checkedemp.length == 0"
              />
              <input type="reset" value="취소" />
            </td>
          </tr>
        </tfoot>
      </template>
      <template v-else>
        <tbody>
          <tr>
            <td colspan="5">배치된 사원이 없습니다.</td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script>
import restApi from "@/util/http-common.js";
export default {
  props: ["empno"],

  data() {
    return {
      dept: {},
      dep: {},
      flag: true,
      checkedemp: [],
      emp: {},
    };
  },
  methods: {
    getDeptWithEmp() {
      console.log("get emp detail..");
      //let params = new URLSearchParams(window.location.search);

      restApi.get(`/api/emps/${this.empno}`).then((response) => (this.emp = response.data));
    },

    modifyEmp(emp) {
      restApi
        .put(`/api/emps/${this.empno}`, {
          ...emp,
        })
        .then((response) => {
          this.emp = response.data;
          if (response.status == 200) this.$emit("modify-emp");
        });
    },
    removeEmp() {
      //매개변수 받아서 해야댐

      restApi.delete(`/api/emps/${this.emp.empno}`).then(() => {
        this.$router.push("/emp");
      });
    },
  },
  created() {
    this.getDeptWithEmp();
  },

  watch: {
    deptno() {
      this.getDeptWithEmp();
    },
  },
};
</script>

<style scoped></style>

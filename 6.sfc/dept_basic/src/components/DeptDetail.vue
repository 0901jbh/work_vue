<template>
  <div class="container" id="app">
    <div class="row mt-3">
      <h2 class="bg-primary text-light text-center">{{ deptno }}부서 조회 with emps</h2>
    </div>

    <table class="table">
      <tbody>
        <tr>
          <th><label for="deptno">부서번호</label></th>
          <td>{{ dept.deptno }}</td>
        </tr>
        <tr>
          <th><label for="dname">부서이름</label></th>
          <td><input type="text" id="dname" name="dname" v-model.lazy="dept.dname" /></td>
        </tr>
        <tr>
          <th><label for="loc">지역</label></th>
          <td><input type="text" id="loc" name="loc" v-model.lazy="dept.loc" /></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            <input type="submit" @click="modifyDept" />
            <input
              type="submit"
              value="삭제"
              @click="removeDept"
              :disabled="dept.emps.length > 0"
            />
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
      <template v-if="dept.emps != null && dept.emps.length > 0">
        <tbody>
          <tr v-for="emp in dept.emps" :key="emp.empno">
            <td>{{ emp.empno }}</td>
            <td>{{ emp.ename }}</td>
            <td>{{ emp.job }}</td>
            <td>{{ emp.sal }}</td>
            <td><input type="checkbox" name="empno" :value="emp.empno" v-model="checkedemp" /></td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="5">
              <input
                type="submit"
                value="삭제"
                @click="removeEmps"
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
import axios from "axios";
export default {
  props: {
    deptno: {
      type: Number,
      required: false,
      default: 10,
    },
  },

  data() {
    return {
      dept: {},
      dep: {},
      flag: true,
      checkedemp: [],
    };
  },
  methods: {
    getEmpDepts() {
      //let params = new URLSearchParams(window.location.search);

      axios
        .get(`http://localhost:8080/api/depts/${this.deptno}/emps`)
        //.get(`http://localhost:8080/api/depts/${params.get("deptno")}/emps`)
        .then((response) => (this.dept = response.data));
    },

    modifyDept() {
      axios
        .put(`http://localhost:8080/api/depts/${this.deptno}`, {
          ...this.dept,
        })

        .then((response) => {
          this.dept = response.data;
          if (response.status == 200) this.$emit("modify-dept");
        });
    },
    removeDept() {
      //매개변수 받아서 해야댐

      axios.delete(`http://localhost:8080/api/depts/${this.dept.deptno}`).then((response) => {
        if (response.status == 204) this.$emit("modify-dept");
      });
    },

    removeEmps() {
      axios
        .delete(`http://localhost:8080/api/emps/delete`, {
          data: this.checkedemp,
        })
        .then((response) => {
          if (response.status == 200) this.getEmpDepts();
        });
    },
  },
  created() {
    this.getEmpDepts();
  },

  watch: {
    deptno() {
      this.getEmpDepts();
    },
  },
};
</script>

<style scoped></style>

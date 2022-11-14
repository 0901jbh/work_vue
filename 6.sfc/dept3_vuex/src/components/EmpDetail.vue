<template>
  <div class="container">
    <h2>사원 정보 with dept</h2>
    <div>
      <b-form>
        <b-form-group
          id="emp-group-1"
          label="사원번호"
          label-for="emp-input-1"
          description="사원번호는 수정이 불가능합니다."
        >
          <b-form-input id="emp-input-1" v-model="emp.empno" readonly></b-form-input>
        </b-form-group>
        <b-form-group id="emp-group-2" label="사원이름" label-for="emp-input-2">
          <b-form-input id="emp-input-2" v-model="emp.ename"></b-form-input>
        </b-form-group>
        <b-form-group id="emp-group-3" label="담당직무" label-for="emp-input-3">
          <b-form-input id="emp-input-3" v-model="emp.job"></b-form-input>
        </b-form-group>
        <b-form-group id="emp-group-4" label="월 급여" label-for="emp-input-4">
          <b-form-input id="emp-input-4" v-model="emp.sal"></b-form-input>
        </b-form-group>

        <b-btn class="mr-2" variant="success" @click="editEmp" :disabled="dept.length == 0">수정</b-btn>
        <b-btn class="mr-2" variant="danger" @click="deleteEmp">삭제</b-btn>
        <b-btn variant="warning" @click="closeDetail">취소</b-btn>
      </b-form>
      <b-table class="mt-2" :items="dept" :fields="fields"></b-table>
      <b-btn class="mr-2" variant="info" @click="standByDept" :disabled="dept.length == 0">대기발령</b-btn>
    </div>
  </div>
</template>

<script>
import restApi from "@/util/http-common";
export default {
  data() {
    return {
      emp: {},
      dept: [],
      fields: [
        {
          key: "deptno",
          label: "부서번호",
        },
        {
          key: "dname",
          label: "부서명",
        },
        {
          key: "loc",
          label: "지역",
        },
      ],
    };
  },
  methods: {
    getEmpDetail(empno) {
      restApi.get(`/api/emps/${empno}`).then((res) => {
        console.log(res);
        this.emp = res.data;
        this.dept = this.emp?.dept ? [this.emp.dept] : [];
      });
    },

    editEmp() {
      restApi.put(`/api/emps/${this.emp.empno}`, this.emp).then((res) => {
        if (res.status == 200) {
          this.$emit("edited");
        }
      });
    },

    deleteEmp() {
      restApi
        .delete(`/api/emps`, {
          data: [this.emp.empno],
        })
        .then((res) => {
          if (res.status == 204) {
            this.$router.push("/emp");
          }
        });
    },

    closeDetail() {
      this.$router.push("/emp");
    },

    standByDept() {
      restApi.delete(`/api/emps/${this.emp.empno}/dept`).then((res) => {
        if (res.status == 204) {
          this.getEmpDetail(this.emp.empno);
        }
      });
    },
  },
  created() {
    this.getEmpDetail(this.$route.params.empno);
  },
  watch: {
    "$route.params.empno"(value) {
      this.getEmpDetail(value);
    },
  },
};
</script>

<style scoped></style>

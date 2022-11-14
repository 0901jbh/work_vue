<template>
  <div>
    <b-table striped hover :items="emps" :fields="fields" @row-clicked="openDetail"></b-table>
    <b-btn variant="primary" @click="openRegist">신규 사원 등록</b-btn>
  </div>
</template>

<script>
import restApi from "@/util/http-common";
export default {
  data() {
    return {
      fields: [
        {
          key: "empno",
          label: "사원번호",
          sortable: true,
        },
        {
          key: "ename",
          label: "사원이름",
          sortable: true,
        },
        {
          key: "deptno",
          label: "소속부서",
          sortable: true,
          variant: "warning",
        },
      ],
      emps: [],
    };
  },

  props: {
    refresh: {
      type: Boolean,
    },
  },
  methods: {
    getEmps() {
      restApi.get("/api/emps").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.emps = res.data;
        }
      });
    },

    openDetail(item) {
      console.log(item.empno);
      this.$router.push(`/emp/detail/${item.empno}`);
    },

    openRegist() {
      this.$router.push(`/emp/regForm`);
    },
  },

  created() {
    this.getEmps();
  },

  watch: {
    refresh() {
      this.getEmps();
    },
    $route(to) {
      console.log("EmpList watch route...");
      // this.getDepts();
      if (to.path == "/emp") {
        this.getEmps();
      }
    },
  },
};
</script>

<style scoped></style>

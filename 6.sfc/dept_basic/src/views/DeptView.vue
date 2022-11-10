<template>
  <div class="container">
    <h1>부서 관리</h1>
    <dept-list @select-dept="receiveDept" :flag="reload"></dept-list>
    <dept-detail v-show="deptno != 0" :deptno="deptno" @modify-dept="modifyDept"> </dept-detail>
  </div>
</template>

<script>
import DeptList from "@/components/DeptList.vue";
import DeptDetail from "@/components/DeptDetail.vue";
export default {
  data() {
    return {
      deptno: 0,
      reload: true,
      empreload: true,
    };
  },
  components: {
    DeptList,
    DeptDetail,
  },
  methods: {
    receiveDept(deptno) {
      this.deptno = deptno;
    },

    modifyDept() {
      this.reload = !this.reload;
      this.deptno = 0;
    },
  },
};
</script>

<style scoped></style>

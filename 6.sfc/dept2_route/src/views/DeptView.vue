<template>
  <div class="container">
    <h1>부서 관리</h1>
    <dept-list :flag="reload"></dept-list>
    <router-view @modify-dept="refreshData"></router-view>
    <!-- <dept-detail v-show="deptno != 0" :deptno="deptno" @modify-dept="modifyDept"> </dept-detail>
    <dept-form v-show="mode == 'register'" @change-data="refreshData"></dept-form>


    -->
  </div>
</template>

<script>
import DeptList from "@/components/DeptList.vue";
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
  },
  methods: {
    refreshData() {
      this.refresh = new Date().getTime();
      console.log(`refresh reset`);
    },
    modifyDept() {
      this.reload = !this.reload;
      this.deptno = 0;
    },
  },
};
</script>

<style scoped></style>

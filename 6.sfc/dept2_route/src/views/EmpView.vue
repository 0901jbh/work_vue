<template>
  <div class="container" id="empView">
    <h1>사원 관리</h1>
    <emp-list :flag="reload"></emp-list>
    <router-view @modify-emp="modifyEmp"></router-view>
  </div>
</template>

<script>
import EmpList from "@/components/EmpList.vue";

export default {
  data() {
    return {
      reload: true,
    };
  },
  components: {
    EmpList,
  },
  methods: {
    modifyEmp() {
      this.reload = !this.reload;
    },
  },
};
</script>

<style scoped></style>

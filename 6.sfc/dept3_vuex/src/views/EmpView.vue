<template>
  <div class="container" id="empView">
    <h1>사원 관리</h1>
    <emp-list :refresh="refresh"></emp-list>
    <router-view @edited="edited" />
  </div>
</template>

<script>
import EmpList from "@/components/EmpList";
export default {
  data() {
    return {
      refresh: false,
    };
  },
  components: {
    EmpList,
  },
  methods: {
    edited() {
      this.refresh = !this.refresh;
    },
  },
};
</script>

<style scoped></style>

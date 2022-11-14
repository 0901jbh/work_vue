<template>
  <div class="container" id="deptView">
    <h1 class="text-center">부서 관리</h1>
    <dept-list :flag="refresh"></dept-list>
    <router-view @edit="reload"></router-view>
    <!-- <button class="btn btn-primary" v-show="isclose" @click="isrecord = !isrecord">등록</button>
    <dept-register v-show="isrecord" @regist="regist"></dept-register>
    <dept-detail @edit="reload" @remove="close" v-show="isclose != true" :dno="no"></dept-detail> -->
  </div>
</template>

<script>
import DeptList from "@/components/DeptList.vue";

export default {
  data() {
    return {
      no: 0,
      refresh: false,
      isclose: true,
      isrecord: false,
    };
  },
  components: {
    DeptList,
  },
  methods: {
    reload() {
      this.refresh = !this.refresh;
    },
    close(flag) {
      if (flag) {
        this.isclose = true;
        this.refresh = !this.refresh;
      }
    },
    regist(flag) {
      if (flag) {
        this.isrecord = false;
        this.reload(true);
      }
    },
  },
};
</script>

<style scoped></style>

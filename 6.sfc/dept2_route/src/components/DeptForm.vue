<template>
  <div class="container">
    <div class="row mt-3">
      <h2 class="bg-secondary text-light text-center">부서 등록</h2>
    </div>
    <table class="table">
      <tbody>
        <tr>
          <th>
            <label for="deptno">부서번호</label>
          </th>
          <td>
            <input type="text" name="deptno" id="deptno" v-model="dept.deptno" />
          </td>
        </tr>
        <tr>
          <th><label for="dname">부서이름</label></th>
          <td><input type="text" name="dname" id="dname" v-model="dept.dname" /></td>
        </tr>
        <tr>
          <th><label for="loc">지역</label></th>
          <td><input type="text" name="loc" id="loc" v-model="dept.loc" /></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            <input type="button" value="등록" @click="registDept(dept)" />
            <input type="reset" value="취소" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import restApi from "@/util/http-common.js";

export default {
  data() {
    return {
      dept: {},
    };
  },
  methods: {
    registDept(dept) {
      restApi
        .post(`/api/depts`, {
          ...dept,
        })
        .then(() => {
          this.$router.push("/dept");
        });
    },
  },
  created() {},
};
</script>

<style scoped></style>

<template>
  <div class="container" id="app">
    <div class="row mt-3">
      <h2 class="bg-primary text-light text-center">부서 목록</h2>
    </div>
    <div class="row mt-3">
      <form class="text-center" method="post" action="${root}/dept/search.do">
        <input type="text" name="dname" placeholder="부서명을입력하세요" value="${param.dname}" />
        <input type="text" name="loc" placeholder="지역을 입력하세요" value="${param.loc}" />
        <input type="submit" value="검색" />
      </form>
    </div>
    <div class="row">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>번호</th>
            <th>부서번호</th>
            <th>부서이름</th>
            <th>부서지역</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="deptList.length == 0">
            <tr>
              <td colspan="4">등록된 부서정보가 없습니다.</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(dept, index) in deptList" :key="dept.deptno" @click="pickDept(dept.deptno)">
              <td>{{ index + 1 }}</td>
              <td>{{ dept.deptno }}</td>
              <!--<td><a :href="`./detail_form_emps.html?deptno=${dept.deptno}`"> {{dept.dname}}</a></td>-->
              <td>{{ dept.dname }}</td>
              <td>{{ dept.loc }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    flag: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      deptList: [],
    };
  },
  methods: {
    getDepts() {
      axios
        .get("http://localhost:8080/api/depts")
        //.then((response) => (this.deptList = response.data));
        .then(({ data }) => (this.deptList = data));
    },
    pickDept(deptno) {
      this.$emit("select-dept", deptno);
    },
  },
  created() {
    this.getDepts();
  },

  watch: {
    flag() {
      this.getDepts();
    },
  },
};
</script>

<style scoped></style>

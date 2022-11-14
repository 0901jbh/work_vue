<template>
  <div class="container">
    <div class="row mt-3">
      <h2 class="bg-warning text-light text-center">부서 조회 with emps</h2>
    </div>
    <table class="table">
      <tbody>
        <tr>
          <th>
            <label for="deptno">부서번호</label>
          </th>
          <td>
            <input type="text" name="deptno" id="deptno" v-model="dept.deptno" readonly="readonly" />
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
            <input class="btn btn-success" type="button" value="수정" @click="editDept(dept)" />
            <input
              class="btn btn-danger"
              type="button"
              value="삭제"
              @click="removeDept(dept.deptno)"
              :disabled="dept.emps != null && dept.emps.length > 0"
            />
            <input class="btn btn-dark" type="reset" value="취소" @click="clearDetail" />
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
      <template v-if="dept.emps != null && dept.emps.length == 0">
        <tbody>
          <tr>
            <td class="text-center" colspan="5">배치된 사원이 없습니다.</td>
          </tr>
        </tbody>
      </template>
      <template v-else>
        <tbody>
          <tr v-for="emp in dept.emps" :key="emp.empno">
            <td>{{ emp.empno }}</td>
            <td>{{ emp.ename }}</td>
            <td>{{ emp.job }}</td>
            <td>{{ emp.sal }}</td>
            <td><input type="checkbox" name="empno" :value="emp.empno" v-model="selected" /></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <input type="button" value="삭제" @click="removeEmps" :disabled="selected.length == 0" />
              <input type="button" value="취소" :disabled="selected.length == 0" @click="resetSelected" />
            </td>
          </tr>
        </tfoot>
      </template>
    </table>
  </div>
</template>

<script>
// import axios from "axios";
import restApi from "@/util/http-common";
export default {
  data() {
    return {
      dept: {},
      selected: [],
    };
  },
  props: {
    deptno: {
      type: String,
    },
  },
  methods: {
    getDeptWithEmps() {
      // axios(`http://localhost:8080/api/depts/${this.deptno}/emps`).then(({ data }) => {
      //   this.dept = data;
      // });
      restApi.get(`/api/depts/${this.deptno}/emps`).then(({ data }) => {
        this.dept = data;
      });
    },

    editDept(dept) {
      // axios
      //   .put(`http://localhost:8080/api/depts/${this.dept.deptno}`, {
      //     ...dept,
      //   })
      //   .then((res) => {
      //     if (res.status == 200) {
      //       this.$emit("edit");
      //       // this.$router.push(`/dept/detail/${this.dept.deptno}`);
      //     }
      //   });

      restApi
        .put(`/api/depts/${this.dept.deptno}`, {
          ...dept,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$emit("edit");
            // this.$router.push(`/dept/detail/${this.dept.deptno}`);
          }
        });
    },
    removeDept(deptno) {
      // axios.delete(`http://localhost:8080/api/depts/${deptno}`).then((res) => {
      //   if (res.status == 204) {
      //     // this.$emit("remove", true);
      //     this.$router.push("/dept");
      //   }
      // });
      restApi.delete(`/api/depts/${deptno}`).then((res) => {
        if (res.status == 204) {
          // this.$emit("remove", true);
          this.$router.push("/dept");
        }
      });
    },

    removeEmps() {
      // axios
      //   .delete(`http://localhost:8080/api/emps`, {
      //     data: this.selected,
      //   })
      //   .then((res) => {
      //     if (res.status == 204) {
      //       this.getDeptWithEmps();
      //       this.selected = [];
      //     }
      //   });
      restApi
        .delete(`/api/emps`, {
          data: this.selected,
        })
        .then((res) => {
          if (res.status == 204) {
            this.getDeptWithEmps();
            this.selected = [];
          }
        });
    },
    clearDetail() {
      this.$router.push("/dept");
    },
    resetSelected() {
      this.selected = [];
    },
  },
  // 컴포넌트가 새로 만들어질 때만 불린다.
  created() {
    // let url = new URL(window.location.href);
    // this.deptno = url.searchParams.get("dept");
    // this.deptno = this.$route.params.deptno;
    this.getDeptWithEmps();
  },

  // 경로가 바뀐건 update가 아니다.
  // beforeUpdate() {
  //   this.deptno = this.$route.params.deptno;
  //   this.getDeptWithEmps();
  // },

  watch: {
    deptno() {
      this.getDeptWithEmps();
    },
    // 라우트를 watch한다?
    // "$route.params.deptno"() {
    //   this.deptno = this.$route.params.deptno;
    //   this.getDeptWithEmps();
    // },
  },
};
</script>

<style scoped></style>

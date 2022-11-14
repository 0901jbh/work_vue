import Vue from "vue";
import VueRouter from "vue-router";
import DeptView from "@/views/DeptView";
import EmpView from "@/views/EmpView";
// this.$router, this.$route 접근 가능 (기본 설정)
Vue.use(VueRouter);

//주어진 경로에 매핑되는 화면으로 전환 : router
//주어진 경로에 매핑되는 화면 정보 : route
const routes = [
  {
    path: "/",
    redirect: "/dept",
  },

  {
    path: "/dept",
    name: "dept", // path 대신 별칭으로 쓰는 것
    component: DeptView,
    children: [
      {
        // children은 부모 하위에 만들어진다. /가 자동으로 붙는다.
        path: "regForm",
        component: () => import("@/components/DeptRegister"),
      },
      {
        // pathvariable 같은 느낌(동적 라우팅)
        path: "detail/:deptno", // this.$route.params.deptno로 뽑아낼 수 있음. -> props가 된다면?
        props: true,
        component: () => import("@/components/DeptDetail"),
      },
    ],
  },
  // 실제 라우팅 처리가 될 때 불러오는 방식
  {
    path: "/emp",
    name: "emp",
    component: EmpView,
    children: [
      {
        path: "regForm",
        component: () => import("@/components/EmpRegister"),
      },
      {
        path: "detail/:empno",
        component: () => import("@/components/EmpDetail"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history", // hashback mode #이 붙어서 사용자에게 불편을 줄 수 있다.
  base: process.env.BASE_URL,
  routes, // 라우트 정보 주기 (es6)
});

export default router;

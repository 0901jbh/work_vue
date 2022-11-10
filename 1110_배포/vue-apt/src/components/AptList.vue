/
<template>
  <div>
    <h2>아파트 목록</h2>
    <input type="number" v-model="lawdCd" />
    <input type="number" v-model="dealYmd" />
    <button @click="getAptList">아파트목록얻기</button>
    <table>
      <colgroup>
        <col style="width: 10%" />
        <col style="width: 30%" />
        <col style="width: 20%" />
        <col style="width: 10%" />
        <col style="width: 30%" />
      </colgroup>
      <tr>
        <td>일련번호</td>
        <td>아파트명</td>
        <td>법정동</td>
        <td>층</td>
        <td>매매가격</td>
      </tr>
      <tbody>
        <apt-list-item v-for="(apt, index) in apts" :key="index" :apt="apt"> </apt-list-item>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

import AptListItem from "@/components/AptListItem.vue";
export default {
  name: "AptList",
  components: {
    AptListItem,
  },
  data() {
    return {
      lawdCd: "11110",
      dealYmd: "202207",

      apts: [],
    };
  },
  created() {},

  methods: {
    getAptList() {
      //   const serviceKey =
      //     "HK5P4ia7XLz%2FF%2BuCJ%2FM3bUKiG53tN7OlqN6S6a8n6vxCrrQj%2FzdDFIQb%2BynWvDnyz%2BEieeqcv8lex6dHYGKfuw%3D%3D";
      //   const url = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&LAWD_CD=${this.lawdCd}&DEAL_YMD=${this.dealYmd}`;
      const url = `http://localhost:9999/vue/map/aptlist/${this.lawdCd}/${this.dealYmd}`;

      axios.get(url).then(({ data }) => {
        this.apts = data.response.body.items.item;
      });
    },
  },
};
</script>

<style scoped>
td {
  font-weight: bold;
  border-bottom: 2px solid rgb(244, 100, 100);
}
</style>

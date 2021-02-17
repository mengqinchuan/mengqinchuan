<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
          <v-col cols="12" md="7">
            <v-card dark>
              <v-card-title class="red darken-3">
                <v-row justify="space-around">
                  <v-col cols="5">
                    <h2>设备盘点情况表</h2>
                    查询日期 ：<input
                      type="date"
                      v-model="mydate"
                      style="color:white"
                      @change="shuxin"
                    />
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      max-width="50px"
                      v-model="search"
                      append-icon="search"
                      label="查找设备"
                      hide-details
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="pddata"
                item-key="设备号"
                :search="search"
                class="elevation-12"
                loading-text="暂无数据"
                light
                loading="pddata.length<1"
              >
                <template v-slot:item.盘点状态="{ item }">
                  <v-chip :color="getColor(item.盘点状态)" dark>{{
                    item.盘点状态 == 1 ? "已盘点" : "未盘点"
                  }}</v-chip>
                </template>
              </v-data-table>

              <v-card-title class="red darken-3">
                <h3>盘点进度</h3>
                <v-progress-linear :value="skill" color="black" height="25">
                  <template v-slot="{ value }">
                    <strong>{{ Math.round(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "pandianc",
  setup() {
    return {};
  },
  computed: {
    skill() {
      return (
        (this.pddata.filter(item => item.盘点状态 == 1).length /
          this.pddata.length) *
        100
      );
    }
  },
  data() {
    return {
      mydate: new Date().toISOString().substr(0, 10),
      selected: [],
      search: "",
      // skill:"",
      headers: [
        {
          text: "设备号",
          align: "start",
          value: "设备号"
        },
        { text: "设备名", value: "设备名" },
        { text: "盘点工位", value: "盘点工位" },
        { text: "盘点人", value: "盘点人" },
        { text: "盘点状态", value: "盘点状态" },
        { text: "盘点日期", value: "盘点日期" }
      ],
      pddata: []
    };
  },
  mounted() {
    this.axios({
      method: "POST",
      url: "http://192.168.113.24:80/api/epandian.php",
      data: {
        myrequest: "pdcxequip",
        myqx: sessionStorage.getItem("mylevel"),
        mygw: this.$store.state.mydata.myglgw,
        gh: sessionStorage.getItem("myid"),
        mydate: this.mydate
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(res => {
        this.pddata = res.data.pdsj;
      })
      .catch(error => {
        window.alert(error);
      });
  },
  methods: {
    getColor(zt) {
      if (zt == 0) return "red";
      else return "green";
    },
    shuxin() {
      this.axios({
        method: "POST",
        url: "http://192.168.113.24:80/api/epandian.php",
        data: {
          myrequest: "pdcxequip",
          myqx: sessionStorage.getItem("mylevel"),
          mygw: this.$store.state.mydata.myglgw,
          gh: sessionStorage.getItem("myid"),
          mydate: this.mydate
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(res => {
          this.pddata = res.data.pdsj;
        })
        .catch(error => {
          window.alert(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>

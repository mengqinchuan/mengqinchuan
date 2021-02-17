<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
          <v-col cols="12" md="10">
            <v-card dark>
              <v-card-title class="red darken-3 ">
                <v-row justify="space-around">
                  <v-col cols="5">
                    <h2>设备查询</h2>
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
                :items="equipment"
                item-key="name"
                :search="search"
                class="elevation-12 text-h4"
                loading-text="加载中请等待"
                light
              >
              </v-data-table>
              <v-card-actions class="dark red" height="100px">
                <v-row justify="end" align="center">
                  <v-col cols="2">
                    <exportxls
                      :head="fildhaers"
                      :data="equipment"
                      >
                      <!-- <v-btn
                        ><h2>
                          导出表格
                        </h2></v-btn
                      > -->
                    </exportxls> 
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import exportxls from '../components/exportxls.vue';
export default {
  components: { exportxls },
  name: "sbchaxun",
  setup() {
    return {};
  },
  data() {
    return {
      testdata:[
    [ "id",    "name", "value" ],
    [    1, "sheetjs",    7262 ],
    [    2, "js-xlsx",    6969 ]
  ],
      selected: [],
      search: "",
      headers: [
        {
          text: "设备号",
          align: "start",
          // sortable: false,
          value: "设备号"
        },
        { text: "设备名", value: "设备名" },
        { text: "型号", value: "型号" },
        { text: "下发时间", value: "下发时间" },
        { text: "工位", value: "所在工位" },
        { text: "产线", value: "产线" },
        { text: "数量", value: "数量" },
        { text: "当前状态", value: "当前状态" },
        { text: "最后调动人", value: "最后调动人" },
        { text: "最后调动日期", value: "最后调动日期" }
      ],
      equipment: [],
      fildhaers: [
       "设备号",
        "型号",
         "下发时间",
         "数量",
         "所在工位",
         "申请工位",
         "当前状态",
         "产线最后调动人",
         "最后调动日期",
         "设备号简写","设备名", "产线"
      ]
    };
  },
  mounted() {
    this.axios({
      method: "POST",
      url: "http://192.168.113.24:80/api/equiptotol.php",
      data: {
        myrequest: "allequip",
        zh: sessionStorage.getItem("myid"),
        myqx: sessionStorage.getItem("mylevel")
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        if (response.data.myanwser == "ok") {
          this.equipment = response.data.etotol;
        }
      })
      .catch(error => {
        window.alert(error);
      });
  },
  methods:{
     
  }
};
</script>

<style lang="scss" scoped></style>

<template>

  <v-app>
    
      <v-tabs
    fixed-tabs
    background-color="red darken-3"
    dark
    v-model="tab"
 
  >
    <v-tab>
     <h1> 申请调用</h1>
    </v-tab>
   <v-tab>
     <h1> 确认领用</h1>
    </v-tab>
    </v-tabs>
   
  
    <v-main>
     
      <v-container calss="fill-height" fluid>
        
        <v-row justify="center" align="center">
          
          <v-col cols="9" v-if="tab==0" >
            
            <v-card dark>
              <v-card-title class="red darken-3">
                <v-row justify="start">
                  <v-col cols="3">
                    <h2>申请调用至</h2>
                  </v-col>
                  <v-spacer />
                  <v-col cols="4"
                    ><v-text-field
                      v-model="search1"
                      append-icon="search"
                      label="查找设备"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-data-table
                v-model="selected1"
                :headers="headers1"
                :items="list1"
                item-key="设备号"
                show-select
                :search="search1"
                class="text-h3"
                loading-text="加载中请等待"
                light
                locale="zh-Hans"
              >
              </v-data-table>

              <v-card-actions class="red darken-3" height="100px">
                <v-row justify="start" align="center">
                  <v-col cols="4">
                    <v-select
                      dark
                      :items="outcx"
                      v-model="selectedincx"
                      outlined
                      @change="getgw"
                      label="调用至产线"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      dark
                      :items="outgw"
                      v-model="selectedingw"
                      outlined
                      label="调用至工位"
                    />
                  </v-col>
                  <v-spacer />
                  <v-col cols="2"
                    ><v-btn color="black" ma-1 @click="sqdy"
                      ><h2>申请调用</h2></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="9" v-else>
            <v-card dark>
              <v-card-title>
                <v-row justify="start">
                  <v-col cols="3">
                    <h2>确认领用</h2>
                  </v-col>
                  <v-spacer />
                  <v-col cols="4"
                    ><v-text-field
                      v-model="search2"
                      append-icon="search"
                      label="查找设备"
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-data-table
                v-model="selected2"
                :headers="headers2"
                :items="list2"
                item-key="设备号"
                show-select
                :search="search2"
                class="text-h4"
                loading-text="加载中请等待"
                light
                locale="zh-Hans"
              >
              </v-data-table>

              <v-card-actions class="dark" height="100px">
                <v-row justify="start" align="center">
                  <v-col cols="5">
                    <v-select
                      dark
                      :items="ingw"
                      item-text="设备名"
                      item-value="序列号"
                      v-model="selectedqrgw"
                      outlined
                      label="领用至工位"
                    /> </v-col
                  ><v-spacer></v-spacer>
                  <v-col cols="3">
                    <v-btn color="red" @click="sqqr"><h2>确认领用</h2></v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" centered>
          <h2>{{ mytext }}</h2>
          <template v-slot:action="{ attrs1 }">
            <v-btn color="red" text v-bind="attrs1" @click="snackbar = false">
              <h2>关闭</h2>
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "diaoyong",
  data() {
    return {
      //    ingw=this.$store.state.mydata.glgw,
      tab:null,
      mytext: "",
      snackbar: false,
      outgw: [],
      outcx: [],
      selectedincx: "",

      selectedqrgw: "",
      selectedingw: "",
      selected1: [],
      selected2: [],
      search1: "",
      search2: "",
      headers1: [
        {
          text: "设备号",
          align: "start",
          value: "设备号"
        },
        { text: "设备名", value: "设备名" },
        { text: "型号", value: "型号" },
        { text: "所在工位", value: "所在工位" }
      ],
      headers2: [
        {
          text: "设备号",
          align: "start",
          value: "设备号"
        },
        { text: "设备名", value: "设备名" },
        { text: "型号", value: "型号" },
        { text: "所在工位", value: "所在工位" },
        { text: "当前状态", value: "当前状态" }
      ],
      list1: [],
      list2: []
    };
  },
  computed: {
    ingw() {
      const a = this.$store.state.mydata.myglgw;
      return a.sort();
    }
  },
  methods: {
    getcx() {
      this.axios({
        method: "POST",
        url: "http://192.168.113.24:80/api/ediaoyong.php",
        data: {
          myrequest: "getmycx",
          myqx: sessionStorage.getItem("mylevel"),
          mygw: this.$store.state.mydata.myglgw,
          gh: sessionStorage.getItem("myid")
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(res => {
          this.outcx = res.data.pdsj.sort();
        })
        .catch(error => {
          window.alert(error);
        });
    },
    sqsx() {
      this.axios({
        method: "POST",
        url: "http://192.168.113.24:80/api/ewaijie.php",
        data: {
          myrequest: "wjzbequip",
          myqx: sessionStorage.getItem("mylevel"),
          mygw: this.$store.state.mydata.myglgw,
          gh: sessionStorage.getItem("myid")
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(res => {
          this.list1 = res.data.pdsj;
        })
        .catch(error => {
          window.alert(error);
        });
    },
    qrsx() {
      this.axios({
        method: "POST",
        url: "http://192.168.113.24:80/api/ediaoyong.php",
        data: {
          myrequest: "dyzbequip",
          myqx: sessionStorage.getItem("mylevel"),
          mygw: this.$store.state.mydata.myglgw,
          gh: sessionStorage.getItem("myid")
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(res => {
          this.list2 = res.data.pdsj;
        })
        .catch(error => {
          window.alert(error);
        });
    },
    getgw() {
      if (!this.selectedincx) {
        this.mytext = "请选择产线";
        this.snackbar = true;
      } else {
        this.axios({
          method: "POST",
          url: "http://192.168.113.24:80/api/ediaoyong.php",
          data: {
            myrequest: "gwbgequip",
            myqx: sessionStorage.getItem("mylevel"),
            mygw: this.$store.state.mydata.myglgw,
            gh: sessionStorage.getItem("myid"),
            cx: this.selectedincx
          },
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
          .then(res => {
            this.outgw = res.data.gwbg.sort();
          })
          .catch(error => {
            window.alert(error);
          });
      }
    },
    sqdy() {
      if (this.selected1.length < 1 || !this.selectedingw) {
        this.mytext = "选定工位并勾选调用设备";
        this.snackbar = true;
      } else {
        this.axios({
          method: "POST",
          url: "http://192.168.113.24:80/api/ediaoyong.php",
          data: {
            myrequest: "sqdyequip",
            myqx: sessionStorage.getItem("mylevel"),
            mygw: this.$store.state.mydata.myglgw,
            gh: sessionStorage.getItem("myid"),
            gw: this.selectedingw,
            dysb: this.selected1
          },
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
          .then(res => {
            if (res.data.myanwser == "ok") {
              this.sqsx();
              this.qrsx();
              this.mytext = "申请完成";
            } else {
              this.mytext = "出现错误联系工程师";
            }
            this.snackbar = true;
          })
          .catch(error => {
            window.alert(error);
          });
      }
    },
    sqqr() {
      if (this.selected2.length < 1 || !this.selectedqrgw) {
        this.mytext = "选定工位并勾选领用设备";
        this.snackbar = true;
      } else {
        
        this.axios({
          method: "POST",
          url: "http://192.168.113.24:80/api/ediaoyong.php",
          data: {
            myrequest: "qrsqequip",
            myqx: sessionStorage.getItem("mylevel"),
            mygw: this.$store.state.mydata.myglgw,
            gh: sessionStorage.getItem("myid"),
            gw: this.selectedqrgw,
            qrsb: this.selected2
          },
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
          .then(res => {
            console.log(res)
            if (res.data.myanwser == "ok") {
              this.sqsx();
              this.qrsx();
              this.mytext = "领用完成";
            } else {
              this.mytext = "出现错误联系工程师";
            }
            this.snackbar = true;
          })
          .catch(error => {
            window.alert(error);
          });
      }
    }
  },
  mounted() {
    this.sqsx();
    this.qrsx();
    this.getcx();
  }
};
</script>

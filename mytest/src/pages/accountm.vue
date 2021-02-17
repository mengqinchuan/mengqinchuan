<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
          <v-col cols="10" md="10">
            <v-card class="mx-auto">
              <v-app-bar
                dark
                color="red darken-3"
                align="center"
                height="auto"
                width="auto"
              >
                <v-app-bar-nav-icon @click="getemployee"></v-app-bar-nav-icon>
                <v-row>
                  <v-toolbar-title>选择员工的产线 </v-toolbar-title>
                </v-row>
                <v-row>
                  <v-radio-group v-model="mycxselect" row>
                    <v-radio
                      class="mt-6"
                      v-for="value1 in mycx"
                      :key="value1"
                      :label="value1"
                      :value="value1"
                    />
                  </v-radio-group>
                </v-row>
                <v-row>
                  <v-toolbar-items>
                    <v-text-field
                      placeholder="功能未完成"
                      class="mt-7"
                      outlined
                    />
                    <v-btn icon>
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-toolbar-items>
                </v-row>
              </v-app-bar>

              <v-container>
                <v-row dense>
                  <v-col
                    cols="12"
                    v-for="(value, index) in ygbiao"
                    :key="index"
                  >
                    <v-card color="black" dark>
                      <v-card-title class="headline"
                        >姓名：{{ value.用户名 }}</v-card-title
                      >
                      <v-card-subtitle>工号：{{ value.工号 }} </v-card-subtitle>
                      <v-card-text>
                        激活状态：{{
                          value.激活状态 == 1 ? "已激活" : "未激活"
                        }}</v-card-text
                      >
                      <v-card-actions>
                        <v-select
                          append-icon="thumb_up_alt"
                          v-model="ygbiao[index].工位"
                          :items="gwb"
                          chips
                          label="选择需要负责的工位"
                          multiple
                          outlined
                          @click:append="changeglgw(value.工号, index)"
                        />
                      </v-card-actions>
                      <v-card-actions>
                        <v-btn
                          color="blue lighten-1"
                          @click="jhzh(value.工号, index)"
                          ><h2>激活账户</h2></v-btn
                        ><v-spacer /><v-btn
                          color="red darken-1"
                          @click="sczh(value.工号, index)"
                          ><h2>删除账户</h2></v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
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
  name: "accountm",
  setup() {
    return {};
  },
  data() {
    return {
      mycxselect: "",
      ygbiao: [],
      gwb: [],
      snackbar: false,
      dialog: false,
      mytext: ""
    };
  },
  methods: {
    jhzh(mykey, bianhao) {
      this.axios({
        method: "POST",
        url: "http://192.168.113.24:80/api/glyg.php",
        data: {
          myrequest: "jhmyzh",
          myqx: sessionStorage.getItem("mylevel"),
          mygh: mykey
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(res => {
          if (res.data.myanwser == "ok") {
            this.ygbiao[bianhao].激活状态 = 1;
            this.mytext = "成功激活";
          } else {
            this.mytext = "出现错误联系工程师";
          }
          this.snackbar = true;
        })
        .catch(error => {
          window.alert(error);
        });
    },
    sczh(mykey, bianhao) {
      this.axios({
        method: "POST",
        url: "http://192.168.113.24:80/api/glyg.php",
        data: {
          myrequest: "scmyzh",
          myqx: sessionStorage.getItem("mylevel"),
          mygh: mykey
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(res => {
          if (res.data.myanwser == "ok") {
            this.ygbiao.splice(bianhao, 1);
            this.mytext = "删除成功";
          } else {
            this.mytext = "出现错误联系工程师";
          }
          this.snackbar = true;
        })
        .catch(error => {
          window.alert(error);
        });
    },
    changeglgw(mykey, bianhao) {
      this.axios({
        method: "POST",
        url: "http://192.168.113.24:80/api/glyg.php",
        data: {
          myrequest: "changegw",
          myqx: sessionStorage.getItem("mylevel"),
          mygh: mykey,
          mycgw: this.ygbiao[bianhao].工位
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(res => {
          if (res.data.myanswer == "ok") {
            this.mytext = "负责工位更改成功";
          } else {
            this.mytext = "出现错误联系工程师";
          }
          this.snackbar = true;
        })
        .catch(error => {
          window.alert(error);
        });
    },
    getemployee() {
      if (!this.mycxselect) {
        this.mytext = "请先选择产线";
        this.snackbar = true;
      } else {
        this.axios({
          method: "POST",
          url: "http://192.168.113.24:80/api/glyg.php",
          data: {
            myrequest: "yglist",
            myqx: sessionStorage.getItem("mylevel"),
            mycx: this.mycxselect
          },
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
          .then(res => {
            this.ygbiao = res.data.ygdata;
            this.gwb = res.data.gwdata;
          })
          .catch(error => {
            window.alert(error);
          });
      }
    }
  },
  computed: {
    mycx() {
      return this.$store.state.mydata.mygl;
    }
  }
};
</script>

<style lang="scss" scoped></style>

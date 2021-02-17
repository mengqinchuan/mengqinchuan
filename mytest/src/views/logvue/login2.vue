<template>
  <v-app>
    <v-main>
      <!-- <v-container fluid> 
    <v-row justify="end"> <router-link  class="text-decoration-none" to="/request">申请账号</router-link></v-row>
    <v-row justify="end"> <router-link class="text-decoration-none" to="/request">忘记密码</router-link></v-row>
       <v-row  style="height: 800px; " align="center"   class="light2">
            <v-col  cols="12">
            <v-row>
          <v-col><h1 class="text-center display-2 font-weight-bold">我的测试程序</h1></v-col>
        </v-row>
        <v-row justify="center"> 
            <v-col cols="1">
            <v-img src="@/assets/MYLOGO.png" aspect-ratio="1.1"></v-img>
            </v-col>
        </v-row> 
        <v-row justify="center">
            <v-col cols="2">
                 <v-text-field  prepend-icon="person"  label="账户">text</v-text-field>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="2">
        <v-text-field v-model="password" type="password" prepend-icon="vpn_key" label="密码"  append-icon="visibility" ></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="1" offset="0.5" class="ml-5">
            <v-btn rounded color="primary" light block outlined>登录</v-btn>
            </v-col>
        </v-row>
        </v-col>
       </v-row> -->
      <!-- </v-container> -->
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-12">
              <v-row justify="center">
                <v-col cols="7" align-center>
                  <v-img
                    link
                    height="200px"
                    width="226px"
                    src="@/assets/MYLOGOsmall.png"
                  >
                    <v-alert
                      v-model="alert.nozh"
                      type="error"
                      dismissible
                      transition="scale-transition"
                      >账号不存</v-alert
                    >
                    <v-alert
                      v-model="alert.pwdwrong"
                      type="warning"
                      dismissible
                      transition="scale-transition"
                      >密码错误</v-alert
                    >
                    <v-alert
                      v-model="alert.wjh"
                      type="info"
                      dismissible
                      transition="scale-transition"
                      >账号未激活</v-alert
                    >
                  </v-img>
                </v-col>
              </v-row>

              <v-toolbar color="red" dark flat justify="center">
                <v-spacer />
                <v-toolbar-title><h1>生产一部设备管理系统</h1></v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form1">
                  <v-text-field
                    label="账号"
                    name="Login"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="zhrule"
                    required
                    v-model="logindata.zh"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="密码"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="mmrule"
                    required
                    v-model="logindata.pwd"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="login"><h2>登录</h2></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="1">
            <router-link to="/request">申请账号</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "login2",
  setup() {
    return {};
  },
  data() {
    return {
      alert: { nozh: false, pwdwrong: false, wjh: false },
      logindata: {},
      quanxian: { daohang: true, sx: false, wj: true },
      valid: true,
      zhrule: [
        v => !!v || "账户不能为空",
        v => (v && v.length == 8 && /^[0-9]*$/.test(v)) || "必须输入8位的数字"
      ],
      mmrule: [
        v => !!v || "密码不能为空",
        v =>
          (v && v.length <= 16 && v.length >= 3 && /^[a-zA-Z0-9]*$/.test(v)) ||
          "密码为3位到16位内的数字或字母"
      ]
    };
  },
  methods: {
    mylogintest() {
      this.$emit("changestaute", this.quanxian);
    },
    login() {
      if (!this.valid) {
        this.$refs.form1.validate();
      } else {
        sessionStorage.clear();
        const logindata = this.logindata;
        this.axios({
          method: "POST",
          url: "http://192.168.113.24:80/api/zhlogin.php",
          data: { myrequest: "login", logindata },
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
          .then(response => {
            switch (response.data.myanwser) {
              case "nozh":
                this.alert.nozh = true;
                break;
              case "pwdwrong":
                this.alert.pwdwrong = true;
                break;
              case "wjh":
                this.alert.wjh = true;
                break;
              case "ok":
                this.$store.commit("changevuexdata", response.data.mydatalist);
                sessionStorage.setItem(
                  "mydata",
                  JSON.stringify(response.data.mydatalist)
                );
                sessionStorage.setItem(
                  "username",
                  response.data.mydatalist.name
                );
                sessionStorage.setItem("myid", response.data.mydatalist.gh);
                sessionStorage.setItem(
                  "mylevel",
                  response.data.mydatalist.myqx
                );
                sessionStorage.setItem("cx", response.data.mydatalist.mygl);
                sessionStorage.setItem("gw", response.data.mydatalist.myglgw);
                this.$router.replace({ path: "/pandian" });
                break;
              default:
                break;
            }
          })
          .catch(error => {
            window.alert(error);
          });
      }
    }
  },
  mounted() {
  
  }
};
</script>

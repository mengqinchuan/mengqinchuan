<template>
  <v-app>
    <v-app-bar app dark clipped-left color="dark" src="@/assets/timg.jpg">
      <h2>生产一部设备管理系统</h2>
      <v-spacer />
      <a
        class="white--text font-weight-bold text-decoration-none"
        href="http://192.168.113.24/dokuwiki/doku.php"
        >设备组WIKI百科</a
      >
      
      <v-card> </v-card>
    </v-app-bar>

    <v-card v-if="$route.name !== 'login2' && $route.name !== 'request'"
    >
   
      <v-navigation-drawer
        permanent
        clipped
         dark
        color="primary"
        expand-on-hover
        app
        
      >
        <v-list
        >
          <v-list>
            <v-list-item >
              <v-list-item-icon>
               <v-btn @click="myreload" color="primary"><v-icon>person</v-icon> 登出</v-btn> 
              </v-list-item-icon>
              
              <v-list-item-title >用户：{{ this.name }}
              </v-list-item-title>
            </v-list-item>
            <v-list-group color="white" prepend-icon="vpn_key">
              <template v-slot:activator>
                <v-list-item-title>修改密码</v-list-item-title>
              </template>
              <v-form v-model="valid" ref="form">
                <v-list-item>
                  <v-text-field
                    v-model="opwd"
                    placeholder="旧密码"
                    :rules="mmrule"
                    type="password"
                  />
                </v-list-item>
                <v-list-item>
                  <v-text-field
                    placeholder="新密码"
                    :rules="mmrule"
                    v-model="npwd"
                    type="password"
                  />
                </v-list-item>
              </v-form>

              <v-list-item
                ><v-row justify="center">
                  <v-list-item-action>
                    <v-btn @click="changemypaw" class="primary">确认修改</v-btn>
                  </v-list-item-action>
                </v-row>
              </v-list-item>
            </v-list-group>
            <v-list-group color="white" prepend-icon="all_inbox">
              <template v-slot:activator>
                <v-list-item-title>管理范围</v-list-item-title>
              </template>
              <v-list-item v-for="(admin, i) in this.myglfw" :key="i" link>{{
                admin
              }}</v-list-item>
            </v-list-group>
          </v-list>
          <v-divider></v-divider>
          <v-list nav>
            <router-link v-if="this.mylevel >= 1" to="/sbchaxun">
              <v-list-item calss="px-2" link>
                <v-list-item-icon
                  ><v-icon>find_in_page</v-icon></v-list-item-icon
                >
                <v-list-item-title><h2>设备查询</h2></v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="this.mylevel >= 1" to="/historycx">
              <v-list-item calss="px-2" link>
                <v-list-item-icon
                  ><v-icon>content_paste</v-icon></v-list-item-icon
                >
                <v-list-item-title><h2>历史查询</h2></v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="this.mylevel >= 1" to="/pandian">
              <v-list-item calss="px-2" link>
                <v-list-item-icon><v-icon>bookmark</v-icon></v-list-item-icon>
                <v-list-item-title><h2>设备盘点</h2></v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="this.mylevel >= 4" to="/pandianc"
              ><v-list-item calss="px-2" link>
                <v-list-item-icon><v-icon>ballot</v-icon></v-list-item-icon>
                <v-list-item-title><h2>盘点情况</h2></v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="this.mylevel >= 3" to="/lingyong">
              <v-list-item calss="px-2" link>
                <v-list-item-icon
                  ><v-icon>add_shopping_cart</v-icon></v-list-item-icon
                >
                <v-list-item-title><h2>设备领用</h2></v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="this.mylevel >= 3" to="/diaoyong">
              <v-list-item calss="px-2" link>
                <v-list-item-icon
                  ><v-icon>compare_arrows</v-icon></v-list-item-icon
                >
                <v-list-item-title><h2>设备调用</h2></v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="this.mylevel >= 3" to="/waijie">
              <v-list-item calss="px-2" link>
                <v-list-item-icon
                  ><v-icon>card_giftcard</v-icon></v-list-item-icon
                >
                <v-list-item-title><h2>设备外借</h2></v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link v-if="this.mylevel >= 3" to="/songxiu">
              <v-list-item calss="px-2" link>
                <v-list-item-icon><v-icon>handyman</v-icon></v-list-item-icon>
                <v-list-item-title><h2>设备送修</h2></v-list-item-title>
              </v-list-item>
            </router-link>
            <v-list-item calss="px-2" disabled>
              <v-list-item-icon><v-icon>shop</v-icon></v-list-item-icon>
              <v-list-item-title><h2>耗材领用</h2></v-list-item-title>
            </v-list-item>
            <router-link v-if="this.mylevel >= 4" to="/accountm">
              <v-list-item calss="px-2">
                <v-list-item-icon
                  ><v-icon>person_search</v-icon></v-list-item-icon
                >
                <v-list-item-title><h2>账号管理</h2></v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-snackbar
      color="black"
      v-model="snackbar"
      left
      centered
      rounded="xl"
    >
      <h2>{{ mytext }}</h2>
      <template v-slot:action="{ attrs1 }">
        <v-btn color="red" text v-bind="attrs1" @click="snackbar = false">
          <h2>关闭</h2>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- <v-app-bar app  dark>  -->
    <!-- <div class="d-flex align-center">
        
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <!-- <router-view @changestaute="changestaute"/> -->
      <router-view />
      
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    mmrule: [
      v => !!v || "密码不能为空",
      v =>
        (v && v.length <= 16 && v.length >= 3 && /^[A-Za-z0-9]*$/.test(v)) ||
        "必须输入3位到16位内的数字或字母"
    ],
    valid: true,
    npwd: "",
    opwd: "",
    snackbar: false,
    mytext: "",
    
  }),
  computed: {
    name() {
      
      return this.$store.state.mydata.name;},
      
    myglfw() {
      if (this.$store.state.mydata.myqx >= 7) {
        return ["全部工位"];
      } else {
        if (this.$store.state.mydata.myqx >= 4) {
          return this.$store.state.mydata.mygl;
        } else {
          return this.$store.state.mydata.myglgw;
        }
      }
    },
    mylevel() {
      return this.$store.state.mydata.myqx;
    }
  },
  methods: {
    myreload(){
    this.$router.push('/login2') 
    sessionStorage.clear();
    },
    changemypaw() {
      if (!this.valid) {
        this.$refs.form.validate();
      } else {
        this.axios({
          method: "POST",
          url: "http://192.168.113.24:80/api/changepwd.php",
          data: {
            myrequest: "changepwd",
            gh: this.$store.state.mydata.gh,
            oldpwd: this.opwd,
            newpwd: this.npwd
          },
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
          .then(response => {
            if (response.data == "1") {
              this.mytext = "修改成功";
            } else {
              this.mytext = "修改失败";
            }
            this.snackbar = true;
          })
          .catch(error => {
            window.alert(error);
          });
      }
    }
  },

  beforeMount() {
    if (!this.$store.state.mydata.name) {
      this.$store.commit(
        "changevuexdata",
        JSON.parse(sessionStorage.getItem("mydata"))
      );
 
    }
  },
  
  
};
</script>
<style></style>

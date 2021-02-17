<template>
    <div>
<!-- <v-tabs
    fixed-tabs
    background-color="black"
    dark
    v-model="tab"
  >
    <v-tab
  v-for="item in items"
        :key="item.tab"
    >
     <h1> {{item.tab}}</h1>
    </v-tab>
  </v-tabs>
  <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
         <v-row justify="center" align="center">
          <v-col cols="12" md="10">
            <v-card dark>
              <v-card-title class="red darken-3 ">
                <v-row justify="space-around">
                  <v-col cols="5">
                    <h2>{{item.tab}}</h2>
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
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>



      </v-tab-item>
    </v-tabs-items> -->
    
    <v-tabs
    fixed-tabs
    background-color="red darken-3"
    dark
    v-model="tab"
    
  >
    <v-tab >
     <h1> 外借历史查询</h1>
    </v-tab>
   <v-tab>
     <h1> 送修历史查询</h1>
    </v-tab>
    </v-tabs>
  <v-main>
        <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
          <v-col cols="12" md="7" v-if="tab==0">
            <v-card dark>
              <v-card-title class="red darken-3">
                <v-row justify="space-around">
                  <v-col cols="5" >
                    <h2>外借历史</h2>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      max-width="50px"
                      v-model="searchwj"
                      append-icon="search"
                      label="查找设备"
                      hide-details>
                    </v-text-field>
                  </v-col>
                  {{searchwj}}
                </v-row>
              </v-card-title>
              <v-data-table
                v-model="selectedwj"
                :headers="wjheaders"
                :items="wjhistory"
                item-key="设备号"
                :search="searchwj"
                class="elevation-12"
                loading-text="暂无数据"
                light
               
              >
                <template v-slot:item.是否归还="{ item }">
                  <v-chip :color="getColor(item.是否归还)" dark>{{
                    item.是否归还 == 1 ? "已归还" : "未归还"
                  }}</v-chip>
                </template>
              </v-data-table>

             
            </v-card>
          </v-col>

           <v-col cols="12" md="7" v-else-if="tab==1" >
            <v-card dark>
              <v-card-title class="red darken-3">
                <v-row justify="space-around">
                  <v-col cols="5" >
                    <h2>送修历史</h2>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      max-width="50px"
                      v-model="searchsx"
                      append-icon="search"
                      label="查找设备"
                      hide-details>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-data-table
                v-model="selectedsx"
                :headers="sxheaders"
                :items="sxhistory"
                item-key="设备号"
                :search="searchsx"
                class="elevation-12"
                loading-text="暂无数据"
                light
               
              >
                <template v-slot:item.送修状态="{ item }">
                  <v-chip :color="getColor(item.送修状态)" dark>{{
                    item.送修状态 == 1 ? "维修完毕" : "维修中"
                  }}</v-chip>
                </template>
              </v-data-table>

             
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-main>
    </div>
</template>

<script>
export default {
    name: "historycx",
     data () {
      return {
        tab: null,
       wjhistory:[],
       sxhistory:[],
       searchwj:"",
       searchsx:"",
        wjheaders: [
        {
          text: "设备号",
          align: "start",
          value: "设备号"
        },
        { text: "设备名", value: "设备名" },
        { text: "借用人", value: "借用人" },
        { text: "借用部门", value: "借用部门" },
        { text: "借用时间", value: "借用时间" },
        { text: "归还时间", value: "归还时间" },
        { text: "是否归还", value: "是否归还" },
        { text: "借用理由", value: "借用理由" },
      ],
      sxheaders: [
        {
          text: "设备号",
          align: "start",
          value: "设备号"
        },
        { text: "设备名", value: "设备名" },
        { text: "送修人", value: "送修人" },
        { text: "送修时间", value: "送修时间" },
        { text: "接收人", value: "接收人" },
        { text: "维修进度", value: "送修状态" },
        { text: "送修理由", value: "送修理由" },
        
      ],
      }
    },
    methods:{
         getColor(zt) {
      if (zt == 0) return "red";
      else return "green";
                     },
        getwjhistory(){
             this.axios({
      method: "POST",
      url: "http://192.168.113.24:80/api/equiphistory.php",
      data: {
        myrequest: "getwjhistory",
        zh: sessionStorage.getItem("myid"),
        myqx: sessionStorage.getItem("mylevel")
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        if (response.data.myanwser == "ok") {
          this.wjhistory = response.data.wjhistory;
        }
      })
      .catch(error => {
        window.alert(error);
      });
        },
        getsxhistory(){
            this.axios({
      method: "POST",
      url: "http://192.168.113.24:80/api/equiphistory.php",
      data: {
        myrequest: "getsxhistory",
        zh: sessionStorage.getItem("myid"),
        myqx: sessionStorage.getItem("mylevel")
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        if (response.data.myanwser == "ok") {
          this.sxhistory = response.data.sxhistory;
        }
      })
      .catch(error => {
        window.alert(error);
      });
        }
        
    },
     mounted() {
   this.getwjhistory()
   this.getsxhistory()
  },
}
</script>

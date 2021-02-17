<template>
    <v-app>
        <v-main>
            <v-container fluid class="fill-height"> 
            <v-row 
            justify="center"
             align="center">
                <v-col 
                 cols="7"
              md="7">
            <v-card dark> 
            <v-overlay :value="alert"
           position: absolute>
           <v-btn v-if="btnalert==1" class="warning" @click="alert=!alert"><h2>选择盘点设备</h2></v-btn>
           <v-btn v-else-if="btnalert==2" class="success" @click="alert=!alert"><h2>盘点成功</h2></v-btn>
           <v-btn v-else class="error" @click="alert=!alert"><h2>上传数据失败</h2></v-btn>
           </v-overlay>
                <v-card-title class="red darken-3">
 <v-row justify="space-around">
     <v-col cols="5">
  <h2>设备盘点表</h2>  
     </v-col>
    
     <v-col cols="4"> <v-text-field
      max-width="50px"
        v-model="search"
        append-icon="search"
        label="查找设备"
        hide-details
      ></v-text-field>
     </v-col>
 </v-row>
    </v-card-title>
            <v-data-table
       v-model="selected"
    :headers="headers"
    :items="pddata"
    item-key="设备号"
    show-select
    :search="search"
    class="elevation-12"
     loading-text="暂无数据"
     light
     locale="zh-Hans"
     loading="mydata.length>1"
    >
     <template v-slot:item.盘点状态="{ item }">
      <v-chip :color="getColor(item.盘点状态)" dark>{{ item.盘点状态==1?"已盘点":"未盘点" }}</v-chip>
    </template>
    </v-data-table>
     <v-card-title class="red darken-3">
      <v-spacer></v-spacer>
      <v-btn color="black" @click="QRPD"><h2>确认盘点</h2></v-btn>
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
    name:"pandian",
    setup () {
        

        return {}
    },
    data(){
        return{
          alert:false,
          btnalert:1,
              selected: [],
              search:'',
        headers: [
          {
            text: '设备号',
            align: 'start',
            value: '设备号',
          },
          { text: '设备名', value: '设备名' },
          { text: '盘点工位', value: '盘点工位' },
          { text: '盘点人', value: '盘点人' },
          { text: '盘点状态', value: '盘点状态' },
          { text: '盘点日期', value: '盘点日期' },
        ],
        pddata: [],
      }
        
    },
    methods:{
      QRPD(){
        if (this.selected.length<1){
           this.btnalert=1;
           this.alert=true;
        }
        else{
        const a=[]
        this.selected.forEach(items => {
          a.push(items.设备号)
        });
        this.axios({method:"POST",
            url:"http://192.168.113.24:80/api/epandian.php",
            data:{myrequest:"qrpdequip",
                  myqx:sessionStorage.getItem("mylevel"),
                  qrsb:a,
                  gh:sessionStorage.getItem("myid")
                 },
             headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
  }).then((res)=>{
           if(res.data.myanwser=="ok"){
             this.btnalert=2;
             this.selected=[]
           }
           else{this.btnalert=3}
           this.alert=true
           this.axios({
     method:"POST",
            url:"http://192.168.113.24:80/api/epandian.php",
            data:{myrequest:"pdzbequip",
                  myqx:sessionStorage.getItem("mylevel"),
                  mygw:this.$store.state.mydata.myglgw,
                  gh:sessionStorage.getItem("myid")
                 },
             headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
  }).then((res)=>{
    this.pddata=res.data.pdsj
  }).catch(error=>{
            window.alert(error);
        })
  }).catch(error=>{
            window.alert(error);
        })

        }
      },
      getColor(zt){
        if (zt == 0) return 'red'
        else return 'green'
      }
    },
mounted(){
  // console.log(this.$store.state.mydata.myglgw)
  this.axios({
     method:"POST",
            url:"http://192.168.113.24:80/api/epandian.php",
            data:{myrequest:"pdzbequip",
                  myqx:sessionStorage.getItem("mylevel"),
                  mygw:this.$store.state.mydata.myglgw,
                  gh:sessionStorage.getItem("myid")
                 },
             headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
  }).then((res)=>{
    
    this.pddata=res.data.pdsj
  }).catch(error=>{
            window.alert(error);
        })
}
}
</script>

<style lang="scss" scoped>

</style>
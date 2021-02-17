<template>
    <v-app>
        <v-main>
            <v-container fluid class="fill-height"> 
            <v-row 
            justify="center"
             align="center">
                <v-col 
                 cols="10"
              md="10">
            <v-card dark> 
            <v-overlay :value="alert"
           position: absolute>
           <v-btn v-if="btnalert==1" class="warning" @click="alert=!alert"><h2>送修设备未选定或故障说明未填写</h2></v-btn>
           <v-btn v-else-if="btnalert==2" class="success" @click="alert=!alert"><h2>送修成功</h2></v-btn>
           <v-btn v-else class="error" @click="alert=!alert"><h2>上传数据失败</h2></v-btn>
           </v-overlay>
            <v-card-title class="red darken-3">
 <v-row justify="space-around">
     <v-col cols="6">
  <h1>待送修设备表</h1>  
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
    class="elevation-12 text-h3"
     loading-text="加载中请等待"
     light
     locale="zh-Hans"
     loading="mydata.length<1"
    >
     
    </v-data-table>
         <v-card-title class="red darken-3">
    <v-text-field v-model="gzsm" label="故障说明" />
    <v-spacer/>
     <v-spacer/>
       <v-btn color="black" @click="QRPD"><h2>确认送修</h2></v-btn>
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
    name:"songxiu",
    data(){
        return{
          alert:false,
          gzsm:"",
          btnalert:1,
              selected:[],
              search:'',
        headers: [
          {
            text: '设备号',
            align: 'start',
            value: '设备号',
          },
          { text: '设备名', value: '设备名' },
          { text: '型号', value: '型号' },
          { text: '所在工位', value: '所在工位' },
          { text: '最后调动人', value: '最后调动人'},
          { text: '最后调动日期', value: '最后调动日期' },
        ],
        pddata: [],
      }
        
    },
    methods:{
      QRPD(){
        if (this.selected.length<1||this.gzsm==""){
           this.btnalert=1;
           this.alert=true;
        }
        else{ 
        const a=[]
        this.selected.forEach(items => {
          a.push(items.设备号)
        });
        this.axios({method:"POST",
            url:"http://192.168.113.24:80/api/ewaijie.php",
            data:{myrequest:"sxequip",
                  myqx:sessionStorage.getItem("mylevel"),
                  qrsb:a,
                  gh:sessionStorage.getItem("myid"),
                  gz:this.gzsm,
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
           this.shuaxin()
  }).catch(error=>{
            window.alert(error);
        })

        }
      },
      shuaxin(){
          this.axios({
     method:"POST",
            url:"http://192.168.113.24:80/api/ewaijie.php",
            data:{myrequest:"wjzbequip",
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
      
    },
mounted(){
  // console.log(this.$store.state.mydata.myglgw)
 this.shuaxin()
}
}
</script>

<style lang="scss" scoped>

</style>
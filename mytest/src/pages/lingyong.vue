<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col 
                 cols="10"
              md="10">
                    <v-card dark>
                         <v-overlay :value="alert"
           position: absolute>
           <v-btn v-if="btnalert==1" class="success" @click="queren"><h2>领用成功</h2></v-btn>
           <v-btn v-else-if="btnalert==2" class="error" @click="alert=!alert"><h2>领用工位和设备不能为空</h2></v-btn>
           <v-btn v-else class="warning" @click="alert=!alert"><h2>领用失败请检查网络</h2></v-btn>
           </v-overlay>
                                            <v-card-title class="red darken-3">
 <v-row justify="start">
     <v-col cols="3">
  <h2>设备领用</h2>  
     </v-col>
    <v-spacer/>
     <v-col cols="4"><v-text-field
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
    :items="sbb"
     item-key="设备号"
     show-select
    :search="search"
     class="elevation-12 text-h3"
     light
     locale="zh-Hans"
     style=""
    >
    </v-data-table>
        <v-card-actions class="red darken-3"  height="100px">
     <v-row justify="start" align="center">
         <v-col cols="4">
           <v-select dark
:items="this.gwb"
v-model="defaultSelected"
 outlined
label="领用工位"/>
         </v-col>
 <v-spacer/>
     <v-col cols="2" ><v-btn color="black"  @click="lingyong"    ma-1><h2>确认领用</h2></v-btn></v-col>
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
    export default {
        a:[],
        name:'lingyong',
        data() {
            return{
                alert:false,
                btnalert:"2",
               defaultSelected:"",
               selected:[],
                search:'',
                headers: [
                
           {
            text: '设备号',
            align: 'start',
            // sortable: false,
            value: '设备号',
          },
          { text: '设备名', value: '设备名' },
          { text: '型号', value: '型号' },
          { text: '数量', value: '数量' },
        ],
              sbb: [],
              gwb:[]
            
        }
    },
    // computed:{
    //     jhuo(){return this.btnalert}
    // },
    
    mounted(){
        this.gwb= sessionStorage.getItem("gw").split(",").sort();
       this.axios(  
           { method:"POST",
           url:"http://192.168.113.24:80/api/elingyong.php",
            data:{
                myrequest:"dlequip",
                myqx:sessionStorage.getItem("mylevel"),
                gh:sessionStorage.getItem("myid"),
            },
              headers: {
           'Content-Type': 'application/json; charset=utf-8'
                       }
           }
        ).then((res)=>{
           this.sbb = res.data;
        }).catch(error=>{
            window.alert(error);
        })
    },
    methods:{
        lingyong(){
            if (this.selected.length<1 || !this.defaultSelected){
                this.btnalert="2";
                this.alert=true;
            }
            else{
            this.a=[]
            this.selected.forEach(myitem => {
               this.a.push(myitem.设备号 )
            });
              this.axios({
             method:"POST",
             url:"http://192.168.113.24:80/api/elingyong.php",
              data:{myrequest:"lysb",lylist:this.a,czr:sessionStorage.getItem("myid"),lygw:this.defaultSelected
              },
              headers: {
           'Content-Type': 'application/json; charset=utf-8'
                       }
            }).then((res)=>{
                
                if (res.data.myanwser=="ok"){
                      this.btnalert="1";
                    
                }
                else{
                     this.btnalert="3";
                }
                this.alert=true;
            }).catch(error=>{
            window.alert(error);

        })
            
            }
          
        },
        queren(){
            this.alert=!this.alert;
              this.gwb= sessionStorage.getItem("gw").split(",").sort();
       this.axios(  
           { method:"POST",
           url:"http://192.168.113.24:80/api/elingyong.php",
            data:{
                myrequest:"dlequip",
                myqx:sessionStorage.getItem("mylevel"),
                gh:sessionStorage.getItem("myid"),
            },
              headers: {
           'Content-Type': 'application/json; charset=utf-8'
                       }
           }
        ).then((res)=>{
           this.sbb = res.data;
        }).catch(error=>{
            window.alert(error);
        })
        }
    }
    }
</script>

<style lang="less" scoped>

</style>
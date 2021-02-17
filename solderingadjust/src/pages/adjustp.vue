<template>
    <v-app>
        <v-main>
               <v-container fluid class="fill-height"> 
            <v-row 
            justify="center"
            >
              
            <v-col cols="12"  justify="center">
                <v-row  justify="center"><h1 class="blue--text">查询数据</h1></v-row>
              <v-row justify="center" align="center">
                  <v-col cols="2">
                         
            <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="查询月份"
            prepend-icon="mdi-calendar-month"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" type="month" scrollable locale="zh">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">取消</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">确认</v-btn>
        </v-date-picker>
      </v-dialog>
                  </v-col>
                </v-row>
                 <v-row justify="center" align="center">
                  <v-col cols="2">
                      <v-select prepend-icon=" mdi-soldering-iron"
                      v-model="solderingnum"
                      label="选择设备"
                      :items="solders"/>
                  </v-col>
                 </v-row>
                 <v-row justify="center" align="center">
                    
                         <v-btn color="primary" @click="checkdata"><h2>查询数据</h2></v-btn>
                     
                 </v-row>
                 
                 <v-row justify="center" align="center" class="mt-9" maxheight="400px">
                     
                     <v-col cols="4">
                 <mychart v-if="shwochart" :chartdata="mydata" ></mychart>
                     </v-col>
                     
                 </v-row>
                
                  <v-row justify="center" align="center" class="mt-9">
                      <v-simple-table 
                       fixed-header
    height="300px"
                      dark>
    <template v-slot:default v-if="shwochart">
      
      <thead 
    >
        <tr>
          <th class="text-left">
            日期
          </th>
          <th class="text-left">
           对地电阻(小于10Ω)
          </th>
           <th class="text-left">
            设定温度(350±1℃)
          </th>
          <th class="text-left">
            确认人
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in mythdata"
          :key="item.date"
        >
          <td>{{ item.date}}</td>
          <td>{{ item.resistance}}</td>
          <td>{{ item.settemperature}}</td>
          <td>{{ item.xzconfirm}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
                  </v-row>
            </v-col>
            </v-row>
             <v-snackbar
      v-model="snackbar"
      centered
      color="primary"
    >
    <h2>{{mytext}}</h2>
      <template v-slot:action="{ attrs1 }">
        <v-btn
          color="white"
          text
          v-bind="attrs1"
          @click="snackbar = false"
        >
        <h2>  关闭</h2>
        </v-btn>
      </template>
    </v-snackbar>
               </v-container>
        </v-main>
    </v-app>
</template>

<script>
import mychart from '../components/mychart.vue';
    // import Chart from 'chart.js';
    export default {
  components: { mychart },
        data: () => ({
       date: new Date().toISOString().substr(0, 7),
      modal: false,
      solderingnum:"",
      snackbar:false,
      mytext:"",
      mydata:{},
      shwochart:false,
      mythdata:{}
         }),
         computed:{
             solders(){
                 return this.$store.state.soldernum;
             }
         },
         methods:{
             checkdata(){
                 if(!this.solderingnum){
                     this.mytext="请选择设备";
                     this.snackbar=true;
                 }
                 else{ 
                     this.mydata={};
                     this.mythdata={};
                 this.shwochart=false;
                     this.axios(
          {  method:"POST",
            url:"http://192.168.113.24:80/api/solderingadjust.php",
            data:{myrequest:"getsolderdata",
                  soldernum: this.solderingnum,
                  mydate:this.date
                  
            },
             headers: {
    'Content-Type': 'application/json; charset=utf-8'
      }}).then((response)=>{
         
         if (response.data.myanswer=="ok"){
          
          this.mydata={
                     labels:response.data.mydate,
        datasets: [{
            label: '实际温度',
            fill:false,
            borderColor: 'rgb(28,28,28)',
            data :response.data.acttmper
        },
        {
            label: '温度上限',
            fill:false,
            borderColor: 'rgb(255, 0, 0)',
            data :response.data.max
        },
        {
            label: '温度下限',
            fill:false,
            borderColor: 'rgb(255, 0, 0)',
            data : response.data.min
        }
      ]
                 }
                 this.mythdata=response.data.alldata
                   this.shwochart=true
                   }
     
 }).catch(error=>{
            window.alert(error);
        });
                 }
                
             }
         }
    }
</script>

<style lang="scss" scoped>

</style>
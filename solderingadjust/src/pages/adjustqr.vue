<template>
    <v-app>
        <v-main>
               <v-container fluid class="fill-height" align-start> 
            <v-row 
            justify="center"
            >
              
            <v-col cols="12"  justify="center">
                <v-row  justify="center"><h1 class="deep-purple--text">线长确认</h1></v-row>
          
            <v-row justify="center">
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
            label="确认日期"
            prepend-icon="mdi-calendar-month"
            readonly
             color="deep-purple"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" type="date" scrollable locale="zh" color="deep-purple"> 
          <v-spacer></v-spacer>
          <v-btn text color="deep-purple" @click="modal = false">取消</v-btn>
          <v-btn text color="deep-purple" @click="$refs.dialog.save(date)">确认</v-btn>
        </v-date-picker>
      </v-dialog>
                </v-col>
            </v-row>
           <v-row justify="center" align="center">
                  <v-col cols="2">
                      <v-select prepend-icon=" mdi-soldering-iron"
                      color="deep-purple"
                      v-model="equipname"
                      label="选择设备"
                      :items="solders"/>
                  </v-col>
                 </v-row>
              <v-row justify="center" align="center">
                  <v-col cols="2">
                      <v-select prepend-icon=" mdi-account-box"
                      v-model="name"
                      color="deep-purple"
                      label="线长姓名"
                      :items="getname"/>
                  </v-col>
                 </v-row>
                 <v-row justify="center" align="center">
                  
                      <v-btn  dark color="deep-purple" @click="queren"><h2>日检确认</h2></v-btn>
                  
                 </v-row>
                 
            </v-col>
           
            </v-row>
              <v-snackbar
      v-model="snackbar"
      centered
      color="deep-purple withe--text"
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
    export default {
        data: () => ({
     date: new Date().toISOString().substr(0, 10),
    name:"",
    equipname:"",
    getname:[],
    snackbar:false,
     modal: false,
      mytext:"",
      shwochart:false,
    
  }),
  computed:{
   solders(){
                 return this.$store.state.soldernum;
             }
    },
    mounted(){
         this.axios(
          {  method:"POST",
            url:"http://192.168.113.24:80/api/solderingadjust.php",
            data:{myrequest:"getxzname",
            },
             headers: {
    'Content-Type': 'application/json; charset=utf-8'
      }}).then((response)=>{
          if(response.data.myanswer=="ok"){
          this.getname=response.data.name}
          else{
              this.mytext="网络错误"
              this.snackbar=true
          }
    }).catch(error=>{
            window.alert(error);
        });
    },
    methods:{
       queren(){
           if(!this.name||!this.equipname){
               this.mytext="选项不能为空"
              this.snackbar=true
           }
           else{
                this.axios(
          {  method:"POST",
            url:"http://192.168.113.24:80/api/solderingadjust.php",
            data:{myrequest:"xzquren",
                   myequipment:this.equipname,
                   username:this.name,
                   mydate:this.date
            },
             headers: {
    'Content-Type': 'application/json; charset=utf-8'
      }}).then((response)=>{
          
          this.mytext=response.data.mycall
              this.snackbar=true
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
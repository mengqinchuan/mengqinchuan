<template>
     <v-app>
        <v-main>
               <v-container fluid class="fill-height" align-start> 
            <v-row 
            justify="center"
            >
              
            <v-col cols="12"  justify="center">
                <v-row  justify="center"><h1 class="teal--text">上传数据</h1></v-row>
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
             color="teal"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" type="date" scrollable locale="zh" color="teal"> 
          <v-spacer></v-spacer>
          <v-btn text color="teal" @click="modal = false">取消</v-btn>
          <v-btn text color="teal" @click="$refs.dialog.save(date)">确认</v-btn>
        </v-date-picker>
      </v-dialog>
                </v-col>
            </v-row>
            <v-form v-model="valid" ref="form1">
           <v-row justify="center" align="center">
                  <v-col cols="2">
                      <v-select prepend-icon=" mdi-soldering-iron"
                      color="teal"
                      v-model="equipname"
                       :rules="equiprule"
                      required
                      label="选择设备"
                      :items="solders"/>
                  </v-col>
                 </v-row>
                  <v-row justify="center" align="center">
                  <v-col cols="2">
                 <v-text-field
                      label="实际温度"
                      name="Login"
                      prepend-icon="mdi-temperature-celsius"
                      type="text"
                      :rules="realrule"
                      required
                      color="teal"
                      v-model="realt"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="2">
                    <v-text-field
                      label="设置温度"
                      name="password"
                      prepend-icon="mdi-temperature-celsius"
                      type="text"
                      :rules="setrule"
                      required
                      color="teal"
                      v-model="sett"
                    ></v-text-field>
                  </v-col>
                   
                  <v-col cols="2">
                    <v-text-field
                      label="对地电阻"
                      name="password"
                      prepend-icon="mdi-omega"
                      type="text"
                      :rules="resrule"
                      required
                      color="teal"
                      v-model="reso"
                    ></v-text-field>
                  </v-col>
                    </v-row>
                 </v-form>
                   <v-row justify="center" align="center">
                  
                      <v-btn  dark color="teal" @click="scdata"><h2>日检确认</h2></v-btn>
                  
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
               realt:"350",
               sett:"350",
               reso:"0",
    name:"",
    equipname:"",
    getname:[],
    snackbar:false,
     modal: false,
      mytext:"",
      shwochart:false,
            valid:true,
            equiprule:[
                v => !!v || '设备号不能为空'
            ],
            realrule: [
        v => !!v || '实际温度不能为空',
        v => (v &&  (/^[0-9]*$/).test(v)) || '必须输入数字',
      ],
           setrule:[
             v=>!!v || '设置温度不能为空',
              v => (v &&  (/^[0-9]*$/).test(v)) || '必须输入数字',
           ],
            resrule:[
             v=>!!v || '对地电阻不能为空',
             v=>(v &&(/^[0-9]*$/).test(v))|| '必须输入数字',
           ]
        
        
  }),
   computed:{
   solders(){
                 return this.$store.state.soldernum;
             }
    },
    methods:{
        scdata(){
             if(!this.valid){
          this.$refs.form1.validate();
          }
          else{
              this.axios(
          {  method:"POST",
            url:"http://192.168.113.24:80/api/solderingadjust.php",
            data:{myrequest:"scsuju",
                   actualt:this.realt,
                   settem:this.sett,
                   resist:this.reso,
                   myequipment:this.equipname,
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
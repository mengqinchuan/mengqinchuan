<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
       <v-row justify="center" align="center">
         <v-col  
          cols="12"
              sm="6"
              md="3">
              
           <v-card max-width="500px" justify="center" img="@/assets/timg.jpg" raised>
           <v-overlay :value="alert"
           position: absolute>
           <v-btn v-if="btnalert" class="success" @click="alert=!alert"><h2>注册成功联系线长开通</h2></v-btn>
           <v-btn v-else class="warning" @click="alert=!alert"><h2>注册失败检查是否已经注册</h2></v-btn>
           </v-overlay>
            <v-toolbar  
            class="red" 
            dark 
            justify="center"
            >
            <v-spacer></v-spacer>
            <v-toolbar-title ><h1>申请账户</h1></v-toolbar-title>
            <v-spacer></v-spacer>
            </v-toolbar>
            <v-form v-model="valid"
            ref="form">
             <v-row justify="center">
               <v-col cols="8">
                 <v-text-field placeholder="姓名"
                 :rules="xmrule"
                 required
                 v-model="tjdata.name"
                 />
               </v-col>
             </v-row>
              <v-row justify="center">
               <v-col cols="8">
                 <v-text-field placeholder="工号"
                  required
                  :rules="ghrule"
                  v-model="tjdata.gh"
                 />
               </v-col>
             </v-row>
              <v-row justify="center">
               <v-col cols="8">
                 <v-text-field placeholder="密码"
                 required
                 :rules="mmrule"
                 v-model="tjdata.pwd"
                 type="password"
                 />
               </v-col>
             </v-row>
              <v-row justify="center">
               <v-col cols="8">
                 <v-select  
                 placeholder="产线"
                 :rules="cxrule"
                 :items="cxlist" 
                   item-text="产线"
                  item-value="产线"
                  v-model="tjdata.cx"
                 required>
                 </v-select>
               </v-col>
             </v-row>
            </v-form >
             <v-card-actions>
               <v-spacer/>
               <v-btn outlined color="red" fab v-on:click="change()"><h3>注册</h3></v-btn>
             </v-card-actions>
           </v-card>
         </v-col>
       </v-row> 
       <v-row justify="end">
           <v-col cols=1>
             <router-link to="/login2">返回登录</router-link>
           </v-col>
         </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name:"request",
  data(){
    return{
      alert:false,
      btnalert:true,
      valid:true,
      xzcx:'',
      tjdata:{request:"shenqing"},
      cxlist:[],
      xmrule:[
         v => !!v || '姓名不能为空',
        v => (v && v.length <= 6 && v.length>=2 && (/^[\u4E00-\u9FA5]*$/).test(v)) || '必须输入2位到6位内的汉字',
      ],
      ghrule: [v => !!v || '工号不能为空',
        v => (v && v.length == 8 && (/^[0-9]*$/).test(v)) || '必须输入8位数字',],
      mmrule: [v => !!v || '密码不能为空',
        v => (v && v.length <= 16 && v.length>=3 && (/^[A-Za-z0-9]*$/).test(v)) || '必须输入3位到16位内的数字或字母',],
      cxrule: [v => !!v || '产线不能为空',],
    }
  },
  methods:{
    change(){
      if(!this.valid)
      {this.$refs.form.validate();}
      else{
        const tjdata=this.tjdata;
        this.axios(
          {  method:"POST",
            url:"http://192.168.113.24:80/api/shenqing.php",
            data:{myrequest:"shenqing",tjdata},
             headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
            }
        ).then((response)=>{
          console.log(response);
          if(response.data == "sqsuccess")
          {
            this.alert=true;
            this.btnalert=true;
          }
          else
          {
            this.alert=true;
            this.btnalert=false;
          }
        }).catch(error=>{
            window.alert(error);
        });

       
  }
    }
  },

  mounted(){
     this.axios({
  method: "POST",
  url: 'http://192.168.113.24:80/api/gongweibiao.php',
  data: {
    myrequest:'cxlist'
  },
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
     })
       .then((response)=>{
      this.cxlist=response.data;
  })
   .catch(error=>{
   window.alert(error);
       });
   },
  }

</script>

<style lang="scss" scoped></style>

<template>
  <v-app>
    <v-app-bar app :color="getcolor[tab]" dark class="justify-center">
  
<v-spacer/>
     <h1>电烙铁日检</h1>
     <v-spacer/>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="white"></v-tabs-slider>
        
          <v-tab
            v-for="(item,i) in items"
            :key="i"
            @click="abs(i)"
          >
       {{item}}
          </v-tab>
           
        </v-tabs>
      </template>
  
      


    </v-app-bar>

    <v-main>
    <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: "App",

  components: {
   
  },
  data: () => ({
    items:["查询烙铁数据","上传电烙铁数据","线长确认"],
    ax:["/","adjustsc","adjustqr"],
    b:"",
    tab:"",
    getcolor:["primary","teal","deep-purple"]
  }),
 methods:{
   abs(i){
     
     this.b=i
    this.$router.replace(this.ax[i])
   }
 },
 
 mounted(){
    this.axios(
          {  method:"POST",
            url:"http://192.168.113.24:80/api/solderingadjust.php",
            data:{myrequest:"getsoldering"},
             headers: {
    'Content-Type': 'application/json; charset=utf-8'
      }}).then((response)=>{
        this.$store.commit('getnum',response.data)
 }).catch(error=>{
            window.alert(error);
        });
}
}

</script>

<template>
<div>
		<v-btn color="red" @click="_export"><h2>导出数据</h2></v-btn>

</div>
</template>

<script>
import XLSX from "xlsx";

export default {
    props:["data","head"],
	data() {
		return {
			
		
	}; },
	methods: {
		
		_export() {
          
         console.log(this.data)
         var abc=new Array()
         abc[0]=this.head
            this.data.forEach(element => {
                abc.push(Object.values(element))
            });
        
              
            // const a=this.head.push(this.data)
			/* convert state to workbook */
			const ws = XLSX.utils.aoa_to_sheet(abc);
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "固定资产");
			/* generate file and send to client */
			XLSX.writeFile(wb, "固定资产列表.xlsx");
		},
	
	}
};
</script>
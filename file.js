
function csvVerToHor() {

    if (!selectedFile) { alert("파일을 먼저 선택하고 확인하세요!!!"); }
    
    var vale_coll = [];
    var data = d3.csvParse(selectedFile)
    
    for (k in data[0]) {     
        // console.log(k, data[0])
        var vale_list = "";

        for (i= 0; i < data.length; i++) {
            val = data[i][k].replace(/\r|\n/g,"")
            console.log(k, i,"-----",val)
            vale_list = vale_list +","+ val
        }
        console.log(k, [vale_list])
        // console.log(k, vale_list)
        vale_coll.unshift(vale_list+'\r');    // 요소앞에 추가  
    }
    
    document.getElementById('txtOutput').value = vale_coll;
        
}
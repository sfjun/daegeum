//파일 만드는 함수--------------------------------------------------
function createFile()
{
    //text area에 기록된 text를 txt에 저장
    var txt= document.getElementById("txtOutput").value;

    var fnm= "test.csv";
    saveToFile_Chrome(fnm, txt)
    document.getElementById("txtOutput").innerHTML="저장되었습니다.show File 버튼을 누르면 확인할 수 있습니다.";

}

//http://www.gisdeveloper.co.kr/?p=5564 참조

function saveToFile_Chrome(fileName, content) {
    var blob = new Blob([content], { type: 'text/csv' });
    objURL = window.URL.createObjectURL(blob);
            
    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    var a = document.createElement('a');
    a.download = fileName;
    a.href = objURL;
    a.click();
} 



/*    https://developer.mozilla.org/ko/docs/Web/API/File_API/Using_files_from_web_applications#%ec%98%88%ec%8b%9c_%ea%b0%9d%ec%b2%b4_url%ec%9d%84_%ec%82%ac%ec%9a%a9%ed%95%98%ec%97%ac_%ec%9d%b4%eb%af%b8%ec%a7%80_%ed%91%9c%ec%8b%9c%ed%95%98%ea%b8%b0 참조
*/

const fileSelect = document.getElementById("fileSelect"), 
fileElem = document.getElementById("fileElem"),
fileList = document.getElementById("fileList");

var selectedFile = "";

fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
    fileElem.click();
    }
}, false);

function handleFiles(files) {

    if (!files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
    } else {
    fileList.innerHTML = "";
    const list = document.createElement("ul");
    fileList.appendChild(list);

    for (let i = 0; i < files.length; i++) {
        const li = document.createElement("li");
        list.appendChild(li);

        const img = document.createElement("img");
        img.src = window.URL.createObjectURL(files[i]);
        img.height = 60;
        img.onload = function() {
        window.URL.revokeObjectURL(this.src);
        }
        li.appendChild(img);
        const info = document.createElement("span");
        info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
        li.appendChild(info);
    }
}

for (let i = 0; i < files.length; i++) {
    const file = files[i];


    if (file.type.startsWith('image/')) { 

        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        // const preview=document.getElementById('preview');
        // preview.appendChild(img); // "preview"가 결과를 보여줄 div 출력이라 가정.

        const reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);

    } else if (file.type.startsWith('text/csv')) {

    var ffile = new FileReader();
    ffile.onload = () => {
        document.getElementById('txtInput').value = ffile.result;
        selectedFile = ffile.result;
    };
    ffile.readAsText(file);

    } else {
        // console.log(file.type)
        alert("이미지  또는 텍스트 파일만 가능해요")
    }

    }
}

function csvVerToHor() {

    if (!selectedFile) { alert("파일을 먼저 선택하고 확인하세요!!!"); }
    
    var vale_coll = [];
    var data = d3.csvParse(selectedFile)
    
    for (k in data[0]) {     
        // console.log(k, data[0])
        var vale_list = "";

        for (i= 0; i < data.length; i++) {
            val = data[i][k].replace(/\r|\n/g,"")
            // console.log(k, i,"-----",val)
            vale_list = vale_list +","+ val
        }
        // console.log(k, [vale_list])
        // console.log(k, vale_list)
        vale_coll.unshift(vale_list+'\r');    // 요소앞에 추가  
    }
    
    document.getElementById('txtOutput').value = vale_coll;
        
}


function csvToTable() {
    var ttdata = document.getElementById('txtOutput').value.split("\n")
    // if (!selectedFile) { alert("파일을 먼저 선택하고 확인하세요!!!"); }
    if (!ttdata) { alert("파일을 먼저 선택하고 확인하세요!!!"); }
         
       
    var table = document.createElement("TABLE");
        table.border = "1";
    var row = table.insertRow(-1);
    var col_title = "1c,2c,3c,4c,5c,6c,7c,8c,9c,10c,11c,12c,13c,14c"
        col_title = col_title.split(",") 

    // for (var i = 0; i < col_title.length; i++) {
    //     var headerCell = document.createElement("TH");
    //     headerCell.innerHTML = col_title[i];
    //     row.appendChild(headerCell);
    // }
    // console.log(table)
    

    for (var p= 0; p < ttdata.length; p++) {
        var tt_col = ttdata[p].split(",") 
        row = table.insertRow(-1);  

        for (var j = 0; j < tt_col.length; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = tt_col[j];
        }
    }    
    console.log(table)

    var dvTable = document.getElementById("team");
        dvTable.innerHTML = "테이블"
        dvTable.appendChild(table);    

}
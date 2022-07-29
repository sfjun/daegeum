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
    var ttdata = document.getElementById('txtOutput').value
    // if (!selectedFile) { alert("파일을 먼저 선택하고 확인하세요!!!");}
    if (!ttdata) { return alert("파일을 먼저 선택하고 확인하세요!!!"); }
         
    var ttdata = document.getElementById('txtOutput').value.split("\n")
       
    var table = document.createElement("TABLE");
        table.border = "1";

    // var row = table.insertRow(-1);
    // var col_title = "1c,2c,3c,4c,5c,6c,7c,8c,9c,10c,11c,12c,13c,14c"
    //     col_title = col_title.split(",") 

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


// svg위에 테이블 태그를 사용하여 활용, 출처: https://using.tistory.com/57 [황군'story:티스토리]
function csvToTable2() {
    data = new Array();
    var ttdata = document.getElementById('txtOutput').value
    // if (!selectedFile) { alert("파일을 먼저 선택하고 확인하세요!!!");}

    if (!ttdata) { return alert("파일을 먼저 선택하고 확인하세요!!!"); }
         
    var ttdata = ttdata.split("\n")
       
    for (var yy= 0; yy < ttdata.length; yy++) {
        tdata = {};
        var tt_yy = ttdata[yy].split(",") 
        // console.log(yy*10, ttdata[yy])
        // row = table.insertRow(-1);  
        
        for (var xx = 0; xx < tt_yy.length; xx++) {
            var col_no = `col${String(xx)}`;
            tdata = {col_no : tt_yy[xx]}
            data.push(tdata)    
        }       
        
    }    
    // console.log(d3.keys(data[0]);

    d3.select("body")
    .append("table")
    .style("border-collapse", "collapse")
    .style("border", "2px black solid")
    .append("tr")
    .attr("class", "tr_head")
    .selectAll("td")
        .data(d3.keys(data[0]))
        .enter().append("td")
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("text-align", "center")
        .on("mouseover", function(){ d3.select(this).style("background-color", "aliceblue")})
        .on("mouseout", function(){ d3.select(this).style("background-color", "white")})
        .text(function(d) { return d.text; } )
        .style("font-size", "12px");
}

function csvToSvg() {
    data = new Array();
    var ttdata = document.getElementById('txtOutput').value
    if (!ttdata) { return alert("파일을 먼저 선택하고 확인하세요!!!"); }

    var ttdata = ttdata.split("\n")
        
    for (var yy= 0; yy < ttdata.length; yy++) {
        tdata = {};
        var tt_yy = ttdata[yy].split(",") 
        // console.log(yy*10, ttdata[yy])
        // row = table.insertRow(-1);  
        
        for (var xx = 0; xx < tt_yy.length; xx++) {
            var tt_xx = tt_yy[xx];
            tdata = {"x": xx*50+ 50, "y": yy*50 + 50  , "text": tt_xx}
            data.push(tdata)    
        }       
        
    }   


    var svg = d3.select("body")
        .append("svg")
        .attr("width", 2100)
        .attr("height", 2900);

    var g = svg.selectAll('#mygraph')
        .data(data)
        .enter()
        .append("g")
        .attr("class","someClass")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    g.append("rect")
        .attr("width", 50)
        .attr("height", 50)
        .attr("stroke", "red")
        .style("fill", "skyblue");
        

    g.append("text")
        .style("fill", "black")
        .attr("font-size" ,"1em")
        .attr("x", function(d) { return d.x + d.width/2;})
        .attr("y", function(d) { return d.y + d.height/2;})
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text(function(d) {
        return d.text;
        })


}


// https://stackoverflow.com/questions/64723131/how-can-i-center-text-on-a-d3-js-svg-grid-rect

function grid() {
    sdata = new Array();
    var ttdata = document.getElementById('txtOutput').value
    
    if (!ttdata) { return alert("파일을 먼저 선택하고 확인하세요!!!"); }
    ttdata = ttdata.split("\n") // csv 파일을 읽은 것 처럼 
            
    for (var yy= 0; yy < ttdata.length; yy++) {
        tdata = new Array();
        var tt_yy = ttdata[yy].split(",") 
        
        for (var xx = 0; xx < tt_yy.length; xx++) {
            // 1차배열로 적재
            tdata.push(tt_yy[xx])               
        }
        // 2차배열로 적재
        sdata.push(tdata)       
    }    

    function gridConfig() {
        var data = new Array();
        var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
        var ypos = 80;
        var width = 80;
        var height = 80;
        var bakja = 4;
        var click = 0;
    
        for (var row = 0; row < sdata.length; row++) {
            data.push(new Array());

            for (var column = 0; column < sdata[row].length; column++) {
                data[row].push({
                rowNum: row + 1,
                columnNum: column + 1,
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                chord: sdata[row][column]
                })
                // increment the x position. I.e. move it over by width variable
                xpos += width;
            }
            // reset the x position after a row is complete
            xpos = 1;
            // increment the y position for the next row. Move it down height variable
            ypos += height;
        }        
        console.log(data) 
        return data;
    }
    
    var gridData = gridConfig();
        
    d3.select("#grid").html(""); // 버튼 클릭시 계속생기는 것은 방지
            
    var grid = d3.select("#grid")
        .append("svg")
        .attr("width", "2100px")
        .attr("height", "2200px");

    var row = grid.selectAll(".row") // select .row val from data
        .data(gridData)
        .enter()
        .append("g")
        .attr("class", "row")
        .append("g")
        .attr("class", "column");

    var column = row.selectAll(".square")
        .data(function(d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("class", "square")
        .attr("x", function(d) {
            return d.x;
        })
        .attr("y", function(d) {
            return d.y;
        })
        .attr("width", function(d) {
            return d.width;
        })
        .attr("height", function(d) {
            return d.height;
        })
        .style("fill", "#fff")   
        .style("stroke", "#222");

        
    var columnText = row.selectAll(".column") // select .column val from data
        .data(function(d) {
            return d;
        })
        .enter()
        .append("text")
        .text(function(d) {
            return d.chord;
        })
        .attr("rowNum", function(d) {
            return d.rowNum;
        })
        .attr("columnNum", function(d) {
            return d.columnNum;
        })
        .attr("x", function(d) {
            return d.x + d.width / 2;
        })
        .attr("y", function(d) {
            return d.y + d.height / 2;
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("fill", "blue")
        .style("font-weight", "bold")
        .style("font-size", "24");

}

function grid_원본() {
    function gridConfig() {
        var data = new Array();
        var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
        var ypos = 80;
        var width = 80;
        var height = 80;
        var click = 0;
    
        for (var row = 0; row < 8; row++) {
        data.push(new Array());
        for (var column = 0; column < 8; column++) {
            data[row].push({
            rowNum: row + 1,
            columnNum: column + 1,
            x: xpos,
            y: ypos,
            width: width,
            height: height,
            chord: randomChord()
            })
            // increment the x position. I.e. move it over by width variable
            xpos += width;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down height variable
        ypos += height;
        }
        return data;
    }
  
  function randomChord() {
    var textArray = ['Cm', 'D7', 'Gm', 'Cdim', 'Am', 'Em'];
    return textArray[Math.floor(Math.random() * textArray.length)];
  }
  
  var gridData = gridConfig();
  
  var grid = d3.select("#grid")
    .append("svg")
    .attr("width", "810px")
    .attr("height", "890px");
  
  var row = grid.selectAll(".row") // select .row val from data
    .data(gridData)
    .enter().append("g")
    .attr("class", "row")
    .append("g")
    .attr("class", "column");
  
  var column = row.selectAll(".square")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("class", "square")
    .attr("x", function(d) {
      return d.x;
    })
    .attr("y", function(d) {
      return d.y;
    })
    .attr("width", function(d) {
      return d.width;
    })
    .attr("height", function(d) {
      return d.height;
    })
    .style("fill", "#fff")
    .style("stroke", "#222");
  
  var columnText = row.selectAll(".column") // select .column val from data
    .data(function(d) {
      return d;
    })
    .enter()
    .append("text")
    .text(function(d) {
      return d.chord;
    })
    .attr("rowNum", function(d) {
      return d.rowNum;
    })
    .attr("columnNum", function(d) {
      return d.columnNum;
    })
    .attr("x", function(d) {
      return d.x + d.width / 2;
    })
    .attr("y", function(d) {
      return d.y + d.height / 2;
    })
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("fill", "red")
    .style("font-weight", "bold")
    .style("font-size", "24");
}


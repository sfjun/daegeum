
// var color = ['skyblue', 'lime', 'yellowgreen', 'blueviolet', 'chocolate', 'darkgreen', 'yellow']


$(document).ready(function(){
    // 부모창에서 값가져오기
    getMid()

     
});

function getMid() {
//  childForm.xyzOutput.value = opener.window.document.getElementById("txtOutput").value

  childForm.xyzOutput.value = 
 `w:1장
林潢- ---/ㄴ/( 南 -, 潢/仲/-- -南-, 
汰 ---/N/ 潢 -, 南汰- ---/ㄱ/ 南)林- -,
潢南- - ^南 -), 林潢- -( 林 -,
南)林- --ㄱ/南/, 潢 - - -

w:2장
林潢- ^汰 --/N/Z 南 - - -)-林, 潢 --/N/南,
ㄷ汰 --/N/潢, ㄷ林 --/ㄱ/南,
ㄷ汰 --/N/潢,  南潢汰潢 ㅅ潢 -`
  
}

function setMid() {
  opener.window.document.myform.mid.value = childForm.mid.value;
}

function wClose() {
  opener.window.document.myform.mid.value = childForm.mid.value;
  opener.window.document.myform.pwd.focus();
  window.close();
}

var width = 60;
var height = 60;
// var bakjaTime = 1000;
var bakjaTime ='';
//console.log(bakjaTime)

function txtTodata() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	// var width = 60;
	// var height = 60;

    // typeof = string
    // 가로쓰기 전환된 율명 읽어오기, 1각, 2각, 3각...
    var gakString = document.getElementById('txtOutput').value; 
    
    // 각별로 정리되어 있지 않고 2음절씩 구부하여 가독성 있게 구성된 단위로 분리
    var gangString = gakString.split("\n")  // 2마디(1강, 2강,,,)별 추출,여기서는 2개 쉼표가 한줄로  
    var jungGans = [];
    
    // " "가 박자 구분이라 박자별로 절단하여 배열화
    gangString.forEach(function(gang) {
        if (gang) {
            jungGans.push(gang.split(" "))
        }      
    })

    var title = "";
    // 그리드 구성을 위해, x,y 좌표 높이 넓이 설정
	// iterate for rows	, 5
    // console.log("j-len", jungGans.length)

    //박번호 부여
    var bakSerial = 0;

	for (var row = 0; row < jungGans.length ; row++) {
		data.push(new Array());
        // console.log("rows", row, jungGans[row])
		// console.log("row", hData3[row].length, hData3[row] )
		// iterate for cells/columns inside rows
        var rowCol = "";
		for (var column = 0; column < jungGans[row].length; column++) {
            // console.log("row-jungGans", row, jungGans)
            // null 값을 경우 pass
            //if ((!jungGans[row]) || (!jungGans[row][column])) continue;
            
            if (!jungGans[row][column]) continue;
            // console.log("bakSerial", bakSerial);
            rowCol = jungGans[row][column];
            
            data[row].push({
                bakno: bakSerial,
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                xyz: jungGans[row][column],
                xyzbits: bakTobit(bakSerial, rowCol)
            });
            // console.log("data", data)

			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
            bakSerial ++;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height + 5;
        //rowCol.startsWith("w" || "W") ? ypos += height + 20: ypos += height + 5; 
        //( row === jungGans.length -1) ? ypos += height + 3: ypos += height + 3; 	
	}
    //console.log("data", title , data );
    //console.log("ti", title)
    return data;
	//return { "title": title, "gridData": data };
}

function bakTobit(no, hanbak) {  //한박시작
    // console.log("feeLen", hanbaksub.xyz)
    var hanBox =[]
    var bitBox = []
    bakjaTime = document.getElementById('bakSec').value;

    // 한박에 대한 정규식 적용 "-" 제외
    //전치어[], \W: 영문자외 모두 +? 오직한개, [후치어] * 없거나 한개 이상
    ///gu, g: 전역, u:unicode
    //[임, 황, -]
    var bits = hanbak.match(/[ㄴ^ㄷㅅ]?[\WㄱNZ]+?[\(\)\/,\|]*/gu)         
    // console.log("ffaArr", hanbaksub.xyz, hanbaksep)
    // 3

    var xpos = 0;
    // 한박 나누기 처리 / 있으면 반박으로 bitsCnt 갯수를 줄여함, 나중 //에 대한 반영은 미포함
    hanbak.indexOf("/") > 0 ? bitsCnt = bits.length - 1 : bitsCnt = bits.length;
      
    // [임, 1/3],[황, 1/3],[-,1/3]
    bits.forEach(function(part, i) {
        var bakja = 0;
        
        //반박처리할 경우 셋잇단음 기준으로 
        // (part.indexOf("/") > 0) ? bakja = width/bitsCnt/2 : bakja = width/bitsCnt;
        if (part.indexOf("/") > 0) {
            bakja = width/bitsCnt/2;
            part = part.replace("/", "");
        } else {
            bakja = width/bitsCnt;
        }
        
        var durr = (bakja == width) ?  bakjaTime : bakjaTime * bakja/width;        

        // ? xpos = 0 :  xpos += bakja;
        bitsCnt ==1 ? xpos = width : "" ;        

        if (i == 0) {
            bitBox.push({
                bakno: no,
                xyz: part, 
                bakja: bakja, 
                xpos: 0,
                dur: durr,
                bittime : bakjaTime * (0 / width)
            });
            xpos += bakja;    
        } else {
            bitBox.push({
                bakno: no,
                xyz: part, 
                bakja: bakja, 
                xpos: xpos,
                dur: durr,
                bittime : bakjaTime * (xpos / width)
            });
            xpos += bakja;  //반영후에 값을 반영하기
        }
        // console.log(part, 1 / partcnt)                    
    })
    hanBox.push(bitBox)
    return hanBox;
    // console.log("hanBox", hanBox)
}

// 중복 다중 실행 방지 
// var gridOx = true;

// var gColumn = [];

function runGrid() {
    // if (!gridOx) return 
    var gridData = txtTodata();
    // //var { title, gridData } = txtTodata();
    // //console.log("title", title)    
    // //console.log("gridData", gridData)

    // //중복 방지
    // gridOx = false;

    // svg  판 클리어
    d3.select("#grid").selectAll("*").remove();
    
    var color = d3.scaleOrdinal()
        .domain(gridData)
        .range(d3.schemeSet2);

    // svg 1개 생성
    var grid = d3.select("#grid")
        .append("svg")
        .attr("width","600px")
        .attr("height","910px");
            
    //1장에 있는 전체 줄 만큼 여러줄 생성
    var gRow = grid.selectAll(".row")
        .data(gridData)
        .enter().append("g")
        .attr("class", "row");

    //각 줄에 컬럼갯수 만큼 g 생성, function(d) { return d; } 이 중요  
    var gColumn = gRow.selectAll(".column")
        .data(function(d) { return d; })
        .enter().append("g")
        .attr("class", "column"); 
     
    //console.log("col", column);
    // 생성된 g에 rect 갯수 생성 

    gColumn.append("rect")
        .attr("class",function(d) { 
            if (d.xyz.startsWith("w" || "W")) {
                return "titleBak"; } else { return "bak"; } })
        // .attr("class","square")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        // .attr("width", function(d) { return d.width; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", "#fff")
        .style("stroke", (function(d) {
            if (!d.xyz.startsWith("w" || "W")) { return "#222";
            } else { return "#fff"; }    
        }))
        
    gColumn.append("text")
        .attr("x", function(d) { return d.x  + d.width/2; })
        .attr("y", function(d) { 
            if (d.xyz.startsWith("w" || "W")) { return d.y + d.height*1/2;
            } else { return d.y + d.height*1/4; } })
        // .attr("y", height / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.xyz; })
        .style("text-anchor", "middle")
        .style("font-size", 15);

    var gSubcolumn = gColumn.append("g")
        .attr("class", "subcolumn")
        .selectAll(".bit")
        .data(function(d) { return d.xyzbits[0]; })
        .enter();
        
    gSubcolumn.append("rect")
        .attr("class",function(d) { 
            if (d3.select(this.parentNode).datum().xyz.startsWith("w" || "W")) {
                return "title"; } else { return "bit"; } })  
        //.attr("class", function(d) { console.log("d",d.xyz); return "bit"})          
        .attr("x", function(d) { return d3.select(this.parentNode).datum().x + d.xpos ; })
        .attr("y", function(d) { return d3.select(this.parentNode).datum().y + 30 ; })
        //.attr("width", function(d) { return d3.select(this.parentNode).datum().width/2; })
        .attr("width", function(d) { return 0.3; }) //시작값을 죽여서        
        // .attr("width", function(d) { return d.bakja; } )
        .attr("height", function(d) { return d3.select(this.parentNode).datum().height/2; })
        // .style("fill", function(d,i) { return color(d.bakno%12); }) // 한박기준으로 컬러링
        // .style("fill", function(d,i) { console.log("i", i); return color((d.bakno +i)%24); }) // bit 기준으로 컬러링
        .style("fill", function(d,i) { return color(Math.random()%24); }) // 랜듬하게 bit 기준으로 컬러링
        
        .style("stroke", "#222");

    // title 클래스를 제거하여 title의 bit를 제거
    gSubcolumn.selectAll(".title").remove();
     
  
    // bit text 추가하기
    gSubcolumn.append("text")
        .attr("class",function(d) { 
            if (d3.select(this.parentNode).datum().xyz.startsWith("w" || "W")) {
                return "titleText"; } else { return "bitText"; } })        
        .attr("x", function(d) { return d3.select(this.parentNode).datum().x + d.xpos + d.bakja/2; })
            
        .attr("y", function(d) { 
            if (d3.select(this.parentNode).datum().xyz.startsWith("w" || "W")) { 
                return d3.select(this.parentNode).datum().y + 
                    d3.select(this.parentNode).datum().height*3/4; } 
            else { return d3.select(this.parentNode).datum().y + 
                d3.select(this.parentNode).datum().height*3/4; } })
        // .attr("y", height / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.xyz; })
        .style("text-anchor", "middle")
        .style("font-size", 10);

    gSubcolumn.selectAll(".titleText").remove();    

} // function end

var timerId = "";
var interruptIndex = 0

function play() {

    // 1박시간 가져오기
    var t = document.getElementById('playId');
    // var t = $('playId');
    
    
    if (t.value == "Play") {
        // 플레이 시작       
        transitWidth();
        // 버튼 변경
        t.value= "Stop";

    } else if (t.value == "Stop") {
        // bit, bitText 중지
        d3.select("#grid").selectAll(".bit").interrupt();
        d3.select("#grid").selectAll(".bitText").interrupt();
        // 버튼 변경
        t.value= "Resume";

    } else if (t.value == "Resume") {
        // 플레이 재시작
        transitWidth();
        // 버튼 변경
        t.value= "Stop";
    }

    function transitWidth(inDex = 0) {    
 
    // const oldTime = Date.now();

    // timerId = setInterval(() => {
    //     const currentTime = Date.now();
    //     // 경과한 밀리초 가져오기
    //     const diff = currentTime - oldTime;
        
    //     // 초(second) 단위 변환하기
    //     const sec = Math.floor(diff / 1000);
        
    //     // HTML에 문자열 넣기
    //     document.querySelector('#timelog').innerHTML = `${sec}초`;
    // }, 1000);


    // 플레이된 bit와 bitText가 플레이되면 class가 played로 변경되므로
    // 플레이안된 것만 가져오기, 
    const pBit = d3.select("#grid").selectAll(".bit");
    const pBitText = d3.select("#grid").selectAll(".bitText");

    bakjaTime = document.getElementById('bakSec').value;
    console.log("bakjaTime", bakjaTime)

    pBit.transition()
        // .duration(bakjaTime)
        .duration(function(d,i){ // console.log("d", d); 
            return d.dur;
            // if (d.bakja == width) {
            //     // console.log((d.bakno-1) * bakjaTime );
            //     return bakjaTime ;
            // } else { 
            //     // console.log((d.bakno- 1) * bakjaTime + d.bittime);
            //     return d.bittime;
            // }    
         })

        // .delay(function(d,i){ return i * 1000;}) 
        .delay(function(d,i){ console.log("d", d); 
            if (d.bakja == width) {
                console.log((d.bakno-1) * bakjaTime );
                return d.bakno * bakjaTime ;
            } else { 
                console.log((d.bakno- 1) * bakjaTime + d.bittime);
                return (d.bakno- 1) * bakjaTime + d.bittime;
            }    
         }) 
        // .on("start", function(d,i) { $('#baklog').text(`${d.xyz}`);})
        .attr("width", function(d,i){ return d.bakja;})
        .attr("class", "played")
        // .attr("play", "played")
        // .style("fill", "skyblue")
        // .on("end",function() { d3.select(this).remove()});   
        // .on("interrupt", function(d,i) { //console.log("this", this, i);
        //     interruptIndex = i;
        //     // d3.select(this).attr("classed", "played")
        //     // local.set(this, +d3.select(this).attr("width"))
        //     // local.set(this, i)
        // })
        .on("end", function(d,i) { $('#baklog').text(`${d.bakno}박`); });     
        ;       
    
    
    // var pBitText =d3.select("#grid").selectAll(".bitText")
        //.transition()
        // .attr("width", "0")

    pBitText.transition()
        .duration(bakjaTime)
        // .delay(function(d,i){ return i * 1000;}) 
        .delay(function(d,i){ //console.log("d.bakno", i, i * bakjaTime + d.bittime); 
            return i * bakjaTime + d.bittime;            
         }) 
        // .on("start", function(d,i) { $('#baklog').text(`${d.xyz}`); console.log("end", d.xyz);})
        // .attr("width", function(d,i){ console.log("d", d); return d.bakja;})
        // .style("fill", "skyblue")
        // .duration(500)
        .style("font-size", 18)
        .attr("class", "played")
        // .on("end",function() { d3.select(this).remove()})
        
        .transition()
        .delay(bakjaTime/bakjaTime)
        .style("font-size", 10)
        // .on("end",function() { d3.select(this).remove()});  
        .on("interrupt", function(d,i) { //console.log("this", this, i);
            interruptIndex = i;
            // d3.select(this).attr("classed", "played")
            // local.set(this, +d3.select(this).attr("width"))
            // local.set(this, i)
        })           
        ;

    }         

}


function runPie() {    
    if (!gridOx) return; 
    var lines = txtTodata();
    // console.log("lines", lines)
    gridOx = false;

    // console.log("lines", lines)
    // var data = {임: 1/3, 황: 1/3, "-1":1/6, "-2":1/6}
    // var data = [["임", 1/3], ["황", 1/3], ["-", 1/6], ["-", 1/6]]
    
    // [음, %] 자료 저장
    var lineBox = [];
    // console.log("gridData, 갯수", lines.length, lines) // 5라인
    lines.forEach(function(line) {
        // console.log("linexyz", line[0]);
        // console.log("linexyz", line[0].xyz);
        var hanBox = [];
        if (line[0].xyz.startsWith("w")) {  //w시작하는 문서 찾기
            $('#piTitle').text(line[0].xyz) // 제목으로 div에 처리
        } else {
            //임황-, ---, ---- 
            line.forEach(function(hanbak) {  //한박시작
                // console.log("feeLen", hanbaksub.xyz)
                var bitBox = []
                // 한박에 대한 정규식 적용 "-" 제외
                //전치어[], \W: 영문자외 모두 +? 오직한개, [후치어] * 없거나 한개 이상
                ///gu, g: 전역, u:unicode
                //[임, 황, -]
                var bits = hanbak.xyz.match(/[ㄴ^ㄷㄱ]?[\WㄱN]+?[\(\)\/,]*/gu)         
                // console.log("ffaArr", hanbaksub.xyz, hanbaksep)
                // 3
                var bitsCnt = bits.length;  //park 갯수

                // [임, 1/3],[황, 1/3],[-,1/3]
                bits.forEach(function(part) {
                    //반박처리할 경우 셋잇단음 기준으로 
                    if (part.indexOf("/") > 0) {
                        bitBox.push([part, 1/bitsCnt/2])
                    } else {
                        bitBox.push([part, 1/bitsCnt])
                    }                    
                    // console.log(part, 1 / partcnt)                    
                })
                hanBox.push([bitBox])
                // console.log("hanBox", hanBox)
            })
            lineBox.push(hanBox)                
        }      

    })    
    playControll(lineBox)    
}

function playControll(lines) {
    // console.log("라인박스",lines)
    //console.log("lines", lines)
    lines.forEach(function(line) {
        line.forEach(function(hanbaks) {
            // console.log(hanbaks)
            hanbaks.forEach(function(hanbak) {
               // console.log("hanbak", hanbak)
                //pie 챠트 적용시
                // runPie(hanbak); 
                runPie2(hanbak);
            })
        })
    })    
}


function runPie2(data) {
    // set the dimensions and margins of the graph
    var width = 150
        height = 150
        margin = 10

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'

    var svg = d3.select("#my_dataviz")
        .append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    // Create dummy data

    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(d3.schemeSet2);
    
    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return d.value[1]; })
    // .value(function(d) {return d.value; })
    
    var data_ready = pie(d3.entries(data))
    // console.log("data_ready",data_ready)
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg.selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
            .attr('d', arcGenerator)
            //.attr('fill', function(d){ return(color[d.data.value[0]]) })
            //.attr('fill', function(d){ console.log("d.data.key", d.data.key); return(color[d.data.key]) })
            .attr('fill', function(d){ return(color(d.data.key)) })     
            //.attr('fill', "skyblue")
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg.selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function(d){ return d.data.value[0]})
        // .text(function(d){ return "grp " + d.data.key})
            .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", 20)

}


function runChart() {
    // var data = [0.33, 0.33, 0.33];
    var dataOri = [['林', 0.3333333333333333], ['潢', 0.3333333333333333], ['-', 0.3333333333333333]]
    var data =[]
    var dataTxt = [];
    
    dataOri.forEach(function(cur) {
        data.push(cur[1])
        dataTxt.push(cur[0])
    });    
    // console.log(data, dataOri)
    draw(data, dataTxt);
}

function draw(data, dataTxt) {

    // 색깔 초이스
    // (6)['#d53e4f', '#fc8d59', '#fee08b', '#e6f598', '#99d594', '#3288bd']
    //let colors = colorbrewer.Spectral[data.length];
    // console.log("color", colors) 
    
    let sizes = {
        innerRadius: 50,
        outerRadius: 100
    };
    
    // 박자관점으로 한박에 2초
    let durations = {
        entryAnimation: 2000
    };

    //기존항목 지우기?
    d3.select("#chart").html("");

    let generator = d3.pie()
        .sort(null);        
    // console.log("gen", generator)

    // 각 조각별로 startAngle, endAngle 생성 됨
    // {data:, value:, startAngle:0, endAngle:} 
    let chart = generator(data);
    // console.log("chart", chart)
    
    //텍스트 값추가하기
    // {data:, value:, startAngle:0, endAngle:, xyz:} 
    dataTxt.forEach(function(txt, i) {
        chart[i]['xyz'] = txt;
        
    })
    // console.log("chart", chart)

    let arc = d3.arc();
    //console.log(arc)

    // path 생성, 색깔지정 
    let arcs = d3.select("#chart")
        .append("g")
            .attr("class", "gClass")
            .attr("transform", "translate(100, 100)")
        .selectAll("path")
        .data(chart)
        .enter()
        .append("path")
            .attr("d", arc)
            .style("fill", (d, i) => color[i]);

    // https://gist.github.com/cricku/9af3b270bc2ac5d860ecd44da2471dc2
            
    let arcsSs = d3.select("#chart")
        .append("g")
              .attr("transform", "translate(100, 100)")
        .selectAll("path")
        .data(chart)
        .enter()
        .append("text")
            // .attr("transform", function(d) { return "translate(" + arcs.centroid(d) + ")";  })
            // .attr("transform", function(d) {
            //     var _d = arc.centroid(d);
            //     _d[0] *= 1.5;	//multiply by a constant factor
            //     _d[1] *= 1.5;	//multiply by a constant factor
            //     return "translate(" + _d + ")";
            // })
            .attr("dy", ".50em")
            .style("text-anchor", "middle")
        .text(function(d) { 
           // console.log("d", d.xyz)
            return d.xyz;
        });

    // console.log("arcs", arcs)

    let angleInterpolation = d3.interpolate(generator.startAngle()(), generator.endAngle()());
    // console.log("각인터폴", angleInterpolation)
    let innerRadiusInterpolation = d3.interpolate(0, sizes.innerRadius);
    let outerRadiusInterpolation = d3.interpolate(0, sizes.outerRadius);

    
    arcs.transition()
        .duration(durations.entryAnimation)
        .attrTween("d", d => {
            let originalEnd = d.endAngle;
            return t => {
                let currentAngle = angleInterpolation(t);
                if (currentAngle < d.startAngle) {
                    return "";
                }
                d.endAngle = Math.min(currentAngle, originalEnd);
                return arc(d);
            };
        });

    d3.select("#chart")
        .transition()
        .duration(durations.entryAnimation)
        .tween("arcRadii", () => {
        return t => arc
            .innerRadius(innerRadiusInterpolation(t))
            .outerRadius(outerRadiusInterpolation(t));
        });

}    
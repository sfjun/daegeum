
$(document).ready(function(){
    getMid()
     
});

function getMid() {
  childForm.xyzOutput.value = opener.window.document.getElementById("txtOutput").value
  
}

function setMid() {
  opener.window.document.myform.mid.value = childForm.mid.value;
}

function wClose() {
  opener.window.document.myform.mid.value = childForm.mid.value;
  opener.window.document.myform.pwd.focus();
  window.close();
}

function txtTodata() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 60;
	var height = 60;

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
    
    // 그리드 구성을 위해, x,y 좌표 높이 넓이 설정
	// iterate for rows	
	for (var row = 0; row < jungGans.length; row++) {
		data.push(new Array());
		// console.log("row", hData3[row].length, hData3[row] )
		// iterate for cells/columns inside rows
		for (var column = 0; column < jungGans[row].length; column++) {
            // console.log("row-jungGans", row, jungGans)
            if ((!jungGans[row]) || (!jungGans[row][column])) continue; // null 값일 경우 pass
            var rowCol = jungGans[row][column];

            //console.log("rowCol", rowCol)
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
                xyz: jungGans[row][column],
                xyzbits: bakTobit(rowCol)
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}


function bakTobit(hanbak) {  //한박시작
    // console.log("feeLen", hanbaksub.xyz)
    var hanBox =[]
    var bitBox = []
    // 한박에 대한 정규식 적용 "-" 제외
    //전치어[], \W: 영문자외 모두 +? 오직한개, [후치어] * 없거나 한개 이상
    ///gu, g: 전역, u:unicode
    //[임, 황, -]
    var bits = hanbak.match(/[ㄴ^ㄷ]?[\WㄱN]+?[\(\)\/,]*/gu)         
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
    hanBox.push(bitBox)
    return hanBox;
    // console.log("hanBox", hanBox)
}

var gridOx = true;

function runGrid() {
    if (!gridOx) return 
    var gridData = txtTodata();
    // console.log("gridData", gridData)
    gridOx = false;


// I like to log the data to the console for quick debugging
// console.log(gridData);

    var grid = d3.select("#grid")
        .append("svg")
        .attr("width","510px")
        .attr("height","510px");

    var row = grid.selectAll(".row")
        .data(gridData)
        .enter().append("g")
        .attr("class", "row");    
    
    var column = row.selectAll(".square")
        .data(function(d) { return d; })
        .enter();
    
    //console.log("col", column);

    column.append("rect")
        .attr("class","square")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", "#fff")
        .style("stroke", "#222");
    
    column.append("text")
        .attr("x", function(d) { return d.x  + d.width/2; })
        .attr("y", function(d) { return d.y + d.height*1/4; })
        // .attr("y", height / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.xyz; })

        .style("text-anchor", "middle")
        .style("font-size", 18);  

    var subRow = column.selectAll(".gsubrow")
        .data(function(d) { console.log(d.xyzbits[0]); return d.xyzbits[0]; })
        .enter().append("g")
        .attr("class", "gsubrow");    
        
/*
    var subColumn = column.selectAll(".box")
    .data(function(d) { return d.xyzbits[0]; })
    .enter();

    //console.log("col", column);

    subColumn.append("rect")
        .attr("class","box")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", "#fff")
        .style("stroke", "#222");
*/    

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

var color = ['skyblue', 'lime', 'yellowgreen', 'blueviolet', 'chocolate', 'darkgreen', 'yellow']

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
        .text(function(d) { console.log("d", d.xyz)
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
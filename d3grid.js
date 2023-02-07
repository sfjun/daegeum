
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

function gridData1() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 50;
	var height = 50;

    var hData = document.getElementById('txtOutput').value; // typeof = string
    // hData = hData.replace(/\r|\n/g,"")  //엔터, 리턴캐리지 제거하여 문자열로 변환
    // var hData2 = hData.split("//")

    var hData2 = hData.split("\n")
 
    var hData3 = []
    
    hData2.forEach(function(fe){
        hData3.push(fe.split(" "))
    })

    // console.log("hd3",hData3)
    // console.log("hd3-length",hData3.length)
   
    // for (let i= 0; i < hData2.length; i= i++) {
    //     console.log(hData2[i])
    //     // hData3.push(hData2[i].split(" "))  //변환된 문자열을 20개씩 짜른 string을 Arrary로 변환       
    // }
    
    //console.log("hdata 엔터", hData3)
    
	// iterate for rows	
	for (var row = 0; row < hData3.length; row++) {
		data.push( new Array() );
		// console.log("row", hData3[row].length, hData3[row] )
		// iterate for cells/columns inside rows
		for (var column = 0; column < hData3[row].length ; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
                xyz: hData3[row][column]
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


var gridOx = true;

function txtGrid() {
    if (!gridOx) return 
    var gridData = gridData1();
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
        .enter()
        
    column.append("rect")
        .attr("class","square")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", "#fff")
        .style("stroke", "#222");
    
    column.append("text")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y + 25; })
        // .attr("y", height / 2)
       // .attr("dy", ".15em")
        .text(function(d) { return d.xyz; })
        // .style("text-anchor", "middle")
        .style("font-size", 13);    


}


function txtPie() {    
    if (!gridOx) return; 
    var gridData = gridData1();
    gridOx = false;

    // console.log("gridData",gridData)
    // alert("sfsf")
    // set the dimensions and margins of the graph
    // var width = 450
    //     height = 450
    //     margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    // var radius = Math.min(width, height) / 2 - margin

    // var data = {임: 1/3, 황: 1/3, "-1":1/6, "-2":1/6}
    // var data = [["임", 1/3], ["황", 1/3], ["-", 1/6], ["-", 1/6]]
    
    gridData.forEach(function(fe){
        // console.log("gD", fe )
        // var name = "W"

        if (fe[0].xyz.startsWith("w")) {  //w시작하는 문서 찾기
            // alert(fe[0].xyz);
            $('#piTitle').text(fe[0].xyz) //
        } else {
            fe.forEach(function(fee) {
                // console.log("feeLen", fee.xyz)
                var feeArr = [...fee.xyz]
                feeArr.forEach(function(ffa){
                    console.log("ffa", ffa)
                })
            })
        }
            
            // $('#test').val('원하는 값');
            // str.startsWith(name)

    })

    // pieRun(data);

}
function pieRun(data) {
    // set the dimensions and margins of the graph
    var width = 450
        height = 450
        margin = 40

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
    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.value[0])) })
        // .attr('fill', function(d){ console.log("d.data.key", d.data.key); return(color(d.data.key)) })
        // .attr('fill', "skyblue")
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function(d){ return "grp " + d.data.value[0]})
    // .text(function(d){ return "grp " + d.data.key})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 25)

}
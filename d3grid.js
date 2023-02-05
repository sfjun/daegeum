
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
	
    hData = hData.replace(/\r|\n/g,"")  //엔터, 리턴캐리지 제거하여 문자열로 변환

    var hData2 = hData.split("//")

    console.log("hdata2", Array.isArray(hData2))
    console.log("hd length", hData2.length)

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
		console.log("row", hData3[row].length, hData3[row] )
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

function csvGrid() {
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

    // var column = row.selectAll(".square")
    //     .data(function(d) { return d; })
    //     .enter().append("rect")
    //     .attr("class","square")
    //     .attr("x", function(d) { return d.x; })
    //     .attr("y", function(d) { return d.y; })
    //     .attr("width", function(d) { return d.width; })
    //     .attr("height", function(d) { return d.height; })
    //     .style("fill", "#fff")
    //     .style("stroke", "#222");
    
    
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
        .attr("y", function(d) { return d.y+25; })
        // .attr("y", height / 2)
       // .attr("dy", ".15em")
        .text(function(d) { return d.xyz; });    


}    
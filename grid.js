

// https://stackoverflow.com/questions/64723131/how-can-i-center-text-on-a-d3-js-svg-grid-rect


function grid() {
// var gridData = "";
    sdata = new Array();

    var ttdata = document.getElementById('txtOutput').value
    
    if (!ttdata) { return alert("파일을 먼저 선택하고 확인하세요!!!"); }

    ttdata = ttdata.split("\n") // csv 파일을 읽은 것 처럼 
            
    for (var yy= 0; yy < ttdata.length; yy++) {
        tdata = new Array();
        var tt_yy = ttdata[yy].split(",") 
        
        for (var xx = 0; xx < tt_yy.length; xx++) {
            tdata.push(tt_yy[xx]) // 1차배열로 적재              
        }
        sdata.push(tdata)  // 2차배열로 적재     
        
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
        // console.log(data) 
        return data;
    }
    
    // function randomChord() {
    //     var textArray = ['Cm', 'D7', 'Gm', 'Cdim', 'Am', 'Em'];
    //     return textArray[Math.floor(Math.random() * textArray.length)];
    // }
    
    var gridData = gridConfig();

    // var gridxx = d3.selectAll("#grid")
    // var nodesRemove = gridxx.exit().remove()

    d3.select("#grid").html(""); // 계속생기는 것은 방지
         
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
        .style("fill", "#gray")   // #fff
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
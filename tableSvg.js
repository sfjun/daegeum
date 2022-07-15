
data = new Array();

function csvToSvg() {
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


$(function(){
//     alert("xx");    
// var my_transform = d3Transform()
//    .translate([60, 60])
//    .rotate(60);

// var group = svg
//    .append("g")
//    .attr("transform", my_transform);
var t = d3.transition()
   .duration(5000);
d3.select("body")
   .transition(t)
   .style("background-color", "lightblue");
})  
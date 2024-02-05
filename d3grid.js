//모드 정의: p
var playMode = "p";

// metro 모드에서 사용할 박자수
var songBakja;

var baseBit= "sfjun";

// 정간의 가로 세로 사이즈
var width = 50;
var height = 50;
// var bakjaTime = 1000;
var bakjaTime ='';
//console.log(bakjaTime)

//한줄에 정간의 수
var textRowcnt= 0;
var textMaxcolcnt;

//대금의 구조는
//1각4강16정간으로 구성예로 보면 1강은 4정간으로 구성
//정간이 모여 강이되고 강이 모여 각되는 구조
//각은 1줄, 강은 마디, 정간은 1박

class Daeguem {  /////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(name) { 
        this.name = name;  
        // this.baseBit="sfjun";       
    }

    //textArea에서 값이 있으면 읽어오기
    //창작시 사용
    textarea = document.getElementById("txtOutput");
    songIs;
    // bitCnt;
    
    //기본 그리드 그리고 작성된 악보를 횡간보 형식으로 그리기
    runGrid() { 
        // textarea 박스 사이즈 축소
        this.textarea.style.height ="20px";
        // textarea.rows = 1;
        playMode = "p";            
    
        this.getMid();
    
        var gridData = dg.txtTodata();
        
        // svg  판 클리어
        d3.select("#grid").selectAll("*").remove();
        
        var color = d3.scaleOrdinal()
            .domain(gridData)
            .range(d3.schemeSet2);
    
        // svg 1개 생성
        var grid = d3.select("#grid")
            .append("svg")
            .attr("class", "gridSvg")
            .attr("width", textMaxcolcnt * 50)
            .attr("height", textRowcnt * 50 )
            .style("overflow", "visible");
                        
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
            
        // 생성된 g에 rect 갯수 생성 
        //한박그리기
        gColumn.append("rect")
            //title과 박자박과 class 분리
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
                //title은 색깔 없게
                if (!d.xyz.startsWith("w" || "W")) { return "#222";
                } else { return "#fff"; }    
            }))
            
        gColumn.append("text")
            .attr("x", function(d) { return d.x  + d.width/2; })
            .attr("y", function(d) { 
                //title은 위치를 가운데로 
                if (d.xyz.startsWith("w" || "W")) { return d.y + d.height*1/2;
                } else { return d.y + d.height*1/4; } })
            // .attr("y", height / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d.xyz; })
            .style("text-anchor", function(d) { 
                //title은 위치를 가운데로 
                if (d.xyz.startsWith("w" || "W")) { return "left";
                } else { return "middle"; } })
            .style("font-size", 15);
    
        //한박내 bit그리기
        var gSubcolumn = gColumn.append("g")
            .attr("class", "subcolumn")
            .selectAll(".bit")
            .data(function(d) { return d.xyzbits[0]; })
            .enter();
    
        //bit 박스 그리기    
        gSubcolumn.append("rect")
            .attr("class",function(d) { 
                if (d3.select(this.parentNode).datum().xyz.startsWith("w" || "W")) {
                    return "title"; } else { return "bit"; } })  
            //.attr("class", function(d) { console.log("d",d.xyz); return "bit"})          
            .attr("x", function(d) { return d3.select(this.parentNode).datum().x + d.xpos ; })
            .attr("y", function(d) { return d3.select(this.parentNode).datum().y + 25 ; })
            //.attr("width", function(d) { return d3.select(this.parentNode).datum().width/2; })
            .attr("width", function(d) { return 0.3; }) //시작값을 죽여서        
            // .attr("width", function(d) { return d.bakja; } )
            .attr("height", function(d) { return d3.select(this.parentNode).datum().height/2; })
            // .style("fill", function(d,i) { return color(d.bakno%12); }) // 한박기준으로 컬러링
            // .style("fill", function(d,i) { console.log("i", i); return color((d.bakno +i)%24); }) // bit 기준으로 컬러링
            .style("fill", function(d,i) { return color(d.partCol); }) // 랜듬하게 bit 기준으로 컬러링
            
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
        
        scoreIs = true;
        
    } //runGrid() end

    metroGrid() {

        // let textarea = document.getElementById("txtOutput");
        // console.log("textarea", this.textarea);

        // textarea 박스 사이즈 축소
        this.textarea.style.height ="20px";
        // console.log("textarea.height", this.textarea.style.height);
        // textarea.rows = 1;
        // getMid();
    
        // if (!gridOx) return 
        var gridData = this.txtTometro();
    //    t.value= "Play"
        // //var { title, gridData } = txtTodata();
        // //console.log("title", title)    
        // //console.log("gridData", gridData)
    
        // //중복 방지
        // gridOx = false;
    
        // svg  판 클리어
        d3.select("#grid").selectAll("*").remove();
        
        //색깔 결정
        var color = d3.scaleOrdinal()
            .domain(gridData)
            .range(d3.schemeSet2);
    
        // svg 1개 생성
        var grid = d3.select("#grid")
            .append("svg")
            .attr("class", "gridSvg")
            //textRowcnt, textMaxcolcnt svg 사이즈 결정   
            // .attr("width", window.innerWidth)     
            .attr("width", textMaxcolcnt * 50)
            .attr("height", textRowcnt * 50 + 200)
            // .attr("height", textRowcnt * 25 )        
            .style("overflow", "visible")
            .style("zoom", "2.0");
            // .style("overflow", "auto");
            //.attr("viewBox", "0 0 800 400");
            // .attr("width", window.innerWidth)
            // .attr("height",window.innerHeight);
                        
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
        //한박그리기
        gColumn.append("rect")
            //title과 박자박과 class 분리
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
                //title은 색깔 없게
                if (!d.xyz.startsWith("w" || "W")) { return "#222";
                } else { return "#fff"; }    
            }))
            
        gColumn.append("text")
            .attr("x", function(d) { return d.x  + d.width/2; })
            .attr("y", function(d) { 
                //title은 위치를 가운데로 
                if (d.xyz.startsWith("w" || "W")) { return d.y + d.height*1/2;
                } else { return d.y + d.height*1/4; } })
            // .attr("y", height / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d.xyz; })
            .style("text-anchor", function(d) { 
                //title은 위치를 가운데로 
                if (d.xyz.startsWith("w" || "W")) { return "left";
                } else { return "middle"; } })
            .style("font-size", 15);
    
        //한박내 bit그리기
        var gSubcolumn = gColumn.append("g")
            .attr("class", "subcolumn")
            .selectAll(".bit")
            .data(function(d) { return d.xyzbits[0]; })
            .enter();
    
        //bit 박스 그리기    
        gSubcolumn.append("rect")
            .attr("class",function(d) { 
                if (d3.select(this.parentNode).datum().xyz.startsWith("w" || "W")) {
                    return "title"; } else { return "bit"; } })  
            //.attr("class", function(d) { console.log("d",d.xyz); return "bit"})          
            .attr("x", function(d) { return d3.select(this.parentNode).datum().x + d.xpos ; })
            .attr("y", function(d) { return d3.select(this.parentNode).datum().y + 25 ; })
            //.attr("width", function(d) { return d3.select(this.parentNode).datum().width/2; })
            .attr("width", function(d) { return 0.3; }) //시작값을 죽여서        
            // .attr("width", function(d) { return d.bakja; } )
            .attr("height", function(d) { return d3.select(this.parentNode).datum().height/2; })
            // .style("fill", function(d,i) { return color(d.bakno%12); }) // 한박기준으로 컬러링
            // .style("fill", function(d,i) { console.log("i", i); return color((d.bakno +i)%24); }) // bit 기준으로 컬러링
            .style("fill", function(d,i) { return color(d.partCol); }) // 랜듬하게 bit 기준으로 컬러링
            
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
        
        scoreIs = true;
            
    } // metroGrid() end

    makeSelectbox() {
        let yearSelect = document.querySelector('.years');
        let selectedYear = yearSelect.options[yearSelect.selectedIndex].value;
        let songSelect = document.querySelector('.songs');
    
        switch (selectedYear) {
            case '2023':
                var subOption = songsList2023;
                break;
            case '2022':
                var subOption = songsList2022;
                break;
            case '2021':
                var subOption = songsList2021;
                break;
        }
    
        songSelect.options.length = 0;
    
        for (var i = 0; i < subOption.length; i++) {        
            var option = document.createElement('option');
            option.value = subOption[i]['songId'];
            option.innerText = subOption[i]['title'];
            i == 0 ? option.selected : "";
            // option = songsList[i]['title'];
            // console.log("sfsf", option.innerText, option.value)
            songSelect.append(option);
            i  == 0 ? childForm.xyzOutput.value = subOption[0]['song']: "" ;
        }
        let selectedSong = songSelect.options[songSelect.selectedIndex].value;
        // console.log("XXXXX", selectedYear, selectedSong, subOption)
    }

    selectSong() {
        let yearSelect = document.querySelector('.years');
        let selectedYear = yearSelect.options[yearSelect.selectedIndex].value;
        let songSelect = document.querySelector('.songs');
        let selectedSong = songSelect.options[songSelect.selectedIndex].value;
        document.getElementById("txtOutput").style.height ="200px";
        
        switch (selectedYear) {
            case '2023':
                var subOption = songsList2023;
                break;
            case '2022':
                var subOption = songsList2022;
                break;
            case '2021':
                var subOption = songsList2021;
                break;
        }
    
        for (var i =0; i < subOption.length; i++) {    
                
            if (subOption[i]['songId'] == selectedSong) {
                childForm.xyzOutput.value = subOption[i]['song']
                songIs = subOption[i]['song']
                songBakja =  subOption[i]['gangBak'] 
                // svg  판 클리어
                // d3.select(".gridSvg").remove();
                d3.select("#grid").selectAll("*").remove();    
            }        
        }
    }

    //악보를 다시 읽고, 정간보 형태의 배열로 리턴

    getMid() {
        songIs = document.getElementById('txtOutput').value; 
        
        //match: 캡처 그룹을 포함해서 모든 일치를 담은 배열을 반환합니다. 일치가 없으면 null을 반환합니다.
        //'/':시작, '/': 종료, 문자 클래스 [ ] 사이에는 어떤 문자도 들어갈 수 있다.
        // \w: [A-Za-z0-9_], \W: w가 아닌 모든것
        // gu: g:문자열내의 모든 패턴을 검색하라 u: 유니코드 전체를 지원
        
        var xyList = songIs.match(/[\W]/gu)
        // console.log(xx)
        const xySet = new Set(xyList)
        // console.log(xySet);
    
        for (let xy of xySet) {
            for (let item of xyzFreqArr_ori) {
                if (item.xyz == xy) {
                    xyzFreqArr.push(item) }
            }
        }
    }

    //text를 읽어서 정각보 data화 하는 작업    
    txtTodata(textValue) {
        // getMid()
        // console.log("textValue", textValue)
        var data = new Array();

        //starting xpos and ypos at 1 so the stroke will show when we make the grid below
        var xpos = 1; 
        var ypos = 1;
    
        // typeof = string
        // 가로쓰기 전환된 율명 읽어오기, 1각, 2각, 3각...
        var gakString = document.getElementById('txtOutput').value; 
        // var gakString = textValue;
        // console.log('gakstring', gakString)

        textMaxcolcnt= 0;
        // 각별로 정리되어 있지 않고 2음절씩 구부하여 가독성 있게 구성된 단위로 분리
        // 2마디(1강, 2강,,,)별 추출,여기서는 2개 쉼표가 한줄로
    
        //줄단위로 배열로 저장
        console.log("gakstring", gakString, textValue)
        var gangString = gakString.split("\n")    
        var jungGans = [];
    
        // 전체 text에 대한 줄의 갯수는
        textRowcnt = gangString.length
        
        // " " 별로 가 1박자로 나눠서 배열화
        gangString.forEach(function(gang) {
            // console.log("gang", gang);
            // (gang.startsWith("w")) ? jungGans.push([gang]) : jungGans.push(gang.split(" ")) ;
            (gang.startsWith("w")) ? $('#title').text(gang) : jungGans.push(gang.split(" ")) ;        
        })

        // console.log("jungGans", jungGans)
    
        var title = "";
        
        //박번호 부여
        var bakSerial = 0;
        // console.log("jungGans", jungGans)
        for (var row = 0; row < jungGans.length ; row++) {
            data.push(new Array());
            // console.log("rows", row, jungGans[row])
            // console.log("row", hData3[row].length, hData3[row] )
            // iterate for cells/columns inside rows
            var rowCol = "";
            
            // 가장 긴 컬럼의 갯수를 저장
            textMaxcolcnt = textMaxcolcnt > jungGans[row].length ? textMaxcolcnt : jungGans[row].length ; 
    
            // console.log("j-len", textMaxcolcnt);
            // console.log("jungGans", jungGans);
            for (var column = 0; column < jungGans[row].length; column++) {
                // console.log("row-jungGans", row, jungGans)
                // null 값을 경우 pass
                //if ((!jungGans[row]) || (!jungGans[row][column])) continue;
    
                rowCol = jungGans[row][column];
                // console.log("TF", rowC?ol)
                // if (!jungGans[row][column]) continue;
                if (rowCol == '') continue;
                
                // console.log("bakSerial", bakSerial);
                
                // console.log("rowCol", rowCol);
                            
                if (rowCol.startsWith("w")) { 
    
                    data[row].push({
                        bakno: bakSerial,
                        x: xpos,
                        y: ypos,
                        width: width,
                        height: height,
                        xyz: jungGans[row][column],
                        //title을 한박처리 하기 위해
                        xyzbits: [{bakno: bakSerial}]
                    });
    
                } else {    
    
                    data[row].push({
                        bakno: bakSerial,
                        x: xpos,
                        y: ypos,
                        width: width,
                        height: height,
                        xyz: jungGans[row][column],
                        xyzbits: this.bakTobit(bakSerial, rowCol)
                    });
                }    
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
        //console.log("data", data );
        //console.log("ti", title)
        return data;
        //return { "title": title, "gridData": data };
    }

    txtTometro() {
        // console.log("class dg", dg)

        playMode = "m";
        
        var data = new Array();
        var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
        var ypos = 1;
        // 가로쓰기 전환된 율명 읽어오기, 1각, 2각, 3각...
        var gakString = document.getElementById('txtOutput').value; 
        textMaxcolcnt= 0;
        this.getMid()
        // console.log("songBakja", songBakja)
        songBakja = !songBakja ? 3: songBakja;
        
        // 각별로 정리되어 있지 않고 2음절씩 구부하여 가독성 있게 구성된 단위로 분리
        // 2마디(1강, 2강,,,)별 추출,여기서는 2개 쉼표가 한줄로
        // 율명 구조, 1각 4강 16박 각강박 순으로 
        //줄단위로 배열로 저장
        var gangString = gakString.split("\n")    
        var jungGans = [];
        let songGang = [];
        
        // " "가 박자 구분자라 박자별로 나눠서 배열화
        gangString.forEach(function(gang,i) {
    
            if (gang.startsWith("w")) {
                $('#title').text(gang)
            } else {
                songGang = gang.split(" ")
            }        
                
            function splitIntoChunk(arr, chunk) {
                // 빈 배열 생성
                const result = [];
                  
                while(arr.length > 0) {
                  let tempArray;
                  // splice() 메서드를 사용하여 특정 길이만큼 배열을 분리함
                  tempArray = arr.splice(0, chunk);
                  // 빈 배열에 특정 길이만큼 분리된 배열을 추가
                  jungGans.push(tempArray);
                //   result.push(tempArray);
                }
                  
                return result;
            }
    
            splitIntoChunk(songGang, songBakja);
    
        })
    
        //타이틀 변수
        var title = "";
        //박번호 부여
        var bakSerial = 0;
        // 전체 text에 대한 줄의 갯수는
        textRowcnt = jungGans.length
        
        for (var row = 0; row < jungGans.length ; row++) {
            data.push(new Array());
            var rowCol = "";
            
            // 가장 긴 컬럼의 갯수를 저장
            textMaxcolcnt = textMaxcolcnt > jungGans[row].length ? textMaxcolcnt : jungGans[row].length ; 
    
            for (var column = 0; column < jungGans[row].length; column++) {
                if (!jungGans[row][column]) continue;
                rowCol = jungGans[row][column];
                    data[row].push({
                        bakno: bakSerial,
                        x: xpos,
                        y: ypos,
                        width: width,
                        height: height,
                        xyz: jungGans[row][column],
                        xyzbits: this.bakTobit(bakSerial, rowCol)
                    });
                // increment the x position. I.e. move it over by 50 (width variable)
                xpos += width;
                bakSerial ++;
            }
            // reset the x position after a row is complete
            xpos = 1;
            // increment the y position for the next row. Move it down 50 (height variable)
            ypos += height + 5;
             	
        }
        return data;
        //return { "title": title, "gridData": data };
    }
    
    //한박자를 부분박자로 세분화 함수
    bakTobit(no, hanbak) {  //한박시작
        // console.log("nohanbak", no, hanbak);
        var hanBox =[]
        var bitBox = []
    
        //기본 박자 변경확인차 다시 읽기
        bakjaTime = document.getElementById('bakSec').value;
    
        // 한박에 대한 정규식 적용 "-" 제외
        //전치어[], \W: 영문자외 모두 +? 오직한개, [후치어] * 없거나 한개 이상
        ///gu, g: 전역, u:unicode
        //[임, 황, -]
        var bits = hanbak.match(/[ㄴ^ㄷㅅ]?[\WㄱNZ△]+?[\(\)\/,子⊍3\|]*/gu)         
        // console.log("ffaArr", hanbaksub.xyz, hanbaksep)
        // 3
        
        var xpos = 0;
        // 한박 나누기 처리, 두개 / 있으면 반박으로 bitsCnt 갯수를 줄여함, 나중 //에 대한 반영은 미포함
        //hanbak.indexOf("/") > 0 ? bitsCnt = bits.length - 1 : bitsCnt = bits.length;
        var bitsCnt = hanbak.indexOf("/") > 0 ? bits.length - 1 : bits.length;
            
        // [임, 1/3],[황, 1/3],[-,1/3]
        bits.forEach(function(part, i) {
            var bakja = 0;
            
            //반박처리할 경우 셋잇단음 기준으로 
            // (part.indexOf("/") > 0) ? bakja = width/bitsCnt/2 : bakja = width/bitsCnt;
            // console.log("part", part)
            if (part.indexOf("/") > 0) {
                bakja = bits.length == 6 ? width/(bitsCnt-2)/2:  
                        bits.length == 5 ? width/(bitsCnt-1)/2: 
                        width/bitsCnt/2;
                part = part.replace("/", "");
            } else {
                bakja = width/bitsCnt;
            }
            
            var durr = (bakja == width) ?  bakjaTime : bakjaTime * bakja/width;        
    
            // ? xpos = 0 :  xpos += bakja;
            bitsCnt ==1 ? xpos = width : "" ;    
    
            var partMat = part.match(/[\WNZ\/()ㄱㄴㅅㄷ⊍△3]+?/gu);
            // console.log("partMat", partMat);
            var partFreq ='';
            var partDur ='';
            var partColor = '';
            
            //if (partMat == ':') { return } 
            // console.log("partMat", partMat.length) 
    
            var partVal = partMat[0].charCodeAt()
            console.log("partMat[0], partVal, partMat",partMat[0], partVal, partMat)  
                
            durr = partMat.includes('⊍') ? durr * 3 : durr; 
    
            if (partVal > 10000) {
                // console.log("baseBit0", baseBit)
                baseBit = partMat[0];
                // console.log("baseBit",baseBit)
                // xyzSet.add(baseBit);
                // console.log("xyzSet", xyzSet )
    
                if (partMat.length == 1) {
                    console.log("xyzFreq전", partMat[0])
                    // var returnCode = this.xyzFreq(partMat[0])
                    var returnCode = dg.singlexyzFreq(partMat[0])
                    
                    // console.log("returnCode#1", returnCode)
                    // console.log("returnCode11", returnCode[0], returnCode[1])
                    partFreq = returnCode[0]
                    // console.log("partfreq", partFreq)            
                    partDur = returnCode[1]
                    partColor = returnCode[2]
                // } else (partMat[1] in ['子', 3 ] ) {
                } else {    
                    // console.log("nowBit, partMat", nowBit, partMat[0] )
                    var returnCode2 = dg.xyzFreq2(partMat[0], partMat[1])
                    // console.log("returnCode#2", returnCode2 )
                    // console.log("returnCode22", returnCode2[0], returnCode2[1])
                    partFreq = returnCode2[0]
                    partDur = returnCode2[1]
                    partColor = returnCode2[2]   
                }
            // } else if (partMat[0] in ['-', 'ㄴ', 'ㄱ', 'N', 'Z','△', '⊍'] ) {
            } else if (['-', 'ㄴ', 'ㄱ', 'N', 'Z','△', '⊍'].includes(partMat[0])) {
                       
                console.log("baseBit, partMat -일경우", baseBit, partMat[0] )
                var returnCode2 = dg.xyzFreq2(baseBit, partMat[0])
                console.log("returnCode#3", returnCode2 )
                // console.log("returnCode22", returnCode2[0], returnCode2[1])
                partFreq = returnCode2[0]
                partDur = returnCode2[1]
                partColor = returnCode2[2]   
            // } else if (partMat[0] in ['^','ㄷ', 'ㅅ'] ) {  
            } else if (['^','ㄷ', 'ㅅ'].includes(partMat[0]) ) {                
                // console.log("3", nowBit, partMat[0] )
                var returnCode2 = dg.xyzFreq2(partMat[1], partMat[0])
                // console.log("returnCode#4", returnCode2 )
                // console.log("returnCode22", returnCode2[0], returnCode2[1])
                partFreq = returnCode2[0]
                partDur = returnCode2[1]
                partColor = returnCode2[2]   
            // } else if (partMat[1] in ['子', 3 ] ) {       
            //     // console.log("nowBit, partMat", nowBit, partMat[0] )
            //     var returnCode2 = xyzFreq2(partMat[0], partMat[1])
            //     // console.log("returnCode2", returnCode2 )
            //     // console.log("returnCode22", returnCode2[0], returnCode2[1])
            //     partFreq = returnCode2[0]
            //     partDur = returnCode2[1]   
            } else {       
                console.log("nowBit, partMat", partVal, partMat[0] )
                var returnCode2 = dg.xyzFreq2(baseBit, partMat[0])
                // console.log("returnCode#5", returnCode2 )
                // console.log("returnCode22", returnCode2[0], returnCode2[1])
                partFreq = returnCode2[0]
                partDur = returnCode2[1]
                partColor = returnCode2[2]   
            }
    
            
            if (i == 0) {
                bitBox.push({
                    bakno: no,
                    xyz: part, 
                    //freq: xyzFreq(part),
                    freq: partFreq,  
                    partdur: partDur, 
                    partCol: partColor,             
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
                    // freq: xyzFreq(part),
                    freq: partFreq,
                    partdur: partDur, 
                    partCol: partColor,             
                    bakja: bakja, 
                    xpos: xpos,
                    dur: durr,
                    bittime : bakjaTime * (xpos / width)
                });
                xpos += bakja;  //반영후에 값을 반영하기
            }
            // console.log(part, 1 / partcnt)                    
        })
        // console.log("bitBox", bitBox)       
        
        hanBox.push(bitBox)    
        return hanBox;   
    }

    singlexyzFreq(pxy) {
        // console.log("xyz", pxy);
        // console.log("xyz22", xyzFreqArr);
        
        for (var i=0; i < xyzFreqArr.length; i++) {
            // console.log("i10000", xyzFreqArr[i].xyz)
        // xyzFreqArr.forEach( function(xyzarr) {
            if (xyzFreqArr[i].xyz === pxy) {
                return [[xyzFreqArr[i].freq],[1], i];
            }
        }    
    }
    
    xyzFreq2(pxy, deco) {
        console.log("xyz", pxy, deco);
        for (var i=0; i < xyzFreqArr.length; i++) {
        // xyzFreqArr.forEach( function(xyzarr) {
            if (xyzFreqArr[i].xyz == pxy) {
                // console.log("freq", xyzarr.freq);
                return (deco == 'ㄴ') ? [[xyzFreqArr[i+1].freq], [1], i+1] : 
                       (deco == 'ㄱ') ? [[xyzFreqArr[i-1].freq], [1], i-1] :
                       (deco == 'N') ? [[xyzFreqArr[i+1].freq, xyzFreqArr[i].freq],[0.5, 0.5], i] :
                       (deco == 'Z') ? [[xyzFreqArr[i-1].freq, xyzFreqArr[i].freq],[0.5, 0.5], i] :
                       (deco == '^') ? [[xyzFreqArr[i+1].freq, xyzFreqArr[i].freq],[0.2, 0.8], i] :
                       (deco == 'ㅅ') ? [[xyzFreqArr[i+2].freq, xyzFreqArr[i].freq],[0.2, 0.8], i] :
                       (deco == 'ㄷ') ? [[xyzFreqArr[i-1].freq, xyzFreqArr[i+1].freq, xyzFreqArr[i].freq],[0.2, 0.2, 0.6], i] :
                       (deco == '△') ? [[0],[1], i] :
                       (deco == '子') ? [[xyzFreqArr[i].freq, xyzFreqArr[i-1].freq, xyzFreqArr[i].freq],[0.3, 0.4, 0.3], i] :
                       (deco == 3) ? [[xyzFreqArr[i].freq, xyzFreqArr[i+1].freq, xyzFreqArr[i].freq],[0.33, 0.33, 0.33], i] :
                       (deco == '"') ? [[xyzFreqArr[i].freq],[1], i] :
                       [[xyzFreqArr[i].freq], [1], i]; 
            }
        }    
    }
    

} ///////////////////////////////////////////////////////////////////////////////////////////////class end

var dg = new Daeguem()
// dg.runGrid()
//곡별 율별, 주파수 모음
var xyzFreqArr =[]

// var xyzSet = new Set();
$(document).ready(function(){
    // 부모창에서 값가져오기

    dg.makeSelectbox();
    songIs = document.getElementById('txtOutput').value; 
    
    if (!songIs) {         
        songsList = songsList2023;
        songIs = songsList2023[0]['song'];
        songBakja = songsList2023[0]['gangBak']
        childForm.xyzOutput.value = songIs
    }
    dg.getMid();

});

var timerId = "";
var interruptIndex = 0
var t = document.getElementById('playId');

// var countdownNumberEl = document.getElementById('countdown');
// countdownNumberEl.style.display = "none";
$('#countdown').css('display', 'none');

var scoreIs = false


class Soundplay { ////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(song) { 
        this.song = song;  
        // this.baseBit="sfjun";       
    }

    play() {
        console.log("play", scoreIs)
        // 1박시간 가져오기
    //    var t = document.getElementById('playId');
        // var t = $('playId');
        let zzoom = 2.0;
        
        if (!scoreIs) return alert("악보보기 먼저 실행하세요");
    
        //카운트 다운
        function preCount() {
            
            //악보를 확대(0.5 -> 1.0)
            // let zzoom = 3.0;
            // (playMode = "m") ? $('svg.gridSvg').css('zoom', zzoom) : $('svg.gridSvg').css('zoom', 1.0); 
            
            //카운터 다운준비
            var countdownNumberEl = document.getElementById('countdown-number');
            var countdown = 3;
            // alert(countdownNumberEl.style)
            // countdownNumberEl.style.display = "block";
            $('#countdown').css('display', 'block');
            // $('circle').css('display', 'block');
            $('circle').attr('class', 'circle');
            // $('#countdown').css('zIndex', 0);
            // $('#grid').css('position: relative', 3);
            // style="position: relative;      
    
            countdownNumberEl.textContent = countdown;
    
            const intervalId = setInterval(function() {
                countdown = --countdown == 0 ? clearInterval(intervalId) : countdown;
            // --countdown;
    
                countdownNumberEl.textContent = countdown;
            }, 1000);
            // countdownNumberEl.style.display = "none";
            // $('#countdown').css('display', 'none');
        } 
       
        //프로그램시작
        if (t.value == "Play") {
            //가운트 시작
            console.log("preCount시작")
            preCount();
            setTimeout(transitWidth, 3000);
            // 플레이 시작       
            // transitWidth();
            // 버튼 변경
            t.value= "Stop";
            // playNote();
    
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
            $('#countdown').css('display', 'none');
            // 플레이된 bit와 bitText가 플레이되면 class가 played로 변경되므로
            // 플레이안된 것만 가져오기, 
            const pBit = d3.select("#grid").selectAll(".bit");
            const pBitText = d3.select("#grid").selectAll(".bitText");
    
            //한박 1000의 변경이 있을꼉우
            bakjaTime = document.getElementById('bakSec').value;
            // console.log("bakjaTime", bakjaTime)
    
            pBit.transition()
            // .duration(bakjaTime)
            .duration(function(d,i){ //console.log("dDur", d); 
                return d.dur; })
    
            // .delay(function(d,i){ return i * 1000;}) 
            .delay(function(d,i){ //console.log("d", d.xyzbits); 
                if (d.bakja == width) {
                    // console.log((d.bakno-1) * bakjaTime );
                    return (d.bakno-1) * bakjaTime ;
                } else { 
                    // console.log((d.bakno- 1) * bakjaTime + d.bittime);
                    return (d.bakno- 1) * bakjaTime + d.bittime;
                }    
             })
             // on, 이벤트처리시, start에서 함수연결, /1000는 oscillator는 초단위로 환산용
            // .on("start", function(d,i) { playFreq(d.freq, d.dur/1000); }) 
            .on("start", function(d,i) { 
                sd.playFreq2(d.xyz, d.freq, d.partdur, d.dur/1000); 
                $('#baklog').text(`${d.bakno}박${d.freq}주파수`);
                console.log("this", d3.select(this.parentNode).datum().x)
                // document.getElementById("grid").scrollLeft = this.getAttribute( 'x' )* 2   ;
                document.getElementById("grid").scrollLeft = d3.select(this.parentNode).datum().x -150  ;
                document.getElementById("grid").scrollTop = this.getAttribute( 'y' )* 2 - 150 ;               

            })             
            .on("end", function(d,i) { 
                document.getElementById("grid").scrollLeft = d3.select(this.parentNode).datum().x - 150 ;
                // document.getElementById("grid").scrollTop = this.getAttribute( 'y' )* 2 - 150 ;               

            })

            
            .attrTween("width", function(d,i){ return d3.interpolate(1, d.bakja);})
            .attr("class", "played");
            // .on("start", function(d,i) { playFreq(440, 2); })
            // .on("end", function(d,i) { 
            //     $('#baklog').text(`${d.bakno}박${d.freq}주파수`);
            //     document.getElementById("grid").scrollLeft = this.getAttribute( 'x' )* 2   ;
            //     document.getElementById("grid").scrollTop = this.getAttribute( 'y' )* 2 - 150 ;
            // })
                      
        
            pBitText.transition()
            // .duration(bakjaTime)
            .duration(function(d,i){ // console.log("d", d); 
                return d.dur; })    
            .delay(function(d,i){ 
                if (d.bakja == width) {
                    // console.log((d.bakno-1) * bakjaTime );
                    return (d.bakno-1) * bakjaTime ;
                } else { 
                    // console.log((d.bakno- 1) * bakjaTime + d.bittime);
                    return (d.bakno- 1) * bakjaTime + d.bittime;
                }    
             }) 
            .styleTween("font-size", function() { return d3.interpolate(8, 18); })
            .attr("class", "played");
            // .on("end",function() { d3.select(this).remove()})        
            // .transition()
            // .delay(bakjaTime/bakjaTime)
            // .style("font-size", 10)
            // .on("interrupt", function(d,i) { //console.log("this", this, i);
            // })           
    
        }         
    }

    playFreq2(xyz, freq=[440], pdur, dur = 1) {
        for (var x=0; x < freq.length; x++) {
            var o = ac.createOscillator();
            o.connect(gainNode).connect(ac.destination); 
            o.frequency.value = freq[x]; 
            const now = ac.currentTime;
            // console.log("freq,dur",x, freq[x], pdur[x]);
            o.start(now);
            o.stop(now + pdur[x]*dur);
            // o.stop(now + 1);
            // console.log("now", now)
        }    
        //clearTimeout(setTimeid);
        
    };
    

} // end class soundXyz/////////////////////////////////////////////////////////////////////////////////////////////


var sd = new Soundplay();


var ac = new (window.AudioContext || window.webkitAudioContext);
//   var freqs = [261, 440, 880];

var oscs = [];

const gainNode = ac.createGain();
gainNode.gain.value = 0.2;

const smoothingInterval = 0.02;
const beepLengthInSeconds = 0.5;
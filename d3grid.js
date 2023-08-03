// var color = ['skyblue', 'lime', 'yellowgreen', 'blueviolet', 'chocolate', 'darkgreen', 'yellow']
// var xyzFreqArr = [{㑣: 194.25, no: 1},	{侇: 207.45, no: 2},	{㑲: 218.55, no: 3},	{㒇: 233.35, no: 4},	{㒣: 245.85, no: 5},	{黃: 259, no: 6},	{大: 276.6, no: 7},	{太: 291.4, no: 8},	{夾: 311.2, no: 9},	{姑: 327.8, no: 10},	{仲: 350, no: 11},	{㽔: 368.8, no: 12},	{林: 388.5, no: 13},	{夷: 414.9, no: 14},	{南: 437.1, no: 15},	{無: 466.7, no: 16},	{應: 491.7, no: 17},	{潢: 518, no: 18},	{汏: 553.2, no: 19},	{汰: 582.8, no: 20},	{浹: 622.4, no: 21},	{㴌: 655.6, no: 22},	{㳞: 700, no: 23},	{㶋: 737.6, no: 24},	{淋: 777, no: 25},	{洟: 829.8, no: 26},	{湳: 874.2, no: 27},	{潕: 933.4, no: 28},	{㶐: 983.4, no: 29},	{㶂: 518, no: 30},	{𣴘: 553.2, no: 31},	{㳲: 582.8, no: 32}];

var playMode = "p";
// metro 모드에서 사용할 박자수
var songBakja;

// 현재선택한곳이나 있는 곡
var songIs;


//아악, 정악, 당악
// var xyzFreqArr_ori = [{xyz: '㑣', freq: 194.25, no: 1}, {xyz: '侇', freq: 207.45, no: 2}, {xyz: '㑲', freq: 218.55, no: 3}, 
//                   {xyz: '㒇', freq: 233.35, no: 4}, {xyz: '㒣', freq: 245.85, no: 5}, {xyz: '黃', freq: 259, no: 6}, 
//                   {xyz: '大', freq: 276.6, no: 7}, {xyz: '太', freq: 291.4, no: 8}, {xyz: '夾', freq: 311.2, no: 9}, 
//                   {xyz: '姑', freq: 327.8, no: 10}, {xyz: '仲', freq: 350, no: 11}, {xyz: '㽔', freq: 368.8, no: 12},
//                   {xyz: '林', freq: 388.5, no: 13}, {xyz: '夷', freq: 414.9, no: 14}, {xyz: '南', freq: 437.1, no: 15},
//                   {xyz: '無', freq: 466.7, no: 16}, {xyz: '應', freq: 491.7, no: 17}, {xyz: '潢', freq: 518, no: 18},
//                   {xyz: '汏', freq: 553.2, no: 19}, {xyz: '汰', freq: 582.8, no: 20}, {xyz: '浹', freq: 622.4, no: 21},
//                   {xyz: '㴌', freq: 655.6, no: 22}, {xyz: '㳞', freq: 700, no: 23}, {xyz: '㶋', freq: 737.6, no: 24}, 
//                   {xyz: '淋', freq: 777, no: 25}, {xyz: '洟', freq: 829.8, no: 26}, {xyz: '湳', freq: 874.2, no: 27}, 
//                   {xyz: '潕', freq: 933.4, no: 28}, {xyz: '㶐', freq: 983.4, no: 29}, {xyz: '㶂', freq: 1010, no: 30}]

//향악
var xyzFreqArr_ori = [{xyz: '㑣', freq: 233.25, no: 1}, {xyz: '侇', freq: 249.1, no: 2}, {xyz: '㑲', freq: 262.4, no: 3},
                  {xyz: '㒇', freq: 280.2, no: 4}, {xyz: '㒣', freq: 295.2, no: 5}, {xyz: '黃', freq: 311, no: 6},
                  {xyz: '大', freq: 332.1, no: 7}, {xyz: '太', freq: 349.9, no: 8}, {xyz: '夾', freq: 373.6, no: 9},
                  {xyz: '姑', freq: 393.6, no: 10}, {xyz: '仲', freq: 420.3, no: 11}, {xyz: '㽔', freq: 442.8, no: 12},
                  {xyz: '林', freq: 466.5, no: 13}, {xyz: '夷', freq: 498.2, no: 14}, {xyz: '南', freq: 524.8, no: 15},
                  {xyz: '無', freq: 560.4, no: 16}, {xyz: '應', freq: 590.4, no: 17}, {xyz: '潢', freq: 622, no: 18},
                  {xyz: '汏', freq: 664.2, no: 19}, {xyz: '汰', freq: 699.8, no: 20}, {xyz: '浹', freq: 747.2, no: 21},
                  {xyz: '㴌', freq: 787.2, no: 22}, {xyz: '㳞', freq: 840.6, no: 23}, {xyz: '㶋', freq: 885.6, no: 24},
                  {xyz: '淋', freq: 933, no: 25}, {xyz: '洟', freq: 996.4, no: 26}, {xyz: '湳', freq: 1049.6, no: 27},
                  {xyz: '潕', freq: 1120.8, no: 28}, {xyz: '㶐', freq: 1180.8, no: 29}, {xyz: '㶂', freq: 1244, no: 30},
                  {xyz: '𣴘', freq: 1328.4, no: 31}, {xyz: '㳲', freq: 1399.6, no: 32}]


var xyzFreqArr =[]
// var xyzSet = new Set();
$(document).ready(function(){
    // 부모창에서 값가져오기
    getMid()

});

function selectYear() {
    let yearSelect = document.querySelector('.years');
    let mainOption = '2023';
    let songSelect = document.querySelector('.songs');

    mainOption = yearSelect.options[yearSelect.selectedIndex].value;        


    switch (mainOption) {
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

    console.log("mainOption,suboption", mainOption, subOption)
    songSelect.options.length = 0;

    for (var i =0; i < subOption.length; i++) {        
        var option = document.createElement('option');
        option.value = subOption[i]['title'];
        option.innerText = subOption[i]['title'];
        // option = songsList[i]['title'];
        // console.log("sfsf", option.innerText, option.value)
        songSelect.append(option);
        i  == 0 ? childForm.xyzOutput.value = subOption[0]['song']: "" ;
    }

}

function selectSong() {
    let yearSelect = document.querySelector('.years');
    let mainOption = yearSelect.options[yearSelect.selectedIndex].value;
    let songSelect = document.querySelector('.songs');
    let selectedSong = songSelect.options[songSelect.selectedIndex].value;
    
    switch (mainOption) {
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

    console.log("mainOption,suboption", mainOption, subOption)
    //songSelect.options.length = 0;

    for (var i =0; i < subOption.length; i++) {    
        document.getElementById("txtOutput").style.height ="200px";    
        if (subOption[i]['title'] == selectedSong) {
            childForm.xyzOutput.value = subOption[i]['song']
            songIs = subOption[i]['song']
            songBakja =  subOption[i]['gangBak'] 
        }        
    }

}


function getMid() {
//  childForm.xyzOutput.value = opener.window.document.getElementById("txtOutput").value

    songIs = document.getElementById('txtOutput').value; 
    
    if (!songIs) { 
        // console.log("songsList[-1]", songsList[songsList.length - 1]['title'])

        // songs.js에서 정의된 songsList 배열을 활용, reverse()로 역순정열
        
        songsList = songsList2023;
        songIs = songsList2023[0]['song'];
        songBakja = songsList2023[0]['gangBak']
        childForm.xyzOutput.value = songIs
    }        

    selectYear()
    // subCity.options.length = 0;
    
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

function setMid() {
  opener.window.document.myform.mid.value = childForm.mid.value;
}

function wClose() {
  opener.window.document.myform.mid.value = childForm.mid.value;
  opener.window.document.myform.pwd.focus();
  window.close();
}

var width = 50;
var height = 50;
// var bakjaTime = 1000;
var bakjaTime ='';
//console.log(bakjaTime)
var textRowcnt= 0;
var textMaxcolcnt;

function txtTodata() {
    //getMid()
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;

    // typeof = string
    // 가로쓰기 전환된 율명 읽어오기, 1각, 2각, 3각...
    var gakString = document.getElementById('txtOutput').value; 
    textMaxcolcnt= 0;
    // 각별로 정리되어 있지 않고 2음절씩 구부하여 가독성 있게 구성된 단위로 분리
    // 2마디(1강, 2강,,,)별 추출,여기서는 2개 쉼표가 한줄로

    //줄단위로 배열로 저장
    var gangString = gakString.split("\n")    
    var jungGans = [];

    // 전체 text에 대한 줄의 갯수는
    textRowcnt = gangString.length
    
    // " "가 박자 구분자라 박자별로 나눠서 배열화
    gangString.forEach(function(gang) {

        // console.log("gang", gang)

        // (gang.startsWith("w")) ? jungGans.push([gang]) : jungGans.push(gang.split(" ")) ;
        (gang.startsWith("w")) ? $('#title').text(gang) : jungGans.push(gang.split(" ")) ;
                 
        // if (gang) {
        //     jungGans.push(gang.split(" "))
        // }      
        // console.log("junGans", jungGans)
    })

    var title = "";
    // 그리드 구성을 위해, x,y 좌표 높이 넓이 설정
	// iterate for rows	, 5
    

    //박번호 부여
    var bakSerial = 0;
    
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
            
            if (!jungGans[row][column]) continue;
            // console.log("bakSerial", bakSerial);
            rowCol = jungGans[row][column];
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
                    xyzbits: bakTobit(bakSerial, rowCol)
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

function txtTometro() {
    playMode = "m";
    getMid()
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
    // songBakja = 3 // 3또는 4로 결정, 악보와 연결 필요
    

    // typeof = string
    // 가로쓰기 전환된 율명 읽어오기, 1각, 2각, 3각...
    var gakString = document.getElementById('txtOutput').value; 
    textMaxcolcnt= 0;

    // 각별로 정리되어 있지 않고 2음절씩 구부하여 가독성 있게 구성된 단위로 분리
    // 2마디(1강, 2강,,,)별 추출,여기서는 2개 쉼표가 한줄로
    // 율명 구조, 1각 4강 16박 각강박 순으로 
    //줄단위로 배열로 저장
    var gangString = gakString.split("\n")    
    var jungGans = [];
    let songGang = [];
    
    // " "가 박자 구분자라 박자별로 나눠서 배열화
    gangString.forEach(function(gang,i) {

        // console.log("gang", gang,i);

        // (gang.startsWith("w")) ? $('#title').text(gang) : jungGans.push(gang.split(" ")) ;

        if (gang.startsWith("w")) {
            $('#title').text(gang)
        } else {
            songGang = gang.split(" ")
        }        
        

        // (gang.startsWith("w")) ? $('#title').text(gang) : songGang = gang.split(" ") ;
        
        // let songGang = gang.split(" ") //.splice(0,3)
        // console.log("songGang", songGang);

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

        // if (songGang.length == 1) { return;
        // } else {
        //     const newArray = splitIntoChunk(songGang, songBakja);
        //     // console.log("newArray", newArray, newArray.length);

        //     (newArray.length >= 1 ) ? jungGans.push(newArray): "" ;
            
        // };        

        // 배열의 요소가 8개인 배열
        // 특정 길이만큼 분리된 새로운 배열
        

        // if (gang) {
        //     jungGans.push(gang.split(" "))
        // }      
        // console.log("junGans", jungGans)
    })

    var title = "";
    // 그리드 구성을 위해, x,y 좌표 높이 넓이 설정
	// iterate for rows	, 5
    

    //박번호 부여
    var bakSerial = 0;
    
    // console.log("jungGans2", jungGans, jungGans.length);
 
    // 전체 text에 대한 줄의 갯수는
    
    textRowcnt = jungGans.length
    
	for (var row = 0; row < jungGans.length ; row++) {
		data.push(new Array());
        // console.log("rows", row, jungGans[row])
		// console.log("row", hData3[row].length, hData3[row] )
		// iterate for cells/columns inside rows
        var rowCol = "";
        
        // 가장 긴 컬럼의 갯수를 저장
        textMaxcolcnt = textMaxcolcnt > jungGans[row].length ? textMaxcolcnt : jungGans[row].length ; 

        // console.log("j-len", textMaxcolcnt);

		for (var column = 0; column < jungGans[row].length; column++) {
            // console.log("row-jungGans", row, jungGans)
            // null 값을 경우 pass
            //if ((!jungGans[row]) || (!jungGans[row][column])) continue;
            
            if (!jungGans[row][column]) continue;
            // console.log("bakSerial", bakSerial);
            rowCol = jungGans[row][column];

            // console.log("rowCol", rowCol);            
            // if (rowCol.startsWith("w")) { 

            //     data[row].push({
            //         bakno: bakSerial,
            //         x: xpos,
            //         y: ypos,
            //         width: width,
            //         height: height,
            //         xyz: jungGans[row][column],
            //         //title을 한박처리 하기 위해
            //         xyzbits: [{bakno: bakSerial}]
            //     });

            // } else {    

                data[row].push({
                    bakno: bakSerial,
                    x: xpos,
                    y: ypos,
                    width: width,
                    height: height,
                    xyz: jungGans[row][column],
                    xyzbits: bakTobit(bakSerial, rowCol)
                });
            // }    
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




var baseBit ="";

function bakTobit(no, hanbak) {  //한박시작
    // console.log("feeLen", hanbaksub.xyz)
    var hanBox =[]
    var bitBox = []
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
    bitsCnt = hanbak.indexOf("/") > 0 ? bits.length - 1 : bits.length;
    
    // if (bits.length == 4)
    
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
        // console.log("partMat[0], partVal, partMat",partMat[0], partVal, partMat)  
            
        durr = partMat.includes('⊍') ? durr * 3 : durr; 


        if (partVal > 10000) {
            
            baseBit = partMat[0];
            // xyzSet.add(baseBit);
            // console.log("xyzSet", xyzSet )
            if (partMat.length == 1) {
                var returnCode = xyzFreq(partMat[0])
                // console.log("returnCode#1", returnCode)
                // console.log("returnCode11", returnCode[0], returnCode[1])
                partFreq = returnCode[0]
                // console.log("partfreq", partFreq)            
                partDur = returnCode[1]
                partColor = returnCode[2]
            // } else (partMat[1] in ['子', 3 ] ) {
            } else {    
                // console.log("nowBit, partMat", nowBit, partMat[0] )
                var returnCode2 = xyzFreq2(partMat[0], partMat[1])
                // console.log("returnCode#2", returnCode2 )
                // console.log("returnCode22", returnCode2[0], returnCode2[1])
                partFreq = returnCode2[0]
                partDur = returnCode2[1]
                partColor = returnCode2[2]   
            // } else {
            //     var returnCode = xyzFreq(partMat[0])
            //     console.log("returnCode", returnCode)
            //     // console.log("returnCode11", returnCode[0], returnCode[1])
            //     partFreq = returnCode[0]
            //     // console.log("partfreq", partFreq)            
            //     partDur = returnCode[1]

            }
//        }    



        // } else if (partMat[0] ==':' || partVal > 50000) {  
        //     // console.log("returnCode3", partVal)  
        //     partFreq = [0]
        //     partDur = [1]
        } else if (partMat[0] in ['-', 'ㄴ', 'ㄱ', 'N', 'Z','△', '⊍'] ) {       
            // console.log("nowBit, partMat", nowBit, partMat[0] )
            var returnCode2 = xyzFreq2(baseBit, partMat[0])
            // console.log("returnCode#3", returnCode2 )
            // console.log("returnCode22", returnCode2[0], returnCode2[1])
            partFreq = returnCode2[0]
            partDur = returnCode2[1]
            partColor = returnCode2[2]   
        } else if (partMat[0] in ['^','ㄷ', 'ㅅ'] ) {       
            // console.log("3", nowBit, partMat[0] )
            var returnCode2 = xyzFreq2(partMat[1], partMat[0])
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
            // console.log("nowBit, partMat", nowBit, partMat[0] )
            var returnCode2 = xyzFreq2(baseBit, partMat[0])
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

function xyzFreq(pxy) {
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

function xyzFreq2(pxy, deco) {
    // console.log("xyz", pxy);
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
                
                   [[xyzFreqArr[i].freq], [1], i]; 
        }
    }    
}

// 중복 다중 실행 방지 
// var gridOx = true;

// var gColumn = [];

function runGrid() {

    let textarea = document.getElementById("txtOutput");
    // console.log(textarea);
    // textarea 박스 사이즈 축소
    textarea.style.height ="20px";
    // textarea.rows = 1;
    playMode = "p";
    // if (!gridOx) return , text를 data로 전환하는 함수 호출
    var gridData = txtTodata();
    t.value= "Play"
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
        .attr("class", "gridSvg")
        //textRowcnt, textMaxcolcnt svg 사이즈 결정   
        // .attr("width", window.innerWidth)     
        .attr("width", textMaxcolcnt * 50)
        .attr("height", textRowcnt * 50 )
        // .attr("height", textRowcnt * 25 )        
        .style("overflow", "visible")
        
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
    // xyzSet.forEach(function () )
    // for (let item of xyzSet) {
    //     console.log("mySet", item);

    // }    
} // function end

function metroGrid() {

    let textarea = document.getElementById("txtOutput");
    // console.log(textarea);
    // textarea 박스 사이즈 축소
    textarea.style.height ="20px";
    // textarea.rows = 1;
    
    // if (!gridOx) return 
    var gridData = txtTometro();
    t.value= "Play"
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
    // xyzSet.forEach(function () )
    // for (let item of xyzSet) {
    //     console.log("mySet", item);

    // }    
} // function end


var timerId = "";
var interruptIndex = 0
var t = document.getElementById('playId');

// var countdownNumberEl = document.getElementById('countdown');
// countdownNumberEl.style.display = "none";
$('#countdown').css('display', 'none');

var scoreIs = false

function play() {
    // 1박시간 가져오기
//    var t = document.getElementById('playId');
    // var t = $('playId');
    let zzoom = 2.0;
    
    if (!scoreIs) return alert("악보보기 먼저 실행하세요");

    //카운트 다운
    function preCount() {
        
        //악보를 확대(0.5 -> 1.0)
        // let zzoom = 3.0;
        (playMode = "m") ? $('svg.gridSvg').css('zoom', zzoom) : $('svg.gridSvg').css('zoom', 1.0); 
        
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
            playFreq2(d.xyz, d.freq, d.partdur, d.dur/1000); 
            $('#baklog').text(`${d.bakno}박${d.freq}주파수`);
            document.getElementById("grid").scrollLeft = this.getAttribute( 'x' )* 2   ;
            document.getElementById("grid").scrollTop = this.getAttribute( 'y' )* 2 - 150 ;
        
        }) 
        
        .attrTween("width", function(d,i){ return d3.interpolate(1, d.bakja);})
        .attr("class", "played");
        // .on("start", function(d,i) { playFreq(440, 2); })
        // .on("end", function(d,i) { 
        //     $('#baklog').text(`${d.bakno}박${d.freq}주파수`);
        //     document.getElementById("grid").scrollLeft = this.getAttribute( 'x' )* 2   ;
        //     document.getElementById("grid").scrollTop = this.getAttribute( 'y' )* 2 - 150 ;
        // });
                  
    
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
        .attr("class", "played")
        // .on("end",function() { d3.select(this).remove()})
        
        // .transition()
        // .delay(bakjaTime/bakjaTime)
        // .style("font-size", 10)
        // .on("interrupt", function(d,i) { //console.log("this", this, i);
        // })           
        ;

    }         

}



var ac = new (window.AudioContext || window.webkitAudioContext);
//   var freqs = [261, 440, 880];
 
  var oscs = [];

  const gainNode = ac.createGain();
  gainNode.gain.value = 0.2;
      
  const smoothingInterval = 0.02;
  const beepLengthInSeconds = 0.5;

function playFreq(freq=440, dur = 1) {
  var o = ac.createOscillator();
  //o.frequency.value = freq;
  console.log("freq,dur", freq, dur);
  o.connect(gainNode).connect(ac.destination); 
  o.frequency.value = freq[0];  
  const now = ac.currentTime;
  o.start(now);
  o.stop(now + dur);
  //clearTimeout(setTimeid);
  
};

//playFreq2(d.xyz, d.freq, d.partdur, d.dur/1000); }) 
function playFreq2(xyz, freq=[440], pdur, dur = 1) {
    for (x=0; x < freq.length; x++) {
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


function playNote() {
  for(var i = 0; i < freqs.length; i++) {
    // console.log("시작", freqs[i])
    // 지연시간을 단계적으로 부여하여, 실행함수 ()없이해야 호출만, 주파수, 지속시간 
    const setTimeid = setTimeout(playFreq, i * 1000, freqs[i], 2);
    // console.log("id", setTimeid)
    //clearTimeout(setTimeid);
    //requestAnimationFrame(step)
  }
}


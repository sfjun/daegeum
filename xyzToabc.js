
// var myarr = new Array();
// var mydic = new Map();

// d3.csv("../abc-xyz.csv",function(error,data){
//     if (error) throw error;
//     // console.log(data)
//     for (var i=0; i < data.length; i++) {
//         myarr.push([data[i].abc, data[i].xyz])
//     }
//     const mydic = new Map(myarr);
//     // console.log("값찾기", mydic.get("^a") )

// });

//alert("welcome xyzToabc")

var abcToxyz = [["姑","G,"], ["南","^B"], ["湳","^b"], ["大","E,"], ["汏","E"], ["林","^A"], ["淋","^a"], ["無","^C"], 
                ["應","D"], ["夷","B"], ["洟","b"], ["仲","^G,"], ["太","^E,"], ["汰","^E"], ["夾","^F,"], ["浹","^F"], 
                ["潢","^D"], ["黃","^D,"], ["潕","^c"], ["㣩","^A,"], ["㣮","^B,"], ["㣳","^C,"], ["㣹","D,"], ["㳞","^G"], 
                ["㴌","G"], ["㶂","^d"], ["㶐","d"],  ["㽔","A"],["𢓡","B,"]
                ]


// var abcToxyz = [['^A,', '㣩'], ['_B,', '㣩'], ['B,', '𢓡'], ['^B,', '㣮'], ['_C,', '𢓡'], ['C,', '㣮'], ['^C,', '㣳'], ['_D,', '㣳'], ['D,', '㣹'], ['^D,', '黃'], ['_E,', '黃'], ['E,', '大'], ['^E,', '太'], ['_F,', '大'], ['F,', '太'], ['^F,', '夾'], ['_G,', '夾'], ['G,', '姑'], ['^G,', '仲'], ['_A', '仲'], ['A', '㽔'], ['^A', '林'], ['_B', '林'], ['B', '夷'], ['^B', '南'], ['_C', '夷'], ['C', '南'], ['^C', '無'], ['_D', '無'], ['D', '應'], ['^D', '潢'], ['_E', '潢'], ['E', '汏'], ['^E', '汰'], ['_F', '汏'], ['F', '汰'], ['^F', '浹'], ['_G', '浹'], ['G', '㴌'], ['^G', '㳞'], ['_a', '㳞'], ['a', '㽔'], ['^a', '淋'], ['_b', '淋'], ['b', '洟'], ['^b', '湳'], ['_c', '洟'], ['c', '湳'], ['^c', '潕'], ['_d', '潕'], ['d', '㶐'], ['^d', '㶂']]
const aTxdic = new Map(abcToxyz);
console.log("atxdic", aTxdic) 




// console.log("값찾기", myarr)

// var score2= '(DE) G,2 _G2 | "^Em" AB B2 A2 | "^C" G2 AG (3(EDE) | D4 z2 | '

/*
var score = `(DE) G2 G2 | "^Em" AB B2 A2 | "^C" G2 AG (3(EDE) | D4 z2 | 
$"^G" Bd d2 d2 |"^Em" BB A2 G2 |"^C" BB A2 GA |"^D" A4 z2 |
$"^G" d2 d2 d2 |"^Em" BB A2 G2 |"^C" B-B AG (3EDE |"^D" D4 z2 |
$"^G" G-G G2 A2 |"^Em" B-B A2 G2 |"^C" (E3 D) EG |"^G" G4 z2 |
$"^G" DE G2 G2 |"^Em" (AB) B2 A2 | "^C" G2 (AG) (3(ED)E |"^D" D4 z2 |
$"^G" (Bd) d2 d2 |"^Em" B2 A2 G2 |"^C" BB A2 (GA) | "^D" A4 z2 | 
$"^G" d2 d2 d2 | "^Em" B2 A2 G2 | "^C" BB (AG) (3(ED)E |"^D" D4 z2 |
$"^G" G2 G2 A2 |"^Em" B2 A2 G2 | "^C" E3 D EG |"^G" G4 z2 |]`

*/
function f_xyztoabc() { 
    var score = childForm.xyzOutput.value 
    console.log("sfs", score)

    var s_arr = score.split('\n')
    console.log(s_arr.length)

    for (i=0; i <s_arr.length; i++) {
        console.log("원본", i, s_arr[i])
        var s = s_arrToreg(s_arr[i]);
        console.log("reg본", s)
    }

}

function s_arrToreg(scr) {
    const regexpWords = /(\^?[a-zA-Z])|(\_?[a-zA-Z])/g;
    var texts = scr.match(regexpWords);
    // console.log(texts);
    // return texts
    return regToxyz(texts)
}    


function regToxyz(texts) {
    xyz_text = "";

    for (var i=0; i < texts.length; i++) {
        var xyz = findXyz(texts[i])
        // console.log(texts[i], xyz)
        // console.log(xyz);

        if (xyz === undefined) {
            xyz = texts[i]
        } 
        xyz_text = xyz_text + xyz +"," 
        
    }
    // console.log(xyz_text)
    return xyz_text
}

function findxyz (abc){
    return aTxdic.get(abc)
    // return mydic.get("^a")
}

const map = new Map([['^A,', '㣩'], ['_B,', '㣩'], ['B,', '𢓡'], ['^B,', '㣮'], ['_C,', '𢓡'], ['C,', '㣮'], ['^C,', '㣳'], ['_D,', '㣳'], ['D,', '㣹'], ['^D,', '黃'], ['_E,', '黃'], ['E,', '大'], ['^E,', '太'], ['_F,', '大'], ['F,', '太'], ['^F,', '夾'], ['_G,', '夾'], ['G,', '姑'], ['^G,', '仲'], ['_A', '仲'], ['A', '㽔'], ['^A', '林'], ['_B', '林'], ['B', '夷'], ['^B', '南'], ['_C', '夷'], ['C', '南'], ['^C', '無'], ['_D', '無'], ['D', '應'], ['^D', '潢'], ['_E', '潢'], ['E', '汏'], ['^E', '汰'], ['_F', '汏'], ['F', '汰'], ['^F', '浹'], ['_G', '浹'], ['G', '㴌'], ['^G', '㳞'], ['_a', '㳞'], ['a', '㽔'], ['^a', '淋'], ['_b', '淋'], ['b', '洟'], ['^b', '湳'], ['_c', '洟'], ['c', '湳'], ['^c', '潕'], ['_d', '潕'], ['d', '㶐'], ['^d', '㶂']])


score = '(DE) G2 G2 | "^Em" AB B2 A2 | "^C" G2 AG (3(EDE) | D4 z2 |'
// var score_tmp = score.split(" ")

// console.log(score_tmp)
// for ( var i=0; i < score_tmp.length; i++) {
//     console.log(score_tmp[i])

// }

const myRe = /a-gA-G\^\,\_/g;
const myArray = myRe.match('aaaccd_^');
console.log(myArray)


// console.log(map)
// console.log('Map Iteration 1')
// for (let [k, v] of map) {
//     console.log(k, map.get(k))
// }

// var k = '^A,'
// console.log(k, map.get(k))
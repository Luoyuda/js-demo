/*
 * @Author: xiaohuolong
 * @Date: 2021-07-19 08:28:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-19 15:02:21
 * @FilePath: /js-demo/codewar/PigIt.js
 */
function pigIt(str){
  //Code here
    str = str.split('')
    let j = -1
    for(let i = 0; i <= str.length; i++){
        if((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')){
            if(j < 0) j = i
        }else{
            if(j >= 0){
                let s = str.splice(j, 1)[0] + 'ay'
                str.splice(i - 1, 0, s)
                j = -1
                // console.log(str)
                // console.log(str.slice(j, i))
            }
        }
    }
    return str.join('')
}
console.log(pigIt('Pig latin is cool')); // igPay atinlay siay oolcay
console.log(pigIt('Hello world !'));     // elloHay orldway !
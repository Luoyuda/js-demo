/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 22:12:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 22:13:50
 * @FilePath: /js-demo/codewar/ConvertStringToCamelCase.js
 */
/*
Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized (known as Upper Camel Case, also often referred to as Pascal case).
Examples
"the-stealth-warrior" gets converted to "theStealthWarrior"
"The_Stealth_Warrior" gets converted to "TheStealthWarrior"
*/
function toCamelCase(str){
    let res = ''
    let s = ''
    let i = 0
    let n = str.length
    let flag = false
    while(i < n){
        if((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')){
            if(!s){
                s += str[i].toLocaleUpperCase()
            }else{
                s += str[i].toLocaleLowerCase()
            }
        }else{
            if(!flag && str[i - s.length] !== s[0]){
                res += s.toLocaleLowerCase()
            }else{
                res += s
            }
            flag = true
            s = ''
        }
        i++
    }
    res += s 
    return res
}
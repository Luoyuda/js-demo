/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 18:59:50
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 19:00:23
 * @FilePath: /js-demo/codewar/Mumbling.js
 */
/*
This time no story, no theory. The examples below show you how to write function accum:
Examples:
accum("abcd") -> "A-Bb-Ccc-Dddd"
accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt") -> "C-Ww-Aaa-Tttt"
The parameter of accum is a string which includes only letters from a..z and A..Z.
*/
function accum(s) {
	// your code
    return s.split('').map((item, index) => {
        let A = item.toLocaleUpperCase()
        let a = item.toLocaleLowerCase()
        let str = A
        while(index--) str += a
        return str
    }).join('-')
}
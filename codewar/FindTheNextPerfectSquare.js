/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 18:27:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 18:52:56
 * @FilePath: /js-demo/codewar/FindTheNextPerfectSquare.js
 */
/*
You might know some pretty large perfect squares. But what about the NEXT one?
Complete the findNextSquare method that finds the next integral perfect square after the one passed as a parameter. Recall that an integral perfect square is an integer n such that sqrt(n) is also an integer.
If the parameter is itself not a perfect square then -1 should be returned. You may assume the parameter is non-negative.
Examples:
    findNextSquare(121) --> returns 144
    findNextSquare(625) --> returns 676
    findNextSquare(114) --> returns -1 since 114 is n
*/
function findNextSquare(sq) {
    // Return the next square if sq is a perfect square, -1 otherwise
    let l = 1
    let r = Math.floor(sq / 2)
    while(l <= r){
        let m = l + Math.floor((r - l)/2)
        let s = sq / m
        if(s === m) return (m + 1) * (m + 1)
        else if(s > m) l = m + 1
        else if(s < m) r = m - 1
    }
    return -1
}

console.log(findNextSquare(155))
console.log(findNextSquare(625))
// console.log(findNextSquare(319225))
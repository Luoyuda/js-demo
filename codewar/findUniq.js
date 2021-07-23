/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 22:58:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 22:59:17
 * @FilePath: /js-demo/codewar/findUniq.js
 */
/*
There is an array with some numbers. All numbers are equal except for one. Try to find it!
findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
It’s guaranteed that array contains at least 3 numbers.
The tests contain some very huge arrays, so think about performance.
This is the first kata in series:
Find the unique number (this kata)
Find the unique string
Find The Unique
*/
function findUniq(arr) {
  let last = arr[0]
  for(let i = 1; i < arr.length; i++){
    if(last != arr[i]) return arr[i] === arr[i + 1] ? last : arr[i]
  }
}

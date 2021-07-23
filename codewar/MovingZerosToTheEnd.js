/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 23:40:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 23:45:56
 * @FilePath: /js-demo/codewar/MovingZerosToTheEnd.js
 */
/*
Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.
moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]
*/
var moveZeros = function (arr) {
    let left = 0
    let right = 0
    while(right < arr.length){
        if(arr[right] !== 0){
            let temp = arr[left]
            arr[left] = arr[right]
            arr[right] = temp
            left++
        }
        right++
    }
    return arr
}
console.log(moveZeros([1,2,0,1,0,1,0,3,0,1]))
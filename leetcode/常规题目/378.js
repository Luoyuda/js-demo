/*
 * @Author: xiaohuolong
 * @Date: 2020-07-02 21:24:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-02 22:45:13
 * @FilePath: /js-demo/leetcode/378.js
 */ 
var kthSmallest = function(matrix, k) {
    var len = matrix.length
    if(!len) return 0
    var left = matrix[0][0]
    var right = matrix[len-1][len-1]
    while(left < right){
        var mid = left + Math.floor((right-left)/2)
        console.log(`left = ${left} mid = ${mid} right = ${right}`)
        if(check(matrix, mid, k, len)){
            right = mid
        }else{
            left = mid + 1
        }
    }
    return left
};

var check = function(matrix, mid, k, len){
    let i = len - 1
    let j = 0
    let num = 0
    while(i >= 0 && j < len){
        console.log(`matrix[i][j] = ${matrix[i][j]} mid = ${mid}`)
        if(matrix[i][j] <= mid){
            num += i + 1
            j++
        }else{
            i--
        }
        console.log(` num = ${num}`)
    }
    return num >= k
}

matrix = [
    [1,5,9],
    [10,11,13],
    [12,13,15]
]
k = 8

console.log(kthSmallest(matrix, k))
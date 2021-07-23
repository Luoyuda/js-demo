/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 22:58:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 23:18:32
 * @FilePath: /DesignPatterns/Iterator.js
 */
const each = function(arr, callback) {
    for (let i = 0; i < arr.length; i++){
        if(callback(i, arr[i]) === false){
            break;
        }
    }
}

each([1,2,3,4,5], (i, item) => {
    if(item > 3)return false
    console.log([i, item])
})
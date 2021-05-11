/*
 * @Author: xiaohuolong
 * @Date: 2021-03-10 10:42:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-29 00:07:17
 * @FilePath: /js-demo/leetcode/offer/offer.45.js
 */
/**
 * @param {number[]} nums
 * @return {string}
剑指 Offer 45. 把数组排成最小的数
    输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
示例 1:
    输入: [10,2]
    输出: "102"
示例 2:
    输入: [3,30,34,5,9]
    输出: "3033459"
提示:
    0 < nums.length <= 100
 */
var minNumber = function(nums) {
    let strs = nums.map(i => String(i))
    sort(strs, 0, strs.length - 1);
    // bubbleSort(strs)
    // console.log(strs)
    let str = strs.join('')
    let k = 0
    while (str[k] == '0') k++
    return str.substr(k)
};
var bubbleSort = arr => {
    let lastIndex = arr.length - 1
    let swapped = true
    let swappedIndex = 0
    while (swapped){
        swapped = false
        for (let i = 0; i < lastIndex; i++) {
            console.log(arr[i] + arr[i + 1], arr[i + 1] + arr[i])
            if((arr[i] + arr[i + 1]) > (arr[i + 1] + arr[i])){
                swap(arr, i, i + 1)
                swapped = true
                swappedIndex = i
            }
        }
        lastIndex = swappedIndex
    }
    return arr
}
var swap = (arr, i, j) => {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    // arr[i] = arr[i] ^ arr[j]
    // arr[j] = arr[i] ^ arr[j]
    // arr[i] = arr[i] ^ arr[j]
}

var sort = (strs, l, r) => {
    if(l >= r) return
    let i = l
    let j = r
    let tmp = strs[i]
    while(i < j){
        while((strs[j] + strs[l]) >= (strs[l] + strs[j]) && i < j) j--
        while((strs[i] + strs[l]) <= (strs[l] + strs[i]) && i < j) i++
        tmp = strs[i]
        strs[i] = strs[j]
        strs[j] = tmp
    }
    strs[j] = strs[l]
    strs[l] = tmp
    sort(strs, l, i - 1)
    sort(strs, i + 1, r)
}

// console.log(minNumber(['3','30','34','5','9']))
console.log(minNumber([0,9,8,7,6,5,4,3,2,1]))

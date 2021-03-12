/*
 * @Author: xiaohuolong
 * @Date: 2021-03-10 10:42:24
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-10 12:48:40
 * @FilePath: /js-demo/leetcode/offer.45.js
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
    // console.log(strs)
    return strs.join('')
};
var sort = (strs, l, r) => {
    if(l >= r) return
    let i = l
    let j = r
    let tmp = strs[i]
    // console.log(i, j)
    while(i < j){
        // console.log(strs[j] + strs[l], strs[l] + strs[j])
        // console.log(strs[i] + strs[l], strs[l] + strs[i])
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
// class Solution {
//     public String minNumber(int[] nums) {
//         String[] strs = new String[nums.length];
//         for(int i = 0; i < nums.length; i++)
//             strs[i] = String.valueOf(nums[i]);
//         quickSort(strs, 0, strs.length - 1);
//         StringBuilder res = new StringBuilder();
//         for(String s : strs)
//             res.append(s);
//         return res.toString();
//     }
//     void quickSort(String[] strs, int l, int r) {
//         if(l >= r) return;
//         int i = l, j = r;
//         String tmp = strs[i];
//         while(i < j) {
//             while((strs[j] + strs[l]).compareTo(strs[l] + strs[j]) >= 0 && i < j) j--;
//             while((strs[i] + strs[l]).compareTo(strs[l] + strs[i]) <= 0 && i < j) i++;
//             tmp = strs[i];
//             strs[i] = strs[j];
//             strs[j] = tmp;
//         }
//         strs[i] = strs[l];
//         strs[l] = tmp;
//         quickSort(strs, l, i - 1);
//         quickSort(strs, i + 1, r);
//     }
// }

console.log(minNumber([3,30,34,5,9]))
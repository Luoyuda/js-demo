/*
 * @Author: xiaohuolong
 * @Date: 2021-04-06 21:29:54
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-25 08:35:39
 * @FilePath: /js-demo/leetcode/常规题目/354.js
 */
/**
 * @param {number[][]} envelopes
 * @return {number}
354. 俄罗斯套娃信封问题
    给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。
    当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。
    请计算 最多能有多少个 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。
    注意：不允许旋转信封。
示例 1：
    输入：envelopes = [[5,4],[6,4],[6,7],[2,3]]
    输出：3
    解释：最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
示例 2：
    输入：envelopes = [[1,1],[1,1],[1,1]]
    输出：1
提示：
    1 <= envelopes.length <= 5000
    envelopes[i].length == 2
    1 <= wi, hi <= 104
 */
var maxEnvelopes = function(envelopes) {
    if(!envelopes.length) return 0
    let n = envelopes.length
    // 1. 先按w排序，w相同时按h排序
    envelopes.sort((a, b) => {
        if(a[0] != b[0]) return a[0] - b[0]
        return b[1] - a[1]
    })
    const dp = new Array(n).fill(1)
    // console.log(envelopes)
    let ans = 1
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if(envelopes[j][1] < envelopes[i][1]){
                // console.log(envelopes[j])
                // console.log(envelopes[i])
                // console.log(dp)
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        ans = Math.max(ans, dp[i])
    }
    // console.log(dp)
    return ans
};
var maxEnvelopes = function(envelopes) {
    if(!envelopes.length) return 0
    let n = envelopes.length
    // 1. 先按w排序，w相同时按h排序
    envelopes.sort((a, b) => {
        if(a[0] != b[0]) return a[0] - b[0]
        return b[1] - a[1]
    })
    const f = [envelopes[0][1]]
    // console.log(envelopes)
    // let ans = 1
    for (let i = 1; i < n; i++) {
        let height = envelopes[i][1]
        // console.log(f)
        if(height > f[f.length - 1]){
            f.push(height)
        }else{
            let index = binarySearch(f, height)
            f[index] = height
        }
    }
    return f.length
};
var binarySearch = function(f, height){
    let low = 0
    let high = f.length - 1
    while (low < high) {
        let mid = Math.floor((high - low) / 2) + low
        if(f[mid] < height){
            low = mid + 1
        }else{
            high = mid
        }
    }
    return low
}
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
    let nums = envelopes.sort((a, b) => {
        if(a[0] == b[0]){
            return b[1] - a[1]
        }else{
            return a[0] - b[0]
        }
    }).map(item => item[1])
    let n = nums.length
    let max = 1
    let dp = new Array(n).fill(1)
    for(let i = 1; i < n; i++){
        for(let j = 0; j < i; j++){
            if(nums[i] > nums[j]){
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        max = Math.max(max, dp[i])
    }
    return max
};
var envelopes = [[5,4],[6,7],[6,4],[2,3],[7,9]]
console.log(maxEnvelopes(envelopes));
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-29 08:02:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-29 08:24:55
 * @FilePath: /js-demo/leetcode/常规题目/403.js
 */
/*
403. 青蛙过河
    一只青蛙想要过河。 假定河流被等分为若干个单元格，
    并且在每一个单元格内都有可能放有一块石子（也有可能没有）。
    青蛙可以跳上石子，但是不可以跳入水中。
    给你石子的位置列表 stones（用单元格序号 升序 表示），
    请判定青蛙能否成功过河（即能否在最后一步跳至最后一块石子上）。
    开始时， 青蛙默认已站在第一块石子上，
    并可以假定它第一步只能跳跃一个单位（即只能从单元格 1 跳至单元格 2 ）。
    如果青蛙上一步跳跃了 k 个单位，那么它接下来的跳跃距离只能选择为 k - 1、k 或 k + 1 个单位。
    另请注意，青蛙只能向前方（终点的方向）跳跃。
示例 1：
    输入：stones = [0,1,3,5,6,8,12,17]
    输出：true
    解释：青蛙可以成功过河，按照如下方案跳跃：跳 1 个单位到第 2 块石子, 然后跳 2 个单位到第 3 块石子, 接着 跳 2 个单位到第 4 块石子, 然后跳 3 个单位到第 6 块石子, 跳 4 个单位到第 7 块石子, 最后，跳 5 个单位到第 8 个石子（即最后一块石子）。
示例 2：
    输入：stones = [0,1,2,3,4,8,9,11]
    输出：false
    解释：这是因为第 5 和第 6 个石子之间的间距太大，没有可选的方案供青蛙跳跃过去。
提示：
    2 <= stones.length <= 2000
    0 <= stones[i] <= 231 - 1
    stones[0] == 0
*/
/**
 * @param {number[]} stones
 * @return {boolean}
 */
var canCross = function(stones) {
    const n = stones.length
    const map = new Array(n).fill(0).map(() => new Map())
    let dfs = (stones, i, last) => {
        if(i == n - 1){
            return true
        }
        if(map[i].has(last)){
            return map[i].get(last)
        }
        for (let j = last - 1; j <= last + 1; j++) {
            if(j > 0){
                let r = j + stones[i]
                let k = find(stones, r)
                if(k != n && stones[k] == r && dfs(stones, k, j)){
                    map[i].set(last, true)
                    return map[i].get(last);
                }
            }
        }
        map[i].set(last, false)
        return map[i].get(last)
    }
    return dfs(stones, 0, 0)
};
var find = (nums, target) => {
    let l = 0
    let h = nums.length - 1
    while (l < h) {
        let m = l + Math.floor((h - l)/2)
        if(nums[m] < target){
            l = m + 1
        }else{
            h = m
        }
    }
    return l
}
var canCross = function(stones){
    let n = stones.length
    let dp = new Array(n).fill(0).map(() => new Array(n))
    dp[0][0] = true
    for (let i = 1; i < n; i++) {
        if(stones[i] - stones[i - 1] > i){
            return false
        }
    }
    for (let i = 1; i < n; i++) {
        for (let j = i - 1; j >= 0; j--) {
            let k = stones[i] - stones[j]
            if(k > j + 1) break
            dp[i][k] = dp[j][k - 1] || dp[j][k] || dp[j][k + 1]
            if(i == n - 1 && dp[i][k]){
                return true
            }
        }
    }
    return false
}
console.log(canCross([0,1,3,5,6,8,12,17]))
/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 15:20:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-18 15:34:29
 * @FilePath: /js-demo/leetcode/47.js
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
    47. 全排列 II
    给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
    示例 1：
    输入：nums = [1,1,2]
    输出：
    [[1,1,2],
    [1,2,1],
    [2,1,1]]
    示例 2：
    输入：nums = [1,2,3]
    输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */
var permuteUnique = function (nums) {
    let res = [];
    nums.sort((a, b) => a - b); // 先排序
    let numLen = nums.length
    let vis = {};
    let dfs = (t) => {
        // 如果 t.length == numLen 返回
        if(t.length >= numLen) return res.push(t)
        // 遍历开始
        for (let i = 0; i < numLen; i++) {
            // 避免产生重复的排列
            if (i - 1 >= 0 && nums[i - 1] == nums[i] && !vis[i - 1]) continue
            if(vis[i]) continue
            // 递归之前
            vis[i] = true
            t.push(nums[i])
            dfs(t.slice())
            // 递归之后回溯
            t.pop()
            vis[i] = false
        }
    }
    dfs([]);
    return res;
};
console.log(permuteUnique([1,1,1,3]))

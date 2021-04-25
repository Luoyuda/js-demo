/*
 * @Author: xiaohuolong
 * @Date: 2021-02-18 15:20:31
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-25 08:26:49
 * @FilePath: /js-demo/leetcode/常规题目/47.js
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

var permuteUnique = function (nums) {
    let res = [];
    nums.sort((a, b) => a - b); // 先排序
    let n = nums.length
    let vis = {};
    let dfs = (t, u, start) => {
        if(u == n){
            res.push(t)
            return
        }
        for (let i = start; i < n; i++) {
            if(vis[i]) continue
            vis[i] = true
            t[i] = nums[u]
            dfs(t.slice(), u + 1, u + 1 < n && nums[u + 1] == nums[u] ? i + 1 : 0)
            vis[i] = false
        }
    }
    dfs([], 0, 0);
    return res;
};
console.log(permuteUnique([1,1,2]))
console.log(permuteUnique([1,1,1,3]))

/*
 * @Author: xiaohuolong
 * @Date: 2021-02-20 17:38:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-20 17:47:14
 * @FilePath: /js-demo/leetcode/39.js
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
    39. 组合总和
    给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
    candidates 中的数字可以无限制重复被选取。
    说明：
        所有数字（包括 target）都是正整数。
        解集不能包含重复的组合。 
    示例 1：
        输入：candidates = [2,3,6,7], target = 7,
        所求解集为：
        [
            [7],
            [2,2,3]
        ]
    示例 2：
        输入：candidates = [2,3,5], target = 8,
        所求解集为：
        [
            [2,2,2,2],
            [2,3,3],
            [3,5]
        ]
    提示：
        1 <= candidates.length <= 30
        1 <= candidates[i] <= 200
        candidate 中的每个元素都是独一无二的。
        1 <= target <= 500

 */
var combinationSum = function(candidates, target) {
    let res = []
    if(!candidates.length || !target) return res
    let dfs = (t, start, sum) => {
        // console.log(t.reduce((prev, item) => item + prev, 0))
        // let sum = t.reduce((prev, item) => item + prev, 0)
        if(sum === target){
            return res.push(t)
        }else if(sum > target){
            return
        }
        for (let i = start; i < candidates.length; i++) {
            const e = candidates[i];
            t.push(e)
            dfs(t.slice(), i, sum + e)
            t.pop()
        }
    }
    dfs([], 0, 0)
    return res
};

console.log(combinationSum([2,3,6,7], 7))
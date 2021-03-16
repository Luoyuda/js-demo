/*
 * @Author: xiaohuolong
 * @Date: 2021-03-14 13:19:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-14 16:16:47
 * @FilePath: /js-demo/leetcode/08.04.js
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
    面试题 08.04. 幂集
        幂集。编写一种方法，返回某集合的所有子集。集合中不包含重复的元素。
        说明：解集不能包含重复的子集。
    示例:
        输入： nums = [1,2,3]
        输出：
            [
                [3],
                [1],
                [2],
                [1,2,3],
                [1,3],
                [2,3],
                [1,2],
                []
            ]
 */
var subsets = function(nums) {
    let res = []
    let dfs = (t, start) => {
        res.push(t)
        for (let i = start; i < nums.length; i++) {
            const num = nums[i];
            t.push(num)
            dfs(t.slice(), i + 1)
            t.pop(num)
        }
    }
    dfs([], 0)
    return res
};

var subsets = function(nums){
    let len = nums.length
    let res = []
    for (let i = 0; i < 1 << len; i++) {
        let subset = []
        for (let j = 0; j < len ; j++){
            // console.log(i, j)
            if ((i & (1 << j)) != 0) {
                subset.push(nums[j]);
            }
        }
        res.push(subset)
    }
    return res
}

console.log(subsets([1,2,3]))
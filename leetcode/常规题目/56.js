/*
 * @Author: xiaohuolong
 * @Date: 2021-04-08 17:16:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-08 17:32:29
 * @FilePath: /js-demo/leetcode/常规题目/56.js
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
56. 合并区间
    以数组 intervals 表示若干个区间的集合，
    其中单个区间为 intervals[i] = [starti, endi] 。
    请你合并所有重叠的区间，并返回一个不重叠的区间数组，
    该数组需恰好覆盖输入中的所有区间。
示例 1：
    输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
    输出：[[1,6],[8,10],[15,18]]
    解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：
    输入：intervals = [[1,4],[4,5]]
    输出：[[1,5]]
    解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
提示：
    1 <= intervals.length <= 104
    intervals[i].length == 2
    0 <= starti <= endi <= 104
 */
var merge = function(intervals) {
    let res = []
    let len = intervals.length
    if(!len) return res
    intervals.sort((a, b) => a[0] - b[0])
    // console.log(intervals)
    for (let i = 0; i < len; i++) {
        let l = intervals[i][0]
        let r = intervals[i][1]
        if(res.length == 0 || res[res.length - 1][1] < l){
            res.push([l, r])
        }else{
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], r)
        }
    }
    return res
};
let params = [[[1,3],[2,6],[8,10],[15,18]], [[1,4],[4,5]], [[1,4],[0,4]], [[1,4],[2,3]]]
params.forEach(item => {
    console.log(merge(item))
})
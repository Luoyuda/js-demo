/*
 * @Author: xiaohuolong
 * @Date: 2021-05-23 21:45:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-23 21:49:35
 * @FilePath: /js-demo/leetcode/常规题目/435.js
 */
/*
435. 无重叠区间
    给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
注意:
    可以认为区间的终点总是大于它的起点。
    区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
示例 1:
    输入: [ [1,2], [2,3], [3,4], [1,3] ]
    输出: 1
    解释: 移除 [1,3] 后，剩下的区间没有重叠。
示例 2:
    输入: [ [1,2], [1,2], [1,2] ]
    输出: 2
    解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
示例 3:
    输入: [ [1,2], [2,3] ]
    输出: 0
    解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
*/
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    let n = intervals.length
    if(!n) return 0
    intervals.sort((a, b) => a[1] - b[1])
    let count = 1
    let right = intervals[0][1]
    for (let i = 1; i < n; i++) {
        if(right <= intervals[i][0]){
            right = intervals[i][1]
            count++
        }
    }
    return n - count
};

console.log(eraseOverlapIntervals([ [1,2], [2,3], [3,4], [1,3] ]))
console.log(eraseOverlapIntervals([ [1,2], [1,2], [1,2] ]))
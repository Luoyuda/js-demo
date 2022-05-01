/*
253. 会议室 II
  给你一个会议时间安排的数组 intervals ，每个会议时间都会包括开始和结束的时间 intervals[i] = [starti, endi] ，返回 所需会议室的最小数量 。
示例 1：
  输入：intervals = [[0,30],[5,10],[15,20]]
  输出：2
示例 2：
  输入：intervals = [[7,10],[2,4]]
  输出：1
提示：
  1 <= intervals.length <= 104
  0 <= starti < endi <= 106
*/
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  const nums = []
  for (const [u, v] of intervals) {
    nums.push([u, 1])
    nums.push([v, -1])
  }
  nums.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
  let ans = 0
  let cur = 0
  for (const [, e] of nums) {
    cur += e
    ans = Math.max(ans, cur)
  }
  return ans
}

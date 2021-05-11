/*
 * @Author: xiaohuolong
 * @Date: 2021-04-29 14:49:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-29 15:25:41
 * @FilePath: /js-demo/leetcode/常规题目/506.js
 */
/* 
506. 相对名次
    给出 N 名运动员的成绩，找出他们的相对名次并授予前三名对应的奖牌。
    前三名运动员将会被分别授予 “金牌”，“银牌” 和“ 铜牌”
    （"Gold Medal", "Silver Medal", "Bronze Medal"）。
    (注：分数越高的选手，排名越靠前。)
示例 1:
    输入: [5, 4, 3, 2, 1]
    输出: ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
    解释: 前三名运动员的成绩为前三高的，因此将会分别被授予 “金牌”，“银牌”和“铜牌” 
    ("Gold Medal", "Silver Medal" and "Bronze Medal").
    余下的两名运动员，我们只需要通过他们的成绩计算将其相对名次即可。
提示:
    N 是一个正整数并且不会超过 10000。
    所有运动员的成绩都不相同。
*/
/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function(score) {
    let s = score.slice()
    let n = score.length
    shellSort(s)
    let map = new Map()
    for (let i = 0; i < n; i++) {
        let val = String(i + 1)
        if(i == 0) val = 'Gold Medal'
        else if(i == 1) val = 'Silver Medal'
        else if(i == 2) val = 'Bronze Medal'
        map.set(s[i], val)
    }
    for (let i = 0; i < n; i++) {
        score[i] = map.get(score[i])
    }
    return score
};

var shellSort = (arr) => {
    let maxGap = 1
    let n = arr.length
    while (maxGap <= n / 3){
        maxGap = maxGap * 3 + 1
    }
    for (let gap = maxGap; gap > 0; gap = (gap - 1) / 3) {
        for (let i = gap; i < n; i++) {
            let curr = arr[i]
            let preIndex = i - gap
            while(preIndex >= 0 && curr >= arr[preIndex]){
                arr[preIndex + gap] = arr[preIndex]
                preIndex = preIndex - gap
            }
            arr[preIndex + gap] = curr
        }
    }
    return arr
}

console.log(findRelativeRanks([5, 4, 3, 2, 1, 6]))
console.log(findRelativeRanks([10,3,8,9,4]))
// ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
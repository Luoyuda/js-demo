/*
 * @Author: xiaohuolong
 * @Date: 2021-08-17 09:13:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-17 09:15:25
 * @FilePath: \js-demo\leetcode\常规题目\551.js
 */
/*
551. 学生出勤记录 I
    给你一个字符串 s 表示一个学生的出勤记录，其中的每个字符用来标记当天的出勤情况（缺勤、迟到、到场）。记录中只含下面三种字符：

    'A'：Absent，缺勤
    'L'：Late，迟到
    'P'：Present，到场
    如果学生能够 同时 满足下面两个条件，则可以获得出勤奖励：

    按 总出勤 计，学生缺勤（'A'）严格 少于两天。
    学生 不会 存在 连续 3 天或 3 天以上的迟到（'L'）记录。
    如果学生可以获得出勤奖励，返回 true ；否则，返回 false 。
示例 1：
    输入：s = "PPALLP"
    输出：true
    解释：学生缺勤次数少于 2 次，且不存在 3 天或以上的连续迟到记录。
示例 2：
    输入：s = "PPALLL"
    输出：false
    解释：学生最后三天连续迟到，所以不满足出勤奖励的条件。
提示：
    1 <= s.length <= 1000
    s[i] 为 'A'、'L' 或 'P'
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function(s) {
    let aCount = 0
    let lCount = 0
    for(let x of s){
        if(x === 'A'){
            aCount++
            lCount = 0
        }
        if(aCount >= 2) return false
        if(x === 'L'){
            lCount++
        }
        if(lCount >= 3) return false
        if(x === 'P'){
            lCount = 0
        }
    }
    return true
};

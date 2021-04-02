/*
 * @Author: xiaohuolong
 * @Date: 2021-04-02 08:49:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-02 09:03:40
 * @FilePath: /js-demo/leetcode/面试金典/16.10.js
 */
/**
 * 面试题 16.10. 生存人数
给定 N 个人的出生年份和死亡年份，第 i 个人的出生年份为 birth[i]，死亡年份为 death[i]，
实现一个方法以计算生存人数最多的年份。
你可以假设所有人都出生于 1900 年至 2000 年（含 1900 和 2000 ）之间。
如果一个人在某一年的任意时期处于生存状态，那么他应该被纳入那一年的统计中。
例如，生于 1908 年、死于 1909 年的人应当被列入 1908 年和 1909 年的计数。
如果有多个年份生存人数相同且均为最大值，输出其中最小的年份。
示例：
输入：
    birth = {1900, 1901, 1950}
    death = {1948, 1951, 2000}
    输出： 1901
提示：
    0 < birth.length == death.length <= 10000
    birth[i] <= death[i]
 * @param {number[]} birth
 * @param {number[]} death
 * @return {number}
 */
var maxAliveYear = function(birth, death) {
    let res = []
    let n = birth.length
    for (let i = 0; i < n; i++) {
        res[birth[i] - 1900] = (res[birth[i] - 1900] || 0) + 1
        res[death[i] + 1 - 1900] = (res[death[i] + 1 - 1900] || 0) - 1
    }
    let ans = 0
    let ret
    for (let i = 0; i < 101; i++) {
        res[i] = (res[i] || 0) + (res[i-1] || 0)
        ans = Math.max(ans, res[i])
    }
    for (let i = 0; i < 101; i++) {
        if(ans == res[i]){
            ret = i
            break
        }
    }
    return ret + 1900
};
let birth = [1900, 1901, 1950]
let death = [1948, 1951, 2000]
console.log(maxAliveYear(birth, death));
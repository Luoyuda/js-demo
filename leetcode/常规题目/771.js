/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 15:01:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 15:05:06
 * @FilePath: /js-demo/leetcode/常规题目/771.js
 */
/**
771. 宝石与石头
    给定字符串J 代表石头中宝石的类型，和字符串 S代表你拥有的石头。 
    S 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
    J 中的字母不重复，J 和 S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。
示例 1:
    输入: J = "aA", S = "aAAbbbb"
    输出: 3
示例 2:
    输入: J = "z", S = "ZZ"
    输出: 0
注意:
    S 和 J 最多含有50个字母。
    J 中的字符不重复
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function(jewels, stones) {
    let hash = {}
    for (let i = 0; i < jewels.length; i++) {
        hash[jewels[i]] = true
    }
    let count = 0
    for (let i = 0; i < stones.length; i++) {
        if(hash[stones[i]]) count++
    }
    return count
};

console.log(numJewelsInStones('aA', 'aAAbbb'))
console.log(numJewelsInStones('z', 'ZZZ'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 15:05:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 15:14:32
 * @FilePath: /js-demo/leetcode/17.js
 */
/**
 * @param {string} digits
 * @return {string[]}
    17. 电话号码的字母组合
        给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
        给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
        2: abc 3: def 4: ghi 5:jkl 6: mno 7: pqrs 8: tuv 9: wxyz
    示例 1：
        输入：digits = "23"
        输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
    示例 2：
        输入：digits = ""
        输出：[]
    示例 3：
        输入：digits = "2"
        输出：["a","b","c"]
    提示：
        0 <= digits.length <= 4
        digits[i] 是范围 ['2', '9'] 的一个数字。
 */
var letterCombinations = function(digits) {
    let res = []
    if(!digits) return res
    const map = { 
        '2': 'abc', 
        '3': 'def', 
        '4': 'ghi', 
        '5': 'jkl', 
        '6': 'mno', 
        '7': 'pqrs', 
        '8': 'tuv', 
        '9': 'wxyz'
    };
    let dfs = (cur, start) => {
        if(cur.length >= digits.length){
            res.push(cur)
            return
        }
        let str = map[digits[start]]
        for (let i = 0; i < str.length; i++) {
            dfs(cur + str[i], start + 1)
        }
    }
    dfs('', 0)
    return res
};

console.log(letterCombinations('234'))
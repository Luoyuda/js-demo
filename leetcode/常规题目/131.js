/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 14:17:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-22 15:00:48
 * @FilePath: /js-demo/leetcode/131.js
 */
/**
 * @param {string} s
 * @return {string[][]}
    131. 分割回文串
    给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
    返回 s 所有可能的分割方案。
    示例:
        输入: "aab"
        输出:
        [
            ["aa","b"],
            ["a","a","b"]
        ]
 */
var partition = function(s) {
    let res = []
    let dfs = (curr, start) => {
        if(start >= s.length){
            res.push(curr)
            return 
        }
        for (let i = start; i < s.length; i++) {
            let str = s.slice(start, i + 1)
            if(str && isPal(str)){
                curr.push(str);
                dfs(curr.slice(), i + 1);
                // 回溯
                curr.pop();
            }
        }
    }
    dfs([], 0);
    return res
};

// 判断是否是回文
function isPal(str) {
    let len = Math.floor(str.length / 2);
    if (len === 0) {
        return true;
    }
    let add = str.length % 2 === 0 ? 0 : 1;
    let subStr = str.slice(0, len);
    for (let i = 0; i < len; i++) {
        if (subStr[len - i - 1] !== str[len + add + i]) {
            return false;
        }
    }
    return true;
}
console.log(partition('aab'))
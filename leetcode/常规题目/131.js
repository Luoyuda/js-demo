/*
 * @Author: xiaohuolong
 * @Date: 2021-02-22 14:17:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-13 21:22:54
 * @FilePath: /js-demo/leetcode/常规题目/131.js
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

var partition = function(s) {
    let res = []
    let n = s.length
    let dp = new Array(n)
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(n).fill(true)
    }
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1]
        }
    }
    let ret = []
    let dfs = (i) => {
        if(i == n){
            res.push(ret.slice())
            return
        }
        for (let j = i; j < n; j++) {
            if(dp[i][j]){
                ret.push(s.slice(i, j + 1))
                dfs(j + 1)
                ret.pop()
            }
        }
    }
    dfs(0)
    return res
};

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    let res = []
    let dfs = (curr, i) => {
        if(i == s.length){
            res.push(curr)
            return
        }
        for(let j = i; j < s.length; j++){
            let str = s.slice(i, j + 1)
            if(check(str)){
                curr.push(str)
                dfs(curr.slice(), j + 1)
                curr.pop()
            }
        }
    }
    dfs([], 0)
    return res
};

var check = function(s){
    let i = 0
    let j = s.length - 1
    while(i < j){
        if(s[i] != s[j]) return false
        i++
        j--
    }
    return true
}

console.log(partition('aab'))
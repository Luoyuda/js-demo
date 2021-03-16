/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 14:45:01
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 14:52:53
 * @FilePath: /js-demo/leetcode/763.js
 */
/**
 * @param {string} S
 * @return {number[]}
    763. 划分字母区间
        字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，
        同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。
    示例：
        输入：S = "ababcbacadefegdehijhklij"
        输出：[9,7,8]
    解释：
        划分结果为 "ababcbaca", "defegde", "hijhklij"。
        每个字母最多出现在一个片段中。
        像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
    提示：
        S的长度在[1, 500]之间。
        S只包含小写字母 'a' 到 'z' 。
 */
var partitionLabels = function(S) {
    let map = {}
    for (let i = 0; i < S.length; i++) {
        map[S[i]] = i
    }
    let start = 0
    let res = []
    let maxLen = 0
    for (let i = 0; i < S.length; i++) {
        const el = S[i];
        const curLen = map[el]
        maxLen = Math.max(curLen, maxLen)
        if(maxLen == i){
            let tmp = i - start + 1;
            start = i + 1;
            res.push(tmp);  // 划分片段
        }
    }
    return res
};

console.log(partitionLabels('ababcbacadefegdehijhklij'))
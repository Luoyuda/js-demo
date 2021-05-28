/*
 * @Author: xiaohuolong
 * @Date: 2021-05-17 14:20:55
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-17 14:33:00
 * @FilePath: /js-demo/leetcode/常规题目/1593.js
 */
/*
1593. 拆分字符串使唯一子字符串的数目最大
    给你一个字符串 s ，请你拆分该字符串，并返回拆分后唯一子字符串的最大数目。
    字符串 s 拆分后可以得到若干 非空子字符串 ，这些子字符串连接后应当能够还原为原字符串。
    但是拆分出来的每个子字符串都必须是 唯一的 。
    注意：子字符串 是字符串中的一个连续字符序列。
示例 1：
    输入：s = "ababccc"
    输出：5
    解释：一种最大拆分方法为 ['a', 'b', 'ab', 'c', 'cc'] 。像 ['a', 'b', 'a', 'b', 'c', 'cc'] 这样拆分不满足题目要求，因为其中的 'a' 和 'b' 都出现了不止一次。
示例 2：
    输入：s = "aba"
    输出：2
    解释：一种最大拆分方法为 ['a', 'ba'] 。
示例 3：
    输入：s = "aa"
    输出：1
    解释：无法进一步拆分字符串。
提示：
    1 <= s.length <= 16
    s 仅包含小写英文字母
*/
/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function(s) {
    let ans = 0
    let vis = {}
    let dfs = (u, t) => {
        if(u >= s.length){
            ans = Math.max(ans, t.length)
            return 
        }
        for(let i = u; i < s.length; i++){
            let str = s.substring(u, i + 1)
            if(vis[str]) continue
            vis[str] = true
            t.push(str)
            dfs(i + 1, t.slice())
            vis[str] = false
            t.pop()
        }
    }
    dfs(0, [])
    return ans
};

console.log(maxUniqueSplit('ababccc'))
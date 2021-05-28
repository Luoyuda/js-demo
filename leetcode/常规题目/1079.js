/*
 * @Author: xiaohuolong
 * @Date: 2021-05-17 15:10:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-17 15:15:50
 * @FilePath: /js-demo/leetcode/常规题目/1079.js
 */
/*
1079.活字印刷
    你有一套活字字模 tiles，其中每个字模上都刻有一个字母 tiles[i]。返回你可以印出的非空字母序列的数目。
    注意：本题中，每个活字字模只能使用一次。
示例 1：
    输入："AAB"
    输出：8
    解释：可能的序列为 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。
示例 2：
    输入："AAABBC"
    输出：188
提示：
    1 <= tiles.length <= 7
    tiles 由大写英文字母组成
*/
/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function(tiles) {
    let count = 0
    let vis = {}
    let hash = {}
    let dfs = (u, t) => {
        if(hash[t])return
        hash[t] = true
        count++
        for(let i = 0; i < tiles.length; i++){
            if(vis[i]) continue
            vis[i] = true
            dfs(i + 1, t + tiles[i])
            vis[i] = false
        }
    }
    dfs(0, '')
    return count - 1
};

console.log(numTilePossibilities("AAABBC"))
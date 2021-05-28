/*
 * @Author: xiaohuolong
 * @Date: 2021-05-23 18:04:23
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-23 18:05:15
 * @FilePath: /js-demo/leetcode/常规题目/1245.js
 */
/*
1245. 树的直径
    给你这棵「无向树」，请你测算并返回它的「直径」：这棵树上最长简单路径的 边数。
    我们用一个由所有「边」组成的数组 edges 来表示一棵无向树，
    其中 edges[i] = [u, v] 表示节点 u 和 v 之间的双向边。
    树上的节点都已经用 {0, 1, ..., edges.length} 中的数做了标记，每个节点上的标记都是独一无二的。
示例 1：
    输入：edges = [[0,1],[0,2]]
    输出：2
    解释：
    这棵树上最长的路径是 1 - 0 - 2，边数为 2。
示例 2：
    输入：edges = [[0,1],[1,2],[2,3],[1,4],[4,5]]
    输出：4
    解释： 
    这棵树上最长的路径是 3 - 2 - 1 - 4 - 5，边数为 4。
提示：
    0 <= edges.length < 10^4
    edges[i][0] != edges[i][1]
    0 <= edges[i][j] <= edges.length
    edges 会形成一棵无向树
*/
/**
 * @param {number[][]} edges
 * @return {number}
 */
var treeDiameter = function(edges) {
    let n = edges.length + 1
    let graph = new Array(n + 1).fill(0).map(() => new Array())
    for(let [x, y] of edges){
        graph[x].push(y)
        graph[y].push(x)
    }
    let level = -1
    let maxSteps = 0
    let seen = {}
    let dfs = (cur, steps) => {
        if(seen[cur]) return 
        seen[cur] = true
        for(let x of graph[cur]){
            dfs(x, steps + 1)
        }
        if(steps > maxSteps){
            level = cur
            maxSteps = steps
        }
    }
    dfs(0, 0)
    seen = {}
    dfs(level, 0)
    return maxSteps
};
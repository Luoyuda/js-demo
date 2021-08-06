/*
 * @Author: xiaohuolong
 * @Date: 2021-04-25 16:44:43
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-02 13:13:57
 * @FilePath: /js-demo/leetcode/常规题目/797.js
 */
/* 
797. 所有可能的路径
    给一个有 n 个结点的有向无环图，找到所有从 0 到 n-1 的路径并输出（不要求按顺序）
    二维数组的第 i 个数组中的单元都表示有向图中 i 号结点所能到达的下一些结点
    （译者注：有向图是有方向的，即规定了 a→b 你就不能从 b→a ）空就是没有下一个结点了。
示例 1：
    输入：graph = [[1,2],[3],[3],[]]
    输出：[[0,1,3],[0,2,3]]
    解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3
示例 2：
    输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
    输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
示例 3：
    输入：graph = [[1],[]]
    输出：[[0,1]]
示例 4：
    输入：graph = [[1,2,3],[2],[3],[]]
    输出：[[0,1,2,3],[0,2,3],[0,3]]
示例 5：
    输入：graph = [[1,3],[2],[3],[]]
    输出：[[0,1,2,3],[0,3]]
提示：
    结点的数量会在范围 [2, 15] 内。
    你可以把路径以任意顺序输出，但在路径内的结点的顺序必须保证。
*/
// dfs
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function(graph) {
    let res = []
    let n = graph.length
    let dfs = (node, t) => {
        if(t[t.length - 1] == n - 1){
            res.push(t)
            return
        }
        for (const n of graph[node]) {
            t.push(n)
            dfs(n, t.slice())
            t.pop()
        }
    }
    let t = []
    t.push(0)
    dfs(0, t)
    return res
};
// bfs
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function(graph) {
    let n = graph.length
    let path = [0]
    let q = [path]
    let res = []
    while(q.length){
        let p = q.shift()
        let list = graph[p[p.length -1]]
        for(let x of list){
            let tempPath = p.slice()
            tempPath.push(x)
            if(x === n - 1){
                res.push(tempPath)
            }else{
                q.push(tempPath)
            }
        }
    }
    return res
};
console.log(allPathsSourceTarget([[4,3,1],[3,2,4],[],[4],[]]))
// console.log(allPathsSourceTarget([[2],[],[1]]))
// [[0,4],[0,3,4],[0,1,3,4],[0,1,4]]
console.log(allPathsSourceTarget([[1,2],[3],[3],[]]))
// console.log(allPathsSourceTarget([[1],[]]))
// console.log(allPathsSourceTarget([[1,2,3],[2],[3],[]]))
// console.log(allPathsSourceTarget([[1,3],[2],[3],[]]))
// console.log(allPathsSourceTarget([[4,3,1],[3,2,4],[3],[4],[]]))
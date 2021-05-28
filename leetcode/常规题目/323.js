/*
 * @Author: xiaohuolong
 * @Date: 2021-05-13 17:22:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 12:00:38
 * @FilePath: /js-demo/leetcode/常规题目/323.js
 */
/*
323. 无向图中连通分量的数目
    给定编号从 0 到 n-1 的 n 个节点和一个无向边列表（每条边都是一对节点），
    请编写一个函数来计算无向图中连通分量的数目。
示例 1:
    输入: n = 5 和 edges = [[0, 1], [1, 2], [3, 4]]
     0          3
     |          |
     1 --- 2    4 
    输出: 2
示例 2:
    输入: n = 5 和 edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
     0           4
     |           |
     1 --- 2 --- 3
    输出:  1
注意:
    你可以假设在 edges 中不会出现重复的边。而且由于所以的边都是无向边，
    [0, 1] 与 [1, 0]  相同，所以它们不会同时在 edges 中出现。
*/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    // 构建图
    let graph = new Array(n).fill(0).map(item => new Array())
    for(let [x, y] of edges){
        graph[x].push(y)
        graph[y].push(x)
    }
    // 深度搜索
    let count = 0
    let visited = {}
    for(let i = 0; i < graph.length; i++){
        if(visited[i]) continue
        dfs(graph, i, visited)
        count++
    }
    return count
};
var dfs = function(graph, i, visited){
    visited[i] = true
    for(let x of graph[i]){
        if(!visited[x]){
            dfs(graph, x, visited)
        }
    }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    let graph = new Array(n).fill(0).map(() => new Array())
    for(let [x, y] of edges){
        graph[x].push(y)
        graph[y].push(x)
    }
    let visited = []
    let count = 0
    for(let i = 0; i < n; i++){
        if(!visited[i]){
            bfs(graph, i, visited)
            count++
        }
    }
    return count
};

var bfs = function(graph, i, visited){
    let q = [i]
    visited[i] = true
    while(q.length){
        let list = graph[q.shift()]
        for(let x of list){
            if(!visited[x]){
                visited[x] = true
                q.push(x)
            }
        }
    }
}

console.log(countComponents(5, [[0, 1], [1, 2], [3, 4]]))
/*
 * @Author: xiaohuolong
 * @Date: 2021-08-03 16:09:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-03 17:23:59
 * @FilePath: /js-demo/leetcode/常规题目/743.js
 */
/*
743. 网络延迟时间
    有 n 个网络节点，标记为 1 到 n。
    给你一个列表 times，表示信号经过 有向 边的传递时间。 times[i] = (ui, vi, wi)，其中 ui 是源节点，vi 是目标节点， wi 是一个信号从源节点传递到目标节点的时间。
    现在，从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1 。
示例 1：
    输入：times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
    输出：2
示例 2：
    输入：times = [[1,2,1]], n = 2, k = 1
    输出：1
示例 3：
    输入：times = [[1,2,1]], n = 2, k = 2
    输出：-1
提示：
    1 <= k <= n <= 100
    1 <= times.length <= 6000
    times[i].length == 3
    1 <= ui, vi <= n
    ui != vi
    0 <= wi <= 100
    所有 (ui, vi) 对都 互不相同（即，不含重复边
*/
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
// dijkstra算法，graph为邻接数组
function dijkstra(graph, start, n = graph.length) {
    // 起点到所有节点的最短时间，初始化为无穷大
    const dist = new Array(n).fill(Infinity)
    const visited = {}
    // 起点到起点的延迟为0
    dist[start] = 0
    let cur = start
    for (let i = 1; i < n; i += 1) {
        visited[cur] = 1
        let min = 0
        for (let j = 0; j < n; j += 1) {
            if (visited[j] || j === cur) continue
            // 松弛
            dist[j] = Math.min(dist[j], dist[cur] + graph[cur][j])
            // 选取下一个顶点
            if (dist[j] < dist[min]) min = j
        }
        cur = min
    }
    // 返回所有点的最短延迟（如果其中有节点为无穷大，说明不能从起点完整遍历图）
    return dist
}

var networkDelayTime = function (times, n, k) {
    const graph = new Array(n)
    for (let i = 0; i < n; i += 1) {
        graph[i] = new Array(n).fill(Infinity)
    }
    // 处理邻接数组，所有点序号-1方便计算
    times.forEach(([from, to, time]) => graph[from - 1][to - 1] = time)
    // 计算最大的最短延迟
    const totalTime = Math.max(...dijkstra(graph, k - 1))
    return totalTime === Infinity ? -1 : totalTime
};

var networkDelayTime = function(times, n, k) {
    let graph = new Array(n).fill(0).map(() => new Array(n).fill(Infinity))
    times.forEach(([x, y, z]) => graph[x - 1][y - 1] = z)
    let dist = new Array(n).fill(Infinity)
    let visited = new Array(n).fill(false)
    let cur = k - 1
    dist[cur] = 0
    for(let i = 1; i < n; i++){
        visited[cur] = true
        let min = -1
        for(let j = 0; j < n; j++){
            if(visited[j] || j == cur) continue
            dist[j] = Math.min(dist[j], dist[cur] + graph[cur][j])
            if(min == -1 || dist[j] < dist[min]) min = j
        }
        cur = min
    }
    let ans = Math.max(...dist)
    return ans === Infinity ? -1 : ans
};
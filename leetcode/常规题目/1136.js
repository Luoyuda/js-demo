/*
 * @Author: xiaohuolong
 * @Date: 2021-05-21 17:40:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-21 17:40:58
 * @FilePath: /js-demo/leetcode/常规题目/1136.js
 */
/*
1136. 平行课程
    已知有 N 门课程，它们以 1 到 N 进行编号。
    给你一份课程关系表 relations[i] = [X, Y]，用以表示课程 X 和课程 Y 之间的先修关系：课程 X 必须在课程 Y 之前修完。
    假设在一个学期里，你可以学习任何数量的课程，但前提是你已经学习了将要学习的这些课程的所有先修课程。
    请你返回学完全部课程所需的最少学期数。
    如果没有办法做到学完全部这些课程的话，就返回 -1。
示例 1：
    输入：N = 3, relations = [[1,3],[2,3]]
    输出：2
    解释：
    在第一个学期学习课程 1 和 2，在第二个学期学习课程 3。
示例 2：
    输入：N = 3, relations = [[1,2],[2,3],[3,1]]
    输出：-1
    解释：
    没有课程可以学习，因为它们相互依赖。
提示：
    1 <= N <= 5000
    1 <= relations.length <= 5000
    relations[i][0] != relations[i][1]
    输入中没有重复的关系
*/
/**
 * @param {number} n
 * @param {number[][]} relations
 * @return {number}
 */
var minimumSemesters = function(n, relations) {
    // 第 1 步：初始化邻接表
    let adj = {}
    for(let i = 1; i <= n; i++){
        adj[i] = new Set()
    }
    // 构建邻接表和入度
    let inDegree = new Array(n + 1).fill(0)
    for(let [x, y] of relations){
        inDegree[y]++
        adj[x].add(y)
    }
    // 第 2 步：开始广度优先遍历
    let q = []
    for(let i = 1; i <= n; i++){
        if(inDegree[i] == 0){
            // 入度为 0 的所有顶点在拓扑排序的结果中位于其它顶点的前面
            q.push(i)
        }
    }
    let steps = 0
    while(q.length){
        let len = q.length
        for(let i = 0; i < len; i++){
            let j = q.shift()
            let list = adj[j]
            for(let x of list){
                // 删除一条边，等价于被指向结点的入度减 1
                inDegree[x]--
                // 如果入度减 1 以后为 0，该结点就是接下来要遍历到的结点
                if(inDegree[x] == 0){
                    q.push(x)
                }
            }
        }
        steps++
    }
    // 第 3 步：如果还有一些顶点有边指向它，说明图中存在环
    for(let i = 1; i <= n; i++){
        if(inDegree[i] > 0){
            return -1
        }
    }

    return steps
};
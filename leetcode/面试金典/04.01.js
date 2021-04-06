/*
 * @Author: xiaohuolong
 * @Date: 2021-04-01 20:43:06
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-01 20:43:12
 * @FilePath: /js-demo/leetcode/面试金典/04.01.js
 */
/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
面试题 04.01. 节点间通路
    节点间通路。给定有向图，设计一个算法，找出两个节点之间是否存在一条路径。
示例1:
    输入：n = 3, graph = [[0, 1], [0, 2], [1, 2], [1, 2]], start = 0, target = 2
    输出：true
示例2:
    输入：n = 5, graph = [[0, 1], [0, 2], [0, 4], [0, 4], [0, 1], [1, 3], [1, 4], [1, 3], [2, 3], [3, 4]], start = 0, target = 4
    输出 true
提示：
    节点数量n在[0, 1e5]范围内。
    节点编号大于等于 0 小于 n。
    图中可能存在自环和平行边。
 */
var findWhetherExistsPath = function(n, graph, start, target) {

};

console.log(findWhetherExistsPath(3, [[0, 1], [0, 2], [1, 2], [1, 2]], 0, 2))
/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 21:04:09
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 21:16:31
 * @FilePath: /js-demo/leetcode/常规题目/542.js
 */
/*
542. 01 矩阵
    给定一个由 0 和 1 组成的矩阵，找出每个元素到最近的 0 的距离。
    两个相邻元素间的距离为 1 。
示例 1：
输入：
    [[0,0,0],
    [0,1,0],
    [0,0,0]]
输出：
    [[0,0,0],
    [0,1,0],
    [0,0,0]]
示例 2：
输入：
    [[0,0,0],
    [0,1,0],
    [1,1,1]]
输出：
    [[0,0,0],
    [0,1,0],
    [1,2,1]]
提示：
    给定矩阵的元素个数不超过 10000。
    给定矩阵中至少有一个元素是 0。
    矩阵中的元素只在四个方向上相邻: 上、下、左、右。
*/
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var dx = [-1, 0, 1, 0]
var dy = [0, -1, 0, 1]
var updateMatrix = function(matrix) {
    let m = matrix.length
    if(!m) return matrix
    let n = matrix[0].length
    if(!n) return matrix
    let seen = new Array(m)
    let dist = new Array(m)
    for (let i = 0; i < m; i++) {
        seen[i] = new Array(n).fill(0)
        dist[i] = new Array(n).fill(0)
    }
    let q = []
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if(matrix[i][j] == 0){
                q.push([i, j])
                seen[i][j] = 1
            }
        }
    }
    while(q.length){
        let [x, y] = q.shift()
        for (let i = 0; i < 4; i++) {
            let a = x + dx[i]
            let b = y + dy[i]
            if(a >= 0 && b >= 0 && a < m && b < n && seen[a][b] == 0){
                dist[a][b] = dist[x][y] + 1;
                q.push([a, b])
                seen[a][b] = 1
            }
        }
    }
    return dist
};

console.log(updateMatrix(
    [[0,0,0],
    [0,1,0],
    [1,1,1]]
))
console.log(updateMatrix(
    [
        [1,1,1,1],
        [1,0,1,1],
        [1,1,0,1],
        [1,1,1,1],
    ]
))
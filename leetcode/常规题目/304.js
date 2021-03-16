/*
 * @Author: xiaohuolong
 * @Date: 2021-03-02 12:47:35
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-02 13:13:55
 * @FilePath: /js-demo/leetcode/304.js
 */
/**
 * @param {number[][]} matrix
    304. 二维区域和检索 - 矩阵不可变
        给定一个二维矩阵，计算其子矩形范围内元素的总和，该子矩阵的左上角为 (row1, col1) ，右下角为 (row2, col2) 。
        Range Sum Query 2D
        上图子矩阵左上角 (row1, col1) = (2, 1) ，右下角(row2, col2) = (4, 3)，该子矩形内元素的总和为 8。
    示例：
        给定 matrix = [
            [3, 0, 1, 4, 2],
            [5, 6, 3, 2, 1],
            [1, 2, 0, 1, 5],
            [4, 1, 0, 1, 7],
            [1, 0, 3, 0, 5]
        ]
        sumRegion(2, 1, 4, 3) -> 8
        sumRegion(1, 1, 2, 2) -> 11
        sumRegion(1, 2, 2, 4) -> 12
 */
var NumMatrix = function(matrix) {
    this.matrix = matrix
    let m = this.matrix.length
    if (m > 0) {
        const n = matrix[0].length;
        this.sums = new Array(m).fill(0).map(() => new Array(n + 1).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                this.sums[i][j + 1] = this.sums[i][j] + matrix[i][j];
            }
        }
    }
    // console.log(this.sums)
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    let sum = 0;
    for (let i = row1; i <= row2; i++) {
        sum += this.sums[i][col2 + 1] - this.sums[i][col1];
    }
    return sum;
};


var obj = new NumMatrix([
    [3, 0, 1, 4, 2],
    [5, 6, 3, 2, 1],
    [1, 2, 0, 1, 5],
    [4, 1, 0, 1, 7],
    [1, 0, 3, 0, 5]
])
console.log(obj.sumRegion(2, 1, 4, 3))
console.log(obj.sumRegion(1, 1, 2, 2))
console.log(obj.sumRegion(1, 2, 2, 4))
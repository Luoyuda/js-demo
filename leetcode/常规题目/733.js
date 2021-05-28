/*
 * @Author: xiaohuolong
 * @Date: 2021-04-23 17:52:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 20:59:07
 * @FilePath: /js-demo/leetcode/常规题目/733.js
 */
/*
733. 图像渲染
    有一幅以二维整数数组表示的图画，每一个整数表示该图画的像素值大小，数值在 0 到 65535 之间。
    给你一个坐标 (sr, sc) 表示图像渲染开始的像素值（行 ，列）和一个新的颜色值 newColor，让你重新上色这幅图像。
    为了完成上色工作，从初始坐标开始，记录初始坐标的上下左右四个方向上像素值与初始坐标相同的相连像素点，
    接着再记录这四个方向上符合条件的像素点与他们对应四个方向上像素值与初始坐标相同的相连像素点，……，
    重复该过程。将所有有记录的像素点的颜色值改为新的颜色值。
    最后返回经过上色渲染后的图像。
示例 1:
    输入: 
    image = [[1,1,1],[1,1,0],[1,0,1]]
    sr = 1, sc = 1, newColor = 2
    输出: [[2,2,2],[2,2,0],[2,0,1]]
解析: 
    在图像的正中间，(坐标(sr,sc)=(1,1)),
    在路径上所有符合条件的像素点的颜色都被更改成2。
    注意，右下角的像素没有更改为2，
    因为它不是在上下左右四个方向上与初始点相连的像素点。
注意:
    image 和 image[0] 的长度在范围 [1, 50] 内。
    给出的初始点将满足 0 <= sr < image.length 和 0 <= sc < image[0].length。
    image[i][j] 和 newColor 表示的颜色值在范围 [0, 65535]内。
*/
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    let m = image.length
    let n = image[0].length
    let color = image[sr][sc]
    if(color == newColor) return image
    let dfs = (x, y) => {
        if(x < 0 || y < 0 || x >= m || y >= n || image[x][y] != color) return
        image[x][y] = newColor
        dfs(x-1, y)
        dfs(x+1, y)
        dfs(x, y-1)
        dfs(x, y+1)
    }
    dfs(sr, sc)
    return image
}; 

var dx = [-1, 0, 1, 0]
var dy = [0, 1, 0, -1]
var floodFill = function(image, sr, sc, newColor){
    if(image[sr][sc] == newColor || !image.length) return image
    let oldColor = image[sr][sc]
    image[sr][sc] = newColor
    for (let i = 0; i < 4; i++) {
        let x = sr + dx[i]
        let y = sc + dy[i]
        if(x >= 0 && y >= 0 && x < image.length && y < image[0].length && image[x][y] == oldColor){
            floodFill(image, x, y, newColor)
        }
    }
    return image
}

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    let oColor = image[sr][sc]
    if(oColor == newColor) return image
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let m = image.length
    let n = image[0].length
    let inArea = (x, y) => x >= 0 && y >= 0 && x < m && x < n
    let bfs = (x, y) => {
        let q = [[x, y]]
        while(q.length){
            let [x, y] = q.shift()
            image[x][y] = newColor
            for(let i = 0; i < 4; i++){
                let a = x + dx[i]
                let b = y + dy[i]
                if(inArea(a, b) && image[a][b] == oColor){
                    q.push([a, b])
                }
            }
        }
    }
    bfs(sr, sc)
    return image
};
console.log(floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2))
console.log(floodFill([[0,0,0],[0,1,1]], 1, 1, 1))
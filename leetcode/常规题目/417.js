/*
 * @Author: xiaohuolong
 * @Date: 2021-05-20 16:15:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 16:32:26
 * @FilePath: /js-demo/leetcode/常规题目/417.js
 */
/*
417. 太平洋大西洋水流问题
    给定一个 m x n 的非负整数矩阵来表示一片大陆上各个单元格的高度。“太平洋”处于大陆的左边界和上边界，
    而“大西洋”处于大陆的右边界和下边界。
    规定水流只能按照上、下、左、右四个方向流动，且只能从高到低或者在同等高度上流动。
    请找出那些水流既可以流动到“太平洋”，又能流动到“大西洋”的陆地单元的坐标。
提示：
    输出坐标的顺序不重要
    m 和 n 都小于150
示例：
    给定下面的 5x5 矩阵:
 太平洋 ~   ~   ~   ~   ~ 
       ~  1   2   2   3  (5) *
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * 大西洋
返回:
    [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (上图中带括号的单元).
*/
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    let m = heights.length
    let n = heights[0].length
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let inArea = (x, y) => x >= 0 && y >= 0 && x < m && y < n
    let po = new Array(m).fill(0).map(() => new Array(n).fill(0))
    let ao = new Array(m).fill(0).map(() => new Array(n).fill(0))
    let dfs = (x, y, matrix) => {
        matrix[x][y] = 1
        for(let i = 0; i < 4; i++){
            let a = x + dx[i]
            let b = y + dy[i]
            if(inArea(a, b) && heights[x][y] <= heights[a][b] && matrix[a][b] == 0){
                dfs(a, b, matrix)
            }
        }
    }
    for(let i = 0; i < n; i++){
        dfs(0, i, po)
        dfs(m - 1, i, ao)
    }
    for(let i = 0; i < m; i++){
        dfs(i, 0, po)
        dfs(i, n - 1, ao)
    }
    let ans = []
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(po[i][j] == 1 && ao[i][j] == 1){
                ans.push([i, j])
            }
        }
    }
    return ans
};

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    let m = heights.length
    let n = heights[0].length
    let dx = [-1, 0, 1, 0]
    let dy = [0, -1, 0, 1]
    let inArea = (x, y) => x >= 0 && y >= 0 && x < m && y < n
    let po = new Array(m).fill(0).map(() => new Array(n).fill(0))
    let ao = new Array(m).fill(0).map(() => new Array(n).fill(0))
    let bfs = (x, y, matrix) => {
        let q = [[x, y]]
        matrix[x][y] = 1
        while(q.length){
            let [x, y] = q.shift()
            for(let i = 0; i < 4; i++){
                let a = x + dx[i]
                let b = y + dy[i]
                if(inArea(a, b) && heights[x][y] <= heights[a][b] && matrix[a][b] == 0){
                    matrix[a][b] = 1
                    q.push([a, b])
                }
            }
        }
    }
    for(let i = 0; i < n; i++){
        bfs(0, i, po)
        bfs(m - 1, i, ao)
    }
    for(let i = 0; i < m; i++){
        bfs(i, 0, po)
        bfs(i, n - 1, ao)
    }
    let ans = []
    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(po[i][j] == 1 && ao[i][j] == 1){
                ans.push([i, j])
            }
        }
    }
    return ans
};

console.log(pacificAtlantic([
    [1,2,2,3,5],
    [3,2,3,4,4],
    [2,4,5,3,1],
    [6,7,1,4,5],
    [5,1,1,2,4]
]))
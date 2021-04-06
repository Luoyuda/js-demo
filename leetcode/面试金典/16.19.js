/*
 * @Author: xiaohuolong
 * @Date: 2021-04-04 15:52:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-04 16:04:01
 * @FilePath: /js-demo/leetcode/面试金典/16.19.js
 */
/**
 * @param {number[][]} land
 * @return {number[]}
面试题 16.19. 水域大小
    你有一个用于表示一片土地的整数矩阵land，
    该矩阵中每个点的值代表对应地点的海拔高度。若值为0则表示水域。
    由垂直、水平或对角连接的水域为池塘。池塘的大小是指相连接的水域的个数。
    编写一个方法来计算矩阵中所有池塘的大小，返回值需要从小到大排序。
示例：
输入：
    [
        [0,2,1,0],
        [0,1,0,1],
        [1,1,0,1],
        [0,1,0,1]
    ]
输出： [1,2,4]
提示：
    0 < len(land) <= 1000
    0 < len(land[i]) <= 1000
*/
var pondSizes = function(land) {
    let n = land.length
    if(!n) return []
    let m = land[0].length
    let findPool = (land, x, y) => {
        let num = 0
        if(x < 0 || y < 0 || x >= n || y >= m || land[x][y] != 0) return num
        land[x][y] = -1
        num = findPool(land, x - 1, y)
        + findPool(land, x + 1, y)
        + findPool(land, x, y+ 1)
        + findPool(land, x, y - 1)
        + findPool(land, x - 1, y - 1)
        + findPool(land, x + 1, y - 1)
        + findPool(land, x - 1, y + 1)
        + findPool(land, x + 1, y + 1) + 1
        return num
    }
    let res = []
    for (let i = 0; i < land.length; i++) {
        for (let j = 0; j < land[i].length; j++) {
            let size = findPool(land, i, j)
            if(size > 0){
                res.push(size)
            }
        }
    }
    return res.sort()
};

console.log(pondSizes([
    [0,2,1,0],
    [0,1,0,1],
    [1,1,0,1],
    [0,1,0,1]
]))
/*
 * @Author: xiaohuolong
 * @Date: 2021-02-25 14:16:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 21:23:18
 * @FilePath: /js-demo/leetcode/offer/offer.13.js
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
    剑指 Offer 13. 机器人的运动范围
        地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
        一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），
        也不能进入行坐标和列坐标的数位之和大于k的格子。
        例如，当k为18时，机器人能够进入方格 [35, 37] ，
        因为3+5+3+7=18。但它不能进入方格 [35, 38]，
        因为3+5+3+8=19。请问该机器人能够到达多少个格子？
    示例 1：
        输入：m = 2, n = 3, k = 1
        输出：3
    示例 2：
        输入：m = 3, n = 1, k = 0
        输出：1
    提示：
        1 <= n,m <= 100
        0 <= k <= 20
 */
var movingCount = function(m, n, k) {
    let grid = []
    for (let i = 0; i < m; i++) {
        grid.push(new Array(n).fill(1))
    }
    let get = (x) => {
        let res = 0;
        while (x != 0) {
            res += x % 10;
            x = Math.floor(x / 10);
        }
        return res;
    }
    let check = (x, y) => {
        let sum = get(x) + get(y)
        // console.log(x, y)
        // console.log(sum, k)
        return sum > k
    }
    let dfs = (x, y, count) => {
        if(x < 0 || y < 0 || x >= m || y >= n || grid[x][y] == 0 || check(x, y)) return 0
        grid[x][y] = 0
        count = 1 + dfs(x+1, y) + dfs(x, y+1)
        return count
    }
    return dfs(0, 0, 0)
};

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
    let nums = {}
    let len = Math.max(m, n)
    let getNum = x => {
        let res = 0
        while(x != 0){
            res += x % 10
            x = Math.floor(x / 10)
        }
        return res
    }
    for(let i = 0; i < len; i++){
        nums[i] = getNum(i)
    }
    let dx = [1, 0]
    let dy = [0, 1]
    let inArea = (x, y) => x >= 0 && y >= 0 && x < m && y < n
    let grid = new Array(m).fill(0).map(() => new Array(n).fill(0))
    let bfs = (x, y) => {
        let q = [[x, y]]
        let cnt = 1
        grid[x][y] = 1
        while(q.length){
            let [x, y] = q.shift()
            for(let i = 0; i < 4; i++){
                let a = x + dx[i]
                let b = y + dy[i]
                if(inArea(a, b) && grid[a][b] == 0 && nums[a] + nums[b] <= k){
                    cnt++
                    grid[a][b] = 1
                    q.push([a, b])
                }
            }
        }
        return cnt
    }
    return bfs(0, 0)
};

console.log(movingCount(11, 8, 16))
// console.log(movingCount(3, 2, 17))
/*
 * @Author: xiaohuolong
 * @Date: 2021-08-02 10:45:58
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-02 10:46:44
 * @FilePath: /js-demo/leetcode/常规题目/547.js
 */
/*
547. 省份数量
    有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。
    省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。
    给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。
    返回矩阵中 省份 的数量。
示例 1：
    输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
    输出：2
示例 2：
    输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
    输出：3
提示：
    1 <= n <= 200
    n == isConnected.length
    n == isConnected[i].length
    isConnected[i][j] 为 1 或 0
    isConnected[i][i] == 1
    isConnected[i][j] == isConnected[j][i]
*/
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    let n = isConnected.length
    let uf = new UnionFind(n)
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            if(isConnected[i][j] === 1){
                uf.union(i, j)
            }
        }
    }
    return uf.count
};
class UnionFind{
    constructor(size){
        this.root = new Array(size).fill(0).map((j, i) => i)
        this.rank = new Array(size).fill(1)
        this.count = size
    }
    find(x){
        if(x === this.root[x]) return x
        return this.root[x] = this.find(this.root[x])
    }
    union(x, y){
        let rootX = this.find(x)
        let rootY = this.find(y)
        if(rootX !== rootY){
            let rankX = this.rank[rootX]
            let rankY = this.rank[rootY]
            if(rankX > rankY){
                this.root[rootY] = rootX
            }else if(rankX < rankY){
                this.root[rootX] = rootY
            }else{
                this.root[rootY] = rootX
                this.rank[rootX]++
            }
            this.count--
        }
    }
    connected(x, y){
        return this.find(x) === this.find(y)
    }
}
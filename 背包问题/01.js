/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 08:01:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 14:47:25
 * @FilePath: /js-demo/背包问题/01.js
 */
/* 
2. 01背包问题
有 N 件物品和一个容量是 V 的背包。每件物品只能使用一次。
第 i 件物品的体积是 vi，价值是 wi。
求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
输出最大价值。
输入格式
第一行两个整数，N，V，用空格隔开，分别表示物品数量和背包容积。
接下来有 N 行，每行两个整数 vi,wi，用空格隔开，分别表示第 i 件物品的体积和价值。
输出格式
输出一个整数，表示最大价值。
数据范围
    0<N,V≤1000
    0<vi,wi≤1000
输入样例
    4 5
    1 2
    2 4
    3 4
    4 5
输出样例：
    8
*/
/*
动态规划思路
f[i][j] 表示只看前i个物品，总体积为j的情况下总价值是多少
result = max{f[n][0~v]}
f[i][j]: 
1. 不选 i f[i][j] = f[i-1][j]
2. 选 i f[i][j] = f[i-1][j-v[i]] + w[i]
f[i][j] = max{1,2}
f[0][0] = 0
*/
/**
 * 二维数组
 * @param {Number} V 背包体积
 * @param {[Number]} v 物品体积
 * @param {[Number]} w 物品价值
 */
var main = (V, v, w) => {
    let n = v.length
    let m = V
    let f = new Array(n)
    for (let i = 0; i < f.length; i++) {
        f[i] = new Array(m + 1).fill(0)
    }
    for (let j = v[0]; j <= m; j++) {
        f[0][j] = w[0]
    }
    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= m; j++) {
            f[i][j] = f[i-1][j]
            if(j >= v[i]){
                f[i][j] = Math.max(f[i][j], f[i - 1][j - v[i]] + w[i])
            }
        }
    }
    console.log(f)
    let res = 0
    for (let i = 0; i <= m; i++) {
        res = Math.max(res, f[n-1][i])
    }
    return res
}

/**
 * 一维数组
 * @param {Number} V 背包体积
 * @param {[Number]} v 物品体积
 * @param {[Number]} w 物品价值
 */
var main = (V, v, w) => {
    let n = v.length
    let m = V
    let f = new Array(m + 1).fill(0)
    for (let i = 0; i < n; i++) {
        for (let j = m; j >= v[i]; j--) {
            // console.log(`j=${j}, v[i]=${v[i]}, w[i]=${w[i]}`)
            f[j] = Math.max(f[j], f[j - v[i]] + w[i])
        }
        console.log(f)
    }
    return f[m]
}

console.log(main(5, [2,1,3,4], [4,2,4,5]))
console.log(main(5, [1,2,3,4], [2,4,4,5]))
console.log(main(5, [3,1,2,4], [4,2,4,5]))
console.log(main(5, 
    [4,1,2,3], 
    [5,2,4,4]
))
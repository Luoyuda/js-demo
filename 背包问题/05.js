/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 13:18:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 13:30:15
 * @FilePath: /js-demo/背包问题/05.js
 */
/*
二维费用的背包问题
    有 N 件物品和一个容量是 V 的背包，背包能承受的最大重量是 M。
    每件物品只能用一次。体积是 vi，重量是 mi，价值是 wi。
    求解将哪些物品装入背包，可使物品总体积不超过背包容量，总重量不超过背包可承受的最大重量，且价值总和最大。
    输出最大价值。
输入格式
    第一行两个整数，N，V,M，用空格隔开，分别表示物品件数、背包容积和背包可承受的最大重量。
    接下来有 N 行，每行三个整数 vi,mi,wi，用空格隔开，分别表示第 i 件物品的体积、重量和价值。
输出格式
    输出一个整数，表示最大价值。
数据范围
    0<N≤1000
    0<V,M≤100
    0<vi,mi≤100
    0<wi≤1000
输入样例
    4 5 6
    1 2 3
    2 4 4
    3 4 5
    4 5 6
输出样例：
    8
*/
/*
f[i][j] 体积为i重量为j
*/

/**
 * 一维数组
 * @param {Number} V 背包体积
 * @param {Number} M 背包重量
 * @param {[Number]} v 物品体积
 * @param {[Number]} m 物品重量
 * @param {[Number]} w 物品价值
 */
var main = (V, M, v, m, w) => {
    let n = v.length
    let f = new Array(V + 1)
    for (let i = 0; i < f.length; i++) {
        f[i] = new Array(M + 1).fill(0)
    }
    for (let i = 0; i < n; i++) {
        for (let j = V; j >= v[i]; j--) {
            for (let k = M; k >= m[i]; k--) {
                f[j][k] = Math.max(f[j][k], f[j - v[i]][k - m[i]] + w[i])
            }
        }
    }
    console.log(f)
    return f[V][M]
}


console.log(main(5, 6, [1,2,3,4], [2,4,4,5], [3,4,5,6]))
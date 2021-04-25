/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 09:15:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 15:12:28
 * @FilePath: /js-demo/背包问题/02.js
 */
/*
完全背包问题
    有 N 种物品和一个容量是 V 的背包，每种物品都有无限件可用。
    第 i 种物品的体积是 vi，价值是 wi。
    求解将哪些物品装入背包，可使这些物品的总体积不超过背包容量，且总价值最大。
    输出最大价值。
输入格式
    第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。
    接下来有 N 行，每行两个整数 vi,wi，用空格隔开，分别表示第 i 种物品的体积和价值。
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
    10
*/
/*
f[i] 表示总体积为 i 的情况下最大价值是多少
result = max{f[0 ... m]}
for(let i = 0; i < n; i++){
    for(let j = v[i]; j <= m; j++){
        f[j] = max(f[j], f[j - v[i]] + w[i])
    }
}
数学归纳法：
1. 假设考虑前 i - 1 个物品之后，所有的f[j]都是正确的
2. 证明考虑完 i 个后，所有的 f[j] 也都正确
对于某个 j 来说最优解包含 k 个 v[i]

*/
/**
 * 一维数组
 * @param {Number} V 背包体积
 * @param {[Number]} v 物品体积
 * @param {[Number]} w 物品价值
 */
var main = (V, v, w) => {
    let f = new Array(v.length)
    for (let i = 0; i < f.length; i++) {
        f[i] = new Array(V + 1).fill(0)
    }
    for (let i = v[0]; i <= V; i++) {
        f[0][i] = w[0]
    }
    for (let i = 1; i < v.length; i++) {
        for (let j = 0; j <= V; j++) {
            f[i][j] = f[i - 1][j]
            if(j >= v[i]){
                f[i][j] = Math.max(f[i][j], f[i][j - v[i]] + w[i])
            }
        }
    }
    console.log(f)
    return f[v.length - 1][V]
}
var main = (V, v, w) => {
    let n = v.length
    let m = V
    let f = new Array(m + 1).fill(0)
    for (let i = 0; i < n; i++) {
        for (let j = v[i]; j <= m; j++) {
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
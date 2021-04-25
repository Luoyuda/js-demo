/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 10:47:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 11:31:04
 * @FilePath: /js-demo/背包问题/03.js
 */
/*
4. 多重背包问题 I
    有 N 种物品和一个容量是 V 的背包。
    第 i 种物品最多有 si 件，每件体积是 vi，价值是 wi。
    求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。
    输出最大价值。
输入格式
    第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。
    接下来有 N 行，每行三个整数 vi,wi,si，用空格隔开，分别表示第 i 种物品的体积、价值和数量。
输出格式
    输出一个整数，表示最大价值。
数据范围
    0<N,V≤100
    0<vi,wi,si≤100
输入样例
    4 5
    1 2 3
    2 4 1
    3 4 3
    4 5 2
输出样例：
    10
*/
/* 
f[i] 总体积为 i 的情况下，最大价值多少
for(let i = 0; i < n; i++){
    for(let j = m; j >= v[i]; j--){
        f[j] = max(f[j], f[j - v[i]] + w[i], f[j - 2 * v[i]] + 2 * w[i] ...);
    }
}
*/
// n3
var main = (V, v, w, s) => {
    let n = v.length
    let m = V
    let f = new Array(m + 1).fill(0)
    for (let i = 0; i < n; i++) {
        for (let j = m; j >= v[i]; j--) {
            // console.log(`j=${j}, v[i]=${v[i]}, w[i]=${w[i]}`)
            for (let k = 1; k <= s[i] && k * v[i] <= j; k++) {
                f[j] = Math.max(f[j], f[j - k * v[i]] + k * w[i])
            }
        }
        console.log(f)
    }
    return f[m]
}
// 二进制优化
var main = (V, v, w, s) => {
    let n = v.length
    let m = V
    let f = new Array(m + 1).fill(0)
    let goods = []
    for (let i = 0; i < s.length; i++) {
        for (let k = 1; k <= s[i]; k*=2) {
            s[i] -= k
            goods.push({
                v: v[i] * k,
                w: w[i] * k,
            })
        }
        if(s[i] > 0) goods.push({
            v: v[i] * s[i],
            w: w[i] * s[i],
        })
    }
    for (const good of goods) {
        for (let j = m; j >= good.v; j--) {
            f[j] = Math.max(f[j], f[j - good.v] + good.w)
        }
        console.log(f)
    }
    return f[m]
}

console.log(main(5, [1,2,3,4], [2,4,4,5], [3, 1, 3, 2]))
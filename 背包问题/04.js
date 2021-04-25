/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 11:46:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 13:36:21
 * @FilePath: /js-demo/背包问题/04.js
 */
/*
7. 混合背包问题
    有 N 种物品和一个容量是 V 的背包。
物品一共有三类：
    第一类物品只能用1次（01背包）；
    第二类物品可以用无限次（完全背包）；
    第三类物品最多只能用 si 次（多重背包）；
    每种体积是 vi，价值是 wi。
    求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。
    输出最大价值。
输入格式
    第一行两个整数，N，V，用空格隔开，分别表示物品种数和背包容积。
    接下来有 N 行，每行三个整数 vi,wi,si，用空格隔开，分别表示第 i 种物品的体积、价值和数量。
    si=−1 表示第 i 种物品只能用1次；
    si=0 表示第 i 种物品可以用无限次；
    si>0 表示第 i 种物品可以使用 si 次；
输出格式
    输出一个整数，表示最大价值。
数据范围
    0<N,V≤1000
    0<vi,wi≤1000
    −1≤si≤1000
输入样例
    4 5
    1 2 -1
    2 4 1
    3 4 0
    4 5 2
输出样例：
    8 
*/

// 二进制优化
var main = (V, v, w, s) => {
    let n = v.length
    let m = V
    let f = new Array(m + 1).fill(0)
    let goods = []
    for (let i = 0; i < s.length; i++) {
        if(s[i] < 0){
            goods.push({
                k: -1,
                v: v[i],
                w: w[i],
            })
        }else if(s[i] == 0){
            goods.push({
                k: 0,
                v: v[i],
                w: w[i],
            })
        }else{
            for (let k = 1; k <= s[i]; k*=2) {
                s[i] -= k
                goods.push({
                    k: -1,
                    v: v[i] * k,
                    w: w[i] * k,
                })
            }
            if(s[i] > 0) goods.push({
                k: -1,
                v: v[i] * s[i],
                w: w[i] * s[i],
            })
        }
    }
    console.log(goods)
    for (const good of goods) {
        if(good.k == 0){
            // 完全背包
            for (let j = good.v; j <= m; j++) {
                f[j] = Math.max(f[j], f[j - good.v] + good.w)
            }
        }else{
            // 01背包
            for (let j = m; j >= good.v; j--) {
                f[j] = Math.max(f[j], f[j - good.v] + good.w)
            }
        }
        console.log(f)
    }
    return f[m]
}

console.log(main(5, [1,2,3,4], [2,4,4,5], [-1, 1, 0, 2]))
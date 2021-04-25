/*
 * @Author: xiaohuolong
 * @Date: 2021-04-24 13:36:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-24 13:59:48
 * @FilePath: /js-demo/背包问题/06.js
 */

/*
9. 分组背包问题
    有 N 组物品和一个容量是 V 的背包。
    每组物品有若干个，同一组内的物品最多只能选一个。
    每件物品的体积是 vij，价值是 wij，其中 i 是组号，j 是组内编号。
    求解将哪些物品装入背包，可使物品总体积不超过背包容量，且总价值最大。
    输出最大价值。
输入格式
    第一行有两个整数 N，V，用空格隔开，分别表示物品组数和背包容量。
接下来有 N 组数据：
    每组数据第一行有一个整数 Si，表示第 i 个物品组的物品数量；
    每组数据接下来有 Si 行，每行有两个整数 vij,wij，用空格隔开，分别表示第 i 个物品组的第 j 个物品的体积和价值；
    输出格式
    输出一个整数，表示最大价值。
数据范围
    0<N,V≤100
    0<Si≤100
    0<vij,wij≤100
输入样例
    3 5
    2
    1 2
    2 4
    1
    3 4
    1
    4 5
输出样例：
    8
*/
/**
 * 分组背包问题
 * @param {Number} V 背包容量
 * @param {[Array]} G 分组数量
 */
var main = (V, G) => {
    let f = new Array(V + 1).fill(0)
    for (let i = 0; i < G.length; i++) {
        for (let j = V; j >= 0; j--) {
            for(let k = 0; k < G[i][0].length; k++){
                let vk = G[i][0][k]
                let wk = G[i][1][k]
                if(j >= vk){
                    f[j] = Math.max(f[j], f[j - vk] + wk)
                }
            }
        }
    }
    console.log(f)
    return f[V]
}
console.log(main(5, [
    [[1, 2], [2, 4]],
    [[3], [4]],
    [[4], [5]]
]))
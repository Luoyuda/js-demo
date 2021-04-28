/*
 * @Author: xiaohuolong
 * @Date: 2021-04-27 15:10:38
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-27 16:19:23
 * @FilePath: /js-demo/leetcode/常规题目/887.js
 */
/* 
887. 鸡蛋掉落
    给你 k 枚相同的鸡蛋，并可以使用一栋从第 1 层到第 n 层共有 n 层楼的建筑。
    已知存在楼层 f ，满足 0 <= f <= n ，任何从 高于 f 的楼层落下的鸡蛋都会碎，
    从 f 楼层或比它低的楼层落下的鸡蛋都不会破。
    每次操作，你可以取一枚没有碎的鸡蛋并把它从任一楼层 x 扔下（满足 1 <= x <= n）。
    如果鸡蛋碎了，你就不能再次使用它。如果某枚鸡蛋扔下后没有摔碎，则可以在之后的操作中 重复使用 这枚鸡蛋。
    请你计算并返回要确定 f 确切的值 的 最小操作次数 是多少？
示例 1：
    输入：k = 1, n = 2
    输出：2
解释：
    鸡蛋从 1 楼掉落。如果它碎了，肯定能得出 f = 0 。 
    否则，鸡蛋从 2 楼掉落。如果它碎了，肯定能得出 f = 1 。 
    如果它没碎，那么肯定能得出 f = 2 。 
    因此，在最坏的情况下我们需要移动 2 次以确定 f 是多少。 
示例 2：
    输入：k = 2, n = 6
    输出：3
示例 3：
    输入：k = 3, n = 14
    输出：4
提示：
    1 <= k <= 100
    1 <= n <= 104
*/
/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
var superEggDrop = function(k, n) {
    let map = new Map()
    let dp = (k, n) => {
        if(k == 1) return n
        if(n == 0) return 0
        let key = `${k}-${n}`
        let val = map.get(key)
        if(val) return val
        let res = Infinity
        let l = 1
        let h = n
        while(l <= h){
            let mid = l + Math.floor((h - l) / 2)
            let broken = dp(k - 1, mid - 1)
            let notBroken = dp(k, n - mid)
            if(broken > notBroken){
                h = mid - 1
                res = Math.min(res, broken + 1)
            }else{
                l = mid + 1
                res = Math.min(res, notBroken + 1)
            }
        }
        // for (let i = 1; i <= n; i++) {
        //     res = Math.min(res, Math.max(dp(k, n - i), dp(k - 1, i - 1)) + 1)
        // }
        map.set(key, res)
        return res
    }
    return dp(k, n)
};
var superEggDrop = function(k, n) {
    let map = new Map()
    let dp = (k, n) => {
        if(k == 1) return n
        if(n == 0) return 0
        let key = `${k}-${n}`
        let val = map.get(key)
        if(val != undefined) return val
        let res = Infinity
        let l = 1
        let h = n
        while(l <= h){
            let m = l + Math.floor((h - l) / 2)
            let b = dp(k - 1, m - 1)
            let notB = dp(k, n - m)
            if(b > notB){
                h = m - 1
                res = Math.min(res, b + 1)
            }else{
                l = m + 1
                res = Math.min(res, notB + 1)
            }
        }
        map.set(key, res)
        return res
    }
    return dp(k, n)
};
// console.log(superEggDrop(2, 6))
console.log(superEggDrop(4, 10000))
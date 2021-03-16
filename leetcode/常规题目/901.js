/*
 * @Author: xiaohuolong
 * @Date: 2021-02-23 16:25:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-02-23 16:43:06
 * @FilePath: /js-demo/leetcode/901.js
 */
/**
    901. 股票价格跨度
        编写一个 StockSpanner 类，它收集某些股票的每日报价，并返回该股票当日价格的跨度。
        今天股票价格的跨度被定义为股票价格小于或等于今天价格的最大连续日数（从今天开始往回数，包括今天）。
        例如，如果未来7天股票的价格是 [100, 80, 60, 70, 60, 75, 85]，那么股票跨度将是 [1, 1, 1, 2, 1, 4, 6]。
    示例：
        输入：["StockSpanner","next","next","next","next","next","next","next"], [[],[100],[80],[60],[70],[60],[75],[85]]
        输出：[null,1,1,1,2,1,4,6]
    解释：
        首先，初始化 S = StockSpanner()，然后：
        S.next(100) 被调用并返回 1，
        S.next(80) 被调用并返回 1，
        S.next(60) 被调用并返回 1，
        S.next(70) 被调用并返回 2，
        S.next(60) 被调用并返回 1，
        S.next(75) 被调用并返回 4，
        S.next(85) 被调用并返回 6。
        注意 (例如) S.next(75) 返回 4，因为截至今天的最后 4 个价格
        (包括今天的价格 75) 小于或等于今天的价格。
    提示：
        调用 StockSpanner.next(int price) 时，将有 1 <= price <= 10^5。
        每个测试用例最多可以调用  10000 次 StockSpanner.next。
        在所有测试用例中，最多调用 150000 次 StockSpanner.next。
        此问题的总时间限制减少了 50%。
 */
var StockSpanner = function() {
    // 存储股票跨度
    this.spanner = []
    // 存储股票价格
    this.stockPrice = []
};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
    // 对于第一天进行特殊判断
    if(!this.spanner.length){
        this.spanner.push(1)
        this.stockPrice.push(price)
        // 直接返回1
        return 1
    }
    let cnt = 0
    let idx = this.stockPrice.length-1
    while(price >= this.stockPrice[idx] && idx>=0){
        cnt += this.spanner[idx]
        idx -= this.spanner[idx]
    }
    // 加上本身
    cnt++
    // 进行更新操作，将当前股票价格和跨度入栈
    this.spanner.push(cnt)
    this.stockPrice.push(price)
    return cnt
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

let S = new StockSpanner()
console.log(S.next(100)) // 1，
console.log(S.next(80)) // 1，
console.log(S.next(60)) // 1，
console.log(S.next(70)) // 2，
console.log(S.next(60)) // 1，
console.log(S.next(75)) // 4，
console.log(S.next(85)) // 6。
console.log(S.next(80)) // 1。
console.log(S.next(95)) // 8。
console.log(S.spanner) // 6。
console.log(S.stockPrice) // 6。
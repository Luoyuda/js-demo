/*
力扣 787. K 站中转内最便宜的航班
    有 n 个城市通过 m 个航班连接。每个航班都从城市 u 开始，以价格 w 抵达 v。
    现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到从 src 到 dst 最多经过 k 站中转的最便宜的价格。 如果没有这样的路线，则输出 -1。
示例 1：
输入: 
    n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
    src = 0, dst = 2, k = 1
    输出: 200
解释: 
    从城市 0 到城市 2 在 1 站中转以内的最便宜价格是 200，如图中红色所示。
示例 2：
输入: 
    n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
    src = 0, dst = 2, k = 0
    输出: 500
解释: 
    从城市 0 到城市 2 在 0 站中转以内的最便宜价格是 500，如图中蓝色所示。
提示：
    n 范围是 [1, 100]，城市标签从 0 到 n - 1
    航班数量范围是 [0, n * (n - 1) / 2]
    每个航班的格式 (src, dst, price)
    每个航班的价格范围是 [1, 10000]
    k 范围是 [0, n - 1]
    航班没有重复，且不存在自环
*/
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    let graph = new Array(n).fill(0).map(() => new Array(n).fill(0))
    flights.forEach(([x, y, z]) => graph[x][y] = z)
    // console.log(graph)
    let dist = new MinHeap(n * 1000)
    // 剪枝
    let costs = new Array(n).fill(Infinity)
    let stops = new Array(n).fill(0)
    dist.add(new Node(src, 0, k))
    while(dist.size()){
        let {i, cost, k} = dist.pop()
        if (i == dst) {
            return cost;
        } else if (k < 0) {
            continue;
        }
        for(let j = 0; j < n; j++){
            let costVI = graph[i][j]
            if(costVI > 0){
                let costI = costs[j]
                if (cost + costVI < costI) {
                    dist.add(new Node(j, cost + costVI, k - 1));
                    costs[j] = costVI + cost;
                    stops[j] = k - 1;
                } else if (stops[j] < k - 1) {
                    dist.add(new Node(j, cost + costVI, k - 1));
                }
            }
        }
    }
    return -1
};
const Node = function(i, cost, k){
    this.i = i
    this.cost = cost
    this.k = k
}
class Heap {
    constructor(size, handle){
        this.list = new Array(size + 1)
        this.len = size
        this.list[0] = size
        this.handle = handle || this.handle
        this.realSize = 0
    }
    handle(a, b){
        return a > b
    }
    getParentIndex(i){
        return Math.floor(i / 2)
    }
    getLeftChildIndex(i){
        return i * 2
    }
    getRightChildIndex(i){
        return i * 2 + 1
    }
    swap(i, j){
        let temp = this.list[i]
        this.list[i] = this.list[j]
        this.list[j] = temp
    }
    heapUp(i){
        // 1. 找到节点的父节点，判断是否需要交换
        let j = this.getParentIndex(i)
        while(this.list[i] !== undefined && this.handle(this.list[i], this.list[j]) && j >= 1){
            this.swap(i, j)
            i = j
            j = this.getParentIndex(i)
        }
    }
    heapDown(i){
        let n = Math.floor(this.realSize / 2)
        while(i < this.realSize && i <= n){
            let l = this.getLeftChildIndex(i)
            let r = this.getRightChildIndex(i)
            let left = this.list[l]
            let right = this.list[r]
            let curr = this.list[i]
            let j = i
            // console.log(curr, left, right)
            if(left === undefined && right === undefined) break
            if(right === undefined && this.handle(curr, left)) break
            if(this.handle(curr, left) && this.handle(curr, right)) break
            if(left === undefined) j = r
            else if(right === undefined) j = l
            else{
                if(this.handle(left, right)){
                    j = l
                }else{
                    j = r
                }
            }
            this.swap(i, j)
            i = j
        }
    }
    add(val){
        if(this.realSize >= this.list[0]){
            if(this.handle(this.peek(), val)){
                this.pop()
            }else{
                return
            }
        }
        this.realSize++
        this.list[this.realSize] = val
        // 插入后上浮
        this.heapUp(this.realSize)
    }
    pop(){
        let head = this.list[1]
        this.list[1] = this.list[this.realSize]
        this.list[this.realSize--] = undefined
        this.heapDown(1)
        return head
    }
    peek(){
        return this.list[1] != undefined ? this.list[1] : -1
    }
    size(){
        return this.realSize
    }
}
class MinHeap extends Heap{
    constructor(size, handle){
        super(size, handle)
    }
    handle(a, b){
        return a.cost < b.cost
    }
}

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    let dp = new Array(n).fill(0).map(() => new Array(k + 1).fill(Infinity))
    for(let i = 0; i <= k; i++) {
        dp[src][i] = 0
    }
    for(let [x, y, z] of flights) {
        if(x == src){
            dp[y][0] = z
        }
    }
    for(let i = 1; i <= k; i++){
        for(let [x, y, z] of flights){
            dp[y][i] = Math.min(dp[x][i - 1] + z, dp[y][i])
        }
    }
    return dp[dst][k] === Infinity ? -1 : dp[dst][k]
};

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    let dp = new Array(n).fill(Infinity)
    dp[src] = 0
    for(let [x, y, z] of flights) {
        if(x == src){
            dp[y] = z
        }
    }
    for(let i = 1; i <= k; i++){
        let dest = dp.slice()
        for(let [x, y, z] of flights){
            dest[y] = Math.min(dp[x] + z, dest[y])
        }
        dp = dest
    }
    return dp[dst] === Infinity ? -1 : dp[dst]
};

console.log(findCheapestPrice(
    4,
    [[0, 1, 100], [0, 2, 500], [0, 3, 200], [1, 2, 100], [2, 3, 100], [3, 1, -150]],
    0,
    3,
    1
))
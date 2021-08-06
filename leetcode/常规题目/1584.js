/*
 * @Author: xiaohuolong
 * @Date: 2021-08-02 15:04:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-05 10:45:55
 * @FilePath: /js-demo/leetcode/常规题目/1584.js
 */
/*
1584. 连接所有点的最小费用
    给你一个points 数组，表示 2D 平面上的一些点，其中 points[i] = [xi, yi] 。
    连接点 [xi, yi] 和点 [xj, yj] 的费用为它们之间的 曼哈顿距离 ：|xi - xj| + |yi - yj| ，其中 |val| 表示 val 的绝对值。
    请你返回将所有点连接的最小总费用。只有任意两点之间 有且仅有 一条简单路径时，才认为所有点都已连接。
示例 1：
    输入：points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
    输出：20
解释：
    我们可以按照上图所示连接所有点得到最小总费用，总费用为 20 。
    注意到任意两个点之间只有唯一一条路径互相到达。
示例 2：
    输入：points = [[3,12],[-2,5],[-4,1]]
    输出：18
示例 3：
    输入：points = [[0,0],[1,1],[1,0],[-1,1]]
    输出：4
示例 4：
    输入：points = [[-1000000,-1000000],[1000000,1000000]]
    输出：4000000
示例 5：
    输入：points = [[0,0]]
    输出：0
提示：
    1 <= points.length <= 1000
    -106 <= xi, yi <= 106
    所有点 (xi, yi) 两两不同。
*/
/**
 * @param {number[][]} points
 * @return {number}
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    let n = points.length
    let edges = [] // [Edge{ point1, point2, cost }]
    let uf = new UF(n)
    for(let i = 0; i < n; i++){// 计算出所有边连接的权重
        for(let j = i + 1; j < n; j++){
            edges.push(new Edge(i, j, getCost(...points[i], ...points[j])))
        }
    }
    edges.sort((a, b) => b.cost - a.cost)// 排序
    let result = 0, count = n - 1
    while(edges.length > 0 && count > 0){ // 每次都取最小的权重继续连接
        let { point1, point2, cost } = edges.pop()
        if(!uf.connected(point1, point2)){ //判断连通性
            uf.union(point1, point2), count--, result += cost
        }
    }
    return result
};
const getCost = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2)
const Edge = function(i, j, cost){
    this.point1 = i
    this.point2 = j
    this.cost = cost
}
class UF {
    constructor(size){
        this.root = new Array(size).fill(0).map((item, index) => index)
        this.rank = new Array(size).fill(0)
    }
    find(x){
        if(x === this.root[x]) return x
        return this.root[x] = this.find(this.root[x])
    }
    union(x, y){
        let rootX = this.find(x)
        let rootY = this.find(y)
        if(rootX != rootY){
            let rankX = this.rank[rootX]
            let rankY = this.rank[rootY]
            if(rankX > rankY){
                this.root[rootY] = rootX
            }else if(rankY > rankX){
                this.root[rootX] = rootY
            }else{
                this.root[rootY] = rootX
                this.rank[rootX]++
            }
        }
    }
    connected(x, y){
        return this.find(x) === this.find(y)
    }
}

// 堆 + Prim算法
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    let n = points.length
    let visited = new Array(n).fill(false)
    let count = n - 1
    let result = 0
    let edges = new MinHeap(n * 50)
    let costs = new Array(n).fill(Infinity) // 剪枝条件
    visited[0] = true
    for(let j = 1; j < n; j++){ // 初始化 0 - n 的距离
        let cost = getCost(...points[0], ...points[j])
        edges.add(new Edge(0, j, cost))
        costs[j] = cost
    }
    while(count > 0 && edges.size() > 0){
        let { point2, cost } = edges.pop()
        if(visited[point2]) continue // 过滤已经处理的节点
        result += cost, visited[point2] = true, count--
        for(let j = 0; j < n; j++){
            if(visited[j]) continue // 过滤已经处理的节点
            let cost = getCost(...points[point2], ...points[j])
            if(costs[j] < cost) continue // 剪枝
            edges.add(new Edge(point2, j, cost))
            costs[j] = cost
        }
    }
    return result
};
class Heap {
    constructor(size, handle){
        this.list = new Array(size + 1)
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
    heapify(list = [], handle){
        let size = list.length
        this.list = new Array(size + 1)
        this.list[0] = size
        this.handle = handle || this.handle
        this.realSize = 0
        for (let i = 0; i < size; i++) {
            this.add(list[i])
        }
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
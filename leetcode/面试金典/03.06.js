/*
 * @Author: xiaohuolong
 * @Date: 2021-03-29 20:15:44
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-29 21:05:04
 * @FilePath: /js-demo/leetcode/面试金典/03.06.js
面试题 03.06. 动物收容所
    动物收容所。有家动物收容所只收容狗与猫，且严格遵守“先进先出”的原则。
    在收养该收容所的动物时，收养人只能收养所有动物中“最老”（由其进入收容所的时间长短而定）的动物，
    或者可以挑选猫或狗（同时必须收养此类动物中“最老”的）。换言之，收养人不能自由挑选想收养的对象。
    请创建适用于这个系统的数据结构，实现各种操作方法，比如enqueue、dequeueAny、dequeueDog和dequeueCat。
    enqueue方法有一个animal参数，animal[0]代表动物编号，animal[1]代表动物种类，其中 0 代表猫，1 代表狗。
    dequeue*方法返回一个列表[动物编号, 动物种类]，若没有可以收养的动物，则返回[-1,-1]。
示例1:
输入：
    ["AnimalShelf", "enqueue", "enqueue", "dequeueCat", "dequeueDog", "dequeueAny"]
    [[], [[0, 0]], [[1, 0]], [], [], []]
输出：
    [null,null,null,[0,0],[-1,-1],[1,0]]
示例2:
输入：
    ["AnimalShelf", "enqueue", "enqueue", "enqueue", "dequeueDog", "dequeueCat", "dequeueAny"]
    [[], [[0, 0]], [[1, 0]], [[2, 1]], [], [], []]
输出：
    [null,null,null,null,[2,1],[0,0],[1,0]]
说明:
    收纳所的最大容量为20000
 */
var Node = function(val=-1, next=null) {
    this.val = val
    this.next = next
    return this
}
var AnimalShelf = function() {
    this.head0 = new Node()
    this.tail0 = this.head0
    this.head1 = new Node()
    this.tail1 = this.head1
    this.size = 0
};

/** 
 * @param {number[]} animal
 * @return {void}
 */
AnimalShelf.prototype.enqueue = function(animal) {
    let [a, b] = animal
    // let head = this[`head${b}`]
    // while(head.next) {
    //     head = head.next
    // }
    let node = new Node(a)
    this[`tail${b}`].next = node
    this[`tail${b}`] = node
    this.size += 1
    // head.next = new Node(a, head.next)
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueAny = function() {
    let cat = this.head0.next
    let dog = this.head1.next
    if(!cat && !dog) return [-1, -1]
    if(!cat) return this.dequeueDog()
    if(!dog) return this.dequeueCat()
    return cat.val < dog.val ? this.dequeueCat() : this.dequeueDog()
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueDog = function() {
    let node = this.head1.next
    if(!node) return [-1, -1]
    this.head1.next = node.next
    this.size--
    if(this.tail1 === node) this.tail1 = this.head1
    return [node.val, 1]
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueCat = function() {
    let node = this.head0.next
    if(!node) return [-1, -1]
    this.head0.next = node.next
    this.size--
    if(this.tail0 === node) this.tail0 = this.head0
    return [node.val, 0]
};
var obj = new AnimalShelf()

var funcs = ["enqueue", "enqueue", "dequeueCat", "dequeueDog", "dequeueAny"]
var params = [[[0, 0]], [[1, 0]], [], [], []]
var results = [null,null,[0,0],[-1,-1],[1,0]]
// var funcs = ["enqueue", "enqueue", "enqueue", "dequeueDog", "dequeueCat", "dequeueAny"]
// var params = [[[0, 0]], [[1, 0]], [[2, 1]], [], [], []]
// var results = [null,null,null,[2,1],[0,0],[1,0]]
funcs.forEach((item, index) => {
    let res = obj[item](...params[index])
    console.log(res, results[index])
})
console.log(obj)
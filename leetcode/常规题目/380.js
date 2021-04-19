/*
 * @Author: xiaohuolong
 * @Date: 2021-04-19 08:28:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-19 10:08:36
 * @FilePath: /js-demo/leetcode/常规题目/380.js
 */
/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
    this.l = []
    this.h = {}
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    let i = this.h[val]
    if(i == undefined){
        this.l.push(val)
        this.h[val] = this.l.length - 1
        return true
    }
    return false
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    let i = this.h[val]
    if(i != undefined){
        this.l[i] = this.l[this.l.length - 1]
        this.h[this.l[i]] = i
        this.l.pop()
        delete this.h[val]
        return true
    }
    return false
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    return this.l[Math.random() * this.l.length | 0]
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
var funcs = ["insert","remove","insert","getRandom","remove","insert","getRandom"]
var params = [[1],[2],[2],[],[1],[2],[]]
var results = [true,false,true,1,true,false,2]

let r = new RandomizedSet()
funcs.forEach((item, index) => {
    let res = r[item](...params[index])
    console.log(r)
    console.log(res == results[index])
})
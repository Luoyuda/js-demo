/*
 * @Author: xiaohuolong
 * @Date: 2021-04-18 12:30:45
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 12:56:22
 * @FilePath: /js-demo/leetcode/常规题目/705.js
 */
/*
705. 设计哈希集合
    不使用任何内建的哈希表库设计一个哈希集合（HashSet）。
实现 MyHashSet 类：
    void add(key) 向哈希集合中插入值 key 。
    bool contains(key) 返回哈希集合中是否存在这个值 key 。
    void remove(key) 将给定值 key 从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。
示例：
    输入：
        ["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
        [[], [1], [2], [1], [3], [2], [2], [2], [2]]
    输出：
        [null, null, null, true, false, null, true, null, false]

    解释：
        MyHashSet myHashSet = new MyHashSet();
        myHashSet.add(1);      // set = [1]
        myHashSet.add(2);      // set = [1, 2]
        myHashSet.contains(1); // 返回 True
        myHashSet.contains(3); // 返回 False ，（未找到）
        myHashSet.add(2);      // set = [1, 2]
        myHashSet.contains(2); // 返回 True
        myHashSet.remove(2);   // set = [1]
        myHashSet.contains(2); // 返回 False ，（已移除）
提示：
    0 <= key <= 106
    最多调用 104 次 add、remove 和 contains 。
*/
/**
 * Initialize your data structure here.
 */
var MyHashSet = function() {
    this.base = 769
    this.data = new Array(this.base).fill(0).map(() => new Array());
};

MyHashSet.prototype.hash = function(key) {
    return key % this.base
}

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function(key) {
    let h = this.hash(key)
    let it = this.data[h]
    for (const el of it) {
        if(el == key){
            return
        }
    }
    it.push(key)
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function(key) {
    let h = this.hash(key)
    let it = this.data[h]
    for (let i = 0; i < it.length; i++) {
        const element = it[i];
        if(element == key){
            it.splice(i, 1)
            return
        }
    }
};

/**
 * Returns true if this set contains the specified element 
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function(key) {
    let h = this.hash(key)
    let it = this.data[h]
    for (const el of it) {
        if(el == key){
            return true
        }
    }
    return false
};

var funcs = ["add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
var params = [[1], [2], [1], [3], [2], [2], [2], [2]]
var results = [null, null, true, false, null, true, null, false]
let myHashSet = new MyHashSet()
funcs.forEach((item, index) => {
    let res = myHashSet[item](...params[index])
    console.log(res == results[index])
})
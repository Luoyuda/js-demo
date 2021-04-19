/*
 * @Author: xiaohuolong
 * @Date: 2021-04-18 13:12:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-18 13:17:21
 * @FilePath: /js-demo/leetcode/常规题目/706.js
 */
/*
706. 设计哈希映射
    不使用任何内建的哈希表库设计一个哈希映射（HashMap）。
实现 MyHashMap 类：
    MyHashMap() 用空映射初始化对象
    void put(int key, int value) 向 HashMap 插入一个键值对 (key, value) 。如果 key 已经存在于映射中，则更新其对应的值 value 。
    int get(int key) 返回特定的 key 所映射的 value ；如果映射中不包含 key 的映射，返回 -1 。
    void remove(key) 如果映射中存在 key 的映射，则移除 key 和它所对应的 value 。
示例：
    输入：
        ["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
        [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
    输出：
        [null, null, null, 1, -1, null, 1, null, -1]
解释：
    MyHashMap myHashMap = new MyHashMap();
    myHashMap.put(1, 1); // myHashMap 现在为 [[1,1]]
    myHashMap.put(2, 2); // myHashMap 现在为 [[1,1], [2,2]]
    myHashMap.get(1);    // 返回 1 ，myHashMap 现在为 [[1,1], [2,2]]
    myHashMap.get(3);    // 返回 -1（未找到），myHashMap 现在为 [[1,1], [2,2]]
    myHashMap.put(2, 1); // myHashMap 现在为 [[1,1], [2,1]]（更新已有的值）
    myHashMap.get(2);    // 返回 1 ，myHashMap 现在为 [[1,1], [2,1]]
    myHashMap.remove(2); // 删除键为 2 的数据，myHashMap 现在为 [[1,1]]
    myHashMap.get(2);    // 返回 -1（未找到），myHashMap 现在为 [[1,1]]
提示：
    0 <= key, value <= 106
    最多调用 104 次 put、get 和 remove 方法
进阶：你能否不使用内置的 HashMap 库解决此问题？
*/
/**
 * Initialize your data structure here.
 */
var MyHashMap = function() {
    this.base = 769
    this.data = new Array(this.base).fill(0).map(() => new Array());
};

MyHashMap.prototype.hash = function(key) {
    return key % this.base
}

/** 
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key,  value) {
    let h = this.hash(key)
    let it = this.data[h]
    for (const el of it) {
        if(el[0] == key){
            el[1] = value
            return
        }
    }
    it.push([key, value])
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    let h = this.hash(key)
    let it = this.data[h]
    for (let i = 0; i < it.length; i++) {
        const el = it[i];
        if(el[0] == key){
            it.splice(i, 1)
            return
        }
    }
};

/**
 * Returns true if this map contains the specified element 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    let h = this.hash(key)
    let it = this.data[h]
    for (const el of it) {
        if(el[0] == key){
            return el[1]
        }
    }
    return -1
};

var funcs = ["put", "put", "get", "get", "put", "get", "remove", "get"]
var params = [[1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
var results = [null, null, 1, -1, null, 1, null, -1]
let map = new MyHashMap()
funcs.forEach((item, index) => {
    let res = map[item](...params[index])
    console.log(res == results[index])
})
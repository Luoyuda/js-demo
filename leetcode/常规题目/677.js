/*
 * @Author: xiaohuolong
 * @Date: 2021-08-11 22:02:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-11 22:02:45
 * @FilePath: /js-demo/leetcode/常规题目/677.js
 */
/**
 * Initialize your data structure here.
 */
var MapSum = function() {
    this.root = {}
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
    let root = this.find(key)
    if(root && root.isEnd){
        for(let x of Object.keys(root)){
            if(!['cnt', 'isEnd'].includes(x)){
                val += root[x].cnt
            }
        }
        val -= root.cnt
    }
    root = this.root
    for(let x of key){
        if(!root[x]){
            root[x] = {
                cnt: 0
            }
        }
        root[x].cnt += val
        root = root[x]
    }
    root.isEnd = true
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.find = function(key) {
    let root = this.root
    for(let x of key){
        if(!root[x]){
            return false
        }
        root = root[x]
    }
    return root
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    let root = this.find(prefix)
    return root && root.cnt ? root.cnt : 0
};

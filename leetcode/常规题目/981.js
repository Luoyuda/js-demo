/*
 * @Author: xiaohuolong
 * @Date: 2021-07-10 17:55:00
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-10 19:33:59
 * @FilePath: /js-demo/leetcode/常规题目/981.js
 */
/**
 * Initialize your data structure here.
 */
var TimeMap = function() {
    this.map = new Map()
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
    if(this.map.has(key)) {
        this.map.get(key).push([value, timestamp])
    }else{
        this.map.set(key, [[value, timestamp]])
    }
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
    let list = this.map.get(key)
    if(list) {
        let l = 0
        let r = list.length - 1
        while (l < r) {
            let m = l + Math.floor((r - l + 1) / 2)
            if(list[m][1] <= timestamp) l = m
            else r = m - 1
        }
        // console.log(list, l, timestamp)
        return list[l] ? list[l][1] <= timestamp ? list[l][0] : '' : ''
    }
    return ''
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
var tests = [
    ["set","get","get","set","get","get"],
    [["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]],
    [null,"bar","bar",null,"bar2","bar2"]
]
var tests = ["set","set","get","get","get","get","get"]
var input = [["love","high",10],["love","low",20],["love",5],["love",10],["love",15],["love",20],["love",25]]
var results = [null,null,"","high","high","low","low"]
var obj = new TimeMap()
tests.forEach((item, index) => {
    let res = results[index]
    let args = input[index]
    let func = item
    let ret = obj[func](...args)
    if(res != ret){
        console.log(res, ret)
    }
})
// for (let i = 0; i < tests[0].length; i++) {
//     let func = tests[0][i]
//     let args = tests[1][i]
//     let res = obj[func](...args)
//     let ret = tests[2][i]
//     if(res != ret){
//         // console.log(func, args, ret, res)
//     }
// }
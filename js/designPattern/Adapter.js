/*
 * @Author: xiaohuolong
 * @Date: 2020-08-15 16:13:05
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-15 17:02:51
 * @FilePath: /DesignPatterns/Adapter.js
 */
// 参数适配器
const extend = function(_default, options) {
    for (const key in _default) {
        if (_default.hasOwnProperty(key)) {
            const element = _default[key];
            options[key] = options[key] || element
        }
    }
    return options
}

console.log(extend({
    a: 1,
    b: 2
},{
    b: 3
}))

// 数据适配器
const adapter = function(arr=[]) {
    return {
        name: arr[0],
        age: arr[1],
    }
}
console.log(adapter(['a', 12]))


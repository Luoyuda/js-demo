/*
 * @Author: xiaohuolong
 * @Date: 2021-03-03 17:30:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-03 17:33:24
 * @FilePath: /js-demo/leetcode/412.js
 */
/**
 * @param {number} n
 * @return {string[]}
    412. Fizz Buzz
        写一个程序，输出从 1 到 n 数字的字符串表示。
        1. 如果 n 是3的倍数，输出“Fizz”；
        2. 如果 n 是5的倍数，输出“Buzz”；
        3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。
    示例：
        n = 15,
    返回:
        [
            "1",
            "2",
            "Fizz",
            "4",
            "Buzz",
            "Fizz",
            "7",
            "8",
            "Fizz",
            "Buzz",
            "11",
            "Fizz",
            "13",
            "14",
            "FizzBuzz"
        ]
 */
var fizzBuzz = function(n) {
    let res = []
    for (let i = 1; i <= n; i++) {
        let str = ''
        if(i % 3 == 0) str = 'Fizz'
        if(i % 5 == 0) str += 'Buzz'
        if(str == '') str = i + ''
        res.push(str)
    }
    return res
};

console.log(fizzBuzz(15))
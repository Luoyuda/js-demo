/*
 * @Author: xiaohuolong
 * @Date: 2021-03-25 07:39:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-25 20:07:14
 * @FilePath: /js-demo/leetcode/常规题目/1598.js
 */
/**
 * @param {string[]} logs
 * @return {number}
1598. 文件夹操作日志搜集器
    每当用户执行变更文件夹操作时，LeetCode 文件系统都会保存一条日志记录。
下面给出对变更操作的说明：
    "../" ：移动到当前文件夹的父文件夹。如果已经在主文件夹下，则 继续停留在当前文件夹 。
    "./" ：继续停留在当前文件夹。
    "x/" ：移动到名为 x 的子文件夹中。题目数据 保证总是存在文件夹 x 。
    给你一个字符串列表 logs ，其中 logs[i] 是用户在 ith 步执行的操作。
    文件系统启动时位于主文件夹，然后执行 logs 中的操作。
    执行完所有变更文件夹操作后，请你找出 返回主文件夹所需的最小步数 。
示例 1：
    输入：logs = ["d1/","d2/","../","d21/","./"]
    输出：2
    解释：执行 "../" 操作变更文件夹 2 次，即可回到主文件夹
示例 2：
    输入：logs = ["d1/","d2/","./","d3/","../","d31/"]
    输出：3
示例 3：
    输入：logs = ["d1/","../","../","../"]
    输出：0
提示：
    1 <= logs.length <= 103
    2 <= logs[i].length <= 10
    logs[i] 包含小写英文字母，数字，'.' 和 '/'
    logs[i] 符合语句中描述的格式
    文件夹名称由小写英文字母和数字组成
 */
var minOperations = function(logs) {
    let stack = []
    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        if(log == './'){

        }else if(log == '../'){
            let n = stack.length > 1 ? 1 : stack.length
            for (let j = 0; j < n; j++) {
                stack.pop()
            }
        }else{
            stack.push(log)
        }
    }
    return stack.length
};

var minOperations = function(logs) {
    let deep = 0
    for (let i = 0; i < logs.length; i++) {
        const log = logs[i];
        if(log == '../'){
            let n = deep > 1 ? 1 : deep
            deep -= n
        }else if(log != './'){
            deep += 1
        }
    }
    return deep
};

// console.log(minOperations(["d1/","d2/","./","d3/","../","d31/"]))
// console.log(minOperations(["d1/","../","../","../"]))
// console.log(minOperations(["d1/","d2/","../","d21/","./"]))

var func = (x, n) => {
    if(n == 0) return 1
    if(n == 1) return x
    if(n % 2 == 0) return func(x, parseInt(n / 2)) * func(x, parseInt(n / 2))
    else return func(x, parseInt((n-1) / 2)) * func(x, parseInt((n-1) / 2)) * x
}

var func = (x, n) => {
    let sum = 1
    while (n > 0){
        if(!(n % 2 == 0)) sum *= x 
        x *= x
        n = parseInt(n / 2)
    }
    return sum
}
// console.log(func(2, 5))
let params = [
    [-2, 5],
    [2, 100],
    [-23, 101],
]
params.map(item => {
    console.log(func(...item) === Math.pow(...item))
})

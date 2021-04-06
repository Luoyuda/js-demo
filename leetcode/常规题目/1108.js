/*
 * @Author: xiaohuolong
 * @Date: 2021-04-03 16:56:47
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-04-03 16:58:43
 * @FilePath: /js-demo/leetcode/常规题目/1108.js
 */
/**
 * @param {string} address
 * @return {string}
1108. IP 地址无效化
    给你一个有效的 IPv4 地址 address，返回这个 IP 地址的无效化版本。
    所谓无效化 IP 地址，其实就是用 "[.]" 代替了每个 "."。
示例 1：
    输入：address = "1.1.1.1"
    输出："1[.]1[.]1[.]1"
示例 2：
    输入：address = "255.100.50.0"
    输出："255[.]100[.]50[.]0"
提示：
    给出的 address 是一个有效的 IPv4 地址
 */
var defangIPaddr = function(address) {
    let str = ''
    for (let i = 0; i < address.length; i++) {
        const ch = address[i];
        if(ch == '.'){
            str += '[.]'
        }else{
            str += ch
        }
    }
    return str
};

console.log(defangIPaddr('1.2.2.1'))
console.log(defangIPaddr('255.100.50.0'))
/*
 * @Author: xiaohuolong
 * @Date: 2021-03-03 10:08:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-03-03 10:50:19
 * @FilePath: /js-demo/leetcode/338.js
 */
/**
 * @param {number} num
 * @return {number[]}
    338. 比特位计数
        给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。
    示例 1:
        输入: 2
        输出: [0,1,1]
    示例 2:
        输入: 5
        输出: [0,1,1,2,1,2]
    进阶:
        给出时间复杂度为O(n*sizeof(integer))的解答非常容易。但你可以在线性时间O(n)内用一趟扫描做到吗？
        要求算法的空间复杂度为O(n)。
        你能进一步完善解法吗？要求在C++或任何其他语言中不使用任何内置函数（如 C++ 中的 __builtin_popcount）来执行此操作。
 */
var countBits = function(num) {
    const bits = new Array(num + 1).fill(0);
    for (let i = 0; i <= num; i++) {
        bits[i] = countOnes(i);
    }
    return bits
};

const countOnes = (x) => {
    let ones = 0;
    while (x > 0) {
        x &= (x - 1);
        ones++;
    }
    return ones;
}
var countBits = function(num) {
    const bits = new Array(num + 1).fill(0);
    let highBit = 0
    for (let i = 1; i <= num; i++) {
        // console.log(i, i.toString(2), i & (i - 1), Math.ceil(i / 2))
        if((i & (i - 1)) == 0){
            highBit = i
        }
        bits[i] = bits[i - highBit] + 1
    }
    return bits
};
// 备忘录
var countBits = function(num){
    let res = []
    let map = new Array(num + 1).fill(0);
    var count = (num) => {
        if(num == 0) return 0
        if(map[num] != 0) return map[num]
        let res = 0
        if(num & 1) {
            res = count(num - 1) + 1
        }else{
            res = count(num >> 1)
        }
        map[num] = res
        return res
    }
    for (let i = 0; i <= num; i++) {
        res.push(count(i))
    }
    return res
}
var countBits = function(num){
    let res = new Array(num + 1).fill(0);
    for (let i = 0; i <= num; i++) {
        // console.log(res, res[i >> 1], i & 1)
        res[i] = res[i >> 1] + (i & 1)
    }
    return res
}
console.log(countBits(2))
console.log(countBits(8))
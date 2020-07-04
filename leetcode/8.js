/*
 * @Author: xiaohuolong
 * @Date: 2020-07-04 13:21:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-04 15:23:30
 * @FilePath: /js-demo/leetcode/8.js
 */ 
const table = [
    [0, 1, 2, 3],
    [3, 3, 2, 3],
    [3, 3, 2, 3],
    [3, 3, 3, 3],
]

const num = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
}

class AutoMata{
    constructor(){
        this.state = 0
        this.sign = 1
        this.ans = 0
        this.max =  Math.pow(2,31) - 1
        this.min =  -Math.pow(2,31)
    }
    gets(c){
        if(c == ' ') return 0
        if(c == '+' || c == '-') return 1
        if(num[c]) return 2
        return 3
    }
    get(c){
        this.state = table[this.state][this.gets(c)]
        if(this.state == 2){
            this.ans = this.ans * 10 + (c - 0)
            this.ans = this.sign == 1 ? Math.min(this.ans, this.max) : Math.min(this.ans, -this.min)
        }
        if(this.state == 1 && c == '-') this.sign = -1
    }
}

const myAtoi = function(s){
    const autoMata = new AutoMata()
    for (let i = 0; i < s.length; i++){
        autoMata.get(s[i])
    }
    return autoMata.ans * autoMata.sign
}

// console.log(myAtoi("   +0 123"))
console.log(myAtoi('    -142'))
// console.log(myAtoi('4193 with words'))
// console.log(myAtoi('words and 987'))
// console.log(myAtoi('-91283472332'))
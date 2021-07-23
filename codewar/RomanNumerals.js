/*
 * @Author: xiaohuolong
 * @Date: 2021-07-20 16:47:07
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-20 16:57:05
 * @FilePath: /js-demo/codewar/RomanNumerals.js
 */
// TODO: create a RomanNumerals helper object
const RomanNumerals = {
    value: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    symbol: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'],
    helper:{
        'I':1,
        'V':5,
        'X':10,
        'L':50,
        'C':100,
        'D':500,
        'M':1000,
    },
    toRoman(num){
        let str = ''
        let i = 0
        while(num){
            if(num >= this.value[i]){
                num -= this.value[i]
                str += this.symbol[i]
            }else{
                i++
            }
        }
        return str
    },
    fromRoman(roman){
        let curr = 0
        let last = 0
        for (let i = 0; i < roman.length; i++) {
            let num = this.helper[roman[i]]
            if(num > last){
                curr -= last
            }else{
                curr += last
            }
            last = num
        }
        return curr + last
    }
}
function eq(a, b){
    if(a !== b) return console.log(a, b)
    return a === b
}
eq(RomanNumerals.toRoman(1000), 'M')
eq(RomanNumerals.toRoman(999), "CMXCIX")
eq(RomanNumerals.toRoman(4), 'IV')
eq(RomanNumerals.toRoman(1), 'I')
eq(RomanNumerals.toRoman(1991), 'MCMXCI')
eq(RomanNumerals.toRoman(2006), 'MMVI')
eq(RomanNumerals.toRoman(2020), 'MMXX')

eq(RomanNumerals.fromRoman('XXI'), 21)
eq(RomanNumerals.fromRoman('I'), 1)
eq(RomanNumerals.fromRoman('III'), 3)
eq(RomanNumerals.fromRoman('IV'), 4)
eq(RomanNumerals.fromRoman('MMVII'), 2007)
eq(RomanNumerals.fromRoman('MDCLXIX'), 1669)
/*
 * @Author: xiaohuolong
 * @Date: 2020-06-28 11:14:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-07 09:58:48
 * @FilePath: /js-demo/algorithm/Sunday/Sunday.test.js
 */ 

const { Sunday } = require('./Sunday')
const { expect } = require('chai')

describe('Sunday', () => {
    let s1 = 'abcbcglx'
    let t11 = 'abca'
    let r11 = -1
    let t12 = 'bcgl'
    let r12 = 3
    let s2 = 'abcxabcdabxabcdabcdabcy'
    let t21 = 'abcdabcy'
    let r21 = 15
    let t22 = 'abcdabca'
    let r22 = -1
    let s3 = 'abcxabcdabxaabcdabcabcdabcdabcy'
    let t31 = 'abcdabca'
    let r31 = 12
    let t32 = 'aabaabaaa'
    let r32 = -1
    it('Sunday', () => {
        expect(Sunday('', '')).to.equal(0);
        expect(Sunday('a', '')).to.equal(0);
        expect(Sunday('a', 'a')).to.equal(0);
        expect(Sunday(s1, t11)).to.equal(r11);
        expect(Sunday(s1, t12)).to.equal(r12);
        expect(Sunday(s2, t21)).to.equal(r21);
        expect(Sunday(s2, t22)).to.equal(r22);
        expect(Sunday(s3, t31)).to.equal(r31);
        expect(Sunday(s3, t32)).to.equal(r32);
    })
})
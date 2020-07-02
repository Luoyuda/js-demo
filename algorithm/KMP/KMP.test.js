/*
 * @Author: xiaohuolong
 * @Date: 2020-06-28 11:14:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-28 15:07:41
 * @FilePath: /js-demo/data-structures/KMP/KMP.test.js
 */ 

const { KMP, KMPStr } = require('./KMP')
const { expect } = require('chai')

describe('KMP', () => {
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
    const transform = (string) => [string.length, ...string]
    it('KMP', () => {
        expect(KMP('', '')).to.equal(-1);
        expect(KMP('a', '')).to.equal(-1);
        expect(KMP('a', 'a')).to.equal(0);
        expect(KMP(s1, t11)).to.equal(r11);
        expect(KMP(s1, t12)).to.equal(r12);
        expect(KMP(s2, t21)).to.equal(r21);
        expect(KMP(s2, t22)).to.equal(r22);
        expect(KMP(s3, t31)).to.equal(r31);
        expect(KMP(s3, t32)).to.equal(r32);
    })
    it('KMPStr', () => {
        expect(KMPStr([0], [0])).to.equal(-1);
        expect(KMPStr([1, 'a'], [1, ''])).to.equal(-1);
        expect(KMPStr([1, 'a'], [1, 'a'])).to.equal(1);
        expect(KMPStr(transform(s1), transform(t11))).to.equal(r11);
        expect(KMPStr(transform(s1), transform(t12))).to.equal(r12 + 1);
        expect(KMPStr(transform(s2), transform(t21))).to.equal(r21 + 1);
        expect(KMPStr(transform(s2), transform(t22))).to.equal(r22);
        expect(KMPStr(transform(s3), transform(t31))).to.equal(r31 + 1);
        expect(KMPStr(transform(s3), transform(t32))).to.equal(r32);
    })
})
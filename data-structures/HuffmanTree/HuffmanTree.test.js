/*
 * @Author: xiaohuolong
 * @Date: 2020-06-28 11:14:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-14 16:52:28
 * @FilePath: /js-demo/data-structures/HuffmanTree/HuffmanTree.test.js
 */ 

const { HuffmanTree } = require('./HuffmanTree')
const { expect } = require('chai')

describe('huffmanTree', () => {
    it('huffmanTree', () => {
        const huffmanTree = new HuffmanTree()
        const str = 'qwertyuioplkjgfdsazxcvbnm '
        const imb = 'i am back'
        huffmanTree.createTree(str)
        huffmanTree.encode(huffmanTree.root, '')
        expect(huffmanTree.decode(huffmanTree.getCode(imb))).to.eql(imb)
    })
})
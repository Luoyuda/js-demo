/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 18:40:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-22 09:36:20
 * @FilePath: /js-demo/data-structures/DoublyLinkList/DoublyLinkList.test.js
 */ 

const { DoublyLinkList } = require('./DoublyLinkList')
const { expect } = require('chai')

describe('双向链表', () => {
    it('检查空链表', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.toString()).to.equal('')
        expect(doublyLinkList.toArray()).to.eql([])
    })

    it('检查尾部插入节点', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.append(1)).to.equal(1)
        expect(doublyLinkList.append(2)).to.equal(2)
        expect(doublyLinkList.append(3)).to.equal(3)
        expect(doublyLinkList.append(4)).to.equal(4)
        expect(doublyLinkList.toString()).to.equal('1,2,3,4')
    })

    it('检查头部插入节点', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.prepend(1)).to.equal(1)
        expect(doublyLinkList.prepend(2)).to.equal(2)
        expect(doublyLinkList.prepend(3)).to.equal(3)
        expect(doublyLinkList.prepend(4)).to.equal(4)
        expect(doublyLinkList.toString()).to.equal('4,3,2,1')
    })

    it('检查插入指定节点', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.append(1)).to.equal(1)
        expect(doublyLinkList.toString()).to.equal('1')
        expect(doublyLinkList.head.data).to.equal(1)
        expect(doublyLinkList.rear.data).to.equal(1)
        expect(doublyLinkList.add(1,2)).to.equal(2)
        expect(doublyLinkList.toString()).to.equal('1,2')
        expect(doublyLinkList.rear.data).to.equal(2)
        expect(doublyLinkList.add(2,3)).to.equal(3)
        expect(doublyLinkList.head.data).to.equal(1)
        expect(doublyLinkList.rear.data).to.equal(3)
        expect(doublyLinkList.toString()).to.equal('1,2,3')
        expect(doublyLinkList.add(3, 4)).to.equal(4)
        expect(doublyLinkList.head.data).to.equal(1)
        expect(doublyLinkList.rear.data).to.equal(4)
        expect(doublyLinkList.toString()).to.equal('1,2,3,4')
    })

    it('遍历', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.traverse()).to.eql([])
        expect(doublyLinkList.reverseTraversal()).to.eql([])
        expect(doublyLinkList.append(1)).to.equal(1)
        expect(doublyLinkList.append(2)).to.equal(2)
        expect(doublyLinkList.append(3)).to.equal(3)
        expect(doublyLinkList.append(4)).to.equal(4)
        expect(doublyLinkList.append(5)).to.equal(5)
        expect(doublyLinkList.traverse((data) => data)).to.eql([1,2,3,4,5])
        expect(doublyLinkList.reverseTraversal((data) => data)).to.eql([5,4,3,2,1])
    })

    it('查找', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.traverse()).to.eql([])
        expect(doublyLinkList.reverseTraversal()).to.eql([])
        expect(doublyLinkList.contains(1)).to.equal(null)
        expect(doublyLinkList.append(1)).to.equal(1)
        expect(doublyLinkList.contains(1).data).to.equal(1)
        expect(doublyLinkList.contains(2)).to.equal(null)
        expect(doublyLinkList.append(2)).to.equal(2)
        expect(doublyLinkList.contains(2).data).to.equal(2)
        expect(doublyLinkList.append(3)).to.equal(3)
        expect(doublyLinkList.contains(3).data).to.equal(3)
        expect(doublyLinkList.append(4)).to.equal(4)
        expect(doublyLinkList.contains(4).data).to.equal(4)
        expect(doublyLinkList.append(5)).to.equal(5)
        expect(doublyLinkList.contains(1).data).to.equal(1)
        expect(doublyLinkList.contains(5).data).to.equal(5)
    })

    it('翻转', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.append(1)).to.equal(1)
        expect(doublyLinkList.toArray()).to.eql([1])
        doublyLinkList.reverse()
        expect(doublyLinkList.toArray()).to.eql([1])
        doublyLinkList.reverse()
        expect(doublyLinkList.append(2)).to.equal(2)
        expect(doublyLinkList.toArray()).to.eql([1,2])
        doublyLinkList.reverse()
        expect(doublyLinkList.toArray()).to.eql([2,1])
        doublyLinkList.reverse()
        expect(doublyLinkList.append(3)).to.equal(3)
        expect(doublyLinkList.toArray()).to.eql([1,2,3])
        doublyLinkList.reverse()
        expect(doublyLinkList.head.prev).to.equal(null)
        expect(doublyLinkList.rear.prev.data).to.equal(2)
        expect(doublyLinkList.rear.next).to.equal(null)
        expect(doublyLinkList.toArray()).to.eql([3,2,1])
        doublyLinkList.reverse()
        expect(doublyLinkList.append(4)).to.equal(4)
        expect(doublyLinkList.toArray()).to.eql([1,2,3,4])
        doublyLinkList.reverse()
        expect(doublyLinkList.toArray()).to.eql([4,3,2,1])
        doublyLinkList.reverse()
        expect(doublyLinkList.append(5)).to.equal(5)
        doublyLinkList.reverse()
        expect(doublyLinkList.head.data).to.equal(5)
        expect(doublyLinkList.rear.data).to.equal(1)
        expect(doublyLinkList.toArray()).to.eql([5,4,3,2,1])
        expect(doublyLinkList.traverse((data) => data)).to.eql([5,4,3,2,1])
        doublyLinkList.reverse()
        expect(doublyLinkList.head.data).to.equal(1)
        expect(doublyLinkList.rear.data).to.equal(5)
        expect(doublyLinkList.traverse((data) => data)).to.eql([1,2,3,4,5])
        expect(doublyLinkList.toArray()).to.eql([1,2,3,4,5])
    })

    it('查找中间节点', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.findMid()).to.eql(null)
        expect(doublyLinkList.traverse()).to.eql([])
        expect(doublyLinkList.reverseTraversal()).to.eql([])
        expect(doublyLinkList.findMid()).to.eql(null)
        expect(doublyLinkList.append(1)).to.equal(1)
        expect(doublyLinkList.findMid().data).to.eql(1)
        expect(doublyLinkList.append(2)).to.equal(2)
        expect(doublyLinkList.findMid().data).to.eql(1)
        expect(doublyLinkList.append(3)).to.equal(3)
        expect(doublyLinkList.findMid().data).to.eql(2)
        expect(doublyLinkList.append(4)).to.equal(4)
        expect(doublyLinkList.findMid().data).to.eql(2)
        expect(doublyLinkList.append(5)).to.equal(5)
        expect(doublyLinkList.findMid().data).to.eql(3)
        expect(doublyLinkList.append(6)).to.equal(6)
        expect(doublyLinkList.findMid().data).to.eql(3)
    })

    it('检查删除头部', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.removeHead()).to.equal(null)
        expect(doublyLinkList.prepend(1)).to.equal(1)
        expect(doublyLinkList.prepend(2)).to.equal(2)
        expect(doublyLinkList.prepend(3)).to.equal(3)
        expect(doublyLinkList.prepend(4)).to.equal(4)
        expect(doublyLinkList.prepend(1)).to.equal(1)
        expect(doublyLinkList.prepend(5)).to.equal(5)
        expect(doublyLinkList.rear.data).to.equal(1)
        expect(doublyLinkList.toString()).to.equal('5,1,4,3,2,1')
        expect(doublyLinkList.remove(3)).to.equal(3)
        expect(doublyLinkList.toString()).to.equal('5,1,4,2,1')
        expect(doublyLinkList.removeHead()).to.equal(5)
        expect(doublyLinkList.rear.data).to.equal(1)
        expect(doublyLinkList.head.data).to.equal(1)
        expect(doublyLinkList.toString()).to.equal('1,4,2,1')
        expect(doublyLinkList.removeHead()).to.equal(1)
        expect(doublyLinkList.rear.data).to.equal(1)
        expect(doublyLinkList.head.data).to.equal(4)
        expect(doublyLinkList.toString()).to.equal('4,2,1')
        expect(doublyLinkList.remove(1)).to.equal(1)
        expect(doublyLinkList.toString()).to.equal('4,2')
        expect(doublyLinkList.rear.data).to.equal(2)
        expect(doublyLinkList.head.data).to.equal(4)
        expect(doublyLinkList.removeHead()).to.equal(4)
        expect(doublyLinkList.head.data).to.equal(2)
        expect(doublyLinkList.rear.data).to.equal(2)
        expect(doublyLinkList.removeHead()).to.equal(2)
        expect(doublyLinkList.rear).to.equal(null)
    })

    it('检查删除尾部', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.removeRear()).to.equal(null)
        expect(doublyLinkList.prepend(1)).to.equal(1)
        expect(doublyLinkList.prepend(2)).to.equal(2)
        expect(doublyLinkList.prepend(3)).to.equal(3)
        expect(doublyLinkList.prepend(4)).to.equal(4)
        expect(doublyLinkList.prepend(1)).to.equal(1)
        expect(doublyLinkList.prepend(5)).to.equal(5)
        expect(doublyLinkList.toString()).to.equal('5,1,4,3,2,1')
        expect(doublyLinkList.remove(3)).to.equal(3)
        expect(doublyLinkList.removeRear()).to.equal(1)
        expect(doublyLinkList.rear.data).to.equal(2)
        expect(doublyLinkList.head.data).to.equal(5)
        expect(doublyLinkList.toString()).to.equal('5,1,4,2')
        expect(doublyLinkList.removeRear()).to.equal(2)
        expect(doublyLinkList.rear.data).to.equal(4)
        expect(doublyLinkList.head.data).to.equal(5)
        expect(doublyLinkList.toString()).to.equal('5,1,4')
        expect(doublyLinkList.remove(1)).to.equal(1)
        expect(doublyLinkList.toString()).to.equal('5,4')
        expect(doublyLinkList.rear.data).to.equal(4)
        expect(doublyLinkList.head.data).to.equal(5)
        expect(doublyLinkList.removeRear()).to.equal(4)
        expect(doublyLinkList.head.data).to.equal(5)
        expect(doublyLinkList.rear.data).to.equal(5)
        expect(doublyLinkList.removeRear()).to.equal(5)
        expect(doublyLinkList.rear).to.equal(null)
    })

    it('检查删除指定元素', () => {
        const doublyLinkList = new DoublyLinkList()
        expect(doublyLinkList.prepend(1)).to.equal(1)
        expect(doublyLinkList.prepend(2)).to.equal(2)
        expect(doublyLinkList.prepend(3)).to.equal(3)
        expect(doublyLinkList.prepend(4)).to.equal(4)
        expect(doublyLinkList.prepend(5)).to.equal(5)
        expect(doublyLinkList.toString()).to.equal('5,4,3,2,1')
        expect(doublyLinkList.remove(3)).to.equal(3)
        expect(doublyLinkList.head.data).to.equal(5)
        expect(doublyLinkList.rear.data).to.equal(1)
        expect(doublyLinkList.toString()).to.equal('5,4,2,1')
        expect(doublyLinkList.remove(5)).to.equal(5)
        expect(doublyLinkList.head.data).to.equal(4)
        expect(doublyLinkList.rear.data).to.equal(1)
        expect(doublyLinkList.toString()).to.equal('4,2,1')
        expect(doublyLinkList.remove(1)).to.equal(1)
        expect(doublyLinkList.head.data).to.equal(4)
        expect(doublyLinkList.rear.data).to.equal(2)
        expect(doublyLinkList.toString()).to.equal('4,2')
        expect(doublyLinkList.add(4, 3)).to.equal(3)
        expect(doublyLinkList.toString()).to.equal('4,3,2')
        expect(doublyLinkList.remove(3)).to.equal(3)
        expect(doublyLinkList.head.data).to.equal(4)
        expect(doublyLinkList.rear.data).to.equal(2)
        expect(doublyLinkList.toString()).to.equal('4,2')
        expect(doublyLinkList.remove(4)).to.equal(4)
        expect(doublyLinkList.head.data).to.equal(2)
        expect(doublyLinkList.rear.data).to.equal(2)
        expect(doublyLinkList.remove(2)).to.equal(2)
        expect(doublyLinkList.rear).to.equal(null)
        expect(doublyLinkList.toString()).to.equal('')
    })

})
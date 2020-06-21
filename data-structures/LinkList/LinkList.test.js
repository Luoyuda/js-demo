/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 18:40:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-21 09:00:52
 * @FilePath: /js-demo/data-structures/LinkList/LinkList.test.js
 */ 

const { LinkList } = require('./LinkList')
const { expect } = require('chai')

describe('单链表', () => {
    it('检查空链表', () => {
        const linkList = new LinkList()
        expect(linkList.toString()).to.equal('')
        expect(linkList.toArray()).to.eql([])
    })
    
    it('检查插入链表（尾部插入简单类型）', () => {
        const linkList = new LinkList()
        expect(linkList.head).to.equal(null)
        expect(linkList.rear).to.equal(null)
        expect(linkList.append(1)).to.equal(1)
        expect(linkList.append(0.1)).to.equal(0.1)
        expect(linkList.append('1')).to.equal('1')
        expect(linkList.append(true)).to.equal(true)
        expect(linkList.toString()).to.equal('1,0.1,1,true')
    })

    it('检查插入链表（头部插入简单类型）', () => {
        const linkList = new LinkList()
        expect(linkList.head).to.equal(null)
        expect(linkList.rear).to.equal(null)
        expect(linkList.prepend(1)).to.equal(1)
        expect(linkList.prepend(0.1)).to.equal(0.1)
        expect(linkList.prepend('1')).to.equal('1')
        expect(linkList.prepend(true)).to.equal(true)
        expect(linkList.toString()).to.equal('true,1,0.1,1')
    })
    
    it('检查插入链表（尾部插入复合类型）', () => {
        const linkList = new LinkList()
        expect(linkList.append([1])).to.eql([1])
        expect(linkList.append([0.1])).to.eql([0.1])
        expect(linkList.append(['1'])).to.eql(['1'])
        expect(linkList.append([true])).to.eql([true])
        expect(linkList.append([1,true,0.1,'1'])).to.eql([1,true,0.1,'1'])
        expect(linkList.append({id:1})).to.eql({id:1})
        expect(linkList.toArray()).to.eql([[1],[0.1],['1'],[true],[1,true,0.1,'1'],{id:1}])
    })

    it('检查插入链表（头部插入复合类型）', () => {
        const linkList = new LinkList()
        expect(linkList.prepend([1])).to.eql([1])
        expect(linkList.prepend([0.1])).to.eql([0.1])
        expect(linkList.prepend(['1'])).to.eql(['1'])
        expect(linkList.prepend([true])).to.eql([true])
        expect(linkList.prepend([1,true,0.1,'1'])).to.eql([1,true,0.1,'1'])
        expect(linkList.prepend({id:1})).to.eql({id:1})
        expect(linkList.toArray()).to.eql([{id:1}, [1,true,0.1,'1'], [true], ['1'], [0.1], [1]])
    })

    it('检查删除指定元素/头部/尾部', () => {
        const linkList = new LinkList()
        expect(linkList.prepend(1)).to.equal(1)
        expect(linkList.prepend(2)).to.equal(2)
        expect(linkList.prepend(3)).to.equal(3)
        expect(linkList.prepend(4)).to.equal(4)
        expect(linkList.prepend(1)).to.equal(1)
        expect(linkList.prepend(5)).to.equal(5)
        expect(linkList.toString()).to.equal('5,1,4,3,2,1')
        expect(linkList.remove(3)).to.equal(3)
        expect(linkList.toString()).to.equal('5,1,4,2,1')
        expect(linkList.removeHead()).to.equal(5)
        expect(linkList.toString()).to.equal('1,4,2,1')
        expect(linkList.removeRear()).to.equal(1)
        expect(linkList.toString()).to.equal('1,4,2')
        expect(linkList.remove(1)).to.equal(1)
        expect(linkList.toString()).to.equal('4,2')
        expect(linkList.removeHead()).to.equal(4)
        expect(linkList.rear.data).to.equal(2)
        expect(linkList.removeHead()).to.equal(2)
        expect(linkList.rear).to.equal(null)
    })

    it('插入指定位置', () => {
        const linkList = new LinkList()
        expect(linkList.append(1)).to.equal(1)
        expect(linkList.append(4)).to.equal(4)
        expect(linkList.append(5)).to.equal(5)
        expect(linkList.add(1, 2)).to.equal(2)
        expect(linkList.add(2, 3)).to.equal(3)
        expect(linkList.add(5, 6)).to.equal(6)
        expect(linkList.toString()).to.equal('1,2,3,4,5,6')
        expect(linkList.toArray()).to.eql([1,2,3,4,5,6])
    })

    it('查找指定位置', () => {
        const linkList = new LinkList()
        const arr = [1]
        const obj = {id:1}
        expect(linkList.append(1)).to.equal(1)
        expect(linkList.append(4)).to.equal(4)
        expect(linkList.append(false)).to.equal(false)
        expect(linkList.append(arr)).to.equal(arr)
        expect(linkList.append(obj)).to.equal(obj)
        expect(linkList.contains(1).data).to.equal(1)
        expect(linkList.contains(arr).data).to.eql(arr)
        expect(linkList.contains(obj).data).to.eql(obj)
        expect(linkList.contains(2)).to.eql(null)
        expect(linkList.contains(false).data).to.equal(false)
    })

    it('遍历', () => {
        const linkList = new LinkList()
        const arr = [1]
        const obj = {id:1}
        expect(linkList.traverse()).to.eql([])
        expect(linkList.reverseTraversal()).to.eql([])
        expect(linkList.append(1)).to.equal(1)
        expect(linkList.append(2)).to.equal(2)
        expect(linkList.append(3)).to.equal(3)
        expect(linkList.append(4)).to.equal(4)
        expect(linkList.append(5)).to.equal(5)
        expect(linkList.traverse((data) => data)).to.eql([1,2,3,4,5])
        expect(linkList.reverseTraversal((data) => data)).to.eql([5,4,3,2,1])
    })

    it('翻转', () => {
        const linkList = new LinkList()
        const arr = [1]
        const obj = {id:1}
        expect(linkList.append(1)).to.equal(1)
        expect(linkList.append(2)).to.equal(2)
        expect(linkList.append(3)).to.equal(3)
        expect(linkList.append(4)).to.equal(4)
        expect(linkList.append(5)).to.equal(5)
        linkList.reverse()
        expect(linkList.head.data).to.equal(5)
        expect(linkList.rear.data).to.equal(1)
        expect(linkList.toArray()).to.eql([5,4,3,2,1])
        expect(linkList.traverse((data) => data)).to.eql([5,4,3,2,1])
        linkList.reverse()
        expect(linkList.head.data).to.equal(1)
        expect(linkList.rear.data).to.equal(5)
        expect(linkList.traverse((data) => data)).to.eql([1,2,3,4,5])
        expect(linkList.toArray()).to.eql([1,2,3,4,5])
    })

    it('查找中间节点', () => {
        const linkList = new LinkList()
        expect(linkList.findMid()).to.eql(null)
        expect(linkList.traverse()).to.eql([])
        expect(linkList.reverseTraversal()).to.eql([])
        expect(linkList.append(1)).to.equal(1)
        expect(linkList.append(2)).to.equal(2)
        expect(linkList.findMid().data).to.eql(1)
        expect(linkList.append(3)).to.equal(3)
        expect(linkList.findMid().data).to.eql(2)
        expect(linkList.append(4)).to.equal(4)
        expect(linkList.findMid().data).to.eql(2)
        expect(linkList.append(5)).to.equal(5)
        expect(linkList.findMid().data).to.eql(3)
        expect(linkList.append(6)).to.equal(6)
        expect(linkList.findMid().data).to.eql(3)
    })

})
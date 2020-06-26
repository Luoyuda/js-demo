/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 18:40:27
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-26 08:41:14
 * @FilePath: /js-demo/data-structures/StaticLinkedList/StaticLinkedList.test.js
 */ 

const { StaticLinkedList } = require('./StaticLinkedList')
const { expect } = require('chai')

describe('静态链表', () => {
    it('检查空链表', () => {
        const staticLinkedList = new StaticLinkedList()
        expect(staticLinkedList.toString()).to.equal('')
        expect(staticLinkedList.toArray()).to.eql([])
    })
    
    it('检查插入链表（尾部插入简单类型）', () => {
        const staticLinkedList = new StaticLinkedList()
        // expect(staticLinkedList.head).to.equal(null)
        // expect(staticLinkedList.rear).to.equal(null)
        expect(staticLinkedList.append(1)).to.equal(1)
        expect(staticLinkedList.append(0.1)).to.equal(0.1)
        expect(staticLinkedList.append('1')).to.equal('1')
        expect(staticLinkedList.append(true)).to.equal(true)
        expect(staticLinkedList.toString()).to.equal('1,0.1,1,true')
    })

    it('检查插入链表（头部插入简单类型）', () => {
        const staticLinkedList = new StaticLinkedList()
        // expect(staticLinkedList.head).to.equal(null)
        // expect(staticLinkedList.rear).to.equal(null)
        expect(staticLinkedList.prepend(1)).to.equal(1)
        expect(staticLinkedList.prepend(0.1)).to.equal(0.1)
        expect(staticLinkedList.prepend('1')).to.equal('1')
        expect(staticLinkedList.prepend(true)).to.equal(true)
        expect(staticLinkedList.toString()).to.equal('true,1,0.1,1')
    })
    
    it('检查插入链表（尾部插入复合类型）', () => {
        const staticLinkedList = new StaticLinkedList()
        expect(staticLinkedList.append([1])).to.eql([1])
        expect(staticLinkedList.append([0.1])).to.eql([0.1])
        expect(staticLinkedList.append(['1'])).to.eql(['1'])
        expect(staticLinkedList.append([true])).to.eql([true])
        expect(staticLinkedList.append([1,true,0.1,'1'])).to.eql([1,true,0.1,'1'])
        expect(staticLinkedList.append({id:1})).to.eql({id:1})
        expect(staticLinkedList.toArray()).to.eql([[1],[0.1],['1'],[true],[1,true,0.1,'1'],{id:1}])
    })

    it('检查插入链表（头部插入复合类型）', () => {
        const staticLinkedList = new StaticLinkedList()
        expect(staticLinkedList.prepend([1])).to.eql([1])
        expect(staticLinkedList.prepend([0.1])).to.eql([0.1])
        expect(staticLinkedList.prepend(['1'])).to.eql(['1'])
        expect(staticLinkedList.prepend([true])).to.eql([true])
        expect(staticLinkedList.prepend([1,true,0.1,'1'])).to.eql([1,true,0.1,'1'])
        expect(staticLinkedList.prepend({id:1})).to.eql({id:1})
        expect(staticLinkedList.toArray()).to.eql([{id:1}, [1,true,0.1,'1'], [true], ['1'], [0.1], [1]])
    })

    it('检查删除指定元素/头部/尾部', () => {
        const staticLinkedList = new StaticLinkedList()
        expect(staticLinkedList.removeHead()).to.equal(null)
        expect(staticLinkedList.removeRear()).to.equal(null)
        expect(staticLinkedList.prepend(1)).to.equal(1)
        expect(staticLinkedList.prepend(2)).to.equal(2)
        expect(staticLinkedList.prepend(3)).to.equal(3)
        expect(staticLinkedList.prepend(4)).to.equal(4)
        expect(staticLinkedList.prepend(1)).to.equal(1)
        expect(staticLinkedList.prepend(5)).to.equal(5)
        expect(staticLinkedList.toString()).to.equal('5,1,4,3,2,1')
        expect(staticLinkedList.remove(3)).to.equal(3)
        expect(staticLinkedList.toString()).to.equal('5,1,4,2,1')
        expect(staticLinkedList.removeHead()).to.equal(5)
        expect(staticLinkedList.toString()).to.equal('1,4,2,1')
        expect(staticLinkedList.removeRear()).to.equal(1)
        expect(staticLinkedList.toString()).to.equal('1,4,2')
        expect(staticLinkedList.remove(1)).to.equal(1)
        expect(staticLinkedList.toString()).to.equal('4,2')
        expect(staticLinkedList.removeHead()).to.equal(4)
        expect(staticLinkedList.removeHead()).to.equal(2)
        expect(staticLinkedList.toString()).to.equal('')
    })

    it('插入指定位置', () => {
        const staticLinkedList = new StaticLinkedList()
        expect(staticLinkedList.append(1)).to.equal(1)
        expect(staticLinkedList.append(4)).to.equal(4)
        expect(staticLinkedList.append(5)).to.equal(5)
        expect(staticLinkedList.add(1, 2)).to.equal(2)
        expect(staticLinkedList.add(2, 3)).to.equal(3)
        expect(staticLinkedList.add(5, 6)).to.equal(6)
        expect(staticLinkedList.toString()).to.equal('1,2,3,4,5,6')
        expect(staticLinkedList.toArray()).to.eql([1,2,3,4,5,6])
    })

    it('查找指定位置', () => {
        const arr = [1]
        const obj = {id:1}
        const staticLinkedList = new StaticLinkedList()
        expect(staticLinkedList.append(1)).to.equal(1)
        expect(staticLinkedList.append(4)).to.equal(4)
        expect(staticLinkedList.append(false)).to.equal(false)
        expect(staticLinkedList.append(arr)).to.equal(arr)
        expect(staticLinkedList.append(obj)).to.equal(obj)
        expect(staticLinkedList.contains(1).data).to.equal(1)
        expect(staticLinkedList.contains(arr).data).to.eql(arr)
        expect(staticLinkedList.contains(obj).data).to.eql(obj)
        expect(staticLinkedList.contains(2)).to.eql(null)
        expect(staticLinkedList.contains(false).data).to.equal(false)
    })

    it('遍历', () => {
        const staticLinkedList = new StaticLinkedList()
        expect(staticLinkedList.traverse()).to.eql([])
        expect(staticLinkedList.reverseTraversal()).to.eql([])
        expect(staticLinkedList.append(1)).to.equal(1)
        expect(staticLinkedList.append(2)).to.equal(2)
        expect(staticLinkedList.append(3)).to.equal(3)
        expect(staticLinkedList.append(4)).to.equal(4)
        expect(staticLinkedList.append(5)).to.equal(5)
        expect(staticLinkedList.traverse((data) => data)).to.eql([1,2,3,4,5])
        expect(staticLinkedList.reverseTraversal((data) => data)).to.eql([5,4,3,2,1])
    })

    it('翻转', () => {
        const staticLinkedList = new StaticLinkedList()
        expect(staticLinkedList.append(1)).to.equal(1)
        staticLinkedList.reverse()
        expect(staticLinkedList.toArray()).to.eql([1])
        expect(staticLinkedList.append(2)).to.equal(2)
        staticLinkedList.reverse()
        expect(staticLinkedList.toArray()).to.eql([2,1])
        staticLinkedList.reverse()
        expect(staticLinkedList.toArray()).to.eql([1,2])
        expect(staticLinkedList.append(3)).to.equal(3)
        expect(staticLinkedList.append(4)).to.equal(4)
        expect(staticLinkedList.append(5)).to.equal(5)
        expect(staticLinkedList.append(6)).to.equal(6)
        expect(staticLinkedList.append(7)).to.equal(7)
        staticLinkedList.reverse()
        expect(staticLinkedList.toArray()).to.eql([7,6,5,4,3,2,1])
        expect(staticLinkedList.traverse((data) => data)).to.eql([7,6,5,4,3,2,1])
        staticLinkedList.reverse()
        expect(staticLinkedList.traverse((data) => data)).to.eql([1,2,3,4,5,6,7])
        expect(staticLinkedList.toArray()).to.eql([1,2,3,4,5,6,7])
        expect(staticLinkedList.remove(3)).to.equal(3)
        staticLinkedList.reverse()
        expect(staticLinkedList.toArray()).to.eql([7,6,5,4,2,1])
        expect(staticLinkedList.traverse((data) => data)).to.eql([7,6,5,4,2,1])
        expect(staticLinkedList.add(4,3)).to.equal(3)
        staticLinkedList.reverse()
        expect(staticLinkedList.traverse((data) => data)).to.eql([1,2,3,4,5,6,7])
        expect(staticLinkedList.prepend(0)).to.equal(0)
        staticLinkedList.reverse()
        expect(staticLinkedList.traverse((data) => data)).to.eql([7,6,5,4,3,2,1,0])
    })

})
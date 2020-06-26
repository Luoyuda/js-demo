/*
 * @Author: xiaohuolong
 * @Date: 2020-06-20 16:47:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-24 10:53:02
 * @FilePath: /js-demo/data-structures/Queue/Queue.test.js
 */ 
const { Queue, QueueStack } = require('./Queue')
const { expect } = require('chai')

describe('队列', function() {
    it('检查空队列', () => {
        const queue = new Queue()
        expect(queue).to.not.null
        expect(queue.linkList).to.not.null
    })
    
    it('入队（简单类型）', () => {
        const queue = new Queue()
        expect(queue.enqueue(1)).to.equal(1)
        expect(queue.enqueue(0.1)).to.equal(0.1)
        expect(queue.enqueue('1')).to.equal('1')
        expect(queue.enqueue(true)).to.equal(true)
        expect(queue.toArray()).to.eql([1,0.1,"1",true])
        expect(queue.toString()).to.equal('1,0.1,1,true')
    })

    it('入队（复合类型）', () => {
        const queue = new Queue()
        expect(queue.enqueue([1])).to.eql([1])
        expect(queue.enqueue([0.1])).to.eql([0.1])
        expect(queue.enqueue(['1'])).to.eql(['1'])
        expect(queue.enqueue([true])).to.eql([true])
        expect(queue.enqueue([1,true,0.1,'1'])).to.eql([1,true,0.1,'1'])
        expect(queue.enqueue({id:1})).to.eql({id:1})
    })

    it('出队（简单类型）', () => {
        const queue = new Queue()
        expect(queue.enqueue(1)).to.equal(1)
        expect(queue.enqueue(0.1)).to.equal(0.1)
        expect(queue.enqueue('1')).to.equal('1')
        expect(queue.enqueue(true)).to.equal(true)
        expect(queue.dequeue()).to.equal(1)
        expect(queue.dequeue()).to.equal(0.1)
        expect(queue.dequeue()).to.equal('1')
        expect(queue.dequeue()).to.equal(true)
    })

    it('出队（复合类型）', () => {
        const queue = new Queue()
        expect(queue.enqueue([1])).to.eql([1])
        expect(queue.enqueue([0.1])).to.eql([0.1])
        expect(queue.enqueue(['1'])).to.eql(['1'])
        expect(queue.enqueue([true])).to.eql([true])
        expect(queue.enqueue([1,true,0.1,'1'])).to.eql([1,true,0.1,'1'])
        expect(queue.enqueue({id:1})).to.eql({id:1})
        expect(queue.dequeue()).to.eql([1])
        expect(queue.dequeue()).to.eql([0.1])
        expect(queue.dequeue()).to.eql(['1'])
        expect(queue.dequeue()).to.eql([true])
        expect(queue.dequeue()).to.eql([1,true,0.1,'1'])
        expect(queue.dequeue()).to.eql({id:1})
    })
    
    it('检查队首，队尾', () => {
        const queue = new Queue()
        expect(queue.enqueue(1)).to.equal(1)
        expect(queue.enqueue(2)).to.equal(2)
        expect(queue.enqueue(3)).to.equal(3)
        expect(queue.front()).to.equal(1)
        expect(queue.dequeue()).to.equal(1)
        expect(queue.front()).to.equal(2)
        expect(queue.back()).to.equal(3)
        expect(queue.dequeue()).to.equal(2)
        expect(queue.dequeue()).to.equal(3)
        expect(queue.back()).to.equal(null)
        expect(queue.front()).to.equal(null)
    })

    it('清空方法和检查是否空队列', () => {
        const queue = new Queue()
        expect(queue.front()).to.equal(null)
        expect(queue.back()).to.equal(null)
        expect(queue.enqueue(1)).to.equal(1)
        expect(queue.enqueue(2)).to.equal(2)
        expect(queue.enqueue(3)).to.equal(3)
        expect(queue.isEmpty()).to.equal(false)
        expect(queue.clear()).to.equal(null)
        expect(queue.isEmpty()).to.equal(true)
        expect(queue.back()).to.equal(null)
        expect(queue.front()).to.equal(null)
    })
    
})

describe('队列(栈实现)', function() {
    it('检查空队列', () => {
        const queue = new QueueStack()
        expect(queue).to.not.null
        expect(queue.linkList).to.not.null
    })
    
    it('入队（简单类型）', () => {
        const queue = new QueueStack()
        expect(queue.enqueue(1)).to.equal(1)
        expect(queue.enqueue(0.1)).to.equal(0.1)
        expect(queue.enqueue('1')).to.equal('1')
        expect(queue.enqueue(true)).to.equal(true)
        expect(queue.toArray()).to.eql([true, '1', 0.1, 1])
        expect(queue.toString()).to.equal('true,1,0.1,1')
    })

    it('入队（复合类型）', () => {
        const queue = new QueueStack()
        expect(queue.enqueue([1])).to.eql([1])
        expect(queue.enqueue([0.1])).to.eql([0.1])
        expect(queue.enqueue(['1'])).to.eql(['1'])
        expect(queue.enqueue([true])).to.eql([true])
        expect(queue.enqueue([1,true,0.1,'1'])).to.eql([1,true,0.1,'1'])
        expect(queue.enqueue({id:1})).to.eql({id:1})
    })

    it('出队（简单类型）', () => {
        const queue = new QueueStack()
        expect(queue.enqueue(1)).to.equal(1)
        expect(queue.enqueue(0.1)).to.equal(0.1)
        expect(queue.enqueue('1')).to.equal('1')
        expect(queue.enqueue(true)).to.equal(true)
        expect(queue.dequeue()).to.equal(1)
        expect(queue.dequeue()).to.equal(0.1)
        expect(queue.dequeue()).to.equal('1')
        expect(queue.dequeue()).to.equal(true)
    })

    it('出队（复合类型）', () => {
        const queue = new QueueStack()
        expect(queue.enqueue([1])).to.eql([1])
        expect(queue.enqueue([0.1])).to.eql([0.1])
        expect(queue.enqueue(['1'])).to.eql(['1'])
        expect(queue.enqueue([true])).to.eql([true])
        expect(queue.enqueue([1,true,0.1,'1'])).to.eql([1,true,0.1,'1'])
        expect(queue.enqueue({id:1})).to.eql({id:1})
        expect(queue.dequeue()).to.eql([1])
        expect(queue.dequeue()).to.eql([0.1])
        expect(queue.dequeue()).to.eql(['1'])
        expect(queue.dequeue()).to.eql([true])
        expect(queue.dequeue()).to.eql([1,true,0.1,'1'])
        expect(queue.dequeue()).to.eql({id:1})
    })
    
    it('检查队首，队尾', () => {
        const queue = new QueueStack()
        expect(queue.enqueue(1)).to.equal(1)
        expect(queue.enqueue(2)).to.equal(2)
        expect(queue.enqueue(3)).to.equal(3)
        expect(queue.front()).to.equal(1)
        expect(queue.dequeue()).to.equal(1)
        expect(queue.front()).to.equal(2)
        expect(queue.back()).to.equal(3)
        expect(queue.dequeue()).to.equal(2)
        expect(queue.dequeue()).to.equal(3)
        expect(queue.back()).to.equal(null)
        expect(queue.front()).to.equal(null)
    })

    it('清空方法和检查是否空队列', () => {
        const queue = new QueueStack()
        expect(queue.front()).to.equal(null)
        expect(queue.back()).to.equal(null)
        expect(queue.enqueue(1)).to.equal(1)
        expect(queue.enqueue(2)).to.equal(2)
        expect(queue.enqueue(3)).to.equal(3)
        expect(queue.isEmpty()).to.equal(false)
        expect(queue.clear()).to.equal(null)
        expect(queue.isEmpty()).to.equal(true)
        expect(queue.back()).to.equal(null)
        expect(queue.front()).to.equal(null)
    })
    
})
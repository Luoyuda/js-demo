/*
 * @Author: xiaohuolong
 * @Date: 2020-07-14 11:45:21
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-14 16:50:07
 * @FilePath: /js-demo/data-structures/HuffmanTree/HuffmanTree.js
 */ 
const { Heap } = require('../Heap/Heap')

class MinHeap extends Heap {
    constructor(list, max){
        super(list, max, 'min')
    }
    min(a={}, b={}){
        return a.weight < b.weight
    }
}

class HuffmanTree {
    constructor(){
        this.nodes = []
        this.char = {}
        this.code = {}
        this.root = null
    }
    node(value, weight, left = null, right= null, code=null) {
        return {
            value,
            weight,
            left,
            right,
            code
        }
    }
    createTree(str){
        const map = new Map()
        const weights = []
        for (let i = 0; i < str.length; i++) {
            const el = str[i];
            map.set(el, (map.get(el) || 0) + 1)
        }
        // console.log(map)
        let i = 0
        map.forEach((val, key) => {
            weights.push({val,key})
            this.char[key] = i++
        })
        const minHeap = new MinHeap([])
        this.nodes = weights.map(({ val, key }) => {
            let node = this.node(key, val)
            minHeap.heapPush(node)
            return node
        })
        while (minHeap.heapList.length > 1){
            let curr1 = minHeap.heapPop()
            let curr2 = minHeap.heapPop()
            let newNode = this.node('', curr1.weight + curr2.weight, curr1, curr2)
            minHeap.heapPush(newNode)
        }
        this.root = minHeap.heapPop()
        this.str = str
    }
    encode(node, code){
        if(node == null) return
        node.code = code
        this.code[code] = node.value
        this.encode(node.left, code + '1')
        this.encode(node.right, code + '0')
    }
    convertHuffmanCode(i){
        return this.nodes[i] ? this.nodes[i].code : ''
    }
    getCode(str=this.str){
        let code = ''
        for (let i = 0; i < str.length; i++) {
            const el = str[i];
            code += this.convertHuffmanCode(this.char[el])
        }
        return code
    }
    decode(codeStr){
        let code = ''
        let str = ''
        for (let i = 0; i < codeStr.length; i++) {
            const el = codeStr[i];
            code += el
            const s = this.code[code]
            if(s){
                str += s
                code = ''
            }
        }
        return str
    }
}
module.exports = {
    HuffmanTree
}
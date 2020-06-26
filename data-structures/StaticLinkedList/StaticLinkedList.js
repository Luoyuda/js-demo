/*
 * @Author: xiaohuolong
 * @Date: 2020-06-24 14:16:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-06-26 08:40:34
 * @FilePath: /js-demo/data-structures/StaticLinkedList/StaticLinkedList.js
 */ 
class StaticLinkedList {
    constructor(size=10){
        // 数组第一个下标存储的值用来存放下一个备用链表的下标
        // 数组最后一个下标存储的值用来存放指向头的下标
        if(size < 3) return null
        this.list = []
        // 需要初始化数组中的每个值
        for (let index = 0; index < size; index++) {
            let node = this.node('')
            node.next = index + 1
            this.list[index] = node
        }
        // 最后一个值的 next 默认指向 0
        this.list[size-1].next = 0
        // 数组的长度
        this.size = size
        // 每次扩容的长度
        this.expansionSize = size
        // 链表大小
        this.length = 0
    }
    node(data) {
        return {
            next: 0,
            data,
        }
    }
    // 扩容
    expansion(){
        // 如果链表长度超过了数组长度-2的时候
        if(this.length >= this.size -2){
            let expansionSize = this.size + this.expansionSize
            // 移动到最后
            this.list[expansionSize - 1] = this.list[this.size-1]
            // 执行循环扩容
            for (let index = this.size-1; index < expansionSize - 1; index++) {
                let node = this.node('')
                node.next = index + 1
                this.list[index] = node
            }
            this.size = expansionSize
        }
    }
    // 尾部插入
    append(data){
        // 判断是否需要扩容
        this.expansion()
        // 取出数组头
        let front = this.list[0]
        // 通过数组头 取出下一个空闲节点的下标
        let curr = front.next
        // 取出数组尾的头指针
        let head = this.list[this.size-1]
        // 取出新增节点
        let node = this.list[curr]
        // 给节点赋值
        node.data = data
        // 数组头的 next 指向 node.next 指向一个新的空闲节点的下标
        front.next = node.next
        // 判断链表长度
        if(this.length == 0) {
            // 如果空链表，需要给头指针指向当前的下标
            head.next = curr
        }else {
            // 如果不是空链表，需要找到最后一个节点
            let last = this.list[head.next]
            // 通过循环找到最后一个节点
            while(last.next != 0){
                last = this.list[last.next]
            }
            // 调整最后一个节点的指向
            last.next = curr
        }
        // node.next 需要指向 0
        node.next = 0
        ++this.length
        return data
    }
    // 头部插入
    prepend(data){
        // 判断是否需要扩容
        this.expansion()
        // 取出数组头
        let front = this.list[0]
        // 通过数组头 取出下一个空闲节点的下标
        let curr = front.next
        // 取出数组尾的头指针
        let head = this.list[this.size-1]
        // 取出新增节点
        let node = this.list[curr]
        // 给节点赋值
        node.data = data
        // 数组头的 next 指向 node.next 指向一个新的空闲节点的下标
        front.next = node.next
        // node.next 指向原来的 head.next
        node.next = head.next
        // 头指针指向新的头节点下标
        head.next = curr
        ++this.length
        return data
    }
    // 指定插入
    add(value, data){
        // 判断是否需要扩容
        this.expansion()
        // 取出数组头
        let front = this.list[0]
        // 通过数组头 取出下一个空闲节点的下标
        let curr = front.next
        // 取出新增节点
        let node = this.list[curr]
        // 找到插入的节点
        let currNode = this.contains(value)
        if(!currNode) return null
        // 取出前置节点原来指向的下标
        let next = currNode.next
        // 给节点赋值
        node.data = data
        // 数组头的 next 指向 node.next 指向一个新的空闲节点的下标
        front.next = node.next
        // node.next 指向原来的 currNode.next
        node.next = next
        // currNode.next 指向 当前节点下标
        currNode.next = curr
        ++this.length
        return data
    }
    // 删除头节点
    removeHead(){
        // 取出数组尾指针
        let rear = this.list[this.size-1]
        // 取出头节点的下标
        let headCur = rear.next
        // 取出头节点
        let currNode = this.list[headCur]
        if(this.length == 0) return null
        // 取出头节点的下一个节点下标
        let next = currNode.next
        // 取出数组头
        let front = this.list[0]
        // 取出数组头的下个空闲节点下标
        let empty = front.next
        // 获取头节点数据
        let data = currNode.data
        // 尾指针指向新的头节点下标
        rear.next = next
        // 头节点的 next 指向原下个空闲节点
        currNode.next = empty
        // 置空
        currNode.data = ''
        // 数组头的 next 指向原头节点的下标
        front.next = headCur
        --this.length
        return data
    }
    // 删除尾节点
    removeRear(){
        // 取出头节点
        let curr = this.list[this.list[this.size-1].next]
        if(this.length == 0) return null
        // 循环找出尾节点的前置节点
        while (curr != this.list[0]){
            if(this.list[curr.next].next === 0) break
            curr = this.list[curr.next]
        }
        // 如果尾节点也是头节点，直接删除头节点
        if(curr == this.list[0]) return this.removeHead()
        // 取出尾节点的下标
        let next = curr.next
        // 取出尾节点
        let rear = this.list[next]
        // 取出数组头的下个空闲节点下标
        let front = this.list[0]
        // 获取头节点数据
        let data = rear.data
        // 取出数组头的下个空闲节点下标
        let empty = front.next
        // 前置节点指向 0 成为新的尾节点
        curr.next = 0
        // 尾节点指针指向原空闲节点下标
        rear.next = empty
        // 尾节点置空
        rear.data = ''
        // 数组头的 next 指向尾节点的下标
        front.next = next
        --this.length
        return data
    }
    // 删除某个节点
    remove(el){
        // 取出头节点
        let curr = this.list[this.list[this.size-1].next]
        if(this.length == 0) return null
        // 如果头节点等于删除的数据，直接删除头节点
        if(curr.data == el) return this.removeHead()
        // 寻找删除节点的前置节点
        while (curr != this.list[0]){
            if(this.list[curr.next].data === el) break
            curr = this.list[curr.next]
        }
        // 取出待删除节点的下标
        let next = curr.next 
        // 取出待删除节点
        let node = this.list[next]
        // 取出待删除节点数据
        let data = node.data
        if(data != el) return null
        // 取出数组头的下个空闲节点下标
        let front = this.list[0]
        // 取出数组头的下个空闲节点下标
        let empty = front.next
        // 前置节点指向待删除节点的 next
        curr.next = node.next
        // 数组头的 next 待删除节点的下标
        front.next = next
        // 待删除节点指针指向原空闲节点下标
        node.next = empty
        // 尾节点置空
        node.data = ''
        --this.length
        return data
    }
    // 查找
    contains(data) {
        // 取出头节点
        let curr = this.list[this.list[this.size-1].next]
        if(this.length == 0) return null
        // 循环找出目标值
        while (curr != this.list[0]){
            if(curr.data === data) break
            curr = this.list[curr.next]
        }
        if(curr == this.list[0]) return null
        return curr
    }
    // 遍历方法
    traverse(callback=(item)=>item){
        let res = []
        // 先取出 头节点
        let curr = this.list[this.list[this.size-1].next]
        // 如果没有头节点，空链表返回 []
        if(this.length == 0) return []
        while (curr != this.list[0]){
            res.push(callback(curr.data));
            curr = this.list[curr.next]
        }
        // 返回
        return res
    }
    // 反向遍历
    reverseTraversal(callback=(item)=>item){
        let res = []
        let head = this.list[this.list[this.size-1].next]
        // 如果没有头节点，空链表返回 []
        if(this.length == 0) return []
        // 取出尾节点
        let curr = head
        while (curr.next != 0){
            curr = this.list[curr.next]
        }
        // 如果 curr = head 跳出
        while(curr != head){
            let prev = head
            // 从 head 开始查找 找到当前节点到前置节点
            while(this.list[prev.next] != curr){
                prev = this.list[prev.next]
            }
            // 处理
            res.push(callback(curr.data))
            // 当前节点指向前置节点
            curr = prev
        }
        // 再处理一遍 head
        res.push(callback(curr.data))
        return res
    }
    // 反转链表
    reverse() {
        // 先取出头节点的的下标
        let cur = this.list[this.size-1].next
        // 取出头节点
        let curr = this.list[cur]
        // 取出数组头
        let front = this.list[0]
        // 临时保存原来头
        let head = curr
        if(this.length === 0) return null
        // 定义 next 节点
        let next = null
        // 定义 prev 节点
        let prev = null
        // 声明一个用来存放前两位的下标
        let temp = curr.next
        // 声明一个用来存放前置节点的下标
        let lastCur = 0
        prev = curr
        curr = this.list[temp]
        while(curr != front){
             // 1 2 3
            // 把 next 指向 curr.next
            // 如果等于零，即将跳出循环令头节点的的下标指向当前节点的下标
            if(curr.next == 0) cur = next ? next : cur
            // 取出下一个节点的下标
            next = curr.next 
            // curr.next 指向 prev 节点
            if(lastCur > 0){
                // 如果前置节点指针下标大于零，证明当前循环已经走过至少一次
                // 缓存前置节点指针下标
                let tempCur = lastCur
                // 前置节点下标指向上次的下标
                lastCur = temp
                // 当前节点下标指向前前节点指向的下标
                curr.next = tempCur
            }else{
                // 如果第一次，当前节点下标指向原来头节点的下标
                curr.next = cur
                // 前前节点指向的下标 指向前置节点指向的 next
                lastCur = prev.next
                // 如果下个节点为零，证明只会走一次循环，需要把新的头节点下标指向当前节点的下标
                if(next == 0) cur = temp
            }
            // prev 节点 指向 curr
            prev = curr 
            // 当前节点指向 next
            curr = this.list[next] 
            // 缓存当前节点下标
            temp = next
        }
        // 把原来的头节点的 next 指向 0
        head.next = 0
        // 校正新的头节点下标
        this.list[this.size-1].next = cur
        return this
    }
    toArray() {
        return this.traverse();
    }
    toString(callback=(item)=>item) {
        return this.traverse(callback).toString();
    }
}

module.exports = {
    StaticLinkedList
}
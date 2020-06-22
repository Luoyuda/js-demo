# 双向链表

双向链表也叫双链表，是链表的一种，它的每个数据结点中都有两个指针，分别指向直接后继和直接前驱。所以，从双向链表中的任意一个结点开始，都可以很方便地访问它的前驱结点和后继结点。

### 初始化

```js
class DoublyLinkList {
    constructor(...arg){
        this.head = null
        this.rear = null
    }
    node(data){
        return {
            data,
            next: null,
            prev: null
        }
    }
}
```

### 基本操作

#### 插入

##### 头部插入

1. 如果头节点为空，直接插入，并指定 head rear
2. 取出头节点 temp = head 初始化新节点 node
3. node.next 指向 temp
4. temp.prev 指向 node
5. head 指向 node

```js
0->1->2 // head 0 rear 2
插入 -1 ，取出 0 
-1->0->1->2 // -1.next -> 0 0.prev -> -1
```

```js
    prepend(data){
        // 初始化一个节点 node
        let node = this.node(data)
        if(!this.head){
            // 如果头节点指针为空，则链表为空，直接令插入的节点作为头和尾
            this.head = node
            this.rear = node
            return node.data
        }
        // 取出头节点
        let temp = this.head 
        // 节点的 next 指向 temp
        node.next = temp
        // temp.prev 指向 前置节点 node
        temp.prev = node
        // 头节点指针 指向 node
        this.head = node
        // 返回节点值
        return node.data
    }
```

##### 尾部插入

1. 如果头节点为空，直接插入，并指定 head rear
2. 取出 temp = rear 初始化节点 node
3. temp.next 指向 node
4. node.prev 指向 temp
5. rear 指向 node

```js
1->2 // head 1 rear 2
取出 2 插入 3
1->2->3 // 2.next->3 3.prev->2 rear 3
```

```js
    append(data){
        // 初始化一个节点 node
        let node = this.node(data)
        if(!this.rear){
            // 如果尾指针为空，则链表为空，直接令插入的节点作为头和尾
            this.head = node
            this.rear = node
            return node.data
        }
        // 取出尾节点
        let temp = this.rear
        // 节点的 temp.next 指向 node
        temp.next = node
        // node.prev 指向 前置节点 temp
        node.prev = temp
        // 尾节点指针 指向 node
        this.rear = node
        // 返回节点值
        return node.data
    }
```

##### 指定位置插入

1. 查找出插入位置 curr，初始化 node，temp = curr.next
2. curr.next 指向 node
3. node.prev 指向 curr
4. node.next 指向 curr.next

```js
    add(el, data){
        // 查找到要插入的节点
        let curr = this.contains(el)
        if(curr == this.rear) return this.append(data)
        // 如果不存在 返回 null
        if(!curr) throw null
        // 初始化一个节点 node
        let node = this.node(data)
        // 取出插入节点 curr 的 next
        let temp = curr.next
        // curr 的 next 指向新节点 node
        curr.next = node
        // node.prev 指向 前置节点
        node.prev = curr
        // node 的 next 指向 curr 原来的 next
        node.next = temp
        // 返回节点值
        return node.data
    }
```

#### 删除

##### 头部删除

1. 取出头节点 temp = head ，如果头节点不存在，直接返回null
2. 如果 temp.next 不存在，证明只有一个节点，把头节点和尾节点一同置为 null
3. 把头节点指针指向 temp.next
4. temp.next.prev 置为 null，temp.next 置为 null

```
1->2->3 // head 1 rear 3
取出 1， 2
2->3 // 1.next = null; 2.prev = null; head = 2
```

```js
    removeHead(){
        if(!this.head) return null
        // 取出头节点
        let temp = this.head
        // 如果头节点不存在，返回 null
        if(!temp) return null
        // 如果头节点的 next 不存在 尾节点置为 null
        if(!temp.next) {
            this.rear = null
            this.head = null
            return temp.data
        }
        // 删除 prev 的指向
        temp.next.prev = null
        // 指定新的 头指针指向
        this.head = temp.next
        // 清空 temp.next 的指向
        temp.next = null
        return temp.data
    }
```

##### 尾部删除

1. 取出 curr = rear.prev，rear
2. rear.prev 置为 null
3. curr.next 置为 null
4. rear 指针指向 curr

```js
1->2->3 // head 1 rear 3
取出 3 ，3.prev -> 2
1->2 // 2.next -> null rear 2
```

```js
    removeRear(){
        if(!this.rear) return null
        // 先取出 头节点
        let curr = this.rear.prev
        // 取出尾节点
        let rear = this.rear
        // 断开联系
        rear.prev = null
        // 把前置节点 curr 的 next 指向 null
        if(curr) curr.next = null
        // 把尾指针指向 前置节点 curr
        this.rear = curr
        return rear.data
    }
```

##### 指定位置删除

1. 如果头节点不存在，返回null
2. 如果值等于头节点，直接删除头节点
3. 查找出值，如果值等于尾节点，直接删除尾节点
4. 取出当前值的前置节点 prevNode， 后置节点 nextNode
5. prevNode.next 指向 nextNode
6. nextNode.prev 指向 prevNode
7. curr.next, curr.prev 置为 null 

```js
1->2->3 // head 1 rear 3
找出 2 ，通过 2 取出 2.prev -> 1 2.next -> 3
1->3 // 1.next = 3 3.prev -> 1
```

```js
    remove(el){
        // 如果没有头节点，空链表返回 null
        if(!this.head) return null
        // 如果 删除值 等于头节点的值 直接删除头节点
        if(this.head.data === el) return this.removeHead()
        // 取出头节点 寻找 前置节点
        let curr = this.contains(el)
        // 如果找不到，返回null
        if(!curr) return null
        // 如果需删除的是尾节点
        if(curr == this.rear) return this.removeRear()
        // 取出删除节点的前置节点，后置节点
        let nextNode = curr.next
        let prevNode = curr.prev
        // 前置节点的 next 指向 后置节点
        prevNode.next = nextNode
        // 后置节点的 prev 指向 前置节点
        nextNode.prev = prevNode
        return curr.data
    }
```

#### 查找

```js
    contains(el){
        // 如果没有头节点，空链表返回 null
        if(!this.head) return null
        // 先取出 头节点
        let curr = this.head
        while (curr){
            // 当 data = el 跳出循环
            if(curr.data === el) break
            // 如果不是 curr = curr.next 
            curr = curr.next
        }
        // 返回节点
        return curr
    }
```

#### 遍历

##### 正序遍历

1. 从头节点开始，通过后继指针，循环遍历，直到 null

```js
    traverse(callback=(item)=>item){
        let res = []
        // 如果没有头节点，空链表返回 []
        if(!this.head) return res
        // 先取出 头节点
        let curr = this.head
        while (curr){
            // 处理每一个值
            res.push(callback(curr.data))
            // 前进一步
            curr = curr.next
        }
        // 返回
        return res
    }
```

##### 反序遍历

1. 由于每个非头节点都有前置节点，可以直接通过前置节点往前遍历

```js
    reverseTraversal(callback=(item)=>item){
        let res = []
        // 如果没有头节点，空链表返回 []
        if(!this.head) return res
        // 先取出 头节点
        let curr = this.rear
        while (curr){
            // 处理每一个值
            res.push(callback(curr.data))
            // 前进一步
            curr = curr.prev
        }
        // 返回
        return res
    }
```

#### 反转

1. 相比链表的反转，需要注意 prev 的指向问题
2. 在循环中需要指定，循环结束后给头节点的 prev 置 null

```js
    reverse() {
        // 如果没有头节点，空链表返回null
        if(!this.head) return null
        // 取出头节点
        let curr = this.head
        // 定义 next 节点
        let next = null
        // 定义 prev 节点
        let prev = null
        while(curr){
            // 1 2 3
            // 把 next 指向 curr.next
            next = curr.next 
            // 1. curr = 1 { 1, 2 } next = 2 { 2, 3 } prev = null 
            // 2. curr = { 2, 3 } next = { 3, null } prev = { 1,null }
            // 3. curr = { 3, null } next = null prev = { 2, 1 }
            // curr.next 指向 prev 节点
            curr.next = prev 
          	// 指定前置节点
            if(prev) prev.prev = curr
            // 1. { 1, null }
            // 2. { 2, 1 } { 1, null }
            // 3. { 3, 2 } { 2, 1 } { 1, null }
            // prev 节点 指向 curr
            prev = curr 
            // 1. prev = { 1, null }
            // 2. prev = { 2, 1 }
            // 3. prev = { 3, 2 }
            // 当前节点指向 next
            curr = next 
            // 1. curr = { 2, 3 }
            // 2. curr = { 3, null }
            // 2. curr = null
        }
        // 把原来的尾指针指向原来的头指针
        this.rear = this.head // { 3, 2 } => { 1, null }
        // 头指针指向 prev 节点
        this.head = prev // { 1, null } => { 3, 2 }
        // 清楚头指针的 前置指针
        this.head.prev = null
        return this
    }
```

#### 取出中间节点

```js
    findMid(){
        // 如果没有头节点，空链表返回null
        if(!this.head) return null
        // 设置 快指针 search 慢指针 mid  
        // search 步数为 mid 的两倍 
        let search = this.head
        let mid = this.head
        while(search.next){
            // 当 search.next == null 则说明到尾部 跳出循环
            if(search.next.next != null){
                // 如果 search.next.next 存在值，则继续行进
                search = search.next.next
                mid = mid.next
            }else{
                // 不存在则 快指针直接指向下一个节点
                search = search.next
            }
        }
        // 返回
        return mid
    }
```


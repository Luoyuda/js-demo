# 循环链表（CircularLinkedList）

## 单向循环链表

单向循环链表是在单向链表的基础上，将尾节点的 next 指向 头节点，形成了一个环

```js
1->2->3->1 // 1.next -> 2.next -> 3.next -> 1
```

### 初始化

```js
class CircularLinkedList {
    constructor(){
        this.head = null
        this.rear = null
    }
    node(data){
        return {
            data,
            next: null
        }
    }
}
```

### 基本操作

#### 插入

##### 头部插入

1. 如果头节点为空，head 和 rear 都指向新节点node
2. 头节点不为空，取出头节点 temp = head 
3. node.next 指向 temp
4. 设置头指针指向新节点node head = node， 设置尾部节点的 next 指向新节点 rear.next = node

```js
1->2->3->1 // head:1 rear:3
 // 取出 1,3 插入 0
0->1->2->3 // 0.next -> 1
0->1->2->3->0 // 3.next -> 0 head: 0
```

```js
    prepend(data){
        // 初始化一个节点 node
        let node = this.node(data)
        if(!this.head){
            // 如果头节点指针为空，则链表为空，直接令插入的节点作为头和尾
            this.head = node
            this.rear = node
            node.next = this.head
            return node.data
        }
        // 取出头节点
        let temp = this.head 
        // 节点的 next 指向 temp
        node.next = temp
        // 头节点指针 指向 node
        this.head = node
        // 尾指针next指向新的头指针节点
        this.rear.next = this.head
        // 返回节点值
        return node.data
    }
```

##### 尾部插入

1. 取出头尾节点 head，rear，temp = rear
2. 新节点 node.next 指向 head
3. temp.next 指向新节点 node
4. rear 指针指向新节点 node

```js
1->2->3->1 // head:1 rear:3
// 取出1，3 插入4
1->2->3->4 // 3.next = 4
1->2->3->4->1 // 4.next -> 1 rear: 4
```

```js
    append(data){
        // 初始化一个节点 node
        let node = this.node(data)
        if(!this.rear){
            // 如果尾指针为空，则链表为空，直接令插入的节点作为头和尾
            this.rear = node
            this.head = node
            node.next = this.head
            return node.data
        }
        // 取出尾节点
        let temp = this.rear
        // 新节点next 指向头节点
        node.next = this.head
        // 节点的 temp.next 指向 node
        temp.next = node
        // 尾节点指针 指向 node
        this.rear = node
        // 返回节点值
        return node.data
    }
```

##### 指定位置插入

1. 找到插入的位置 curr，创建新节点 node，temp = curr.next
2. 把 curr.next 指向 node
3. 把 node.next 指向 temp

```js
1->2->4->1 // 在 2 的位置插入 3
取出 2 创建 3 
1->2->3 // 2.next = 3
1->2->3->4->1 // 3.next = 4
```

```js
    add(el, data){
        // 查找到要插入的节点
        let curr = this.contains(el)
        // 如果不存在 返回 null
        if(!curr) throw null
        // 如果插入的节点是尾节点，直接使用尾部插入法
        if(curr == this.rear) return this.append(data)
        // 初始化一个节点 node
        let node = this.node(data)
        // 取出插入节点 curr 的 next
        let temp = curr.next
        // curr 的 next 指向新节点 node
        curr.next = node
        // node 的 next 指向 curr 原来的 next
        node.next = temp
        // 返回节点值
        return node.data
    }
```

#### 删除

##### 头部删除

1. 取出头节点 temp = head，如果节点不存在，返回 null。
2. 把 head 的指针 指向原 head.next
3. 把 rear.next 指向新的 head

```js
1->2->3->1 // head 1 rear 3
2->3->1 // head 2
2->3->2 // rear.next 2
```

```js
    removeHead(){
        // 取出头节点
        let temp = this.head
        // 如果头节点不存在，返回 null
        if(!temp) return null
        if(this.head == this.rear) {
            this.head = null
            this.rear = null
            return temp.data
        }
        // 指定新的 头指针指向
        this.head = temp.next
        // 更改尾指针的 next 指向
        this.rear.next = this.head
        return temp.data
    }
```

##### 尾部删除

1. 取出头节点 head 尾节点 rear ，找出 rear 的前置节点 curr
2. 将 curr.next 指向 rear.next
3. 把尾指针指向 curr

```js
1->2->3->1 // head 1 rear 3
取出 2 
2->1 // 2.next -> 1.next rear 2
```

```js
    removeRear(){
        // 先取出 头节点
        let curr = this.head
        if(this.head == this.rear) {
            this.head = null
            this.rear = null
            return curr.data
        }
        while (curr){
            // 找出尾节点的前置节点
            if(curr.next == this.rear) break
            // 如果不是 curr 指向 curr.next
            curr = curr.next
        }
        // 取出尾节点
        let rear = this.rear
        // 把前置节点 curr 的 next 指向 null
        curr.next = this.rear.next
        // 把尾指针指向 前置节点 curr
        this.rear = curr
        // 头指针指向新的尾指针
        return rear.data
    }
```

##### 指定位置删除

1. 判断删除位置是否头节点，还是尾节点，还是中间节点
2. 取出 前置节点 curr，通过 curr.next 取出目标节点 node
3. curr.next 指向 node.next

```js
1->2->3-> // head 1 rear 3
取出 1 2
1->3->1 // 1.next = 2.next
```

```js
    remove(el){
        // 如果没有头节点，空链表返回 null
        if(!this.head) return null
        // 如果 删除值 等于头节点的值 直接删除头节点
        if(this.head.data == el){
            // 取出头节点
            let temp = this.head
            if(this.head == this.rear){
                this.head = null
                this.rear = null
                return temp.data
            }
            // 更改头指针指向
            this.head = this.head.next
            // 更改尾指针的 next 指向
            this.rear.next = this.head
            // 切断联系
            temp.next = null
            return temp.data
        }
        // 取出头节点 寻找 前置节点
        let curr = this.head
        do {
            // 查找
            if(curr.next.data == el) break
            // 前进一步
            curr = curr.next
        } while (curr != this.head)
        // 如果需删除的是尾节点
        if(curr.next == this.rear){
            let node = curr.next
            // 改变前置节点的 next 的指向
            curr.next = this.head
            // 改变尾指针指向
            this.rear = curr
            return node.data
        }
        // 取出删除节点
        let node = curr.next
        // 前置节点的 next 指向 删除节点的 next
        curr.next = node.next
        return node.data
    }
```

#### 查找

1. 循环查找，直到 curr 再次等于 head 的时候，跳出循环

```js
    contains(el){
        // 如果没有头节点，空链表返回 null
        if(!this.head) return null
        let curr = this.head
        do {
            // 查找
            if(curr.data === el) break
            // 前进一步
            curr = curr.next
        } while (curr != this.head);
        // 如果不相等，返回 null
        if(curr.data != el) return null
        // 返回节点
        return curr
    }
```

#### 遍历

##### 正序遍历

1. 从头节点开始循环，直到 curr 再次等于 head 的时候，跳出循环

```js
    traverse(callback=(item)=>item){
        let res = []
        // 如果没有头节点，空链表返回 []
        if(!this.head) return res
        // 先取出 头节点
        let curr = this.head
        do {
            // 处理每一个值
            res.push(callback(curr.data))
            // 前进一步
            curr = curr.next
        } while (curr != this.head);
        // 返回
        return res
    }
```

##### 反序遍历

1. 取出头节点跟尾节点，反序取出

```js
    reverseTraversal(callback=(item)=>item){
        let res = []
        // 如果没有头节点，空链表返回 []
        if(!this.head) return res
        // 取出尾节点
        let curr = this.rear
        // 如果 curr = head 跳出
        while(curr != this.head){
            let prev = this.head
            // 从 head 开始查找 找到当前节点到前置节点
            while(prev.next != curr){
                prev = prev.next
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
```

#### 反转

1. 步骤跟单链表差不多，但是需要在后面处理尾指针的指向

```js
    // 反转链表
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
            // 1 2 3 -> 3 2 1 { 1, 2 } { 2, 3 } { 3, 1 } 
            // 把 next 指向 curr.next
            next = curr.next 
            // 1. curr = 1 { 1, 2 } next = 2 { 2, 3 } prev = null 
            // 2. curr = 2 { 2, 3 } next = 3 { 3, 1 } prev = { 1, null }
            // 3. curr = 3 { 3, 1 } next = { 1, null } prev = { 2, 1 }
            // 4. curr = 1 { 1, null } next = null prev = { 3, 2 }
            // curr.next 指向 prev 节点
            curr.next = prev 
            // 1. { 1, null }
            // 2. { 2, 1 }
            // 3. { 3, 2 }
            // 4. { 1, 3 }
            // prev 节点 指向 curr
            prev = curr 
            // 1. prev = { 1, null }
            // 2. prev = { 2, 1 }
            // 3. prev = { 3, 2 }
            // 4. prev = { 1, 3 }
            // 当前节点指向 next
            curr = next 
            // 1. curr = { 2, 3 }
            // 2. curr = { 3, 1 }
            // 3. curr = { 1, null }
            // 4. curr = null break
        }
        // 头指针指向尾指针的节点
        this.head = this.rear // { 1, 2 } => { 3, 2 }
        // 把尾指针指向 prev
        this.rear = prev // { 3, 1 } => { 1, 3 }
        return this
    }
```

#### 取出中间节点

```js
    // 取出中间节点
    findMid(){
        // 如果没有头节点，空链表返回null
        if(!this.head) return null
        // 设置 快指针 search 慢指针 mid  
        // search 步数为 mid 的两倍 
        let search = this.head
        let mid = this.head
        do {
            // 当 search.next == null 则说明到尾部 跳出循环
            if(search.next.next != this.head){
                // 如果 search.next.next 存在值，则继续行进
                search = search.next.next
                mid = mid.next
            }else{
                // 不存在则 快指针直接指向下一个节点
                search = search.next
            }
        } while (search.next != this.head);
        // 返回
        return mid
    }
```




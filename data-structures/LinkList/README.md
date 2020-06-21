#  链表（linked list）

链表是一种在物理上非连续、非顺序的数据结构，由若干节点组成。

使用链表结构可以克服数组链表需要预先知道数据大小的缺点，链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。

## 单向链表

单向链表的每个节点包含两个部分，data 跟 next，data用于存放数据，next 指向 下一个节点

```js
// 节点
var node_1 = { data: 1, next: null }
var node_2 = { data: 2, next: null }
var node_3 = { data: 3, next: null }
var node_4 = { data: 4, next: null }
// 变成一个单向链表
node_1.next = node_2
node_2.next = node_3
node_3.next = node_4
// {"data":1,"next":{"data":2,"next":{"data":3,"next":{"data":4,"next":null}}}}
```

### 初始化

```js
class LinkList {
    constructor(...arg){
        this.head = null // 头节点指针
        this.rear = null // 尾节点指针
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

链表的头节点前面插入

1. 新节点的next指向原头节点
2. 把头节点指针指向新节点

```js
1->2->3 // head = 1
插入0 // { data: 0, next: null }
0->1->2->3 // { data: 0, next: { data:1, ...} } head = 0
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
        // 头节点指针 指向 node
        this.head = node
        // 返回节点值
        return node.data
    }
```

##### 尾部插入 

从节点尾部插入新节点

1. 通过尾指针找到尾节点，尾节点的next指向新节点
2. 把尾指针指向新节点

```js
1->2->3 // rear = 3
插入4 // { data: 4, next: null }
1->2->3->4 // { ... { data: 3, next: { data:4, next: null } } } rear = 4
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
        // 尾节点指针 指向 node
        this.rear = node
        // 返回节点值
        return node.data
    }
```

##### 中间插入

从指定的某个值后插入

1. 找到目标节点，将目标节点的 next 取出
2. 将新节点的 next 指向目标节点的 next
3. 目标节点的 next 指向新节点

```js
1->3 // { data: 1, next: { data: 3, next: null }}
在 1 后插入 2 // { data: 2, next: null }
取出 1 
3	// 从 1.next 取出 3 
1->2 // 1.next -> 2
2->3 // 2.next -> 3
1->2->3 // 1.next -> 2.next -> 3
```

```js
    // 指定位置插入
    add(el, data){
        // 查找到要插入的节点
        let curr = this.contains(el)
        // 如果不存在 返回 null
        if(!curr) throw null
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

从头节点开始删除节点

1. 通过头指针取出头节点，取出头节点的 next
2. 头指针指向 头节点的 next
3. 释放原来的头节点

```js
1->2->3 //  head:1
2 // 取出 1.next head = 2
2->3 // 2.next -> 3.next
```

```js
		// 删除第一个节点
    removeHead(){
        // 取出头节点
        let temp = this.head
        // 如果头节点不存在，返回 null
        if(!temp) return null
        // 如果头节点的 next 不存在 尾节点置为 null
        if(!temp.next) this.rear = null
        // 指定新的 头指针指向
        this.head = temp.next
        // 清空 temp.next 的指向
        temp.next = null
        return temp.data
    }
```

##### 删除尾节点

从尾部删除节点

1. 取出尾指针指向的尾节点，通过头节点遍历找出尾节点的前置节点
2. 将尾指针指向尾节点的前置节点，next 指向 null
3. 释放原来的尾节点

```js
1->2->3 // head:1 rear:2
2 // 从 1 开始 找到 3 的前置节点 2 2.next = null
3 // 删除 3
1->2 // 1.next->2.next->null
```

````js
    removeRear(){
        // 先取出 头节点
        let curr = this.head
        while (curr){
            // 找出尾节点的前置节点
            if(curr.next == this.rear) break
            // 如果不是 curr 指向 curr.next
            curr = curr.next
        }
        // 取出尾节点
        let rear = this.rear
        // 把前置节点 curr 的 next 指向 null
        curr.next = null
        // 把尾指针指向 前置节点 curr
        this.rear = curr
        return rear.data
    }
````

##### 删除指定节点

删除指定的节点，断开前置节点的 next 指向，令前置节点的 next 指向删除节点的 next

1. 找到目标节点的前置节点 curr，取出待删除节点 node = curr.next
2. 前置节点 curr 的 next 指向 待删除节点 node node.next
3. 释放待删除节点

```js
1->2->3->4 // head:1 rear:4 删除3
2, 3 // 取出2
2->4 // 2.next = 3.next
1->2->4 // 1.next->2.next->4.next->null
```

```js
    remove(el){
        // 如果没有头节点，空链表返回 null
        if(!this.head) return null
        // 如果 删除值 等于头节点的值 直接删除头节点
        if(this.head.data === el){
            // 取出头节点
            let temp = this.head
            // 更改头指针指向
            this.head = this.head.next
            // 切断联系
            temp.next = null
            return temp.data
        }
        // 取出头节点 寻找 前置节点
        let curr = this.head
        while (curr && curr.next){
            if(curr.next.data == el) break
            curr = curr.next
        }
        // 如果找不到，返回null
        if(!curr.next) return null
        // 如果需删除的是尾节点
        if(curr.next == this.rear){
            // 改变尾指针指向
            this.rear = curr
        }
        // 取出删除节点
        let node = curr.next
        // 前置节点的 next 指向 删除节点的 next
        curr.next = node.next
        return node.data
    }
```

#### 查找

1. 定位到头节点
2. 根据头节点的next往下遍历比对
3. 找到就返回

```js
1->2->3->4 // 查找3 head:1
1 // 从1开始查找 不是目标 接着走 1.next 
2 // 2.next 
3 // 找到，返回
```

```js
    // 搜索方法
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

##### 正向遍历

1. 找到头节点
2. 查找每一个值，当curr为 null 跳出循环

```js
1->2->3 // head:1
1 //
2 //
3 //
null // 跳出
```

```js
    // 遍历方法
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

##### 反向遍历

1. 找到头节点，找到尾节点
2. 每次从头节点查找到前置节点

```js
1->2->3 // head:1
3 //
2 //
等于 head // 跳出
1 //
```

```js
    // 反向遍历
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

1. 取出头尾节点，定义 next = null prev = null curr = head
2. 从 curr 开始循环，取出 curr.next，next = curr.next
3. curr.next 指向 prev
4. prev = curr
5. curr = next
6. 回到第二步

```js
1->2->3 // head=1 rear=3
1 2->3 // 1.next = null 
2->1 3
3->2->1
```

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
            // 1 2 3
            // 把 next 指向 curr.next
            next = curr.next 
            // 1. curr = 1 { 1, 2 } next = 2 { 2, 3 } prev = null 
            // 2. curr = { 2, 3 } next = { 3, null } prev = { 1,null }
            // 3. curr = { 3, null } next = null prev = { 2, 1 }
            // curr.next 指向 prev 节点
            curr.next = prev 
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
        return this
    }
```

#### 取出中间节点

取出中间节点一般通过快慢指针来实现

1. search 指针 search.next.next
2. mid 指针 mid.next
3. search 相当于 走两步，mid 走一步，当 search 走完的时候，mid 则刚好在中间

```js
1->2->3->4->5 // search = mid = 1
1 3 // mid = 1 search = 3
2 4 // mid = 2 search = 4
3 5 // mid = 3 search = 5 到达尾部，跳出循环 返回 mid
```

```js
    // 取出中间节点
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

### 时间复杂度

| Access | Search | Insertion | Deletion |
| ------ | ------ | --------- | -------- |
| O(n)   | O(n)   | O(1)      | O(1)     |

### 空间复杂度

O(n)


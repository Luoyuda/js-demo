#  队列（Queue）

队列用于存储按顺序排列的数据，遵循 先进先出(FIFO，First-In-First-Out) 的原则

## 普通队列

普通队列通过 enqueue 入队，通过 dequeue 出队，一般使用链表进行实现

### 初始化

```js
class Queue {
    constructor(){
        this.linkList = new LinkList()
    }
}
```

### 基本操作

#### 入队操作

利用链表的尾部插入的方式，进行入队操作

```js
1->2->3 // head rear
1->2->3->4 // 4 入队
```

```js
    enqueue(data){
        return this.linkList.append(data)
    }
```

#### 出队操作

利用链表删除头部的方法，进行出队操作

```js
1->2->3 // head rear
2->3 // 1 出队
```

```js
    dequeue(){
        return this.linkList.removeHead()
    }
```

#### 查找队首

直接访问链表结构的头指针

```js
    front(){
        return this.linkList.head && this.linkList.head.data || null
    }
```

#### 查找队尾

直接访问链表结构的尾指针

```js
    back(){
        return this.linkList.rear && this.linkList.rear.data || null
    }
```

#### 是否空队列

判断头指针是否有值，如果没有值就是空队列

```js
    isEmpty(){
        return !this.linkList.head
    }
```
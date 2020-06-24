#  栈（Stack）

栈（stack）又名堆栈，它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。

## 普通栈

通过数组顺序结构来实现栈

### 初始化

```js
class Stack {
    constructor(){
        this.linkList = new Array()
    }
}
```

### 入栈

```js
    push(data){
        let curr = this.list.push(data)
        return curr
    }
```

### 出栈

```js
    pop(){
        if(this.isEmpty()) return null
        let curr = this.list.pop()
        return curr
    }
```

### 检查是否空栈

```js
    isEmpty(){
        return !this.list.length
    }
```

### 获取栈顶元素

```js
    peek(){
        return this.top() >= 0 && this.list[this.top()] || null
    }
```

### 获取栈内元素个数

```js
    length(){
        return this.list.length
    }
```

### 获取栈顶位置

```js
    top(){
        return this.length() - 1
    }
```

## 链栈

### 初始化

```js
class StackLinked {
    constructor(){
        this.linkList = new LinkList()
        this.length = 0 // 获取栈内元素个数
        this.top = 0 // 获取栈顶位置
    }
}
```

### 入栈

```js
    push(data){
        let curr = this.linkList.prepend(data)
        ++this.length
        ++this.top
        return curr
    }
```

### 出栈

```js
    pop(){
        if(this.isEmpty()) return null
        let curr = this.linkList.removeHead()
        --this.length
        --this.top
        return curr
    }
```

### 检查是否空栈

```js
    isEmpty(){
        return !this.linkList.head
    }
```

### 获取栈顶元素

```js
    peek(){
        return this.linkList.head && this.linkList.head.data || null
    }
```


# 二叉树

二叉树是 n(n>=0) 个节点的有限集合，该集合或者为空集(空二叉树)，或者一由一个根节点和两颗互不相交的、分别成为根节点的左子树和右子树的二叉树组成

## 特点

1. 每个节点最多由两颗子树，所以二叉树不存在度大于2的节点
2. 左子树根右子树是有顺序的，次序不能随意颠倒
3. 即使树中某个节点只有一棵子树，也要区分是左子树还是右子树

## 形态

1. 空二叉树
2. 只有一个根节点
3. 根节点只有左子树
4. 根节点只有右子树
5. 根节点既有左子树也有右子树

## 特殊的二叉树

1. 斜树
   1. 左斜树
   2. 右斜树
2. 满二叉树
   1. 如果所有的分支节点都有左子树根右子树，并且所有的叶子结点都在同一层
3. 完全二叉树
   1. 对一个具有n个节点的二叉树进行层序编号，刚好编号为i的节点与同样深度的满二叉树中编号i的节点的位置完全相同
   2. 叶子节点只能出现在最下两层
   3. 最下层的叶子节点一定集中在左边
   4. 倒数二层如果有叶子结点，一定都在右边
   5. 如果节点度为1，则该节点只有左孩子，不存在右子树
   6. 同样节点数的二叉树，完全二叉树的深度最小

## 性质

1. 第 i 层上至多有 2^i-1 个节点 （ i>=1 ）
2. 深度为 k 的二叉树最多有 2^k - 1 个节点 （ k>=1 ）
3. 终端节点 n0 = （度为2的节点数）n2 + 1
4. 具有N个节点的完全二叉树的深度为 log2N + 1
5. 具有N个节点的完全二叉树按层序编号，如果 i 为 1则节点为根节点 如果 2i > n 则节点 i 没有左孩子 如果 2i + 1 > n 则 i 没有右孩子

## 树的遍历

### 深度优先遍历

#### 前序遍历

根节点 -> 左子树 -> 右子树

若二叉树为空，则空操作返回，否则先访问根节点，然后遍历左子树，在遍历右子树

```js
// 前序遍历
const preOrderTraversal = function(treeNode, res=[]) {
    if(!treeNode) return []
    // 取中间节点
    res.push(treeNode.data)
    // 再取左子树
    preOrderTraversal(treeNode.leftChild, res)
    // 最后右子树
    preOrderTraversal(treeNode.rightChild, res)
    return res
}
// 使用栈实现前序遍历
const preOrderTraversalByStack = function(treeNode) {
    if(!treeNode) return []
    let stack = []
    let node = treeNode
    let res = []
    while (node !== null || stack.length > 0) {
        while (node !== null){
            stack.push(node)
            res.push(node.data)
            node = node.leftChild
        }
        if(stack.length > 0) {
            node = stack.pop()
            node = node.rightChild
        }
    }
    return res
}
```

#### 中序遍历

左子树 -> 根节点 -> 右子树

若二叉树为空，则空操作返回，否则先访问左子树，然后遍历根节点，在遍历右子树

```js
// 中序遍历
const inOrderTraversal = function(treeNode, res=[]) {
    if(!treeNode) return []
    // 取左子树
    inOrderTraversal(treeNode.leftChild, res)
    // 取中间节点
    res.push(treeNode.data)
    // 最后取右子树
    inOrderTraversal(treeNode.rightChild, res)
    return res
}
// 使用栈实现中序遍历
const inOrderTraversalByStack = function(treeNode) {
    if(!treeNode) return []
    let stack = []
    let node = treeNode
    let res = []
    while (node !== null || stack.length > 0) {
        while (node !== null){
            stack.push(node)
            node = node.leftChild
        }
        if(stack.length > 0) {
            node = stack.pop()
            res.push(node.data)
            node = node.rightChild
        }
    }
    return res
}
```

#### 后序遍历

左子树 -> 右子树 -> 根节点

若二叉树为空，则空操作返回，否则先访问左子树，然后遍历右子树，在遍历根节点

```js
// 后序遍历
const postOrderTraversal = function(treeNode, res=[]) {
    if(!treeNode) return []
    // 取左子树
    postOrderTraversal(treeNode.leftChild, res)
    // 右子树
    postOrderTraversal(treeNode.rightChild, res)
    // 最后取中间节点
    res.push(treeNode.data)
    return res
}
// 使用栈实现后序遍历
const postOrderTraversalByStack = function(treeNode) {
    if(!treeNode) return []
    let stack = [treeNode]
    let curr = treeNode
    let last = treeNode
    let res = []
    while(stack.length > 0){
        curr = stack[stack.length - 1]
        if(curr.leftChild != null && last != curr.leftChild && last != curr.rightChild){
            stack.push(curr.leftChild)
        }else if(curr.rightChild != null && last != curr.rightChild){
            stack.push(curr.rightChild)
        }else{
            stack.pop()
            res.push(curr.data)
            last = curr
        }
    }
    return res
}
```

### 广度优先遍历

#### 层序遍历

第一层 -> 第二层 -> 第三层

若二叉树为空，则空操作返回，否则先访问树的第一层，然后从上而下组层遍历，从左往右

```js
// 层序遍历
const levelOrderTraversal = function(treeNode) {
    if(!treeNode) return []
    const queue = new Queue()
    queue.enqueue(treeNode)
    let res = []
    while (!queue.isEmpty()) {
        let node = queue.dequeue()
        res.push(node.data)
        if(node.leftChild != null) {
            queue.enqueue(node.leftChild)
        }
        if(node.rightChild != null) {
            queue.enqueue(node.rightChild)
        }
    }
    return res
}
```

### 生成树

```js
// 树节点
const TreeNode = function(data) {
    this.data = data
    this.leftChild = null
    this.rightChild = null
}
// 使用前序顺序生成
const createBinaryTree = function(list){
    let node = null
    if(list == null || list.length == 0) return null 
    let data = list.shift()
    if(data) {
        node = new TreeNode(data)
        node.leftChild = createBinaryTree(list, node.leftChild)
        node.rightChild = createBinaryTree(list, node.rightChild)
    }
    return node
}
```
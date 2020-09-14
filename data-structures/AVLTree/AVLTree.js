
// 层序遍历
const levelOrderTraversal = function(treeNode) {
    if(!treeNode) return []
    const queue = []
    queue.push(treeNode)
    let res = []
    while (queue.length) {
        let node = queue.shift()
        res.push({value:node.value, bf: node.bf})
        if(node.left != null) {
            queue.push(node.left)
        }
        if(node.right != null) {
            queue.push(node.right)
        }
    }
    return res
}

// 中序遍历
const inOrderTraversal = function(treeNode, res=[]) {
    if(!treeNode) return []
    // 取左子树
    inOrderTraversal(treeNode.left, res)
    // 取中间节点
    res.push(treeNode.value)
    // 最后取右子树
    inOrderTraversal(treeNode.right, res)
    return res
}

class AVLTree {
    constructor(){
        this.root = null
        this.LH = 1
        this.RH = -1
        this.EH = 0
        this.taller = false
    }
    node(value, left = null, right = null) {
        return {
            value,
            bf:0,
            left,
            right
        }
    }
    deleteNode(node){
        console.log(`node`)
        console.log(node)
        if(node.right == null){
            // 如果删除的节点没有右孩子
            let L = node.left
            // 如果也没有左孩子
            if(!L) return null
            // 把左孩子替换原来的节点
            let left = L.left
            let right = L.right
            node.value = L.value
            node.right = right
            node.left = left
        }else if(node.left == null){
            // 如果删除的节点没有左孩子
            let R = node.right
            // 如果也没有右孩子
            if(!R) return null
            // 把右孩子替换原来的节点
            let left = R.left
            let right = R.right
            node.value = R.value
            node.right = right
            node.left = left
        }else{
            // 找到待删除节点左子树中最大的节点
            let R = node.left
            let P = node
            while(R.right){
                P = R
                R = R.right
            }
            // console.log(P)
            // 取出右节点的左子树
            let left = R.left
            if(node.left == R){
                // 如果 node 的 left就是最大的节点 node.left = R.left
                node.left = R.left
            }else{
                // console.log(P)
                // 如果不是 node.left.right 指向右节点的左子树
                P.right = left
            }
            // 替换 node 节点的值
            node.value = R.value
        }
        return node
    }
    delete(value, T=this.root){
        if(!T) return null // 找到不到直接返回null
        if(value == T.value){
            if(T == this.root){
                let node = this.deleteNode(T)
                this.root = node
                let curr = node.left
                let queue = [curr]
                // console.log(curr)
                while(curr.right){
                    queue.push(curr)
                    curr = curr.right
                }
                console.log(queue)
                this.checkDeleteRightBalance(curr)
                while(queue.length && this.short){
                    curr = queue.pop()
                    this.checkDeleteRightBalance(curr)
                }
                return 
            }
            // 找到节点 返回
            this.remove = true
            this.short = false
        }else if(value < T.value){
            if(T.left){
                // 递归找到删除
                this.delete(value, T.left)
                if(this.remove){
                    // 找到节点，删除
                    let node = this.deleteNode(T.left)
                    T.left = node
                    this.remove = false
                    // 检查删除完的节点的平衡因子
                    this.checkDeleteLeftBalance(T.left)
                }
                if(this.short){
                    // 如果树节点变矮了，需要检查当前节点的平衡
                    this.checkDeleteLeftBalance(T)
                }
            }
        }else{
            if(T.right){
                // 递归找到删除
                this.delete(value, T.right)
                if(this.remove){
                    // 找到节点，删除
                    let node = this.deleteNode(T.right)
                    T.right = node
                    this.remove = false
                    // 检查删除完的节点的平衡因子
                    this.checkDeleteRightBalance(T.right)
                }
                if(this.short){
                    // 如果树节点变矮了，需要检查当前节点的平衡
                    this.checkDeleteRightBalance(T)
                }
            }
        }
    }
    // 检查删除后的平衡
    checkDeleteLeftBalance(T){
        if(!T) return this.short = true
        let { LH, RH, EH } = this
        switch (T.bf) {
            case LH:
                T.bf = EH
                this.short = true
            break
            case EH:
                T.bf = RH
                this.short = false
            break
            case RH:
                // console.log(T)
                if(!T.left && !T.right) {
                    T.bf = EH
                    this.short = true
                    return
                }
                let R = T.right
                if(!R.left && !R.right) {
                    R.bf = EH
                    T.bf = EH
                    this.short = true
                    return
                }
                let bf = R.bf
                switch(bf){
                    case LH:
                        T.bf = EH
                        R.bf = EH
                        this.checkDeleteLeftBalance(R.left)
                        this.rightRotate(R)
                    break
                    case EH:
                        R.bf = T.bf = LH
                    break
                    case RH:
                        T.bf = EH
                        R.bf = EH
                    break
                }
                console.log(`T---`)
                this.leftRotate(T)
                console.log(T.left)
                switch(bf){
                    case LH:
                        T.right.bf = EH
                    break
                    case EH:
                        T.right.bf = LH
                    break
                    case RH:
                        T.right.bf = LH
                    break
                }
                // this.leftRotate(T)
                T.left.bf = LH
                // // console.log(T)
                // T.right.bf = EH
                // this.checkDeleteLeftBalance(T.right)
                this.short = false
            break
        }
    }
    checkDeleteRightBalance(T){
        if(!T) return this.short = true
        let { LH, RH, EH } = this
        console.log(T)
        switch (T.bf) {
            case LH:
                if(!T.left && !T.right) {
                    T.bf = EH
                    this.short = true
                    return
                }
                let L = T.left
                if(!L.left && !L.right) {
                    L.bf = EH
                    T.bf = EH
                    this.short = true
                    return
                }
                let bf = L.bf
                switch(bf){
                    case LH:
                        T.bf = EH
                        L.bf = EH
                    break
                    case EH:
                        L.bf = T.bf = RH
                    break
                    case RH:
                        this.checkDeleteLeftBalance(L.right)
                        this.leftRotate(L)
                        T.bf = EH
                        L.bf = EH
                    break
                }
                this.rightRotate(T)
                console.log(`bf = ${bf} T.value = ${T.value} L.value = ${L.value}`)
                switch(bf){
                    case LH:
                        T.right.bf = EH
                    break
                    case EH:
                        T.right.bf = RH
                    break
                    case RH:
                        T.right.bf = RH
                    break
                }
                // T.right.bf = RH
                // T.right.bf = LH
                // this.checkDeleteLeftBalance(T.right)
                this.short = false
            break
            case EH:
                T.bf = LH
                this.short = false
            break
            case RH:
                T.bf = EH
                this.short = true
            break
        }
    }
    // 插入
    insert(value, T=this.root){
        if(!T) {
            const node = this.node(value)
            T = node
            this.root = node
            this.taller = true
            return node
        }
        if(value == T.value){
            this.taller = false
            return null
        }else if(value < T.value){
            if(T.left){
                // 递归调用
                this.insert(value, T.left)
                if(this.taller){
                    // 如果树长高了，检查节点是否平衡
                    this.checkLeftBalance(T)
                }
            }else{
                T.left = this.node(value)
                // 检查节点是否平衡
                this.checkLeftBalance(T)
            }
        }else{
            if(T.right){
                // 递归调用
                this.insert(value, T.right)
                if(this.taller){
                    // 如果树长高了，检查节点是否平衡
                    this.checkRightBalance(T)
                }
            }else{
                T.right = this.node(value)
                // 检查节点是否平衡
                this.checkRightBalance(T)
            }
        }
    }
    // 检查左节点是否平衡
    checkLeftBalance(T){
        let { LH, RH, EH } = this
        // 检查节点的bf
        switch (T.bf) {
            case LH:
                // bf = 1 需要进行左平衡
                this.leftBalance(T)
            break
            case EH:
                // bf = 0 树长高了 bf = 1
                T.bf = LH
                this.taller = true
            break
            case RH:
                // bf = -1 插入节点后 bf = 0 平衡了 树并没有长高
                T.bf = EH
                this.taller = false
            break
        }
    }
    // 检查右节点是否平衡
    checkRightBalance(T){
        let { LH, RH, EH } = this
        // 检查节点的bf
        switch (T.bf) {
            case LH:
                // bf = 1 插入节点后 bf = 0 平衡了 树也没有长高
                T.bf = EH
                this.taller = false
            break
            case EH:
                // bf = 0 插入节点后 bf = -1 树长高了
                T.bf = RH
                this.taller = true
            break
            case RH:
                // bf = -1 则需要进行左平衡
                this.rightBalance(T)
                this.taller = false
            break
        }
    }
    // 右平衡
    rightBalance(T){
        let R = T.right
        let Rl = null
        let { LH, RH, EH } = this
        switch (R.bf) {
            case RH:
                // 如果 R.bf 的平衡因子是 -1 
                // 则要将 T 进行左旋转
                // T 节点 跟 R 节点 的平衡因子改为 0
                T.bf = R.bf = EH
                this.leftRotate(T)
            break;
            case LH:
                // 如果 R.bf 是 1
                // 要接着判断 R.left.bf 的情况
                Rl = R.left
                switch (Rl.bf) {
                    case LH:
                        // 如果 R.left.bf = 1 
                        // 则右旋转后，R.bf = 0
                        // 则左旋转后，T.bf = -1
                        T.bf = RH
                        R.bf = EH
                    break;
                    case EH:
                        // 如果 R.left.bf = 0
                        // 则旋转后平衡因子都为 0 
                        T.bf = R.bf = EH
                    break;
                    case RH:
                        // 如果 R.left.bf = -1
                        // 则右旋转后，R.bf = -1
                        // 则左旋转后，T.bf = 0
                        T.bf = EH
                        R.bf = RH
                    break;
                }
                Rl.bf = EH
                // 先把 R 进行右旋转
                this.rightRotate(T.right)
                // 再对 T 进行左旋转
                this.leftRotate(T)
            break;
        }
    }
    // 左平衡
    leftBalance(T){
        let L = T.left
        let Lr = null
        let { LH, RH, EH } = this
        switch (L.bf) {
            case LH:
                // 如果 L.bf = 1 插入后的 bf 应该为 2
                // 则需要进行 右旋转，如何把 T.bf 和 L.bf 置为 0
                T.bf = L.bf = EH
                this.rightRotate(T)
            break;
            case RH:
                // 如果 L.bf = -1
                // 需要接着往下判断 L.right.bf
                Lr = L.right
                switch (Lr.bf) {
                    case LH:
                        // 如果 Lr.bf = -1
                        // 左旋转 L 后 L.bf = 0
                        // 右旋转 T 后 T.bf = 1
                        L.bf = EH
                        T.bf = RH
                    break;
                    case EH:
                        // 如果 Lr.bf = 0
                        // 左旋转 L 后 L.bf = 0
                        // 右旋转 T 后 T.bf = 0
                        T.bf = L.bf = EH
                    break;
                    case RH:
                        // 如果 Lr.bf = -1
                        // 左旋转 L 后 L.bf = 1
                        // 右旋转 T 后 T.bf = 0
                        L.bf = LH
                        T.bf = EH
                    break;
                }
                Lr.bf = EH
                this.leftRotate(T.left)
                this.rightRotate(T)
            break;
        }
    }
    // 右旋转
    rightRotate(p){
        // 取出 p.left = L
        let L = p.left
        if(!L) return
        // 缓存 L 跟 p 的值
        let LValue = L.value
        let pValue = p.value
        // 令 p.left 直接指向 L.left
        p.left = L.left
        // 令 L.left 指向 L.right
        L.left = L.right
        // 令 L.right 指向 p.right
        L.right = p.right
        // 令 p.right 指向 L
        p.right = L
        // 交换两个节点的值
        p.value = LValue
        L.value = pValue
    }
    // 左旋转
    leftRotate(p){
        // 取出 p.right = R
        let R = p.right
        if(!R) return
        // console.log(R)
        // 缓存 R 跟 p 的值
        let RValue = R.value
        let pValue = p.value
        // 令 p.right 指向 R.right
        p.right = R.right
        // 令 R.right 指向 R.left
        R.right = R.left
        // 令 R.left 指向 p.left
        R.left = p.left
        // 令 p.left 指向 R
        p.left = R
        // 交换两个节点的值
        p.value = RValue
        R.value = pValue
    }
    contains(value, node=this.root){
        if(!node) return null
        if(value == node.value) return node
        if(value < node.value) return this.contains(value, node.left)
        if(value > node.value) return this.contains(value, node.right)
    }
}
const avlTree = new AVLTree()
// avlTree.insert(3)
// avlTree.insert(2)
// avlTree.insert(1)
// avlTree.insert(-1)
// avlTree.insert(-2)
// avlTree.insert(-3)
// avlTree.insert(-4)
// avlTree.insert(-5)
// avlTree.insert(0)
// avlTree.insert(-6)
// avlTree.insert(-5)
// avlTree.insert(-4)
// avlTree.insert(-3)
// avlTree.insert(-2)
// avlTree.insert(-1)
// avlTree.insert(1)
// avlTree.insert(2)
// avlTree.insert(3)
// avlTree.insert(4)
// avlTree.insert(-2)
avlTree.insert(3)
avlTree.insert(2)
avlTree.insert(2.5)
avlTree.insert(1)
avlTree.insert(4)
avlTree.insert(5)
avlTree.insert(6)
avlTree.insert(7)
avlTree.insert(10)
avlTree.insert(9)
avlTree.insert(8)

// avlTree.insert(10)
// avlTree.insert(5)
// avlTree.insert(7)
// avlTree.insert(0)
// avlTree.insert(6)
// avlTree.insert(8)
// avlTree.insert(3)
// avlTree.delete(2.5)
// avlTree.insert(2.3)
// avlTree.delete(1)
// avlTree.delete(2)
// avlTree.delete(2.3)
// // avlTree.insert(1)
// avlTree.delete(5)
// // avlTree.delete(6)
// // avlTree.delete(2)
// avlTree.delete(3)
// // avlTree.delete(2)
// // avlTree.delete(4)
// // avlTree.delete(9)
// avlTree.delete(8)
// avlTree.insert(6.5)
// avlTree.insert(6.2)
// avlTree.delete(10)
// avlTree.delete(9)
// avlTree.delete(6)
avlTree.delete(10)
// for (let index = 0; index < 1000; index++) {
//     avlTree.insert(parseInt(Math.random() * 1000))
// }
// console.log(avlTree.root.right)
let curr = avlTree.root
// 层序遍历
// const levelOrderTraversal2 = function(treeNode) {
//     if(!treeNode) return []
//     const queue = []
//     queue.push(treeNode)
//     let res = []
//     while (queue.length) {
//         let node = queue.shift()
//         // console.log(node)
//         res.push(node && node.value || null)
//         // if(node.left != null) {
//             node && queue.push(node.left)
//         // }
//         // if(node.right != null) {
//             node && queue.push(node.right)
//         // }
//     }
//     return res
// }
// var balanceBST = function(roots) {
//     if(!roots) return []
//     let avlTree = new AVLTree()
//     for (let index = 0; index < roots.length; index++) {
//         const item = roots[index];
//         if(item){
//             avlTree.insert(item)
//         }
//     }
//     return avlTree.root
// };
// console.log(balanceBST())
// console.log(avlTree.contains(100))
console.log(levelOrderTraversal(avlTree.root))
console.log(avlTree.root.left)
console.log(avlTree.root.right)
var balance = function(node) {
    if(!node) return null
    let left = balance(node.left)
    let right = balance(node.right)
    if(!left && !right) {
        node.bf = 0
    }else if(!right && left) {
        node.bf = 1
    }else if(!left && right) {
        node.bf = -1
    }else if(left.bf == right.bf || right.bf == Math.abs(left.bf)){
        node.bf = 0
    }else if(left.bf == 0) {
        if(left.left && left.right){
            node.bf = 0
        }else{
            node.bf = right.bf
        }
    }else if(right.bf == 0) {
        if(right.left && right.right){
            node.bf = 0
        }else{
            node.bf = left.bf
        }
    }
    console.log(right)
    console.log(node.value, node.bf)
    return node
}
balance(avlTree.root)
console.log(levelOrderTraversal(avlTree.root))
// let res = inOrderTraversal(avlTree.root.left)
// console.log(res.toString())
// console.log(res.sort((a, b) => a < b ? -1 : 1).toString())
// console.log(res.toString() === res.sort((a, b) => a < b ? -1 : 1).toString())
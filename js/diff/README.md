![virtual+dom.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/152f47e169284ba6a4afa7b3c894e0ec~tplv-k3u1fbpfcp-watermark.image)

### 辅助方法

```js
// 更新数据
function patch(o, n){
    o.val = n.val
}
// 模拟dom节点移动
function insertBefore(prev, node, container, step = 0){
    if(prev === null){
        remove(node, container)
        container.push(node) 
        return container
    }
    if(prev && prev.key === node.key) return container
    let idx = 0
    for (let i = 0; i < container.length; i++) {
        const n = container[i];
        if(n.key === node.key){
            [ node ] = container.splice(i, 1)
            break
        }
    }
    // console.log(prev, node, container)
    for (let i = 0; i < container.length; i++) {
        const n = container[i];
        if(prev && n.key === prev.key){
            idx = i + step
            break
        }
    }
    // console.log(idx)
    // console.log(container.slice(0, idx))
    // console.log(container.slice(idx))
    return [
        ...container.slice(0, idx),
        node,
        ...container.slice(idx)
    ]
}
// 删除某元素方法
function remove(node, container){
    for (let i = 0; i < container.length; i++) {
        const n = container[i];
        if(node && n.key === node.key){
            container.splice(i, 1)
            break
        }
    }
    return container
}
// 求最长上升子序列
function lis(arr) {
    const p = arr.slice()
    const result = [0]
    let i
    let j
    let u
    let v
    let c
    const len = arr.length
    for (i = 0; i < len; i++) {
        const arrI = arr[i]
        if (arrI !== 0) {
            j = result[result.length - 1]
            if (arr[j] < arrI) {
                p[i] = j
                result.push(i)
                continue
            }
            u = 0
            v = result.length - 1
            while (u < v) {
                c = ((u + v) / 2) | 0
                if (arr[result[c]] < arrI) {
                    u = c + 1
                } else {
                    v = c
                }
            }
            if (arrI < arr[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1]
            }
                result[u] = i
            }
        }
    }
    u = result.length
    v = result[u - 1]
    while (u-- > 0) {
        result[u] = v
        v = p[v]
    }
    return result
}
```

## react

### 算法流程

1. 遍历 `next` 取出 `nextNode`，位置 `i`
2. 在 `prev` 中查找 `nextNode.key` 一致的节点，如果没找到，则创建后插入到 `next[i - 1]` 之后
3. 如果找到节点，位置为 `j` ，更新节点，判断 `j` 是否小于 `lastIdx（lastIdx = 0）`，如果不小于，则 `lastIdx = j`
4. 如果小于 `lastIdx` 则将节点插入到 `next[i - 1]` 之后
5. 遍历 `next` 结束后，遍历 `prev` 如果节点不在 `next` 中，则删除节点

### 代码实现

```js
// react
function diff1(prev, next){
    let container = prev.slice()
    let nextIndex = {}
    let prevIndex = {}
    let prevLength = prev.length
    let nextLength = next.length
    let lastIdx = 0
    // 生成映射表，方便查找
    for(let i = 0; i < prevLength; i++) prevIndex[prev[i].key] = i
    for(let i = 0; i < nextLength; i++){
        // 1. 遍历 next 取出 nextNode，位置 i
        let nextNode = next[i]
        nextIndex[nextNode.key] = i
        // 3. 如果找到节点，位置为 j ，更新节点，判断 j 是否小于 lastIdx（lastIdx = 0），如果不小于，则 lastIdx = j
        let j = prevIndex[nextNode.key]
        if(j !== undefined){
            patch(prev[j], nextNode)
            // 4. 如果小于 lastIdx 则将节点插入到 next[i - 1] 之后
            if(j < lastIdx){
                container = insertBefore(next[i - 1], nextNode, container, 1)
            }else{
                lastIdx = j
            }
        }else{
            // 2. 在 prev 中查找 nextNode.key 一致的节点，如果没找到，则创建后插入到 next[i - 1] 之后
            container = insertBefore(next[i - 1], nextNode, container, 1)
        }
    }
    // 5. 遍历 next 结束后，遍历 prev 如果节点不在 next 中，则删除节点
    for(let p of prev){
        if(nextIndex[p.key] === undefined){
            remove(p, container)
        }
    }
    return container
}
```

### 执行流程

> 第 1 行表示模拟 prev 数组 (一份拷贝)，点状表示移动过的节点，虚线表示更新过的节点

> 第 2 行表示旧的 prev 数组，绿色表示操作过，红色表示当前遍历的值

> 第 3 行表示新的 next 数组

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3933160e2c014a65a38fb08e8f2f4af5~tplv-k3u1fbpfcp-watermark.image)

按照 `react` `diff` 的流程来模拟下步骤

遍历 `prev` 生成一份 `key` 与 `index` 的映射表 `prevIndex`


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64cba92a2de7406593c7a23c832968f6~tplv-k3u1fbpfcp-watermark.image)

遍历 `next` 数组，`i = 0` `lastIdx = 0` 通过 `prevIndex[key]` 得出 `j = 1` `j` 大于 `lastIdx`，`lastIdx = j = 1` 只执行更新操作不执行移动


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37284df3c0594f0fafdc58f24d51e040~tplv-k3u1fbpfcp-watermark.image)

`i = 1` `lastIdx = 1` 通过 `prevIndex[key]` 得出 `j = 0` `j` 小于 `lastIdx` 所以执行更新操作和移动操作，需要把 `a` 移动到 `next[i - 1].next` 也就是 `c` 节点之前


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82be23adae8d4b89bfc1acaac3fea900~tplv-k3u1fbpfcp-watermark.image)

`i = 2` `lastIdx = 1` 通过 `prevIndex[key]` 得出 `j = 3` `j` 大于 `lastIdx`，`lastIdx = j = 3` 执行更新操作


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39164c4e68dc469ebdd210298cb671a5~tplv-k3u1fbpfcp-watermark.image)

`i = 3` `lastIdx = 3` 通过 `prevIndex[key]` 得出 `j = 2` `j` 小于 `lastIdx` 所以执行更新操作和移动操作，需要把 `c` 移动到 `next[i - 1].next` 也就是 `f` 节点之前


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2804da9f494a448ea7b48eae12c1c5bc~tplv-k3u1fbpfcp-watermark.image)

`i = 4` `lastIdx = 3` 通过 `prevIndex[key]` 找不到对应的节点位置，所以这里需要新增一个节点 `e`，把 `e` 移动到 `next[i - 1].next` 也就是 `f` 节点之前

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c106238d136b4b5682418135601c9bf7~tplv-k3u1fbpfcp-watermark.image)

遍历完成后，我们需要重新遍历一遍 `prev` 然后通过 `nextIndex` 查找得出 `f` 节点已经不存在于新的节点数组之中，需要执行删除操作移除 `f` 节点

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2063eebd91f43d8805786f237240511~tplv-k3u1fbpfcp-watermark.image)

## vue2

### 算法流程

1. 声明4个变量 `prevStart`，`prevEnd`，`nextStart`，`nextEnd` 取出 `prevStartNode`， `prevEndNode`，`nextStartNode`，`nextEndNode`
2. 循环，条件不满足 `prevStart <= prevEnd && nextStart <= nextEnd` 跳出循环
3. `prevStartNode` 或 `prevEndNode` 是否存在，不存在则 `prevStart++`，`prevEnd--`，回到 2
4. `prevStartNode.key == nextStartNode.key`，相等则更新节点，`prevStart++ nextStart++`，回到2
5. `prevEndNode.key == nextEndNode.key`，相等则更新节点，`prevEnd-- nextEnd--`， 回到2
6. `prevStartNode.key == nextEndNode.key`，相等则更新节点， 将 `prevStartNode` 插入到 `prevEndNode.next` 之前，`prevStart++ nextEnd--`，回到 2 
7. `prevEndNode.key == nextStartNode.key`，相等则更新节点，将 `prevEndNode` 插入到 `prevStartNode` 之前，`prevEnd-- nextStart++`，回到 2
8. 如果全都不相等，查找 `prev`，看是否存在一个与 `nextStartNode.key` 相同的节点，有则更新，没有则创建一个新的节点，将其插入到 `prevStartNode` 之前，`nextStart++，prev[j]`标记为操作过，回到2
9. 循环结束后 如果 `prevEnd < prevStart` 证明存在新节点未处理，从 `nextStart` 开始 插入节点，直到 `newEnd`，每次节点都插入在 `next[newEnd + 1]` 之前
10. 如果 `nextEnd < newStart` 证明存在节点被移除，未处理，从 `prevStart` 开始 移除节点，直到 `prevEnd`

### 代码实现

```js
// vue2
function diff2(prev, next){
    let container = prev.slice()
    // 1. 声明4个变量 prevStart，prevEnd，nextStart，nextEnd 取出 prevStartNode， prevEndNode，nextStartNode，nextEndNode
    let prevStart = 0
    let nextStart = 0
    let prevEnd = prev.length - 1
    let nextEnd = next.length - 1
    let prevStartNode = prev[prevStart]
    let prevEndNode = prev[prevEnd]
    let nextStartNode = next[nextStart]
    let nextEndNode = next[nextEnd]
    let prevIndex = {}
    for(let i = 0; i < prev.length; i++) prevIndex[prev[i].key] = i
    // 2. 循环，条件不满足 prevStart <= prevEnd && nextStart <= nextEnd 跳出循环
    while(prevStart <= prevEnd && nextStart <= nextEnd){
        // 3. prevStartNode 或 prevEndNode 是否存在，不存在则 prevStart++，prevEnd--，回到 2
        if(!prevStartNode){
            prevStartNode = prev[++prevStart]
        }else if(!prevEndNode){
            prevEndNode = prev[--prevEnd]
        }else if(prevStartNode.key === nextStartNode.key){
            // 4. prevStartNode.key == nextStartNode.key，相等则更新节点， prevStart++ nextStart++，回到2
            patch(prevStartNode, nextStartNode)
            prevStartNode = prev[++prevStart]
            nextStartNode = next[++nextStart]
        }else if(prevEndNode.key === nextEndNode.key){
            // 5. prevEndNode.key == nextEndNode.key，相等则更新节点， prevEnd-- nextEnd --， 回到2
            patch(prevEndNode, nextEndNode)
            prevEndNode = prev[--prevEnd]
            nextEndNode = next[--nextEnd]
        }else if(prevStartNode.key === nextEndNode.key){
            // 6. prevStartNode.key == nextEndNode.key，相等则更新节点， 将 prevStartNode 插入到 prevEndNode.next 之前，prevStart++ nextEnd--，回到 2 
            patch(prevStartNode, nextEndNode)
            container = insertBefore(prevEndNode, prevStartNode, container, 1)
            prevStartNode = prev[++prevStart]
            nextEndNode = next[--nextEnd]
        }else if(prevEndNode.key === nextStartNode.key){
            // 7. prevEndNode.key == nextStartNode.key，相等则更新节点，将 prevEndNode 插入到 prevStartNode 之前，prevEnd-- nextStart++，回到 2
            patch(prevEndNode, nextStartNode)
            container = insertBefore(prevStartNode, prevEndNode, container)
            prevEndNode = prev[--prevEnd]
            nextStartNode = next[++nextStart]
        }else{
            // 8. 如果全都不相等，查找 prev，看是否存在一个与 nextStartNode.key相同的节点，有则更新，没有则创建一个新的节点，将其插入到 prevStartNode 之前，nextStart++，prev[j]标记为操作过，回到2
            let j = prevIndex[nextStartNode.key]
            if(j !== undefined){
                patch(prev[j], nextStartNode)
                prev[j] = undefined
            }
            container = insertBefore(prevStartNode, nextStartNode, container)
            nextStartNode = next[++nextStart]
        }
    }
    if(prevEnd < prevStart){
        // 9. 循环结束后 如果 prevEnd < prevStart 证明存在新节点未处理，从 nextStart 开始 插入节点，直到newEnd，每次节点都插入在 next[newEnd + 1]之前
        let ref = next[nextEnd + 1] || null
        while(nextStart <= nextEnd){
            container = insertBefore(ref, next[nextStart++], container)
        }
    }else if(nextEnd < nextStart){
        // 10. 如果 nextEnd < newStart 证明存在节点被移除，未处理，从 prevStart 开始 移除节点，直到 prevEnd
        while(prevStart <= prevEnd){
            remove(prev[prevStart++], container)
        }
    }
    return container
}
```

### 执行流程

初始化 `prevIndex` , 此时 `prevStart = 0` , `prevEnd = 4`, `nextStart = 0`, `nextEnd = 4`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eeff40d4d49b43d98cfc622f9c7a4089~tplv-k3u1fbpfcp-watermark.image)

通过比较 `prevStart` 与 `nextStart`，`prevEnd` 与 `nextEnd`，`prevStart` 与 `nextEnd`，`prevEnd` 与 `nextStart` 得知皆不想等，则通过 `prevIndex` 获取到 `nextStartNode` 是可以复用的节点，位置在 `j = 1`，将 `prev[j]` 更新后，将其设置为 `undefined`，并且将 `nextStartNode` 插入到 `prevStartNode` 之前，然后 `nextStartNode = next[++nextStart]`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97227a3987214153a03d6ca8338314a0~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStart = 0` , `prevEnd = 4`, `nextStart = 1`, `nextEnd = 4`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ebe83663032407191b471b8f3f8e399~tplv-k3u1fbpfcp-watermark.image)

满足 `prevStartNode.key === nextStartNode.key` 此时直接更新 `prevStartNode` 然后执行 `prevStart++ nextStart++`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07b1cb2c54de416e81a2707dffb08c8e~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStartNode` 是先前处理过的节点，所以直接跳过 `prevStart++`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05da87c16d1446409c497816a540ee4d~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStart = 2` , `prevEnd = 4`, `nextStart = 2`, `nextEnd = 4`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9febe3ab94bf4c3fa2ab0b5bf2aea833~tplv-k3u1fbpfcp-watermark.image)

通过比较 `prevStart` 与 `nextStart`，`prevEnd` 与 `nextEnd`，`prevStart` 与 `nextEnd`，`prevEnd` 与 `nextStart` 得知皆不想等，则通过 `prevIndex` 获取到 `nextStartNode` 是可以复用的节点，位置在 `j = 3`，将 `prev[j]` 更新后，将其设置为 `undefined`，并且将 `nextStartNode` 插入到 `prevStartNode` 之前，然后 `nextStartNode = next[++nextStart]`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0915366e87c9416280e6a7fa312e1934~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStart = 2` , `prevEnd = 4`, `nextStart = 3`, `nextEnd = 4`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b3d9bce22e04a8eaa11f4cd8d93e4df~tplv-k3u1fbpfcp-watermark.image)

满足 `prevStartNode.key === nextStartNode.key` 此时直接更新 `prevStartNode` 然后执行 `prevStart++ nextStart++`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e7c7cae68704fe19270924958054092~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStartNode` 是先前处理过的节点，所以直接跳过 `prevStart++`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7526a563fd894b9ab07ce92bfe7fdbd7~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStart = 4` , `prevEnd = 4`, `nextStart = 4`, `nextEnd = 4`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/587e654ba233476c875b23b491245a8c~tplv-k3u1fbpfcp-watermark.image)

通过比较 `prevStart` 与 `nextStart`，`prevEnd` 与 `nextEnd`，`prevStart` 与 `nextEnd`，`prevEnd` 与 `nextStart` 得知皆不想等，且在 `prevIndex` 中也没法获取到此节点，证明这个为新增节点，创建节点后插入到 `prevNodeStart` 之前，执行 `nextStartNode = next[++nextStart]`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13395e1339a94b0883deeb799b24d817~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStart = 4` , `prevEnd = 4`, `nextStart = 5`, `nextEnd = 4`，此时已经不满足循环条件了，所以直接跳出

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48f8694c6ea9443ca7c192d8dd78b6d0~tplv-k3u1fbpfcp-watermark.image)

由判断 `prevStart > prevEnd` 不成立，但 `nextStart > nextEnd` 成立，所以存在节点是未删除的，循环删除掉多余的节点，条件为 `prevStart <= prevEnd` 最后得到

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d212c357442b49a38679cd4105a5888f~tplv-k3u1fbpfcp-watermark.image)

在看一组巩固

此时 `prevStart = 0` , `prevEnd = 3`, `nextStart = 0`, `nextEnd = 4`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e79cf56792a4f68850bf80903b1ea03~tplv-k3u1fbpfcp-watermark.image)

通过比较，得知 `prevStartNode` 与 `nextStartNode` 相等，更新后移动指针位置

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9ee4134822b4cd7830f72d115e75ba3~tplv-k3u1fbpfcp-watermark.image)

通过比较，得知 `prevEndNode` 与 `nextEndNode` 相等，更新节点，然后把节点移动到 `prevStartNode` 之前

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59986779b7cf4985af5f617fbff2968c~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStart = 1` , `prevEnd = 2`, `nextStart = 2`, `nextEnd = 4`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51f53c678fcf43b2916e9063881efab2~tplv-k3u1fbpfcp-watermark.image)

我们发现 `prevEndNode` 跟 `nextStartNode` 是相等的，更新节点后移动指针

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92d3198c01f9462d9a7453e934b53051~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStart = 1` , `prevEnd = 1`, `nextStart = 2`, `nextEnd = 3`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4553c7b52b37462eb4e7098937290ec3~tplv-k3u1fbpfcp-watermark.image)

我们发现 `prevStartNode` 跟 `nextStartNode` 是相等的，更新节点后移动指针

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/513da27071544f4f99c768552b11ea52~tplv-k3u1fbpfcp-watermark.image)

此时 `prevStart = 2` , `prevEnd = 1`, `nextStart = 3`, `nextEnd = 3` 已经不符合循环条件，跳出循环，此时满足 `prevEnd < prevStart`，证明还有新增节点，循环将新节点插入在 `next[nextEnd + 1]` 之前

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d92dfd5686734b87b5c72af3945be672~tplv-k3u1fbpfcp-watermark.image)

## vue3

### 算法流程

1. `j` 表示当前匹配到第几个位置，初始值为0
2. 从 `j` 开始匹配相同的元素，如果 `prev[j].key == next[j].key`，更新后 `j++` 如果 `j > prevEnd || j > nextEnd` 提前跳出
3. 匹配完前面的相同元素后 j 停在第一个不同点
4. 从 `prevEnd` 和 `nextEnd` 开始从后面查找相同的后缀，更新后 `prevEnd-- nextEnd--` 如果 `j > prevEnd || j > nextEnd` 提前跳出
5. 此时已经更新完相同的前缀和后缀，需要看 j 处于什么位置
6. 如果 `j > prevEnd && j <= nextEnd` ，则 `next` 在 `[j , nextEnd]` 新增元素，直接在 `next[nextEnd + 1]` 前插入新增元素
7. 如果 `j > nextEnd && j <= prevEnd` ，则 `prev` 在 `[j , prevEnd]`  中元素被删除，直接删除多余元素
8. 如果都不是上两种情况，则说明在 `[j , prevEnd]` 段存在乱序的节点，长度为 `nextLeft = nextEnd - j + 1`
9. 初始化一个辅助数组 `source` 长度为 `nextLeft` 默认值为 -1，`patched = 0`，`move = false`，`pos = 0`
10. 遍历 `next`, 从 `j` 到 `nextEnd`，生成一个 `key - i` 的映射表 `keyIndex`
11. 遍历 `prev` ,从 `j` 到 `prevEnd` 
12. 如果 `patched` 大于 `nextLeft`，则说明相同元素从 `prev` 中取完，后面均为待删除的元素，直接删除
13. `k = keyIndex[prev[i]]`，如果 `k` 不存在，证明该节点不存在于 `next`，直接删除
14. `next[k].key == prev[i].key`，则更新该节点，`patched++`，`source[k - j] = i`，如果 `k < pos`，则 `prev[i]` 是需要移动的 `move = true`，否则 `pos = k`
15. 处理完成后判断 `move` 是否为真
16. 如果不为真，`i = nextLeft - 1` 倒序遍历，如果 `source[i] == -1` 时，`pos = j + i`，在 `next[pos + 1]` 前增加节点 `next[pos]`
17. 如果为真，则在这段范围内发生乱序 / 新增的情况
18. 求出最长上升子序列 `seq = lis(source) k = seq.length - 1`
19. `i = nextLeft - 1` 倒序遍历，如果 `source[i] == -1` 时，`pos = j + i`，在 `next[pos + 1]` 前增加节点 `next[pos]`
20. 如果 `i == seq[j]`，则需要移动此节点，`pos = j + i`，在 `next[pos + 1]` 前插入节点 `next[pos]`
21. 其他情况，`k--`

### 代码实现

```js
// vue3
function diff3(prev, next){
    let container = prev.slice()
    // 1. j 表示当前匹配到第几个位置，初始值为0
    let j = 0
    let prevEnd = prev.length - 1
    let nextEnd = next.length - 1
    let prevNode = prev[j]
    let nextNode = next[j]
    // 2. 从 j 开始匹配相同的元素，如果 prev[j].key == next[j].key，更新后 j++ 如果 j > prevEnd || j > nextEnd 提前跳出
    while(prevNode && nextNode && prevNode.key === nextNode.key){
        patch(prevNode, nextNode)
        j++
        if(j > prevEnd || j > nextEnd) break
        prevNode = prev[j]
        nextNode = next[j]
    }
    // 3. 匹配完前面的相同元素后 j 停在第一个不同点
    prevNode = prev[prevEnd]
    nextNode = next[nextEnd]
    // 4. 从 prevEnd 和 nextEnd 开始从后面查找相同的后缀，更新后 prevEnd-- nextEnd-- 如果 j > prevEnd || j > nextEnd提前跳出
    while(prevNode && nextNode && prevNode.key === nextNode.key){
        patch(prevNode, nextNode)
        prevEnd--
        nextEnd--
        if(j > prevEnd || j > nextEnd) break
        prevNode = prev[prevEnd]
        nextNode = next[nextEnd]
    }
    // 5. 此时已经更新完相同的前缀和后缀，需要看 j 处于什么位置
    if(j > prevEnd && j <= nextEnd){
        // 6. 如果 j > prevEnd && j <= nextEnd ，则 next 在[ j , nextEnd]  新增元素，直接在next[nextEnd + 1] 前插入新增元素
        let ref = next[nextEnd + 1] || null
        while(j <= nextEnd){
            container = insertBefore(ref, next[j++], container)
        }
    }else if(j > nextEnd && j <= prevEnd){
        // 7. 如果 j > nextEnd && j  <= prevEnd ，则 prev 在 [j , prevEnd]  中元素被删除，直接删除多余元素
        while(j <= prevEnd){
            remove(prev[j++], container)
        }
    }else if(j <= nextEnd){
        // 8. 如果都不是上两种情况，则说明在 [j , prevEnd] 段存在乱序的节点，长度为 nextLeft = nextEnd - j + 1
        let nextLeft = nextEnd - j + 1
        // 9. 初始化一个辅助数组  source 长度为 nextLeft 默认值为 -1，patched = 0，move = false， pos = 0
        let source = new Array(nextLeft).fill(-1)
        let pos = 0
        let patched = 0
        let move = false
        let keyIndex = {}
        // 10. 遍历 next, 从 j 到 nextEnd，生成一个 key - i 的映射表 keyIndex
        for(let i = j; i <= nextEnd; i++) keyIndex[next[i].key] = i
        // 11. 遍历 prev ,从 j 到 prevEnd 
        for (let i = j; i <= prevEnd; i++) {
            let prevNode = prev[i]
            // 12. 如果 patched 大于 nextLeft，则说明相同元素从 prev 中取完，后面均为待删除的元素，直接删除
            if(patched < nextLeft){
                let k = keyIndex[prevNode.key]
                // 13. k = keyIndex[prev[i]]，如果 k 不存在，证明该节点不存在于 next，直接删除
                if(k !== undefined){
                    // 14. next[k].key == prev[i].key，则更新该节点，patched++，source[k - j] = i，如果 k < pos，则prev[i] 是需要移动的 move = true，否则 pos = k
                    patch(prevNode, next[k])
                    source[k - j] = i
                    patched++
                    if(k < pos){
                        move = true
                    }else{
                        pos = k
                    }
                }else{
                    remove(prevNode, container)
                }
            }else{
                remove(prevNode, container)
            }
        }
        // 15. 处理完成后判断 move 是否为真
        if(move){
            // 17. 如果为真，则在这段范围内发生乱序 / 新增的情况
            // 18. 求出最长上升子序列 seq = lis(source) j = seq.length - 1
            let seq = lis(source)
            let k = seq.length - 1
            for(let i = nextLeft - 1; i >= 0; i--){
                if(source[i] === -1 || i !== seq[k]){
                    // 19. i = nextLeft - 1 倒序遍历，如果 source[i] == -1 时，pos = j + i，在 next[pos + 1]前增加节点next[pos]
                    // 20. 如果 i == seq[j]，则需要移动此节点，pos = j + i，将 prev 中的 next[pos]插入到 prev 中的 next[pos + 1] 之前
                    let pos = j + i
                    container = insertBefore(next[pos + 1] || null, next[pos], container)
                }else{
                    // 21. 其他情况，j-- 
                    k--
                }
            }
        }else{
            // 16. 如果不为真，i = nextLeft - 1 倒序遍历，如果 source[i] == -1 时，pos = j + i，在 next[pos + 1]前增加节点 next[pos]
            for(let i = nextLeft - 1; i >= 0; i--){
                if(source[i] === -1){
                    let pos = j + i
                    container = insertBefore(next[pos + 1] || null, next[pos], container)
                }
            }
        }
    }
    return container
}
```

### 执行流程

首先比较前缀节点 `j = 0` `prevEnd = 3` `nextEnd = 4` `prevNode = prev[j]` `nextNode = next[j]`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40e10c71f1d54f4db960338fed585533~tplv-k3u1fbpfcp-watermark.image)

满足循环条件，执行到第一个不同点，即 `j = 1` `prevNode = prev[j]` `nextNode = next[j]`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bb61d15d60540669d80d143f45930b6~tplv-k3u1fbpfcp-watermark.image)

开始比对后缀节点，另 `prevNode = prev[prevEnd]` `nextNode = next[nextEnd]`，如果满足循环条件则开始循环

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffc26029d7354a3c8fbd2705ecb83491~tplv-k3u1fbpfcp-watermark.image)

更新后缀节点直到不满足循环条件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc9d813849304c3dbcfd71bf5ffd3872~tplv-k3u1fbpfcp-watermark.image)

此时 `j = 1` `prevEnd = 2` `nextEnd = 3`，条件 `j > prevEnd && j <= nextEnd` 与 `j > nextEnd && j <= prevEnd` 没有被满足，`j <= nextEnd` 满足，证明 `[j, nextEnd]` 区间存在乱序或新增的情况

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21e3f90761b54d769917f69086efc8b8~tplv-k3u1fbpfcp-watermark.image)

我们计算 `nextLeft = nextEnd - j + 1 = 3` 得出乱序区间大小为 3，`source = [-1, -1, -1]`，从 `j` 到 `nextEnd` 遍历 `next` 数组，得到 `keyIndex`，然后从 `j` 到 `prevEnd` 遍历 `prev` 数组 初始化 `pos = 0` `patched = 0` `move = false`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d9533ba5c424a278e08d5f02cf5f961~tplv-k3u1fbpfcp-watermark.image)

当 `i = j = 1`，`pos = 0``patched = 0``nextLeft = 3` 且 `patched < nextLeft` 则查找 `keyIndex` 看 `next` 中是否存在节点下标 `k = 2`，如果找到，更新节点，`patched++`， 令 `source[k - j] = i` 则 `source = [-1, 1, -1]`，判断 `k < pos`，如果小于则是需要移动，`move = true`， 这里明显不成立，所以令 `pos = k = 2`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a89cb9790d864182857c55adb266723f~tplv-k3u1fbpfcp-watermark.image)

当 `i = 2`，`pos = 2``patched = 1`，查找 `keyIndex` 得到 `k = 1`，更新节点，`patched++` 令 `source[k - j] = i` 则 `source = [2, 1, -1]`，因为 ` k < pos` 所以这个节点是需要移动的，所以 `move = true`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d215abbac274a2f90d9bc5d25bd3d0d~tplv-k3u1fbpfcp-watermark.image)

因为需要移动所以需要通过lis(最长上升子序列)来确定最少移动的次数，`seq = lis(source) = [2], k = seq.length - 1 = 1` 然后我们从`nextLeft - 1`往前遍历，直到 0

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8328e00f8be24462bdf0c96742390437~tplv-k3u1fbpfcp-watermark.image)

`i = 2`时，通过 `source[i] = -1`，`-1` 表明此节点我们未曾处理过，必然是一个新增的节点，所以我们需要新增这个节点到数组中，由于我们上面得出的 `source` 是一个相对坐标，逆推可以得到当前节点在 `next` 中的坐标为 `pos = j + i = 3` 则它需要插入在 `next[pos + 1]` 节点的前方

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3798dc4e581f4114aa812e85f098e447~tplv-k3u1fbpfcp-watermark.image)

`i = 1`时，由于 `source[i] != -1`，则我们接着判断 `i !== seq[k]`，由于不相等，这个节点是一个需要移动的节点，则我们将此节点移动到 `next[pos + 1]` 之前。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e740b2f88ac34ea0a7be8216c4931c3c~tplv-k3u1fbpfcp-watermark.image)

`i = 0`是，判断都不成立，所以 `k--`，接着就循环结束了，完成匹配

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b0832879ac84a52811640b3ced2c64f~tplv-k3u1fbpfcp-watermark.image)

再来一遍执行流程加强下理解

这里直接跳过了前缀跟后缀的处理流程，也没啥好说的，此时 `j = 0` `prevEnd = 5` `nextEnd = 5`，条件 `j > prevEnd && j <= nextEnd` 与 `j > nextEnd && j <= prevEnd` 没有被满足，`j <= nextEnd` 满足，证明 `[j, nextEnd] = [0, 5]` 区间存在乱序或新增的情况

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4131fb54e7454cefbcf8b9d095c4534c~tplv-k3u1fbpfcp-watermark.image)

根据上面的流程，我们求出 `keyIndex`, `nextLeft = nextEnd - j + 1 = 5, source = [-1, -1, -1, -1, -1]`，从 `j` 遍历到 `prevEnd`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a7e4a26a85f4fdc97e0158b5916aada~tplv-k3u1fbpfcp-watermark.image)

当 `i = j = 0`， `patched = 0, pos = 0, move = false`，通过 `keyIndex` 可查找出 `a` 节点位于 `next` 中下标为 1 的位置，更新后，记录位置更新变量，`patched++, pos = 1, move = false, source[k - j] = source[1] = 0`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f68ab7adc9841988f557f1283309145~tplv-k3u1fbpfcp-watermark.image)

当 `i = 1`，`patched = 1, pos = 1, move = false`，通过 `keyIndex` 查找出 `k = 0` 由于 `k < pos` 所以节点 b 是需要移动的，更新后，记录位置，更新变量，`patched++, pos = 1, move = true, source[k - j] = source[0] = 1`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b698d6dbc11c4c23a5b10e4287bbeda5~tplv-k3u1fbpfcp-watermark.image)

当 `i = 2`，`patched = 2, pos = 1, move = true`，通过 `keyIndex` 查找出 `k = 2` 由于 `k > pos` 所以 `pos = k = 2`，更新后，记录位置，更新变量，`patched++, pos = 2, source[k - j] = source[2] = 2`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41c7d9bfb03746f5bf7c329658fd9762~tplv-k3u1fbpfcp-watermark.image)

当 `i = 3`，`patched = 3, pos = 2`，通过 `keyIndex` 查找出 `k = 5` 由于 `k > pos` 所以 `pos = k = 5`，更新后，记录位置，更新变量，`patched++, pos = 5, source[k - j] = source[5] = 3`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b43629a7ee6a4049b1817ed5e6ec38c4~tplv-k3u1fbpfcp-watermark.image)

当 `i = 4`，`patched = 4, pos = 5`，通过 `keyIndex` 查找出 `k = 4` 由于 `k < pos` 所以 `pos = 5`，更新后，记录位置，更新变量，`patched++, pos = 5, source[k - j] = source[4] = 4`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a0eb6d163a04426bdc1fdd31114603d~tplv-k3u1fbpfcp-watermark.image)

当 `i = 5`，`patched = 5, pos = 5`，通过 `keyIndex` 查找出 `k = 3` 由于 `k < pos` 所以 `pos = 5`，更新后，记录位置，更新变量，`patched++, pos = 5, source[k - j] = source[3] = 5`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbd35e9d2c9d4cbbb3a0438d1f1b4ba9~tplv-k3u1fbpfcp-watermark.image)

遍历结束，此时 `source = [ 1, 0, 2, 5, 4, 3 ], move = true` 通过 `seq = lis(source) = [0, 2, 5], k = seq.length - 1 = 3` 从 `nextLeft - 1` 开始遍历

当 `i = 5`，`source[5] !== -1` 但 `i === seq[k]` 所以不做处理，`k--`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb000ecce0364ecb8e73072c5ac52c64~tplv-k3u1fbpfcp-watermark.image)

当 `i = 4`，`source[4] !== -1` 由于 `i !== seq[k]` 所以要移动该节点，`pos = j + i = 4` `next[pos]` 需要插入在 `next[pos + 1]` 之前

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02730be0f31641a4829acf6711511948~tplv-k3u1fbpfcp-watermark.image)

当 `i = 3`，`source[4] !== -1` 由于 `i !== seq[k]` 所以要移动该节点，`pos = j + i = 3` `next[pos]` 需要插入在 `next[pos + 1]` 之前

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1433ae48567946af9cab333e3999b8fe~tplv-k3u1fbpfcp-watermark.image)

当 `i = 2`，`source[5] !== -1` 但 `i === seq[k]` 所以不做处理，`k--`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2e7a86a14cd46a68441a64c11010940~tplv-k3u1fbpfcp-watermark.image)

当 `i = 1`，`source[4] !== -1` 由于 `i !== seq[k]` 所以要移动该节点，`pos = j + i = 1` `next[pos]` 需要插入在 `next[pos + 1]` 之前

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4229d4e228fc476a899d6af2aebb6c1c~tplv-k3u1fbpfcp-watermark.image)

当 `i = 0`，`source[5] !== -1` 但 `i === seq[k]` 所以不做处理，`k--`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1a3c3f747384f61b7ae957294bf4589~tplv-k3u1fbpfcp-watermark.image)



### 测试代码

```js

const check = (diff) => {
    var count = 100
    var changeCount = 100
    for(let i = 0; i < count; i++){
        var random = 0 + Math.floor(10 * Math.random())
        var prev = new Array(random).fill(0).map((item, index) => {
            return {
                key: 'key-' + index,
                val: index
            }
        })
        for(let j = 0; j < changeCount; j++){
            var ran = random + (Math.floor(5 * Math.random()) * ( Math.random() > 0.5 ? 1 : -1))
            ran = ran > 0 ? ran : 0
            var next = new Array(ran).fill(0).map((item, index) => {
                return {
                    key: 'key-' + index,
                    val: index * random
                }
            })
            shuff(next)
            var res = diff(prev, next)
            if(!eq(res, next)){
                console.log(prev, next)
            }
            prev = res
        }
    }
};

function shuff(arr){
    let len = arr.length - 1
    for(let i = 0; i < len; i++){
        let rand = i + Math.floor((len - i) * Math.random())
        swap(arr, rand, i)
    }
}

function swap(arr, i, j){
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

console.log('random test')
console.time('diff1')
check(diff1)
console.timeEnd('diff1')

console.time('diff2')
check(diff2)
console.timeEnd('diff2')

console.time('diff3')
check(diff3)
console.timeEnd('diff3')

let size = 5000
let next = new Array(size).fill(0).map((item, index) => {
    return {
        key: 'key-' + index,
        val: index
    }
})
let prev = JSON.stringify(next)
shuff(next)
next = JSON.stringify(next)

console.log('test')
console.time('diff1')
eq(diff1(JSON.parse(prev), JSON.parse(next)), next)
console.timeEnd('diff1')

console.time('diff2')
eq(diff2(JSON.parse(prev), JSON.parse(next)), next)
console.timeEnd('diff2')

console.time('diff3')
eq(diff3(JSON.parse(prev), JSON.parse(next)), next)
console.timeEnd('diff3')
```

执行结果

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b5429b81c064bb2af43d4f34e449073~tplv-k3u1fbpfcp-watermark.image)


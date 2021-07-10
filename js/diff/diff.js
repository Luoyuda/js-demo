/*
 * @Author: xiaohuolong
 * @Date: 2021-06-19 12:59:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-09 12:23:54
 * @FilePath: /js-demo/js/diff/diff.js
 */
const { eq } = require('../eq/eq.js')
function patch(o, n){
    o.val = n.val
}
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
var params = [
    [
        {key: 'a'}, {key: 'a'}, 
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}]
    ],
    [
        {key: 'b'}, {key: 'b'}, 
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}]
    ],
    [
        {key: 'c'}, {key: 'c'}, 
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}]
    ],
    [
        {key: 'd'}, {key: 'd'}, 
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}]
    ],
    [
        {key: 'a'}, {key: 'b'}, 
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'b'}, {key: 'a'}, {key: 'c'}, {key: 'd'}]
    ],
    [
        {key: 'b'}, {key: 'a'}, 
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}]
    ],
    [
        {key: 'd'}, {key: 'a'}, 
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'b'}, {key: 'c'}, {key: 'a'}, {key: 'd'}]
    ],
    [
        {key: 'c'}, {key: 'a'}, 
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'b'}, {key: 'a'}, {key: 'c'}, {key: 'd'}]
    ],
    [
        {key: 'b'}, {key: 'd'},
        [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}],
        [{key: 'a'}, {key: 'd'}, {key: 'b'},  {key: 'c'}],
    ]
]
params.forEach((i) => {
    // let res = insertBefore(...i)
    // console.log(eq(res, i[3]))
})
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
function isSame (o, n){
    return o.key ===n.key
}
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
    // console.log(j, prevEnd, nextEnd)
    // console.log(container, prev, next)
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
        // console.log(source)
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
                // console.log(container)
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
var list = [
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}], 
        [{key: 'a', val: 1}, {key: 'c', val: 3}, {key: 'b', val: 3}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'a', val: 2}, {key: 'b', val: 3}, {key: 'c', val: 1}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'c', val: 1}, {key: 'a', val: 2}, {key: 'b', val: 3}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'a', val: 1}, {key: 'c', val: 2}, {key: 'b', val: 3}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'b', val: 1}, {key: 'a', val: 2}, {key: 'c', val: 3}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'a', val: 2}, {key: 'b', val: 3}, {key: 'c', val: 1}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'b', val: 1}, {key: 'a', val: 2}, {key: 'c', val: 3}, { key: 'd', val: 6}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'b', val: 1}, {key: 'a', val: 2}, { key: 'd', val: 6}, {key: 'c', val: 3}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'b', val: 1}, { key: 'd', val: 6}, {key: 'a', val: 2}, {key: 'c', val: 3}]
    ],
    [
        [{ key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{ key: 'd', val: 6}, {key: 'b', val: 1}, {key: 'a', val: 2},  {key: 'c', val: 3}]
    ],
    [
        [{ key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{ key: 'd', val: 6}, {key: 'b', val: 1}, {key: 'c', val: 3}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'c', val: 1}, {key: 'b', val: 3}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'b', val: 1}]
    ],
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        []
    ],
];
list = [
    [
        [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
        [{key: 'a', val: 1}, { key: 'b', val: 6}, {key: 'c', val: 2}, {key: 'd', val: 3}]
    ],
    // [
    //     [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
    //     [{key: 'a', val: 1}, { key: 'd', val: 6}, {key: 'b', val: 4}, {key: 'c', val: 5}]
    // ],
    // [
    //     [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
    //     [{key: 'a', val: 1}, {key: 'c', val: 5}]
    // ],
    // [
    //     [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
    //     [{ key: 'd', val: 6}, {key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}]
    // ],
    // [
    //     [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
    //     [{key: 'a', val: 1}, {key: 'd', val: 2}, {key: 'b', val: 3}, { key: 'c', val: 6}]
    // ],
    // [
    //     // [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ],
    //     // [ { key: 'c', val: 1 }, { key: 'b', val: 3 } ]
    //     [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 1 } ] ,
    //     [ { key: 'b', val: 1 } ]
    // ],
    // [
    //     [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
    //     [{key: 'd', val: 1}, {key: 'g', val: 1}, {key: 'b', val: 2}, {key: 'a', val: 3}, { key: 'c', val: 6}]
    // ],
    // [
    //     [{key: 'a', val: 1}, {key: 'b', val: 2}, {key: 'c', val: 3}], 
    //     [{key: 'b', val: 1}, { key: 'd', val: 6}, {key: 'a', val: 2}, {key: 'c', val: 3}]
    // ],
    // [
    //     [
    //         { key: 'key-7', val: 63 },
    //         { key: 'key-2', val: 18 },
    //         { key: 'key-9', val: 81 },
    //         { key: 'key-1', val: 9 },
    //         { key: 'key-5', val: 45 },
    //         { key: 'key-6', val: 54 },
    //         { key: 'key-0', val: 0 },
    //         { key: 'key-3', val: 27 },
    //         { key: 'key-8', val: 72 },
    //         { key: 'key-4', val: 36 },
    //         { key: 'key-10', val: 90 },
    //         { key: 'key-11', val: 99 }
    //     ],[
    //         { key: 'key-2', val: 18 },
    //         { key: 'key-1', val: 9 },
    //         { key: 'key-3', val: 27 },
    //         { key: 'key-0', val: 0 },
    //         { key: 'key-4', val: 36 },
    //         { key: 'key-5', val: 45 }
    //     ]
    // ]
]
// list.forEach((i) => {
//     try {
//         let res = diff1(...i)
//         if(!eq(res, i[1])){
//             console.log(...i)
//         }
//     } catch (error) {
//         console.log('error')
//         console.log(...i)
//     }
// });

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
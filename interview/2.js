/*
 * @Author: xiaohuolong
 * @Date: 2021-07-17 08:12:40
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 12:39:14
 * @FilePath: /js-demo/interview/2.js
 */
// 生成N个button 打印 i
(() => {
    function c(n){
        var fragment = document.createDocumentFragment()
        for(var i = 0; i < n; i++){
            var button = document.createElement('button')
            button.innerText = i
            button.addEventListener('click', (function(i){
                return function(e){
                    console.log(i)
                }
            })(i))
            fragment.append(button)
        }
        document.body.append(fragment)
    }
    function c(n){
        let fragment = document.createDocumentFragment()
        for(let i = 0; i < n; i++){
            let button = document.createElement('button')
            button.innerText = i
            button.addEventListener('click',() => {
                console.log(i)
            })
            fragment.append(button)
        }
        document.body.append(fragment)
    }
    function c(n){
        let fragment = document.createDocumentFragment()
        for(let i = 0; i < n; i++){
            let button = document.createElement('button')
            button.index = i
            button.innerText = i
            fragment.append(button)
        }
        document.body.addEventListener('click', (e) => {
            if(e.target && e.target.nodeName.toLowerCase() === 'button'){
                console.log(e.target.index)
            }
        })
        document.body.append(fragment)
    }
});
// eventLoop
(() => {
    // 1 2 3 5 4
    console.log(1)
    new Promise((resolve, reject) => {
        console.log(2)
        resolve()
        console.log(3)
    }).then(() => {
        console.log(4)
    })
    console.log(5)
});
// div 上下左右居中
(() => {
    let cssText = `
        绝对定位
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        flex
        display: flex;
        align-items: center;
        justify-content: center;
        gird
        display: grid;
        justify-items: center;
        align-items: center;
    `
});
// url加载页面发生了什么
(() => {
/**
1. DNS 解析
2. TCP 连接，三次握手
3. 请求资源
4. 生成 dom tree css tree 合并成渲染树
5. 计算渲染树中的布局信息（回流）
6. 绘制页面（重绘）
7. TCP 连接，四次挥手
 */
});
(() => {
    var arr = [1,3,2,4,5,6]
    function getFirst(nums){
        let max = 0
        for(let n of nums){
            max = Math.max(max, n)
        }
        let res = new Array(max).fill(0)
        for (let n of nums) {
            res[n - 1] = 1
        }
        for (let i = 0; i < res.length; i++) {
            if(res[i] === 0) return i + 1
        }
        return -1
    }
    console.log(getFirst(arr))
});
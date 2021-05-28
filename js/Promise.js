/*
 * @Author: xiaohuolong
 * @Date: 2021-05-27 21:18:20
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-27 21:35:20
 * @FilePath: /js-demo/js/Promise.js
 */
/**
 * 
 * Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
 * Promise 会有三种状态
    * Pending 等待
    * Fulfilled 完成
    * Rejected 失败
 * 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
 * Promise 中使用 resolve 和 reject 两个函数来更改状态；
 * then 方法内部做但事情就是状态判断
    * 如果状态是成功，调用成功回调函数
    * 如果状态是失败，调用失败回调函数
 * 
 */

const PENDING = 'pending'
const FULFILLED = 'Fulfilled'
const REJECTED = 'Rejected'


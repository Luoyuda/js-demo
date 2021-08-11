/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 09:10:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 09:13:08
 * @FilePath: /js-demo/refactoring/8.6.js
 */
(() => {
    let result, stack = []
    for(let i = 0; i < 5; i++){
        if(stack.length === 0){
            result = 0
            stack.push(i)
        }else{
            result = stack[stack.length - 1]
            stack.push(i)
        }
    }
    console.log(result, stack)
})();
(() => {
    let result, stack = []
    for(let i = 0; i < 5; i++){
        if(stack.length === 0){
            result = 0
        }else{
            result = stack[stack.length - 1]
        }
        stack.push(i)
    }
    console.log(result, stack)
})();
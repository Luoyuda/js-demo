/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 13:04:48
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 13:08:14
 * @FilePath: /js-demo/refactoring/10.2.js
 */
((state, start, end) => {
    if(state == 1) return 0
    if(start == 2) return 0
    if(end == 3) return 0
    return 1
})(1, 2, 3);
((state, start, end) => {
    if(state == 1 || start == 2 || end == 3) return 0
    return 1
})(1, 2, 3);
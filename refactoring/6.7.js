/*
 * @Author: xiaohuolong
 * @Date: 2021-08-07 16:58:22
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-07 17:06:34
 * @FilePath: /js-demo/refactoring/6.7.js
 */
// before
let tpHd = '111';
let result = ''
result += `title: ${tpHd}\n`
tpHd = '222';
result += `title: ${tpHd}`
// after
let _title = '111';
let result = ''
result += `title: ${title()}\n`
tpHd = setTitle('222');
result += `title: ${title()}`

function title() { return _title }
function setTitle(title) { _title = title }
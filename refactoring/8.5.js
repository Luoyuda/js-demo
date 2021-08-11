/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 09:00:16
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 09:01:51
 * @FilePath: /js-demo/refactoring/8.5.js
 */
(() => {
    let appliesToMass = false;
    let states = ['MA']
    for(let s of states) {
        if(s === 'MA') appliesToMass = true;
    }
    console.log(appliesToMass)
})();
(() => {
    let states = ['MA']
    let appliesToMass = states.includes('MA');
    console.log(appliesToMass)
})();
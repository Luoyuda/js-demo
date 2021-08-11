/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 21:42:17
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 21:45:04
 * @FilePath: /js-demo/refactoring/11.4.js
 */
(() => {
    const dayTempRange = { low: 10, high: 40 }
    const low = dayTempRange.low
    const high = dayTempRange.high
    if(withinRange(low, high)){
        console.log('123')
    }
    function withinRange(low, high){
        return low > 9 && 41 > high
    }
})();
(() => {
    const dayTempRange = { low: 10, high: 40 }
    if(withinRange(dayTempRange)){
        console.log('123')
    }
    function withinRange(aNumberRange){
        return aNumberRange.low > 9 && 41 > aNumberRange.high
    }
})();

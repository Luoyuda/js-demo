/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 13:16:39
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 13:20:58
 * @FilePath: /js-demo/refactoring/10.3.js
 */
(() => {
    function payAmount(employee){
        let result
        if(employee.isSeparated){
            result = {amount: 0, reasonCode: 'SEP'}
        }else{
            if(employee.isRetired){
                result = {amount: 0, reasonCode: 'RET'}
            }else{
                result = {amount: 1000, reasonCode: ''}
            }
        }
        return result
    }
    console.log(payAmount({
        isSeparated: true,
        isRetired: true,
    }))
})();
(() => {
    function payAmount(employee){
        if(employee.isSeparated) return {amount: 0, reasonCode: 'SEP'}
        if(employee.isRetired) return {amount: 0, reasonCode: 'RET'}
        return {amount: 1000, reasonCode: ''}
    }
    console.log(payAmount({
        isSeparated: true,
        isRetired: true,
    }))
})();
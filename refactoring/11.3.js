/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 21:24:49
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 21:37:14
 * @FilePath: /js-demo/refactoring/11.3.js
 */
(() => {
    function deliveryDate(anOrder, isRush){
        if(isRush){
            let deliveryTime
            if(['MA', 'CT'].includes(anOrder.deliveryState)) deliveryTime = 1
            else if(['NY', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 2
            else deliveryTime = 3
            return deliveryTime
        }else{
            let deliveryTime
            if(['MA', 'CT', 'NY'].includes(anOrder.deliveryState)) deliveryTime = 2
            else if(['ME', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 3
            else deliveryTime = 4
            return deliveryTime
        }
    }
    console.log(deliveryDate({ deliveryState: 'MA' }, true))
    console.log(deliveryDate({ deliveryState: 'NY' }, false))
})();
(() => {
    function rushDeliveryDate(anOrder){
        let deliveryTime
        if(['MA', 'CT'].includes(anOrder.deliveryState)) deliveryTime = 1
        else if(['NY', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 2
        else deliveryTime = 3
        return deliveryTime
    }
    function regularDeliveryDate(anOrder){
        let deliveryTime
        if(['MA', 'CT', 'NY'].includes(anOrder.deliveryState)) deliveryTime = 2
        else if(['ME', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 3
        else deliveryTime = 4
        return deliveryTime
    }
    console.log(rushDeliveryDate({ deliveryState: 'MA' }))
    console.log(regularDeliveryDate({ deliveryState: 'NY' }))
})();
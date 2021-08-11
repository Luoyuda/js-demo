/*
 * @Author: xiaohuolong
 * @Date: 2021-08-08 14:19:30
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-08 14:33:16
 * @FilePath: /js-demo/refactoring/7.3.js
 */
(() => {
    class Order{
        constructor(data){
            this._priority = data.priority
        }
        get priority(){return this._priority }
    }
    const priorities = ['low', 'normal', 'high', 'rush']
    let orders = new Array(10).fill(0).map((item, index) => new Order({ priority: priorities[index % 4] }))
    console.log(orders.filter(item => item.priority === 'high' || item.priority === 'rush'))
})();
(() => {
    class Order{
        constructor(data){
            this._priority = new Priority(data.priority)
        }
        get priorityString(){return this._priority.toString() }
        get priority(){return this._priority}
        set priority(aString){this._priority = new Priority(aString)}
    }
    class Priority{
        constructor(value){
            if(value instanceof Priority) return value
            if(Priority.legalValues().includes(value)){
                this._value = value
            }else{
                throw new Error('invalid for Priority')
            }
        }
        toString(){return this._value}
        static legalValues(){return ['low', 'normal', 'high', 'rush']}
        get _index(){ return Priority.legalValues().findIndex(item => item === this._value) }

        equals(order) { return this._index === order._index }
        higherThan(order) { return this._index > order._index }
        lessThan(order) { return this._index < order._index }
    }
    const priorities = Priority.legalValues()
    const normal = new Priority('normal')
    let orders = new Array(10).fill(0).map((item, index) => new Order({ priority: priorities[index % 4] }))
    console.log(orders.filter(item => item.priority.higherThan(normal)))
})();
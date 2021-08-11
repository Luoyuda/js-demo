/*
 * @Author: xiaohuolong
 * @Date: 2021-08-09 12:32:40
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-09 12:41:43
 * @FilePath: /js-demo/refactoring/9.5.js
 */
(() => {
    class Order {
        constructor(data){
            this._number = data.number;
            this._customer = new Customer(data.customer)
        }
        get customer(){return this._customer}
    }
    class Customer {
        constructor(id){
            this._id = id
        }
        get id(){return this._id}
    }
    const order = new Order({ number: 10, customer: 1});
    console.log(order.customer)
})();
(() => {
    let _repositoryData
    function initialize(){
        _repositoryData = {}
        _repositoryData.customer = new Map()
    }
    function registerCustomer(id){
        if(!_repositoryData.customer.has(id)){
            _repositoryData.customer.set(id, new Customer(id))
        }
        return findCustomer(id)
    }
    function findCustomer(id){
        return _repositoryData.customer.get(id)
    }
    initialize()
    class Order {
        constructor(data){
            this._number = data.number;
            this._customer = registerCustomer(data.customer)
        }
        get customer(){return this._customer}
    }
    class Customer {
        constructor(id){
            this._id = id
        }
        get id(){return this._id}
    }
    const order = new Order({ number: 10, customer: 1});
    console.log(order.customer)
})();
<!--
 * @Author: xiaohuolong
 * @Date: 2021-08-06 08:41:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-11 15:00:07
 * @FilePath: /js-demo/refactoring/README.md
-->
# 重构(改善既有代码的设计)

重构的第一步：确保重构代码有一组可靠的测试！
重构的第一步：确保重构代码有一组可靠的测试！
重构的第一步：确保重构代码有一组可靠的测试！

## 基本概念

重构：对软件内部结构对一种调整，在不改变软件可观察行为对前提下，提高可理解性，降低修改成本

目的
1. 改进软件的设计
2. 使软件更易理解
3. 帮助寻找隐性bug
4. 提高编程速度

重构时机
1. 预备性重构：添加新功能更加容易
2. 帮助理解的重构：使代码更加易懂
3. 捡垃圾式重构：每次清理都让代码更好一点
4. 有计划的重构
5. 替换性的重构：替换一些依赖模块

## 代码的坏味道

1. 神秘命名：一个好的名字，清晰的表明自己的功能和用法（改变函数声明、变量改名、字段改名）
2. 重复代码：在一个以上的地方看到相同的代码（提炼函数、移动语句、函数上移）
3. 过长函数：函数越长，阅读复杂度越高（提炼函数、以查询取代临时变量、引入参数对象、以命令取代函数）
4. 过长参数列表：参数过长容易使人迷惑（以查询去取代临时变量、参数对象）
5. 全局数据：在项目中任何一处都可能改变它，且无法定位哪里发生改变（封装变量）
6. 可变数据：数据修改容易发生难以预料的bug（封装变量、拆分变量）
7. 发散式的变化：一个函数只负责一种类型的上下文状态（提炼函数）
8. 霰弹式修改：发生变化时需要在不同的类中做修改（内联函数、内联类）
9. 依恋情节：减少模块间的交互（搬移函数）
10. 数据泥团：数据聚合在一起，拆分成粒度更小的方式（提炼类、参数对象）
11. 基本类型偏执：使用错误的数据类型处理数据（以对象取代基本类型）
12. 重复的switch：当你想增加一个选择分支时需要找到所有的分支确认（多态取代条件表达式）
13. 循环语句：需要通读代码才明白循环内的语义（以管道代替循环）
14. 冗赘的元素：程序元素增加代码结构，从而支持变化、促进复用，但有时候只是简单的函数（内联函数、内联类）
15. 夸夸其谈通用性：放弃用不到的情况，比如各种各样的钩子，只做有限开发（移除死代码）
16. 临时字段：仅仅为了某种特殊情况创建的字段
17. 过长的消息链：A对象访问B对象，B对象访问C对象...直到E对象（隐藏委托关系）
18. 中间人：过度委托（移除中间人）
19. 内幕交易：模块之间交换数据（搬移函数、搬移字段、隐藏委托关系）
20. 过大的类：单个类做了太多事情（提炼类）
21. 异曲同工的类：相同类型的类应该保持接口一致（改变函数声明、搬移函数、提炼超类）
22. 纯数据类：拥有一些字段以及用于访问字段的函数（封装记录）
23. 被拒绝的馈赠：子类并不需要超类的大部分字段/函数（以委托取代子类）
24. 注释：当你需要写注释的时候，先尝试重构把所有的注释变得多余

## 重构技术

1. 提炼函数（内联函数）
   将代码提炼到一个独立的函数中，当你需要花时间浏览一段代码才能弄清楚它在干什么的时候，就应该提炼函数

   ```js
    function printOwing() {
        ... // printBanner
        ... // printDetails
    }
   ```

   ```js
    function printOwing() {
        printBanner()
        printDetails()
        return
        function printBanner(){ ... }
        function printDetails(){ ... }
    }
   ```

   做法：
   1. 创建一个新函数，根据函数意图命名
   2. 将代码从源函数复制到新建函数中
   3. 仔细查看提炼代码、作用域引用的变量，判断是否需要通过参数传入 
   4. 所有变量处理完毕后编译
   
   ```js
    const invoices = [
        {
            customer: 'BigCo',
            outstanding: [
                {
                    amount: 10
                },
                {
                    amount: 20
                }
            ]
        },
        {
            customer: 'Helle',
            outstanding: [
                {
                    amount: 30
                },
                {
                    amount: 40
                }
            ]
        }
    ]
    function printOwing(invoice) {
        console.log('--- ---- ---')
        console.log('--- Owes ---')
        console.log('--- ---- ---')
        let amounts = 0
        for(let { amount } of invoice.outstanding) {
            amounts += amount
        }
        console.log(`name: ${invoice.customer}`)
        console.log(`amount: ${amounts}`)
    }
    ```

    ```js
    function printOwing(invoice) {
        printBanner()
        let outstanding = amountFor(invoice)
        printDetails(invoice, outstanding)
        return
        function printBanner(){
            console.log('--- ---- ---')
            console.log('--- Owes ---')
            console.log('--- ---- ---')
        }
        function amountFor(invoice){
            return invoice.outstanding.reduce((prev, item) => prev + item.amount, 0)
        }
        function printDetails(invoice, outstanding){
            console.log(`name: ${invoice.customer}`)
            console.log(`amount: ${outstanding}`)
        }
    }
    invoices.forEach(printOwing)
    ```

2. 内联函数（提炼函数）
    一些本来就很易读代码可以直接内联在源函数内，可以减少间接层

    ```js
    function reportLines(aCustomer){
        ...
        gatherCustomerData(...)
        return
        function gatherCustomerData(){...}
    }
    ```

    ```js
    function reportLines(aCustomer){
        ...
        ... // gatherCustomerData
        return lines
    }
    ```

    做法
    1. 检查函数，确定其不具备多态性
    2. 找出这个函数的所有调用点
    3. 把调用点替换成函数本体
    4. 替换之后执行测试

    ```js
    const customer = {
        name: 'BigCo',
        location: 'sz'
    }
    function reportLines(aCustomer){
        const lines = []
        gatherCustomerData(lines, aCustomer)
        return lines
        function gatherCustomerData(out, aCustomer){
            out.push(['name', aCustomer.name])
            out.push(['location', aCustomer.location])
        }
    }
    ```

    ```js
    function reportLines(aCustomer){
        const lines = []
        lines.push(['name', aCustomer.name])
        lines.push(['location', aCustomer.location])
        return lines
    }
    ```

3. 提炼变量（内联变量）
    将复杂冗长的表达式拆分成变量更加易读

    ```js
    function price(order){
        return ...
    }
    ```

    ```js
    function price(order){
        let basePrice
        return ...
    }
    ```

    做法
    1. 确认要提炼的表达式没有副作用
    2. 声明一个不可修改的变量，把想要提炼的表达式复制一份，以表达式的结果赋值给变量
    3. 用新变量取代原来的表达式

    ```js
    function price(order){
        // price is base price - quantity discount + shipping
        return order.quantity * order.itemPrice - 
        Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
        Math.min(order.quantity * order.itemPrice * 0.1, 100)
    }
    ```

    ```js
    function price(order){
        // price is base price - quantity discount + shipping
        let basePrice = order.quantity * order.itemPrice
        let quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
        let shipping = Math.min(basePrice * 0.1, 100)
        return basePrice - quantityDiscount + shipping
    }
    ```

4. 内联变量（内联变量）
    可以通过内联变量的方法消除局部变量

    ```js
    function price(order){
        let basePrice
        return ...
    }
    ```

    ```js
    function price(order){
        return ...
    }
    ```

    做法
    1. 检查确认变量赋值语句的右侧表达式是否存在副作用
    2. 找到第一处使用该变量的地方，将其替换成赋值语句右侧的表达式
    
    ```js
    function price(order){
        let basePrice = order.basePrice;
        return (basePrice > 1000)
    }
    ```

    ```js
    function price(order){
        return order.basePrice > 1000
    }
    ```

5. 改变函数声明
    将函数、变量修改成语义更好的名称

    ```js
    // before
    function circum (x){...}
    ```

    ```js
    // 简单做法
    function circumference (radius){...}
    // 复杂做法
    function circum (radius){
        return circumference(radius)
        function circumference (radius){...}
    }
    ```

    简单做法
    1. 迁移一个参数，需要确定函数体内没有使用参数
    2. 修改函数声明
    3. 找出引用处，替换

    迁移做法
    1. 如果有必要，先对函数体内部进行重构，使得后面提炼步骤易于展开
    2. 使用提炼函数将函数体提炼成一个函数
    3. 如果提炼出的函数需要新增参数，则参考简单做法
    4. 对旧函数使用内联函数

    ```js
    function circum (radius){
        return 2 * Math.PI * radius
    }
    ```

    ```js
    // 简单做法
    function circumference (radius){
        return 2 * Math.PI * radius
    }
    // 复杂做法
    function circum (radius){
        return circumference(radius)
        function circumference (radius){
            return 2 * Math.PI * radius
        }
    }
    ```

    ```js
    function isNewEndLand(aCustomer){
        return ['MA', 'CT', 'ME', 'VT', 'NH', 'NH', 'RI'].includes(aCustomer.address.state)
    }
    ```

    ```js
    function isNewEndLand(aCustomer){
        return checkState(aCustomer.address.state)
        function checkState(state){
            return ['MA', 'CT', 'ME', 'VT', 'NH', 'NH', 'RI'].includes(state)
        }
    }
    ```

6. 封装变量
    将变量封装成函数调用的方式，方便修改和数据监控

    ```js
    let defaultOwnerData = {...}
    function defaultOwner(){
        return Object.assign({}, defaultOwnerData)
    }
    function setDefaultOwner(newOwner){
        return defaultOwnerData = newOwner
    }
    ```

    做法
    1. 创建封装函数，在其中访问和更新变量
    2. 执行静态检查
    3. 逐一修改使用变量的代码，将其改成调用合适的封装函数
    4. 限制变量的可变性

    ```js
    let defaultOwnerData = {
        firstName: 'Mt',
        lastName: 'Fl'
    }
    function defaultOwner(){
        return Object.assign({}, defaultOwnerData)
    }
    function setDefaultOwner(newOwner){
        return defaultOwnerData = newOwner
    }
    ```

7. 变量改名
    取一个好的名字，是好的开始

    ```js
    let a = 'xy'
    a = 'dq'
    ```

    ```js
    let _name = 'xy'
    function name(){ return _name }
    function setName(name){ _name = name }
    ```

    做法
    1. 如果变量被广泛引用，则运用封装变量将其封装
    2. 找到使用该变量的代码，注意修改

    ```js
    let tpHd = '111';
    let result = ''
    result += `title: ${tpHd}\n`
    tpHd = '222';
    result += `title: ${tpHd}`
    ```

    ```js
    let _title = '111';
    let result = ''
    result += `title: ${title()}\n`
    tpHd = setTitle('222');
    result += `title: ${title()}`

    function title() { return _title }
    function setTitle(title) { _title = title }
    ```

8. 引入参数对象
    使用参数对象代替多个参数的情况

    ```js
    function readingsOutsideRange(station, min, max){
        return ...
    }
    ```

    ```js
    class Range { ... }
    function readingsOutsideRange(station, range){
        return ...
    }
    ```

    做法
    1. 如果暂时没有一个合适的数据结构，那就创建一个

    ```js
    let station = {
        name: 'ZB1',
        readings: [
            { temp: 47 },
            { temp: 53 },
            { temp: 28 },
            { temp: 53 },
            { temp: 61 },
        ],
    }
    const min = 30
    const max = 60
    function readingsOutsideRange(station, min, max){
        return station.readings.filter((r) => r.temp < min || r.temp > max)
    }
    let list = readingsOutsideRange(station, min, max)
    ```

    ```js
    class Range {
        constructor(min, max) {
            this.min = min
            this.max = max
        }
        contains(arg){
            return arg >= this.min && arg <= this.max
        }
    }
    function readingsOutsideRange(station, range){
        return station.readings.filter(r => !range.contains(r.temp))
    }
    let range = new Range(min, max)
    let list = readingsOutsideRange(station, range)
    ```

9.  函数组合成类
    一组函数形影不离的操作同一块数据，则这时候就可以组成一个类，这样可以少传递参数，简化调用

    ```js
    const reading = {...}
    function baseRate(month, year) { ... }
    const baseCharge = ...
    const base = ...
    ```

    ```js
    class Reading {
        ...
    }
    const aReading = new Reading(reading)
    ```

    做法
    1. 通过封装记录对多个函数共用的数据进行封装
    2. 对于使用该记录结构的每个函数，通过搬移函数将其移入新类
    3. 用于处理该数据记录的逻辑可以用提炼函数提炼出来移动到新类

    ```js
    const reading = {
        customer: 'xy',
        quantity: 10,
        month: 5,
        year: 2017
    }
    function baseRate(month, year) {
        return month * 0.1 + year * 0.15
    }
    function taxThreshold(year) {
        return year * 10
    }
    const baseCharge = baseRate(reading.month, reading.year) * reading.quantity
    const base = baseRate(reading.month, reading.year) * reading.quantity
    const taxableCharge = Math.max(0, base - taxThreshold(reading.year))
    const amount = calculateBaseCharge(reading)
    function calculateBaseCharge(aReading) {
        return baseRate(aReading.month, aReading.year) * aReading.quantity
    }
    ```

    ```js
    class Reading {
        constructor(data) {
            this._customer = data.customer
            this._quantity = data.quantity
            this._month = data.month
            this._year = data.year
        }
        get customer() { return this._customer }
        get quantity() { return this._quantity }
        get month() { return this._month }
        get year() { return this._year }
        get baseCharge(){ 
            return baseRate(this.month, this.year) * this.quantity
        }
        get taxableCharge(){
            return Math.max(0, this.baseCharge - taxThreshold(this.year))
        }
    }
    const aReading = new Reading(reading)
    const baseCharge = aReading.baseCharge
    const base = aReading.baseCharge
    const taxableCharge = aReading.taxableCharge
    const amount = aReading.baseCharge
    ```

10. 函数组合变换
    接受源数据作为输入，并派生出数据，将派生数据以字段形式填入输入输出数据
    
    ```js
    const reading = {...}
    function baseRate(month, year) { ... }
    const baseCharge = ...
    const base = ...
    ```

    ```js
    function clone(obj){ ... }
    function enrichReading(aReading){
        let result = clone(aReading)
        ...
        return result
    }
    const aReading = enrichReading(reading)
    ```

    做法
    1. 创建一个变换函数，输入参数是需要变换的记录，并直接返回该记录的值（注意这里最好是深复制）
    2. 提炼函数，将结果作为字段加入到增强对象中

    ```js
    const reading = {
        customer: 'xy',
        quantity: 10,
        month: 5,
        year: 2017
    }
    function baseRate(month, year) {
        return month * 0.1 + year * 0.15
    }
    function taxThreshold(year) {
        return year * 10
    }
    const baseCharge = baseRate(reading.month, reading.year) * reading.quantity
    const base = baseRate(reading.month, reading.year) * reading.quantity
    const taxableCharge = Math.max(0, base - taxThreshold(reading.year))
    const amount = calculateBaseCharge(reading)
    function calculateBaseCharge(aReading) {
        return baseRate(aReading.month, aReading.year) * aReading.quantity
    }
    ```

    ```js
    function clone(obj){
        return JSON.parse(JSON.stringify(obj))
    }
    function enrichReading(aReading){
        let result = clone(aReading)
        result.baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity
        result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(aReading.year))
        return result
    }
    const aReading = enrichReading(reading)
    const baseCharge = aReading.baseCharge
    const base = aReading.baseCharge
    const taxableCharge = aReading.taxableCharge
    const amount = aReading.baseCharge
    ```

11. 拆分阶段
    一段代码在同时处理两件不同的事情，将其拆分成各自独立的模块

    ```js
    function priceOrder() {
        ...
        return price
    }
    ```

    ```js
    function priceOrder() {
        const priceData = calculatePricingData()
        return applyShipping(priceData)
        function calculatePricingData(){
            return { ... }
        }
        function applyShipping(priceData){
            ...
        }
    }
    ```
    
    做法
    1. 将二阶段的代码提炼成独立的函数
    2. 引入一个中转的数据结构，将其作为参数添加提炼出新函数的参数列表
    3. 逐一检查提炼出“第二阶段的每个参数”，如果某个参数被第一阶段用到，就将其移入中转数据结构
    4. 对第一阶段的代码运用提炼函数，让提炼出的函数返回中转数据结构

    ```js
    /**
     * 
    * @param {{ basePrice: number, discountThreshold: number }} product 
    * @param {number} quantity 
    * @param {{discountThreshold: number, discountedFee: number, feePerCase: number}} shippingMethod 
    */
    function priceOrder(product, quantity, shippingMethod) {
        const basePrice = product.basePrice * quantity
        const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice
        const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase
        const shippingCost = quantity * shippingPerCase
        const price = basePrice - discount + shippingCost
        return price
    }
    ```

    ```js
    /**
    * 
    * @param {{ basePrice: number, discountThreshold: number }} product 
    * @param {number} quantity 
    * @param {{discountThreshold: number, discountedFee: number, feePerCase: number}} shippingMethod 
    */
    function priceOrder(product, quantity, shippingMethod) {
        const priceData = calculatePricingData(product, quantity)
        return applyShipping(priceData, shippingMethod)
        function calculatePricingData(product, quantity){
            const basePrice = product.basePrice * quantity
            const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice
            return { basePrice, quantity, discount }
        }
        function applyShipping(priceData, shippingMethod){
            const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase
            const shippingCost = priceData.quantity * shippingPerCase
            return priceData.basePrice - priceData.discount + shippingCost
        }
    }
    ```

## 封装

1. 封装记录
    用数据类取代记录型结构

    ```js
    const organization = { name:'Acme', country: "GB" }
    ```

    ```js
    class Organization {
        constructor(data){
            this._name = data.name
        }
        get name(){ return this._name }
        set name(name){ this._name = name }
    }
    const organization = new Organization({...})
    ```

    做法
    1. 对持有记录的变量使用封装变量，将其封装在一个函数中
    2. 创建一个类，将记录包装起来，并将记录变量的只替换成该类的一个实例，然后在类上定义访问和修改的函数
    3. 新建一个函数，让它返回该类的对象，而非原始记录
    4. 替换项目中的使用点

    ```js
    const organization = { name:'Acme', country: "GB" }
    let result = ''
    result += `<h1>${organization.name} : ${organization.country}</h1>\n`
    organization.name = '121'
    organization.country = '121'
    result += `<h1>${organization.name} : ${organization.country}</h1>`
    console.log(result)
    ```

    ```js
    class Organization {
        constructor(data){
            this._name = data.name
            this._country = data.country
        }
        get name(){ return this._name }
        get country(){ return this._country }
        set name(name){ this._name = name }
        set country(country){ this._country = country }
    }
    const organization = new Organization({ name:'Acme', country: "GB" })
    let result = ''
    result += `<h1>${organization.name} : ${organization.country}</h1>\n`
    organization.name = '121'
    organization.country = '121'
    result += `<h1>${organization.name} : ${organization.country}</h1>`
    console.log(result)
    ```

2. 封装集合
    对可变数据进行封装，不返回源数据
    
    ```js
    class Person {
        get courses() { return this._courses }
        set courses(courses) { this._courses = courses }
    }
    class Course {
        ...
    }
    ```
    ```js
    class Person {
        get courses() { return this._courses.slice() }
        set courses(courses) { this._courses = courses.slice() }
        addCourse(aCourse) { ... }
        removeCourse(aCourse) { ... }
    }
    class Course {
        ...
    }
    ```

    做法
    1. 如果集合对引用尚未封装，则先用封装变量封装
    2. 在类上增加用于增删对函数
    3. 查找集合的引用点，修改后测试
    4. 每次只返回一份只读的副本

    ```js
    class Person {
        constructor(name){
            this._name = name
            this._courses = []
        }
        get name(){return this._name }
        get courses() { return this._courses }
        set courses(courses) { this._courses = courses }
    }
    class Course {
        constructor(name, isAdvanced){
            this._name = name
            this._isAdvanced = isAdvanced
        }
        get name(){return this._name }
        get isAdvanced(){return this._isAdvanced }
    }
    const CoursesName = [{ name:'Math', isAdvanced: true }, { name:'Chinese', isAdvanced: true }, { name:'English', isAdvanced: false }]
    const p = new Person('xy')
    p.courses = CoursesName.map(({ name, isAdvanced }) => new Course(name, isAdvanced))
    p.courses.push(new Course('history', true)) // 无法监测的行为！
    ```

    ```js
    class Person {
        constructor(name){
            this._name = name
            this._courses = []
        }
        get name(){return this._name }
        get courses() { return this._courses.slice() }
        set courses(courses) { this._courses = courses.slice() }
        addCourse(aCourse) { this._courses.push(aCourse) }
        removeCourse(aCourse){
            const index = this._courses.indexOf(aCourse)
            if(index === -1) throw new RangeError("not in")
            this._courses.splice(index, 1)
        }
    }
    class Course {
        constructor(name, isAdvanced){
            this._name = name
            this._isAdvanced = isAdvanced
        }
        get name(){return this._name }
        get isAdvanced(){return this._isAdvanced }
    }
    const CoursesName = [{ name:'Math', isAdvanced: true }, { name:'Chinese', isAdvanced: true }, { name:'English', isAdvanced: false }]
    const history = new Course('history', true)
    const p = new Person('xy')
    p.courses = CoursesName.map(({ name, isAdvanced }) => new Course(name, isAdvanced))
    p.addCourse(history)
    p.removeCourse(history)
    ```

3. 以对象取代基本类型
    当基本数据类型不满足业务需求时，将其封装成类方便管理

    ```js
    class Order{
        get priority(){return this._priority }
    }
    const priorities = ['low', 'normal', 'high', 'rush']
    ```

    ```js
    class Order{
        constructor(data){
            this._priority = new Priority()
        }
    }
    class Priority{
        toString(){return this._value}
        static legalValues(){return ['low', 'normal', 'high', 'rush']}
    }
    const priorities = Priority.legalValues()
    ```

    做法
    1. 如果变量未被封装起来，则先封装变量
    2. 为数据值创建一个简单的类，保存数据并提供取值函数
    3. 修改第一步得到的设值函数，令其创建一个新类的对象将其存入字段
    4. 修改取值函数，令其调用新类的取值函数
    
    ```js
    class Order{
        constructor(data){
            this._priority = data.priority
        }
        get priority(){return this._priority }
    }
    const priorities = ['low', 'normal', 'high', 'rush']
    let orders = new Array(10).fill(0).map((item, index) => new Order({ priority: priorities[index % 4] }))
    console.log(orders.filter(item => item.priority === 'high' || item.priority === 'rush'))
    ```

    ```js
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
    ```

4. 以查询取代临时变量
    将临时变量中的计算逻辑移动到类/函数中，通过查询获取
    
    ```js
    class Order {
        get price() {
            let basePrice = ...
            let discountFactor = ...
            return basePrice * discountFactor
        }
    }
    ```

    ```js
    class Order {
        get price() {...}
        get basePrice() { ... }
        get discountFactor() {...}
    }
    ```

    做法
    1. 检查变量在是否完全计算完毕，是否存在副作用
    2. 如果变量不是只读的，可以先改造成只读变量
    3. 将变量赋值代码提炼成设值函数

    ```js
    class Order {
        constructor(quantity, item){
            this._quantity = quantity
            this._item = item
        }
        get price() {
            let basePrice = this._quantity * this._item.price
            let discountFactor = 0.98
            if(basePrice > 1000) discountFactor -= 0.03
            return basePrice * discountFactor
        }
    }
    ```

    ```js
    class Order {
        constructor(quantity, item){
            this._quantity = quantity
            this._item = item
        }
        get price() {
            return this.basePrice * this.discountFactor
        }
        get basePrice() { return this._quantity * this._item.price }
        get discountFactor() {
            let discountFactor = 0.98
            if(this.basePrice > 1000) discountFactor -= 0.03
            return discountFactor
        }
    }
    ```

5. 提炼类（内联类）
    将较大的类中的模块分离出去成为独立的类

    ```js
    class Person {
        ...
    }
    ```

    ```js
    class Person {
        constructor(name){
            this._telephoneNumber = new TelephoneNumber()
        }
    }
    class TelephoneNumber{
        ...
    }
    ```

    做法
    1. 决定如何分解类所负的责任
    2. 创建一个新的类，用以表现从旧类中分离出来的责任
    3. 构造旧类时创建一个新类的实例，建立联系
    4. 搬移字段，函数，去掉不再需要的函数接口

    ```js
    class Person {
        constructor(name){
            this._name = name
        }
        get name(){return this._name }
        get telephoneNumber(){return `(${this.officeAreaCode}) ${this.officeNumber}` }
        get officeAreaCode(){return this._officeAreaCode }
        set officeAreaCode(arg){return this._officeAreaCode = arg }
        get officeNumber(){return this._officeNumber }
        set officeNumber(arg){return this._officeNumber = arg }
    }
    ```

    ```js
    class Person {
        constructor(name){
            this._name = name
            this._telephoneNumber = new TelephoneNumber()
        }
        get name(){return this._name }
        get telephoneNumber(){return this._telephoneNumber.toString() }
        get officeAreaCode(){return this._telephoneNumber.areaCode }
        set officeAreaCode(arg){return this._telephoneNumber.areaCode = arg }
        get officeNumber(){return this._telephoneNumber.number }
        set officeNumber(arg){return this._telephoneNumber.number = arg }
    }
    class TelephoneNumber{
        get number(){return this._number}
        set number(arg){return this._number = arg}
        get areaCode(){return this._areaCode }
        set areaCode(arg){return this._areaCode = arg}
        toString(){return `(${this._areaCode}) ${this._number}`}
    }
    ```

6. 内联类（提炼类）
    当一个类不再承担足够的责任时，将其直接内联到引用其的类中
    
    ```js
    class Shipment {
        constructor(){
            this._trackingInformation = new TrackingInformation(company, number)
        }
    }
    class TrackingInformation {
        ...
    }
    ```

    ```js
    class Shipment {
        constructor(){
            ...
        }
        ... //TrackingInformation
    }
    ```

    做法
    1. 对于内联类中的所有函数，在目标类中创建对应的函数
    2. 修改源类函数所有的引用点，令其调用目标类对应的委托方法
    3. 将所有的函数数据移动到目标类中
    
    ```js
    class TrackingInformation {
        constructor(company, number){
            this._shippingCompany = company
            this._trackingNumber = number
        }
        get shippingCompany(){return this._shippingCompany}
        set shippingCompany(arg) {this._shippingCompany = arg}
        get trackingNumber(){return this._trackingNumber}
        set trackingNumber(arg) {this._trackingNumber = arg}
        get display(){ return `${this.shippingCompany} ${this.trackingNumber}` }
    }
    class Shipment {
        constructor(name, company, number){
            this._name = name
            this._trackingInformation = new TrackingInformation(company, number)
        }
        get trackingInfo(){return this._trackingInformation.display}
        get trackingInformation(){return this._trackingInformation}
    }
    ```

    ```js
    class Shipment {
        constructor(name, company, number){
            this._name = name
            this._shippingCompany = company
            this._trackingNumber = number
        }
        get shippingCompany(){return this._shippingCompany}
        set shippingCompany(arg) {this._shippingCompany = arg}
        get trackingNumber(){return this._trackingNumber}
        set trackingNumber(arg) {this._trackingNumber = arg}
        get trackingInfo(){ return `${this.shippingCompany} ${this.trackingNumber}` }
        get trackingInformation(){return { _shippingCompany: this.shippingCompany, _trackingNumber: this._trackingNumber}}
    }
    ```

7. 隐藏委托关系（移除中间人）
    隐藏跨级引用的情况，增加快速访问的接口

    ```js
    class Person {
        get department(){return this._department }
    }
    class Department {
        get chargeCode(){return this._chargeCode }
    }
    ```

    ```js
    class Person {
        get manager(){return this._department.manager }
    }
    class Department {
        get manager(){return this._manager}
    }
    ```

    做法
    1. 对于每个委托关系的函数，在服务对象端建立一个简单的委托函数
    2. 调整客户端，令其调用服务对象提供的函数

    ```js
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
        get department(){return this._department }
        set department(arg){this._department = arg}
    }
    class Department {
        get chargeCode(){return this._chargeCode}
        set chargeCode(arg){this._chargeCode = arg}
        get manager(){return this._manager}
        set manager(arg){this._manager = arg}
    }
    ```

    ```js
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
        set department(arg){this._department = arg}
        get manager(){return this._department.manager }
    }
    class Department {
        get chargeCode(){return this._chargeCode}
        set chargeCode(arg){this._chargeCode = arg}
        get manager(){return this._manager}
        set manager(arg){this._manager = arg}
    }
    ```

7. 移除中间人（隐藏委托关系）
    类中存在大量的委托函数，服务类变成类一个中间人

    ```js
    class Person {
        get manager(){return this._department.manager }
    }
    class Department {
        get manager(){return this._manager}
    }
    ```

    ```js
    class Person {
        get department(){return this._department }
    }
    class Department {
        get chargeCode(){return this._chargeCode }
    }
    ```

    做法
    1. 为受托对象创建一个取值函数
    2. 对于每个委托函数，是客户端转为连续的调用访问

    ```js
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
        set department(arg){this._department = arg}
        get manager(){return this._department.manager }
        get chargeCode(){return this._department.chargeCode}
    }
    class Department {
        get chargeCode(){return this._chargeCode}
        set chargeCode(arg){this._chargeCode = arg}
        get manager(){return this._manager}
        set manager(arg){this._manager = arg}
    }
    ```

    ```js
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
        get department(){return this._department }
        set department(arg){this._department = arg}
    }
    class Department {
        get chargeCode(){return this._chargeCode}
        set chargeCode(arg){this._chargeCode = arg}
        get manager(){return this._manager}
        set manager(arg){this._manager = arg}
    }
    ```

9. 替换算法
    使用更清晰的方式替换复杂的方式

    ```js
    function findPerson(people){
        for(let i = 0; i < people.length; i++){
            if(people[i] === 'Don') return 'Don'
        }
        return ''
    }
    ```

    ```js
    function findPerson(people) {
        return people.find(p => ['Don'].includes(p)) || ''
    }
    ```
    
    做法
    1. 整理代替换的算法，确保它以及被抽取到一个独立的函数中
    2. 为函数准备测试，固定其行为
    3. 准备好另一个算法进行替换

    ```js
    function findPerson(people){
        for(let i = 0; i < people.length; i++){
            if(people[i] === 'Don') return 'Don'
            if(people[i] === 'Join') return 'Join'
            if(people[i] === 'Kent') return 'Kent'
        }
        return ''
    }
    ```

    ```js
    function findPerson(people) {
        const candidates = ['Don', 'Join', 'Kent']
        return people.find(p => candidates.includes(p)) || ''
    }
    ```

## 搬移特性

1. 搬移函数
    合理的把函数放置在它应该出现的位置
    
    ```js
    function trackSummary(points){
        ...
        function distance(p1, p2){...}
    }
    ```

    ```js
    function trackSummary(points){ ... }
    function distance(p1, p2){...}
    ```

    做法
    1. 检查函数在当前上下文引用的元素，考虑是否将他们一起搬移
    2. 检查待搬移函数是否具有多态性
    3. 将函数复制一份到目标的上下文中，调整函数

    ```js
    function trackSummary(points){
        const totalTime = calculateTime()
        const totalDistance = calculateDistance()
        const pace = totalTime / 60 / totalDistance
        return {
            time: totalTime,
            distance: totalDistance,
            pace
        }
        function calculateDistance(){
            let result = 0
            for(let i = 1; i < points.length; i++){
                result += distance(points[i - 1], points[i])
            }
            return result
        }
        function distance(p1, p2){
            const EARTH_RADIUS = 3959
            const dLat = radians(p2.lat) - radians(p1.lat)
            const dLon = radians(p2.lon) - radians(p1.lon)
            const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(radians(p2.lat)) * Math.cos(radians(p1.lat)) * Math.pow(Math.sin(dLon / 2), 2)
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            return EARTH_RADIUS * c
        }
        function radians(degrees){
            return degrees * Math.PI / 180
        }
        function calculateTime(){
            return 6
        }
    }
    ```

    ```js
    function trackSummary(points){
        const totalTime = calculateTime()
        const distance = totalDistance(points)
        const pace = totalTime / 60 / distance
        return {
            time: totalTime,
            distance,
            pace
        }
        function calculateTime(){
            return 6
        }
    }
    function totalDistance(points){
        let result = 0
        for(let i = 1; i < points.length; i++){
            result += distance(points[i - 1], points[i])
        }
        return result
    }
    function distance(p1, p2){
        const EARTH_RADIUS = 3959
        const dLat = radians(p2.lat) - radians(p1.lat)
        const dLon = radians(p2.lon) - radians(p1.lon)
        const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(radians(p2.lat)) * Math.cos(radians(p1.lat)) * Math.pow(Math.sin(dLon / 2), 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return EARTH_RADIUS * c
    }
    function radians(degrees){
        return degrees * Math.PI / 180
    }
    ```

2. 搬移字段
    如果更新一个字段，需要同时在几个结构中进行修改，则表明该字段需要被搬移到一个集中的地点

    ```js
    class Customer {
        constructor(name, discountRate){
            this._discountRate = discountRate
            this._contact = new Contact()
        }
    }
    class Contact { ... }
    ```
    
    ```js
    class Customer {
        constructor(name, discountRate){
            this._contact = new Contact(discountRate)
        }
    }
    class Contact {
        constructor(discountRate){
            this._discountRate = discountRate
        }
    }
    ```

    做法
    1. 确保源字段已经得到良好封装
    2. 在目标对象上创建一个字段
    3. 确保源对象能正常引用目标对象
    4. 调整源对象的访问函数，令其使用目标对象的字段

    ```js
    class Customer {
        constructor(name, discountRate){
            this._name = name
            this._discountRate = discountRate
            this._contact = new Contact()
        }
        get discountRate(){return this._discountRate}
        becomePreferred(){
            return this._discountRate += 0.03
        }
        applyDiscount(amount){
            return amount - amount * this.discountRate
        }
    }
    class Contact {
        constructor(){
            this._startDate = new Date()
        }
    }
    ```

    ```js
    class Customer {
        constructor(name, discountRate){
            this._name = name
            this._contact = new Contact(discountRate)
        }
        get discountRate(){return this._contact.discountRate}
        _setDiscountRate(aNumber){return this._contact.discountRate = aNumber}
        becomePreferred(){
            return this._setDiscountRate(this._contact.discountRate += 0.03)
        }
        applyDiscount(amount){
            return amount - amount * this.discountRate
        }
    }
    class Contact {
        constructor(discountRate){
            this._startDate = new Date()
            this._discountRate = discountRate
        }
        get discountRate(){return this._discountRate}
        set discountRate(arg){this._discountRate = arg}
    }
    ```

3. 搬移语句到函数（搬移语句到调用者）
    某些语句与一个函数放在一起更加像一个整体的时候，就可以将其搬移到函数中

    ```js
    function renderPerson(person){
        [`<p>title: ${aPhoto.title}</p>`, ...emitPhotoData(person.photo)]
    }
    function emitPhotoData(aPhoto){
        return [`<p>date: ${aPhoto.date}</p>`]
    }
    function renderPhoto(aPhoto){
        return [`<p>title: ${aPhoto.title}</p>`,
            `<p>date: ${aPhoto.date}</p>`].join('/n')
    }
    ```

    ```js
    function renderPerson(person){
        [...emitPhotoData(person.photo)]
    }
    function emitPhotoData(aPhoto){
        return [`<p>title: ${aPhoto.title}</p>`, `<p>date: ${aPhoto.date}</p>`]
    }
    function renderPhoto(aPhoto){
        return [...emitPhotoData(person.photo)].join('/n')
    }
    ```

    做法
    1. 如果重复的代码距离目标函数有些距离，先用移动语句
    2. 如果目标函数仅被唯一一个源函数调用，则只需要将源函数中重复的代码段剪切复制到函数中
    3. 如果由多个调用点，则先选择对一个调用点应用提炼函数，将待搬移语句与目标函数提炼成一个新函数

    ```js
    function renderPerson(person){
        const result = []
        result.push(`<p>${person.name}</p>`)
        result.push(renderPhoto(person.photo))
        result.push(`<p>title: ${person.photo.title}</p>`)
        result.push(emitPhotoData(person.photo))
        return result.join('\n')
    }
    function emitPhotoData(aPhoto){
        const result = []
        result.push(`<p>location: ${aPhoto.location}</p>`)
        result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`)
        return result.join('\n')
    }
    function renderPhoto(aPhoto){
        const result = []
        result.push(`<p>name: ${aPhoto.name}</p>`)
        result.push(`<p>color: ${aPhoto.color}</p>`)
        return result.join('\n')
    }
    function renderDiv(person){
        return [
            "<div>", 
            `<p>title: ${person.photo.title}</p>`,
            emitPhotoData(person.photo),
            "</div>"
        ].join('\n')
    }
    ```

    ```js
    function renderPerson(person){
        const result = []
        result.push(`<p>${person.name}</p>`)
        result.push(renderPhoto(person.photo))
        result.push(emitPhotoData(person.photo))
        return result.join('\n')
    }
    function renderPhoto(aPhoto){
        const result = []
        result.push(`<p>name: ${aPhoto.name}</p>`)
        result.push(`<p>color: ${aPhoto.color}</p>`)
        return result.join('\n')
    }
    function renderDiv(person){
        const result = ["<div>", emitPhotoData(person.photo), "</div>"]
        return result.join('\n')
    }
    function emitPhotoData(aPhoto) {
        return [
            `<p>title: ${aPhoto.title}</p>`,
            `<p>location: ${aPhoto.location}</p>`,
            `<p>date: ${aPhoto.date.toDateString()}</p>`
        ].join('\n')
    }
    ```

4. 搬移语句到调用者（搬移语句到函数）
    当函数边界发生偏移，在某些调用点表现出不同的行为

    ```js
    function renderPerson(person){
        [...emitPhotoData(person.photo)]
    }
    function emitPhotoData(aPhoto){
        return [`<p>title: ${aPhoto.title}</p>`, `<p>date: ${aPhoto.date}</p>`]
    }
    function renderPhoto(aPhoto){
        return [...emitPhotoData(person.photo)].slice(1).join('/n')
    }
    ```    

    ```js
    function renderPerson(person){
        [`<p>title: ${aPhoto.title}</p>`, ...emitPhotoData(person.photo)]
    }
    function emitPhotoData(aPhoto){
        return [`<p>date: ${aPhoto.date}</p>`]
    }
    function renderPhoto(aPhoto){
        return [...emitPhotoData(aPhoto)].join('/n')
    }
    ```

    做法
    1. 如果源函数很简单，且调用者也不多，则只需把要搬移的代码复制回去
    2. 若调用点不止一个，则先用提炼函数把不想搬移的代码提炼成一个新函数
    3. 对源函数应用内联函数，对提炼函数进行修改

    ```js
    function renderPerson(person){
        const result = []
        result.push(`<p>${person.name}</p>`)
        result.push(renderPhoto(person.photo))
        result.push(emitPhotoData(person.photo))
        return result.join('\n')
    }
    function renderPhoto(aPhoto){
        const result = []
        result.push(`<p>name: ${aPhoto.name}</p>`)
        result.push(`<p>color: ${aPhoto.color}</p>`)
        return result.join('\n')
    }
    function renderDiv(person){
        const result = ["<div>", emitPhotoData(person.photo), "</div>"]
        return result.join('\n')
    }
    function emitPhotoData(aPhoto) {
        return [
            `<p>title: ${aPhoto.title}</p>`,
            `<p>location: ${aPhoto.location}</p>`,
            `<p>date: ${aPhoto.date.toDateString()}</p>`
        ].join('\n')
    }
    ```

    ```js
    function renderPerson(person){
        const result = []
        result.push(`<p>${person.name}</p>`)
        result.push(renderPhoto(person.photo))
        result.push(emitPhotoData(person.photo))
        result.push(`<p>location: ${person.photo.location}</p>`)
        return result.join('\n')
    }
    function renderPhoto(aPhoto){
        const result = []
        result.push(`<p>name: ${aPhoto.name}</p>`)
        result.push(`<p>color: ${aPhoto.color}</p>`)
        return result.join('\n')
    }
    function renderDiv(person){
        const result = ["<div>", 
        emitPhotoData(person.photo),
        `<p>location: ${person.photo.location}</p>`,
        "</div>"]
        return result.join('\n')
    }
    function emitPhotoData(aPhoto) {
        return [
            `<p>title: ${aPhoto.title}</p>`,
            `<p>date: ${aPhoto.date.toDateString()}</p>`
        ].join('\n')
    }
    ```

5. 函数调用取代内联代码
    通过函数的方式去消除重复的逻辑
    ```js
    let appliesToMass = false;
    let states = ['MA']
    for(let s of states) {
        if(s === 'MA') appliesToMass = true;
    }
    ```
    
    ```js
    let states = ['MA']
    let appliesToMass = states.includes('MA');
    ```

    做法
    1. 内联代码替代为对一个既有函数的调用
    
    ```js
    let appliesToMass = false;
    let states = ['MA']
    for(let s of states) {
        if(s === 'MA') appliesToMass = true;
    }
    ```

    ```js
    let states = ['MA']
    let appliesToMass = states.includes('MA');
    ```

6. 移动语句
    让存在关联的代码一起出现，使代码更加容易理解
    
    ```js
    if(stack.length === 0){
        ...
        stack.push(i)
    }else{
        ...
        stack.push(i)
    }
    ```
    
    ```js
    if(stack.length === 0){
        ...
    }else{
        ...
    }
    stack.push(i)
    ```

    做法
    1. 确定待移动的代码片段应该搬完何处，搬移后是否会影响正常工作
    2. 搬移代码
    
    ```js
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
    ```

    ```js
    let result, stack = []
    for(let i = 0; i < 5; i++){
        if(stack.length === 0){
            result = 0
        }else{
            result = stack[stack.length - 1]
        }
        stack.push(i)
    }
    ```

7. 拆分循环
    拆分身兼多职的循环，让代码更加易读
    ```js
    for (const p of people) {
        if(p.age < youngest) youngest = p.age
        totalSalary += p.salary
    }
    ```
    
    ```js
    let youngest = Math.min(...people.map(p => p.age))
    let totalSalary = people.reduce((prev, item) => prev + item.salary, 0)
    ```

    做法
    1. 复制一遍循环代码
    2. 识别移除循环中的重复代码，使得每个循环只做一件事
    3. 拆分后使用提炼函数

    ```js
    const people = [
        { age: 20, salary: 10000 },
        { age: 30, salary: 10000 },
        { age: 25, salary: 20000 },
        { age: 22, salary: 50000 },
        { age: 26, salary: 60000 },
    ]
    let youngest = people[0] ? people[0].age : Infinity;
    let totalSalary = 0
    for (const p of people) {
        if(p.age < youngest) youngest = p.age
        totalSalary += p.salary
    }
    ```

    ```js
    let youngest = Math.min(...people.map(p => p.age))
    let totalSalary = people.reduce((prev, item) => prev + item.salary, 0)
    ```

8. 管道取代循环
    使用管道优化迭代结构，可读性更强

    ```js
    function acquireData(input) {
        for (const line of lines) {
           ...
        }
    }
    ```
    
    ```js
    function acquireData(input) {
        lines.slice(1).filter(line => line.trim() !== '')...
    }
    ```
    
    做法
    1. 创建一个新变量，用于存放和参与循环过程的集合
    2. 从顶部开始，将循环每一块行为都搬移出来，在上一步创建的集合变量用一种管道运算替代

    ```js
    const input = `office, country, telephone

    Chicago, USA, +1 312 373 1000
    Beijing, China, +86 4000 900 505
    Chicago, USA, +1 312 373 1000
    Beijing, China, +86 4000 900 505
    Chicago, USA, +1 312 373 1000
    Beijing, China, +86 4000 900 505`;
    function acquireData(input) {
        const lines = input.split('\n')
        let firstLine = true
        const result = []
        for (const line of lines) {
            if(firstLine) {
                firstLine = false
                continue
            }
            if(line.trim() === '') continue
            const record = line.split(',')
            if(record[1].trim() === 'China'){
                result.push({
                    city: record[0].trim(),
                    phone: record[2].trim(),
                })
            }
        }
        return result
    }
    ```

    ```js
    function acquireData(input) {
        const lines = input.split('\n')
        return lines
                .slice(1)
                .filter(line => line.trim() !== '')
                .map(line => line.split(','))
                .filter(record => record[1].trim() === 'China')
                .map(record => ({
                    city: record[0].trim(),
                    phone: record[2].trim(),
                }))
    }
    ```

9. 移除死代码
    没用的东西大胆删除了他，不然越来越多

## 重新组织数据

1. 拆分变量
    一个变量只承担一种责任    

    ```js
    function distanceTravelled(){
        let acc = 0
        acc = ''
    }
    ```

    ```js
    function distanceTravelled(){
        let acc = 0
        let str = ''
    }
    ```

    做法
    1. 在待分解变量的声明及其第一次被赋值处，修改其名称
    2. 如果可能的话，把新变量声明为不可修改
    3. 以该变量的第二次赋值动作为分解，修改此前对该变量的引用，引用新变量

    ```js
    function distanceTravelled(scenario, time){
        let result
        let acc = scenario.primaryForce / scenario.mass
        let primaryTime = Math.min(time, scenario.delay)
        result = 0.5 * acc * primaryTime * primaryTime
        let secondTime = time - scenario.delay
        if(secondTime > 0){
            let primaryVelocity = acc * scenario.delay
            acc = (scenario.primaryForce + scenario.secondForce) / scenario.mass
            result += primaryVelocity * secondTime + 0.5 * acc * secondTime * secondTime
        }
        return result
    }
    ```

    ```js
    function distanceTravelled(scenario, time){
        let result
        let primaryAcceleration = scenario.primaryForce / scenario.mass
        let primaryTime = Math.min(time, scenario.delay)
        result = 0.5 * primaryAcceleration * primaryTime * primaryTime
        let secondTime = time - scenario.delay
        if(secondTime > 0){
            let primaryVelocity = primaryAcceleration * scenario.delay
            let secondaryAcceleration = (scenario.primaryForce + scenario.secondForce) / scenario.mass
            result += primaryVelocity * secondTime + 0.5 * secondaryAcceleration * secondTime * secondTime
        }
        return result
    }
    ```

2. 字段改名
    将不符合语义的字段名改为更加贴切的名字
     ```js
    const organization = { name: 'Acme', country: 'GB' }
    ```

    ```js
    class Organization {
        constructor(data){
            this._title = data.title || data.name
        }
        get title() {return this._title }
        set title(title) {this._title = title}
    }
    ```
    做法
    1. 如果记录未封装，则先封装记录
    2. 对字段改名，并将引用处同步更新

    ```js
    const organization = { name: 'Acme', country: 'GB' }
    ```

    ```js
    class Organization {
        constructor(data){
            this._title = data.title || data.name
            this._country = data.country
        }
        get title() {return this._title }
        set title(title) {this._title = title}
        get country() {return this._country}
        set country(country) {this._country = country}
    }
    const organization =  new Organization({ name: 'Acme', country: 'GB' })
    ```

3. 以查询取代派生变量
    可变对数据是软件中最大对错误源头，对数据对修改常常导致代码各个部分以丑陋的形式互相耦合

    ```js
    class ProductionPlan {
        constructor(adjustments){
            this._adjustments = adjustments
            this._production = this._adjustments.reduce((prev, item) => prev + item.amount, 0)
        }
        get production(){return this._production}
        applyAdjustment(anAdjustment){
            this._adjustments.push(anAdjustment)
            this._production += anAdjustment.amount
        }
    }
    ```
    
    ```js
    class ProductionPlan {
        constructor(adjustments){
            this._adjustments = adjustments
        }
        get production(){return this._adjustments.reduce((prev, item) => prev + item.amount, 0)}
        applyAdjustment(anAdjustment){
            this._adjustments.push(anAdjustment)
        }
    }
    ```
    
    做法
    1. 识别出所有对变量做更新的地方
    2. 新建一个函数用于计算该变量的值

    ```js
    class ProductionPlan {
        constructor(adjustments){
            this._adjustments = adjustments
            this._production = this._adjustments.reduce((prev, item) => prev + item.amount, 0)
        }
        get production(){return this._production}
        applyAdjustment(anAdjustment){
            this._adjustments.push(anAdjustment)
            this._production += anAdjustment.amount
        }
    }
    ```

    ```js
    class ProductionPlan {
        constructor(adjustments){
            this._adjustments = adjustments
        }
        get production(){return this._adjustments.reduce((prev, item) => prev + item.amount, 0)}
        applyAdjustment(anAdjustment){
            this._adjustments.push(anAdjustment)
        }
    }
    ```

4. 将引用对象改为值对象（将值对象改成引用对象）
    更新一个引用对象的属性值，直接替换整个内部对象
    ```js
    class Person {
        constructor(){
            this._tele = new TelephoneNumber()
        }
    }
    class Tele{...}
    ```

    ```js
    class Person {
        set officeAreaCode(arg){return this._tele = new Tele() }
        set officeNumber(arg){return this._tele = new Tele() }
    }
    class Tele{...}
    ```

    做法
    1. 检查重构目标是否为不可变的对象，或者是否修改为不可变对象
    2. 修改对象中的设值函数，创建一个新的对象

    ```js
    class Person {
        constructor(name){
            this._name = name
            this._telephoneNumber = new TelephoneNumber()
        }
        get name(){return this._name }
        get telephoneNumber(){return this._telephoneNumber.toString() }
        get officeAreaCode(){return this._telephoneNumber.areaCode }
        set officeAreaCode(arg){return this._telephoneNumber.areaCode = arg }
        get officeNumber(){return this._telephoneNumber.number }
        set officeNumber(arg){return this._telephoneNumber.number = arg }
    }
    class TelephoneNumber{
        get number(){return this._number}
        set number(arg){return this._number = arg}
        get areaCode(){return this._areaCode }
        set areaCode(arg){return this._areaCode = arg}
        toString(){return `(${this._areaCode}) ${this._number}`}
    }
    ```

    ```js
    class Person {
        constructor(name){
            this._name = name
        }
        get name(){return this._name }
        get telephoneNumber(){return this._telephoneNumber.toString() }
        get officeAreaCode(){return this._telephoneNumber.areaCode }
        set officeAreaCode(arg){return this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber) }
        get officeNumber(){return this._telephoneNumber.number }
        set officeNumber(arg){return this._telephoneNumber = new TelephoneNumber(this.areaCode, arg) }
    }
    class TelephoneNumber{
        constructor(areaCode, number){
            this._areaCode = areaCode
            this._number = number
        }
        get number(){return this._number}
        get areaCode(){return this._areaCode }
        toString(){return `(${this._areaCode}) ${this._number}`}
    }
    ```

5. 将值对象改成引用对象（将引用对象改为值对象）
    过多的副本会难以维护，可以创建一个仓库存储

    ```js
    class Order {
        constructor(data){
            this._customer = new Customer(data.customer)
        }
    }
    class Customer {}
    ```
    
    ```js
    let _repository = {}
    _repository.customer = new Map()
    function registerCustomer(id){
        if(!_repository.customer.has(id)){
            _repository.customer.set(id, new Customer(id))
        }
        return findCustomer(id)
    }
    function findCustomer(id){
        return _repository.customer.get(id)
    }
    class Order {
        constructor(data){
            this._customer = registerCustomer(data.customer)
        }
    }
    class Customer {}
    ```

    做法
    1. 为相关的对象创建一个仓库
    2. 确保构造函数有办法找到关联对象的正确实例
    3. 修改宿主对象的构造函数，令其从仓库中获取关联对象
    
    ```js
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
    ```

    ```js
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
    ```

## 简化条件逻辑

1. 分解条件表达式
    把复杂的条件表达式分解成多个独立的函数

    ```js
    function price(){
        ...
        if(aDate.isSummer || aDate.isSpring){
            charge = quantity * aPlan.summerRate
        }else{
            charge = quantity * aPlan.rate
        }
        ...
    }
    ```
    
    ```js
    function price(aDate, aPlan){
        ...
        return summerOrSpring() ? summerCharge() : orderCharge()
        function summerOrSpring(){...}
        function summerCharge(){...}
        function orderCharge(){...}
    }
    ```

    做法
    1. 对条件判断和每个条件分支都使用提炼函数

    ```js
    function price(aDate, aPlan){
        let charge
        let quantity = 100
        if(aDate.isSummer || aDate.isSpring){
            charge = quantity * aPlan.summerRate
        }else{
            charge = quantity * aPlan.rate
        }
        return charge
    }
    ```

    ```js
    function price(aDate, aPlan){
        let quantity = 100
        return summerOrSpring() ? summerCharge() : orderCharge()
        function summerOrSpring(){
            return aDate.isSummer || aDate.isSpring
        }
        function summerCharge(){
            return quantity * aPlan.summerRate
        }
        function orderCharge(){
            return quantity * aPlan.rate
        }
    }
    ```

2. 合并条件表达式
    把相同返回的条件合并成一处
    ```js
    if(state == 1) return 0
    if(start == 2) return 0
    return 1
    ```
    
    ```js
    if(state == 1 || start == 2) return 0
    return 1
    ```

    做法
    1. 确定条件表达式没有副作用
    2. 使用适当的运算符合并
    
    ```js
    if(state == 1) return 0
    if(start == 2) return 0
    if(end == 3) return 0
    return 1
    ```

    ```js
    if(state == 1 || start == 2 || end == 3) return 0
    return 1
    ```

3.  以卫语句取代嵌套条件表达式
    多层的嵌套判断会减低可读性，可以使用卫语句进行提前返回

    ```js
    function payAmount(employee){
        if(employee.isSeparated){
            ...
        }else{
            if(employee.isRetired){
                ...
            }else{
                ...
            }
        }
    }
    ```

    ```js
    function payAmount(employee){
        if(employee.isSeparated) return 
        if(employee.isRetired) return 
        return 
    }
    ```

    做法
    1. 选中外层需要被替换的条件逻辑，替换成卫语句

    ```js
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
    ```

    ```js
    function payAmount(employee){
        if(employee.isSeparated) return {amount: 0, reasonCode: 'SEP'}
        if(employee.isRetired) return {amount: 0, reasonCode: 'RET'}
        return {amount: 1000, reasonCode: ''}
    }
    ```

4. 以多态取代条件表达式
    通过类的多态去改善比较复杂的条件表达式
    ```js
    class Bird {
        constructor(name, type){
            switch (bird.type){
                case 'E': this.plumage = 'e'
                case 'N': this.plumage = 'n'
                default: this.plumage = 'unknown'
            }
        }
    }
    ```

    ```js
    class Bird {
        get plumage(){
            return 'unknown'
        }
    }
    class E extends Bird{
        get plumage(){
            return 'e'
        }
    }
    class N extends Bird{
        get plumage(){
            return 'n'
        }
    }
    function createBird(...arg){
        switch (arg[1]){
            case 'E': return new E(...arg);
            case 'N': return new N(...arg);
            default: return new Bird(...arg);
        }
    }
    ```

    做法
    1. 如果现有的类不具备多态行为，就用工厂模式创建
    2. 在调用方代码中使用工程函数获得对象实例
    3. 将带有条件逻辑的函数移动到超类中
    4. 任选一个子类，在其中创建一个函数，使其复写超类中容纳条件表达式的那个函数
    5. 将于该子类相关的条件表达式分支复制到新函数中
    6. 处理完后将超类的函数声明为抽象函数

    ```js
    function plumages(birds){
        return new Map(birds.map(b => [b.name, b.plumage]))
    }
    function speeds(birds){
        return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]))
    }
    function plumage(bird){
        switch (bird.type){
            case 'E': return 'a'
            case 'A': return bird.counts > 2 ? 't' : 'a'
            case 'N': return bird.voltage > 100 ? 's' : 'b'
            default: return 'unknown'
        }
    }
    function airSpeedVelocity(bird){
        switch (bird.type){
            case 'E': return 35
            case 'A': return 40 - bird.counts
            case 'N': return bird.voltage / 10 + 10
            default: return null
        }
    }
    class Bird {
        constructor(name, type, counts, voltage){
            this.name = name
            this.type = type
            this.counts = counts
            this.voltage = voltage
            this.plumage = plumage(this)
        }
    }
    ```

    ```js
    function plumages(birds){
        return new Map(birds.map(b => [b.name, b.plumage]))
    }
    function speeds(birds){
        return new Map(birds.map(b => [b.name, b.airSpeedVelocity]))
    }
    class Bird {
        constructor(name, type, counts, voltage){
            this.name = name
            this.type = type
            this.counts = counts
            this.voltage = voltage
        }
        get plumage(){
            return 'unknown'
        }
        get airSpeedVelocity(){
            return null
        }
    }
    class E extends Bird{
        get plumage(){
            return 'a'
        }
        get airSpeedVelocity(){
            return 35
        }
    }
    class A extends Bird{
        get plumage(){
            return this.counts > 2 ? 't' : 'a'
        }
        get airSpeedVelocity(){
            return 40 - this.counts
        }
    }
    class N extends Bird{
        get plumage(){
            this.voltage > 100 ? 's' : 'b'
        }
        get airSpeedVelocity(){
            return this.voltage / 10 + 10
        }
    }
    function createBird(...arg){
        switch (arg[1]){
            case 'E': return new E(...arg);
            case 'A': return new A(...arg);
            case 'N': return new N(...arg);
            default: return new Bird(...arg);
        }
    }
    ```

    ```js
    function rating(voyage, history){
        const vpf = voyageProfitFactor(voyage, history)
        const vr = voyageRisk(voyage)
        const chr = captainHistoryRisk(voyage, history)
        if(vpf * 3 > (vr + chr * 2)) return 'A'
        return 'B'
    }
    function voyageRisk(voyage){
        let result = 1
        if(voyage.length > 4) result += 2
        if(voyage.length > 8) result += voyage.length - 8
        if(['china', 'east-indies'].includes(voyage.zone)) result += 4
        return Math.max(result, 0)
    }
    function captainHistoryRisk(voyage, history){
        let result = 1
        if(history.length < 5) result += 4
        result += history.filter(v => v.profit < 0).length
        if(voyage.zone === 'china' && hasChina(history)) result -= 2
        return Math.max(result, 0)
    }
    function hasChina(history) {
        return history.some(v => v.zone === 'china')
    }
    function voyageProfitFactor(voyage, history){
        let result = 2
        if(voyage.zone === 'china') result += 1
        if(voyage.zone === 'east-indies') result += 1
        if(voyage.zone === 'china' && hasChina(history)){
            result += 3
            if(history.length > 10) result += 1
            if(voyage.length > 12) result += 1
            if(voyage.length > 18) result -= 1
        }else{
            if(history.length > 8) result += 1
            if(voyage.length > 14) result -= 1
        }
        return result
    }
    const voyage = { zone: 'west-indies', length: 10 }
    const history = [
        { zone: 'east-indies', profit: 5 },
        { zone: 'west-indies', profit: 15 },
        { zone: 'china', profit: -2 },
        { zone: 'west-africa', profit: 7 }
    ]
    console.log(rating(voyage, history))
    ```

    ```js
    function rating(voyage, history){
        return createRating(voyage, history).value
    }
    function createRating(voyage, history){
        if(voyage.zone === 'china' && history.some(v => v.zone === 'china')) return new ExperienceChinaRating(voyage, history)
        return new Rating(voyage, history)
    }
    class Rating {
        constructor(voyage, history){
            this.voyage = voyage
            this.history = history
        }
        get value(){
            const vpf = this.voyageProfitFactor
            const vr = this.voyageRisk
            const chr = this.captainHistoryRisk
            if(vpf * 3 > (vr + chr * 2)) return 'A'
            return 'B'
        }
        get voyageProfitFactor(){
            let result = 2
            if(this.voyage.zone === 'china') result += 1
            if(this.voyage.zone === 'east-indies') result += 1
            result += this.historyLengthFactor
            result += this.voyageLengthFactor
            return result
        }
        get voyageLengthFactor(){
            return this.voyage.length > 14 ? 1 : 0
        }
        get historyLengthFactor(){
            return this.history.length > 8 ? 1 : 0
        }
        get voyageRisk(){
            let result = 1
            if(this.voyage.length > 4) result += 2
            if(this.voyage.length > 8) result += this.voyage.length - 8
            if(['china', 'east-indies'].includes(this.voyage.zone)) result += 4
            return Math.max(result, 0)
        }
        get captainHistoryRisk(){
            let result = 1
            if(this.history.length < 5) result += 4
            result += this.history.filter(v => v.profit < 0).length
            return Math.max(result, 0)
        }
    }
    class ExperienceChinaRating extends Rating{
        get captainHistoryRisk(){
            const result = super.captainHistoryRisk - 2
            return result
        }
        get voyageProfitFactor(){
            return super.voyageProfitFactor + 3
        }
        get voyageLengthFactor(){
            let result = 0
            if(this.voyage.length > 12) result += 1
            if(this.voyage.length > 18) result -= 1
            return result
        }
        get historyLengthFactor(){
            return this.history.length > 10 ? 1 : 0
        }
    }
    const voyage = { zone: 'west-indies', length: 10 }
    const history = [
        { zone: 'east-indies', profit: 5 },
        { zone: 'west-indies', profit: 15 },
        { zone: 'china', profit: -2 },
        { zone: 'west-africa', profit: 7 }
    ]
    console.log(rating(voyage, history))
    ```

5. 引入特例
    将多个相同的特殊情况取值收拢于一处
    ```js
    function customerName(aCustomer){
        if(aCustomer.toString() === 'unknown') return 'occupant'
        return aCustomer.name
    }
    class Customer {
        toString() {
            return this.name || 'unknown'
        }
    }
    ```

    ```js
    function customerName(aCustomer){
        return aCustomer.name
    }
    class Customer {
        toString() {
            return this.name || 'unknown'
        }
    }
    const customer = enrichCustomer(new Customer())
    function enrichCustomer(aCustomer){
        const unknownCustomer = {
            name: 'occupant',
        }
        if(aCustomer.toString() === 'unknown') return unknownCustomer
        return aCustomer
    }
    ```
    
    做法
    1. 给重构目标添加检查特例的属性，令其返回false
    2. 创建一个特例对象，其中只有检查特例的属性，返回true
    3. 对“与特例值做对比”提炼函数，并确保客户端使用这个新函数
    4. 将新的特例对象引入代码中，可以从函数调用中返回，也可以在变换函数中生成
    5. 修改特例对比函数的主题，在其直接使用检查特例的属性
    6. 使用函数组合成类、函数组合成变换，把通用的特例处理逻辑搬移到新建的特例对象中
    7. 对特例对比函数使用内联函数，将其内联到仍然需要的地方

    ```js
    function customerName(aCustomer){
        if(aCustomer.toString() === 'unknown') return 'occupant'
        return aCustomer.name
    }
    function customerPlan(aCustomer){
        if(aCustomer.toString() === 'unknown') return 'basic plan'
        return aCustomer.plan
    }
    class Customer {
        constructor(name, plan) {
            this.name = name
            this.plan = plan
        }
        toString() {
            return this.name || 'unknown'
        }
    }
    ```

    ```js
    function customerName(aCustomer){
        return aCustomer.name
    }
    function customerPlan(aCustomer){
        return aCustomer.plan
    }
    class Customer {
        constructor(name, plan) {
            this.name = name
            this.plan = plan
        }
        toString() {
            return this.name || 'unknown'
        }
    }
    const customer = enrichCustomer(new Customer())
    function enrichCustomer(aCustomer){
        const unknownCustomer = {
            name: 'occupant',
            plan: 'basic plan'
        }
        if(aCustomer.toString() === 'unknown') return unknownCustomer
        return aCustomer
    }
    ```

6. 引入断言
    通过断言告诉阅读者，程序执行到这一点是，对当前状态做了何种假设
    做法
    1. 如果你发现代码假设的某个条件始终为真，就可以加入一个断言说明情况


## 重构API

1. 将查询函数和修改函数分离
    区分处有副作用和无副作用的函数
    ```js
    function setOffAlarms(){//setTimeout}
    function alertForMiscreant(people) {
        for (const p of people) {
            if(p === 'oo'){
                setOffAlarms()
                return p
            }
        }
        return ''
    }
    ```

    ```js
    function alertForMiscreant(people) {
        if(findMiscreant(people) !== '') setOffAlarms()
    }
    function findMiscreant(people) {// find }
    ```

    做法
    1. 复制整个函数，将其作为一个查询命名
    2. 从新建的查询中去掉所有存在副作用的语句
    3. 查找调用函数的地方，替换

    ```js
    const people = ['xx', 'yy', 'zz', 'oo', 'zzz', 'cc']
    function setOffAlarms(){
        setTimeout(() => {
            console.log('!!!')
        }, 100)
    }
    function alertForMiscreant(people) {
        for (const p of people) {
            if(p === 'oo'){
                setOffAlarms()
                return p
            }
            if(p === 'cc'){
                setOffAlarms()
                return p
            }
        }
        return ''
    }
    ```

    ```js
    function alertForMiscreant(people) {
        if(findMiscreant(people) !== '') setOffAlarms()
    }
    function findMiscreant(people) {
        for (const p of people) {
            if(p === 'oo' || p === 'cc'){
                return p
            }
        }
        return ''
    }
    const found = findMiscreant(people)
    alertForMiscreant(people)
    ```

2. 函数参数化
    如果两个函数逻辑相似，只是字面量值不同，则可以合成一个函数，以参数的形式传入不同的值消除重复
    ```js
    function tenPercentRaise(salary){
        return salary * 1.1
    }
    function fivePercentRaise(salary){
        return salary * 1.05
    }
    ```

    ```js
    function raise(salary, factor=0){
        return salary * (factor + 1)
    }
    function tenPercentRaise(salary){
        return raise(salary, 0.1)
    }
    function fivePercentRaise(salary){
        return raise(salary, 0.05)
    }
    ```
    做法
    1. 从一组相似的函数中选择一个
    2. 把需要作为参数传入的字面量添加到参数列表中
    3. 修改函数所有的调用处，更新参数传入
    4. 修改函数体，使其使用新的参数

    ```js
    function baseCharge(usage){
        if(usage < 0) return 0
        return topBand(usage) * 0.07 + bottomBand(usage) * 0.03 + middleBand(usage) * 0.05
    }
    function bottomBand(usage){
        return Math.min(usage, 100)
    }
    function topBand(usage){
        return usage > 200 ? usage - 200 : 0
    }
    function middleBand(usage){
        return usage > 100 ? Math.min(usage, 200) - 100 : 0
    }
    ```

    ```js
    function baseCharge(usage){
        if(usage < 0) return 0
        return withinBand(usage, 0, 100) * 0.03 
        + withinBand(usage, 100, 200) * 0.05
        + withinBand(usage, 200, Infinity) * 0.07 
    }
    function withinBand(usage, bottom, top){
        return usage > bottom ? Math.min(usage, top) - bottom : 0
    }
    ```

3. 移除标记参数
    标记参数有时候会让人难以理解那些函数可以调用   

    ```js
    function deliveryDate(anOrder, isRush){
        if(isRush){
            ...
        }else{
            ...
        }
    }
    ```

    ```js
    function rushDeliveryDate(anOrder){
        ...
    }
    function regularDeliveryDate(anOrder){
        ...
    }
    ```

    做法
    1. 针对参数的每一种可能值新建一个函数
    2. 对于字面量作为参数的函数调用者，改为调用新建的明确函数

    ```js
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
    ```

    ```js
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
    ```

4. 保持对象完整
    把一个对象内的字段拆成几个变量，再传入函数中，不如保持完整传入函数中去解析
    ```js
    const low = dayTempRange.low
    const high = dayTempRange.high
    function withinRange(low, high){...}
    ```

    ```js
    function withinRange(aNumberRange){...}
    ```

    做法
    1. 新建一个空函数，给它期望的参数列表
    2. 再新函数中调用旧函数，并将新参数映射到旧的参数列表中
    3. 逐一修改旧函数的调用者，令其使用新函数
    4. 使用内联函数将旧函数内联到新函数中，给新函数改名后，同时修改所有的引用点

    ```js
    const dayTempRange = { low: 10, high: 40 }
    const low = dayTempRange.low
    const high = dayTempRange.high
    if(withinRange(low, high)){
        console.log('123')
    }
    function withinRange(low, high){
        return low > 9 && 41 > high
    }
    ```

    ```js
    if(withinRange(dayTempRange)){
        console.log('123')
    }
    function withinRange(aNumberRange){
        return aNumberRange.low > 9 && 41 > aNumberRange.high
    }
    ```

5. 以查询取代参数
    频繁的传递参数会让函数看起来变得复杂

    ```js
    class Order {
        get finalPrice(){
            return this.discountedPrice(basePrice, discount)
        }
        discountedPrice(price, discount){...}
    }
    ```
    
    ```js
    class Order {
        get finalPrice(){
            return this.discountedPrice()
        }
        get basePrice() {...}
        get discount() {...}
        discountedPrice(){...}
    }
    ```

    做法
    1. 使用提炼函数将参数的计算过程提炼到一个独立的函数中
    2. 将函数体内引用该参数的地方改为调用新建的函数

    ```js
    class Order {
        constructor(quantity, price){
            this.quantity = quantity;
            this.price = price;
        }
        get finalPrice(){
            const basePrice = this.price * this.quantity
            let discount 
            if(this.quantity > 100) discount = 2
            else  discount = 1
            return this.discountedPrice(basePrice, discount)
        }
        discountedPrice(price, discount){
            switch(discount){
                case 1: return price * 0.9
                case 2: return price * 0.8
            }
        }
    }
    ```

    ```js
    class Order {
        constructor(quantity, price){
            this.quantity = quantity;
            this.price = price;
        }
        get finalPrice(){
            return this.discountedPrice()
        }
        get basePrice() { return this.price * this.quantity }
        get discount() { return this.quantity > 100 ? 2 : 1 }
        discountedPrice(){
            switch(this.discount){
                case 1: return this.basePrice * 0.9
                case 2: return this.basePrice * 0.8
            }
        }
    }
    ```

6. 以参数取代查询
    当遇到引用复杂，需要调用者弄清参数意义时，需要用参数取代查询
    ```js
    const thermostat = {}
    class HeatingPlan {
        get targetTemperature(){
            if(thermostat.t > this.max) return this.max
            else if(thermostat.t < this.min) return this.min
            return thermostat.t
        }
    }
    ```
    
    ```js
    class HeatingPlan {
        targetTemperature(t){
            if(t > this.max) return this.max
            else if(t < this.min) return this.min
            return t
        }
    }
    ```

    做法
    1. 对执行查询操作对代码提炼变量，将其从函数体中剥离出来
    2. 现有的函数体不再执行查询操作

    ```js
    const thermostat = {
        selectTemperature: 20
    }
    function setToHeat(){
        thermostat.selectTemperature += 10
    }
    function setToCool(){
        thermostat.selectTemperature -= 10
    }
    class HeatingPlan {
        constructor(max, min){
            this.max = max;
            this.min = min;
        }
        get targetTemperature(){
            if(thermostat.selectTemperature > this.max) return this.max
            else if(thermostat.selectTemperature < this.min) return this.min
            return thermostat.selectTemperature
        }
    }
    ```
    
    ```js
    function setToHeat(){
        thermostat.selectTemperature += 10
    }
    function setToCool(){
        thermostat.selectTemperature -= 10
    }
    class HeatingPlan {
        constructor(max, min){
            this.max = max;
            this.min = min;
        }
        targetTemperature(selectTemperature){
            if(selectTemperature > this.max) return this.max
            else if(selectTemperature < this.min) return this.min
            return selectTemperature
        }
    }
    ```

7. 移除设值函数
    如果不可变的数据，不暴露修改的方法

    ```js
    class Person {
        get name(){return this._name }
        set name(arg){ return this._name = arg }
    }
    ```
    
    ```js
    class Person {
        get name(){return this._name }
    }
    ```

    做法
    1. 使用私有字段的实现方式
    2. 移除设值函数

    ```js
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
        set name(arg){ return this._name = arg }
    }
    ```

    ```js
    class Person {
        constructor(name){
            this._name = name;
        }
        get name(){return this._name }
    }
    ```

8. 以工厂函数取代构造函数
    构造函数在部分普通场合难以适用时，可以将其改为工厂函数

    ```js
    class Employee{
        constructor(name, typeCode){
            this. _name = name
            this._typeCode = typeCode
        }
    }
    ```

    ```js
    function createEngineer(name){
        return new Employee(name, 'E')
    }
    ```

    做法
    1. 新建一个工厂函数，让它地道用现有的构造函数
    2. 把调用构造函数的方法改为调用工厂函数
    3. 尽量修改构造函数的可见范围

    ```js
    class Employee{
        constructor(name, typeCode){
            this. _name = name
            this._typeCode = typeCode
        }
        get name(){return this._name }
        get type(){return Employee.legalTypeCode[this._typeCode] }
        static get legalTypeCode(){
            return { 'E': 'Engineer', 'M': 'Manager', 'S': 'Salesman' }
        }
    }
    ```

    ```js
    class Employee{
        constructor(name, typeCode){
            this. _name = name
            this._typeCode = typeCode
        }
        get name(){return this._name }
        get type(){return Employee.legalTypeCode[this._typeCode] }
        static get legalTypeCode(){
            return { 'E': 'Engineer', 'M': 'Manager', 'S': 'Salesman' }
        }
    }
    function createEngineer(name){
        return new Employee(name, 'E')
    }
    ```

9. 以命令取代函数
    当函数里拥有许多复杂操作时，可以改成命令对象模式去处理

    ```js
    function score() {
        ...
    }
    ```
    
    ```js
    function score() {
        return new Score().execute()
    }
    class Scorer{
        execute(){
            this.scoreSmoking()
            this.stateWithLowCertification()
        }
        scoreSmoking(){}
        stateWithLowCertification(){}
    }
    ```

    做法
    1. 创建一个空类，包含其目标函数
    2. 给每个参数都创建一个字段

    ```js
    function score(candidate, medicalExam, scoringGuide) {
        let result = 0
        let healthLevel = 0
        let highMedicalRiskFlag = false
        if(medicalExam.isSmoker){
            healthLevel += 10
            highMedicalRiskFlag = true
        }
        let certificationGrade = 'regular'
        if(scoringGuide.stateWithLowCertification(candidate.originState)){
            certificateGrade = 'low'
            result -= 5
        }
        result -= Math.max(healthLevel - 5, 0)
        return result
    }
    ```
    
    ```js
    function score(candidate, medicalExam, scoringGuide) {
        return new Score(candidate, medicalExam, scoringGuide).execute()
    }
    class Scorer{
        constructor(candidate, medicalExam, scoringGuide){
            this._candidate = candidate
            this._medicalExam = medicalExam
            this._scoringGuide = scoringGuide
        }
        execute(){
            this._result = 0
            this._healthLevel = 0
            this._highMedicalRiskFlag = false
            this.scoreSmoking()
            this.stateWithLowCertification()
            this._result -= Math.max(this._healthLevel - 5, 0)
            return this._result
        }
        scoreSmoking(){
            if(this._medicalExam.isSmoker){
                this._healthLevel += 10
                this._highMedicalRiskFlag = true
            }
        }
        stateWithLowCertification(){
            this._certificationGrade = 'regular'
            if(this._scoringGuide.stateWithLowCertification(this._candidate.originState)){
                this._certificationGrade = 'low'
                this._result -= 5
            }
        }
    }
    ```

10. 以函数取代命令
    使用函数去完成比较简单的任务

    ```js
    class ChargeCalculator{
        get basePrice(){}
        get charge(){}
    }
    function charge(){
        return new ChargeCalculator().charge
    }
    ```
    
    ```js
    function charge(){
        ...
    }
    ```

    做法
    1. 对命令对象在执行阶段用到的函数使用内联函数
    2. 将构造函数中的参数转移到执行函数
    3. 对所有的字段在执行函数中找到引用的地方，并改为参数

    ```js
    class ChargeCalculator{
        constructor(customer, usage, provider){
            this.customer = customer
            this.usage = usage
            this.provider = provider
        }
        get basePrice(){
            return this.customer.baseRate * this.usage
        }
        get charge(){
            return this.basePrice + this.provider.connectionCharge
        }
    }
    function charge(customer, usage, provider){
        return new ChargeCalculator(customer, usage, provider).charge
    }
    ```
    
    ```js
    function charge(customer, usage, provider){
        const basePrice = customer.baseRate * usage
        return basePrice + provider.connectionCharge
    }
    ```

## 处理继承关系

1. 函数上移
    如果某个函数在各个子类的函数体中相同，则将函数上移

    ```js
    class Party {
    }
    class Employee extends Party {
        annualCost(){ ... }
    }
    class Department extends Party {
        annualCost(){ ... }
    }
    ```
    
    ```js
    class Party {
        annualCost(){ ... }
    }
    class Employee extends Party {
    }
    class Department extends Party {
    }
    ```
    
    做法
    1. 检查待提升函数，确定完全一致
    2. 检查函数体内引用的所有函数调用和字段都能从超类调用
    3. 如果待提升签名不同，则都需要修改成超类的字段名
    4. 在超类中新建一个函数，将某个待提升函数的代码复制到超类中
    5. 移除待提升的函数

    ```js
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
    }
    class Employee extends Party {
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Department extends Party {
        get totalAnnualCost(){ return this.monthlyCost * 12 }
    }
    ```
    
    ```js
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party {
    }
    class Department extends Party {
    }
    ```

2. 字段上移
    如果字段在各个子类中，字段可提升到超类

    ```js
    class Party {
    }
    class Employee extends Party {
        get annualCost(){ ... }
    }
    class Department extends Party {
        get annualCost(){ ... }
    }
    ```
    
    ```js
    class Party {
        get annualCost(){ ... }
    }
    class Employee extends Party {
    }
    class Department extends Party {
    }
    ```

    做法
    1. 针对待提升的字段，检查他们的所有使用点，确定以同样的方式使用
    2. 如果字段名称不同，则先用变量改名
    3. 在超类中新增字段
    ```js
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
    }
    class Employee extends Party {
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Department extends Party {
        get totalAnnualCost(){ return this.monthlyCost * 12 }
    }
    ```
    
    ```js
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party {
    }
    class Department extends Party {
    }
    ```

3. 构造函数本体上移
    子类中存在共同实例属性，则可以提升到超类

    ```js
    class Party {
    }
    class Employee extends Party {
        constructor(){
            super()
            this.name = name
        }
    }
    class Department extends Party {
        constructor(){
            super()
            this.name = name
        }
    }
    ```
    
    ```js
    class Party {
        constructor(name){
            this.name = name
        }
    }
    class Employee extends Party {
    }
    class Department extends Party {
    }
    ```

    做法
    1. 如果超类不存在构造函数，直接定义一个。确保子类调用超类到构造函数
    2. 使用移动语句将子类中构造函数中的公共语句，移动到超类到构造函数调用的语句
    3. 逐一移除子类间的公共代码，将其提升到超类的构造函数中
    ```js
    class Party {
    }
    class Employee extends Party {
        constructor(name, id, monthlyCost){
            super()
            this.name = name
            this.id = id
            this.monthlyCost = monthlyCost
        }
    }
    class Department extends Party {
        constructor(name, staff){
            super()
            this.name = name
            this.staff = staff
        }
    }
    ```
    
    ```js
    class Party {
        constructor(name){
            this.name = name
        }
    }
    class Employee extends Party {
        constructor(name, id, monthlyCost){
            super(name)
            this.id = id
            this.monthlyCost = monthlyCost
        }
    }
    class Department extends Party {
        constructor(name, staff){
            super(name)
            this.staff = staff
        }
    }
    ```

4. 函数下移
    如果某个函数只一个或者几个子类调用，则将函数下移到子类中

    ```js
    class Party {
        annualCost(){...}
    }
    class Employee extends Party {}
    class Department extends Party {}
    ```
    
    ```js
    class Party {}
    class Employee extends Party {
        annualCost(){...}
    }
    class Department extends Party {}
    ```

    做法
    1. 将超类的函数移动到目标子类中

    ```js
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party {
        get cost(){
            return this.annualCost() * 10
        }
    }
    class Department extends Party {
    }
    ```
    
    ```js
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
    }
    class Employee extends Party {
        annualCost(){ return this.monthlyCost * 12 }
        get cost(){
            return this.annualCost() * 10
        }
    }
    class Department extends Party {
    }
    ```

5. 字段下移
    如果某个字段只被一个子类用到，就将其搬移到需要该字段到子类中

    ```js
    class Party {
       get annualCost(){...}
    }
    class Employee extends Party {}
    class Department extends Party {}
    ```
    
    ```js
    class Party {}
    class Employee extends Party {
        get annualCost(){...}
    }
    class Department extends Party {}
    ```

    做法
    1. 将超类中到字段移动到目标子类

    ```js
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party {
        get cost(){
            return this.annualCost() * 10
        }
    }
    class Department extends Party {
    }
    ```

    ```js
    class Party {
        constructor(monthlyCost){
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party {
        get cost(){
            return this.annualCost * 10
        }
    }
    class Department extends Party {
    }
    ```

6. 以子类取代类型码
    用多种子类替代类型码判断

    ```js
    class Employee {
        validateType(type){...}
    }
    ```
    
    ```js
    class Employee {}
    class Engineer extends Employee{
        get type(){}
    }
    class Salesman extends Employee{
        get type(){}
    }
    function createEmployee(name, type){
        switch(type){
            case 'engineer': return new Engineer(name)
            case 'salesman': return new Salesman(name)
        }
    }
    ```

    做法
    1. 封装类型码字段
    2. 任选一个类型码取值，创建一个子类，复写类型码类的取值函数，令其返回类型码的字面量
    3. 创建一个选择器的逻辑，把类型码参数映射到新的子类
    4. 正对每个类型码都重复创建子类

    ```js
    class Employee {
        constructor(name, type){
            this.validateType(type)
            this._name = name
            this._type = type
        }
        validateType(type){
            if(!['engineer', 'salesman', 'manager'].includes(type)){
                throw new Error('Invalid type')
            }
        }
        toString() { return `${this._name} (${this._type})`}
    }
    ```

    ```js
    class Employee {
        constructor(name){
            this._name = name
        }
        toString() { return `${this._name} (${this.type})`}
    }
    class Engineer extends Employee{
        get type(){ return 'engineer' }
    }
    class Salesman extends Employee{
        get type(){ return 'salesman' }
    }
    class Manager extends Employee{
        get type(){ return 'manager' }
    }
    function createEmployee(name, type){
        switch(type){
            case 'engineer': return new Engineer(name)
            case 'salesman': return new Salesman(name)
            case 'manager': return new Manager(name)
            default: throw new Error('Invalid type')
        }
    }
    ```

7. 移除子类
    如果子类的用处太小，则可以移除子类，替换成超类的一个字段

    ```js
    class Person{
        get genderCode(){}
    }
    class Male extends Person{
        get genderCode(){}
    }
    class Female extends Person{
        get genderCode(){}
    }
    function isMale(aPerson){ return aPerson instanceof Male}
    ```
    
    ```js
    class Person{
        constructor(){
            this.genderCode = genderCode || 'X'
        }
        get isMale(){ ... }
    }
    ```
    
    做法
    1. 把子类的构造函数包装到超类的工厂中
    2. 新建一个字段用于代表子类的类型
    3. 将原来针对子类的判断函数修改未使用新建类字段

    ```js
    class Person{
        constructor(name){
            this.name = name
        }
        get genderCode(){ return 'X' }
    }
    class Male extends Person{
        get genderCode(){ return 'X' }
    }
    class Female extends Person{
        get genderCode(){ return 'F' }
    }
    function isMale(aPerson){ return aPerson instanceof Male}
    ```
    
    ```js
    class Person{
        constructor(name, genderCode){
            this.name = name
            this.genderCode = genderCode || 'X'
        }
        get isMale(){ return this.genderCode === 'X' }
    }
    ```

8. 提炼超类
    如果两个类在做相似的事情，可以继承机制把他们的相似之处提炼到超类中

    ```js
    class Employee {}
    class Department {}
    ```
    
    ```js
    class Party{
        constructor(name){
            this.name = name
        }
    }
    class Employee extends Party{}
    class Department extends Party{}
    ```

    做法
    1. 为原本的类新建一个超类
    2. 把共同元素梳理出来移动到超类中

    ```js
    class Employee {
        constructor(name, id, monthlyCost){
            this.name = name
            this.id = id
            this.monthlyCost = monthlyCost
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Department {
        constructor(name, staff){
            this.name = name
            this.staff = staff
        }
        get totalMonthlyCost(){
            return this.staff.map(e => e.monthlyCost).reduce((prev, cur) => prev + cur, 0)
        }
        get totalAnnualCost(){
            return this.totalMonthlyCost * 12
        }
    }
    ```
    
    ```js
    class Party{
        constructor(name){
            this.name = name
        }
        get annualCost(){ return this.monthlyCost * 12 }
    }
    class Employee extends Party{
        constructor(name, id, monthlyCost){
            super(name)
            this.id = id
            this.monthlyCost = monthlyCost
        }
    }
    class Department extends Party{
        constructor(name, staff){
            super(name)
            this.staff = staff
        }
        get monthlyCost(){
            return this.staff.map(e => e.monthlyCost).reduce((prev, cur) => prev + cur, 0)
        }
    }
    ```

9. 折叠继承体系
    当子类与父类没多大差别时，直接折叠子类与超类
    做法
    1. 选择要移除的类
    2. 将其移动到目标类中

10. 以委托取代子类
    继承存在局限性，应该用组合与继承相结合的方式去改造

    ```js
    class Booking{}
    class PremiumBooking extends Booking{}
    ```
    
    ```js
    class Booking{
        _bePremium(){
            this._premium = new PremiumBookingDelegate(this, extra)
        }
    }
    class PremiumBookingDelegate{}
    function createPremiumBooking(extra){
        booking._bePremium(extra)
    }
    ```

    做法
    1. 如果构造函数由多个调用者，先用工厂函数包裹起来
    2. 创建一个空的委托累，这个类的构造函数应该接受所有子类特有的数据项，并以参数的形式接受一个指回超类的引用
    3. 在超类中添加一个字段，用于安放委托对象
    4. 修改子类的创建逻辑，使其初始化上述的委托字段，放入一个委托对象实例
    5. 选择一个子类的函数，使用搬移函数移动函数放入委托类
    6. 如果被搬移函数还在子类之外被调用，就把留在源类中的委托代码从子类移到超类，并委托代码前加上卫语句，检查委托对象存在。
    7. 如果没有，则直接移除代码，重复上述过程，直到所有函数都移动到委托类
    ```js
    class Booking{
        constructor(show, date){
            this.show = show
            this.date = date
        }
        get hasTalkBack(){
            return this.show.talkBack && !this.isPeakDay
        }
        get basePrice(){
            let result = this.show.price
            if(this.isPeakDay) result *= 1.15
            return result
        }
    }
    class PremiumBooking extends Booking{
        constructor(show, date, extra){
            super(show, date)
            this.extra = extra
        }
        get hasTalkBack(){
            return this.show.talkBack
        }
        get basePrice(){
            return super.basePrice * this.extra.fee
        }
        get hasDinner(){
            return this.extra.dinner && !this.isPeakDay
        }
    }
    ```
    
    ```js
    class Booking{
        constructor(show, date){
            this.show = show
            this.date = date
        }
        get hasTalkBack(){
            return this._premiumDelegate ? this._premiumDelegate.hasTalkBack : this.show.talkBack && !this.isPeakDay
        }
        get basePrice(){
            let result = this.show.price
            if(this.isPeakDay) result *= 1.15
            return this._premiumDelegate ? this._premiumDelegate.extendBasePrice(result) : result
        }
        get hasDinner(){
            return this._premiumDelegate ? this._premiumDelegate.hasDinner : false
        }
        _bePremium(extra){
            this._premiumDelegate = new PremiumBookingDelegate(this, extra)
        }
    }
    class PremiumBookingDelegate{
        constructor(hostBooking, extra){
            this.host = hostBooking
            this.extra = extra
        }
        get hasTalkBack(){
            return this.host.show.talkBack
        }
        get hasDinner(){
            return this.extra.dinner && !this.host.isPeakDay
        }
        extendBasePrice(base){
            return base * this.extra.fee
        }
    }
    function createBooking(show, date){
        return new Booking(show, date)
    }
    function createPremiumBooking(show, date, extra){
        let result = new Booking(show, date)
        result._bePremium(extra)
        return result
    }
    ```

11. 以委托取代超类
    优先使用继承，当继承有问题，使用委托取代超类
    ```js
    class CatalogItem{...}
    class Scroll extends CatalogItem{...}
    ```

    ```js
    class CatalogItem{...}
    class Scroll{
        constructor(catalogId, catalog){
            this.catalogItem = catalog.get(catalogId) // new CatalogItem()
        }
    }
    ```

    做法
    1. 在子类中新建一个字段，使其引用超类的一个对象，并将这个委托引用初始化为超类的实例
    2. 针对超类每个函数，在子类中创建一个转发函数，将请求转发给委托引用
    3. 当所有的超类函数都被转发函数覆盖后，去除继承关系

    ```js
    class CatalogItem{
        constructor(id, title, tags){
            this.id = id
            this.title = title
            this.tags = tags
        }
        hasTag(arg){ return this.tags.includes(arg) }
    }
    class Scroll extends CatalogItem{
        constructor(id, title, tags, dateLastCleaned){
            super(id, title, tags)
            this.lastCleaned = dateLastCleaned
        }
        needsCleaning(targetDate){ 
            const threshold = this.hasTag('revered') ? 700 : 1500
            return this.daysSinceLastCleaning(targetDate) > threshold
        }
        daysSinceLastCleaning(targetDate){ 
            return this.lastCleaned.until(targetDate)
        }
    }
    ```

    ```js
    class CatalogItem{
        constructor(id, title, tags){
            this.id = id
            this.title = title
            this.tags = tags
        }
        hasTag(arg){ return this.tags.includes(arg) }
    }
    class Scroll{
        constructor(id, dateLastCleaned, catalogId, catalog){
            this.id = id
            this.catalogItem = catalog.get(catalogId)
            this.lastCleaned = dateLastCleaned
        }
        get id(){return this.catalogItem.id}
        get title(){return this.catalogItem.title}
        get tags(){return this.catalogItem.tags}
        hasTag(arg){ return this.catalogItem.hasTag(arg) }
        needsCleaning(targetDate){ 
            const threshold = this.hasTag('revered') ? 700 : 1500
            return this.daysSinceLastCleaning(targetDate) > threshold
        }
        daysSinceLastCleaning(targetDate){ 
            return this.lastCleaned.until(targetDate)
        }
    }
    ```
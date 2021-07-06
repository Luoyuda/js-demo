/*
 * @Author: xiaohuolong
 * @Date: 2021-07-06 15:54:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-06 16:51:07
 * @FilePath: /js-demo/js/designPattern/2.js
 */
// 结构型设计模式
// 外观模式
// 为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口对访问更加容易。
(() => {
    const Facade = function () {
        // 模拟一个存在差异性的对象
        const obj = {
            value: Math.random() * 2 > 1 ? 0 : 1,
            otherValue: Math.random() * 2 > 1 ? 0 : 1
        }
        return {
            getValue: function(){
                return obj.value || obj.otherValue
            },
            getObj: function(){
                return obj
            }
        }
    }
    const f1 = Facade()
    console.log(f1.getObj())
    console.log(f1.getValue())
});

// 适配器模式
// 将一个类（对象）的接口（方法或属性）转化成另外一个接口，以满足用户需求，使类（对象）之间接口不兼容问题可以使用适配器解决
(() => {
    // 参数适配器
    const extend = function(_default, options) {
        for (const key in _default) {
            if (_default.hasOwnProperty(key)) {
                const element = _default[key];
                options[key] = options[key] || element
            }
        }
        return options
    }

    console.log(extend({
        a: 1,
        b: 2
    },{
        b: 3
    }))

    // 数据适配器
    const adapter = function(arr=[]) {
        return {
            name: arr[0],
            age: arr[1],
        }
    }
    console.log(adapter(['a', 12]))
});

// 代理模式
// 使用一个代理对象在两个对象直接起一个中介代理的作用
(() => {
    const Girl = function(name){
        this.name = name
    }
    
    const Boy = function(name){
        this.name = name
        this.sendGift = function(gift, girl){
            console.log(`${this.name} 送 ${gift} 给 ${girl.name}`)
        }
    }
    
    const ProxySend = function(boy, girl) {
        this.sendGift = function(gift){
            boy.sendGift(gift, girl)
        }
    }
    
    const boy = new Boy('小明')
    const hong = new Girl('小红')
    const jing = new Girl('静静')
    const sendH = new ProxySend(boy, hong)
    const sendJ = new ProxySend(boy, jing)
    sendH.sendGift('XXX')
    sendJ.sendGift('戒指')
});

// 装饰者模式
// 在不改变原对象的基础上，通过对其进行包装扩展，使得原有对象可以满足更复杂的需求
(() => {
    const Person = function() {}
    Person.prototype.getName = function(a, b, c) {
        console.log('Person-getName',a, b, c)
    }
    const log = function(a, b, c) {
        console.log('Decorator-',a, b, c)
    }
    const decorator = function(A, name, fn) {
        var f = A.prototype[name]
        var bind = function(){
            fn.apply(this, arguments)
            return f.apply(this, arguments)
        }
        A.prototype[name] = bind
    }
    decorator(Person, 'getName', log)
    var a = new Person()
    a.getName(1,2,3)
});

// 桥接模式
// 在系统沿着多个维度变化，又不增加其复杂度并达到解耦。
(() => {
    const Speed = function(x, y){
        this.x = x
        this.y = y
    }
    Speed.prototype.run = function(x, y){
        console.log(`(${this.x}, ${this.y}) ==> (${x}, ${y})`)
        this.x = x
        this.y = y
    }
    // 颜色单元
    const Color = function(color){
        this.color = color
    }
    Color.prototype.draw = function(){
        console.log(`绘制${this.color}`)
    }
    // 变形单元
    const Shape = function(shape){
        this.shape = shape
    }
    Shape.prototype.change = function(){
        console.log(`变形 ${this.shape}`)
    }
    // 说话单元
    const Speak = function(){
        
    }
    Speak.prototype.say = function(word){
        console.log(`${word}`)
    }
    // 球类
    const Ball = function(c, x=0, y=0){
        this.speed = new Speed(x, y)
        this.color = new Color(c)
    }
    // 精灵类
    const Sprite = function(c, x, y, s){
        this.shape = new Shape(s)
        this.speed = new Speed(x, y)
        this.color = new Color(c)
    }
    // 人类
    const Person = function(x, y){
        this.speed = new Speed(x, y)
        this.speak = new Speak()
    }
    
    const ball = new Ball('#fff')
    ball.color.draw()
    ball.speed.run(1,2)
    
    const sprite = new Sprite('#fff', 0, 0, '正方形')
    sprite.color.draw()
    sprite.speed.run(1,2)
    sprite.shape.change()
    
    const person = new Person(1,1)
    person.speed.run(3,4)
    person.speak.say('我说话看看')
});

// 组合模式
// 整体-部分模式，将对象组合成树形结构表示“部分整体”的层次结构，使得用户对单个对象和组合对象的使用具有一致性。
(() => {
    const El = function(type, content='', children = []) {
        this.type = type
        this.content = content
        this.children = children
    }
    El.prototype.render = function(){
        return `<${this.type}>
    ${this.content}
    ${this.children.reduce((p, i) => p + i.render(), '')}
    </${this.type}>`
    }
    const News = function(){
        this.children = []
        this.element = null
    }
    News.prototype.init = function(){
        throw new Error('抽象方法')
    }
    News.prototype.add = function(){
        throw new Error('抽象方法')
    }
    News.prototype.getElement = function(){
        throw new Error('抽象方法')
    }

    const inherit = function(child, parent) {
        function F() {}
        F.prototype = new parent()
        child.constructor = child
        child.prototype = new F()
    }

    const Container = function(id, parent){
        News.call(this)
        this.id = id
        this.parent = parent
        this.init()
    }
    inherit(Container, News)
    Container.prototype.init = function(){
        this.element = new El('ul')
        this.element.id = this.id
        return this
    }
    Container.prototype.add = function(child){
        this.element.children.push(child)
        return this
    }
    Container.prototype.getElement = function(){
        return this.element.render()
    }

    const Item = function(id, parent){
        News.call(this)
        this.id = id
        this.parent = parent
        this.init()
    }
    inherit(Item, News)
    Item.prototype.init = function(){
        this.element = new El('li')
        this.element.id = this.id
        return this
    }
    Item.prototype.add = function(child){
        this.element.children.push(child)
        return this
    }
    Item.prototype.getElement = function(){
        return this.element.render()
    }

    const Group = function(id, parent){
        News.call(this)
        this.id = id
        this.parent = parent
        this.init()
    }
    inherit(Group, News)
    Group.prototype.init = function(){
        this.element = new El('div')
        this.element.id = this.id
        return this
    }
    Group.prototype.add = function(child){
        this.element.children.push(child)
        return this
    }
    Group.prototype.getElement = function(){
        return this.element.render()
    }

    const ImageNews = function(url, href){
        News.call(this)
        this.url = url
        this.href = href
        this.init()
    }
    inherit(ImageNews, News)
    ImageNews.prototype.init = function(){
        this.element = new El('a', this.href)
        this.element.children.push(new El('img', this.url))
        return this
    }
    ImageNews.prototype.add = function(child){
        this.element.children.push(child)
        return this
    }
    ImageNews.prototype.getElement = function(){
        return this.element.render()
    }

    const TextNews = function(content, href){
        News.call(this)
        this.content = content
        this.href = href
        this.init()
    }
    inherit(TextNews, News)
    TextNews.prototype.init = function(){
        this.element = new El('a', this.href)
        this.element.children.push(new El('span', this.content))
        return this
    }
    TextNews.prototype.add = function(child){
        this.element.children.push(child)
        return this
    }
    TextNews.prototype.getElement = function(){
        return this.element.render()
    }

    const container = new Container('c')
    const item = new Item()
    container.add(item.element)
    const newGroup = new Group()
    item.add(newGroup.element)
    const imageNew = new ImageNews('我是图片链接', '我是新闻链接')
    const textNew = new TextNews('我是内容', '我是新闻链接')
    newGroup.add(imageNew.element).add(textNew.element)

    console.log(container.getElement())
    /* <ul>
        <li>
            <div>
                <a>
                    我是新闻链接
                    <img>
                        我是图片链接
                    </img>
                </a>
                <a>
                    我是新闻链接
                    <span>
                        我是内容
                    </span>
                </a>
            </div>
        </li>
    </ul> */
});

// 享元模式
// 运用共享技术有效支持大量的细粒度的对象，避免对象间拥有相同内容造成多余开销
(() => {
    // 运动单元
    const speed = {
        run: function(x, y){
            console.log(`(${this.x}, ${this.y}) ==> (${x}, ${y})`)
            this.x = x
            this.y = y
        }
    }
    // 颜色单元
    const color = {
        draw: function(){
            console.log(`绘制${this.color}`)
        }
    }
    // 变形单元
    const shape = {
        change: function(){
            console.log(`变形 ${this.shape}`)
        }
    }
    // 说话单元

    const speak = {
        say: function(word){
            console.log(`${word}`)
        }
    }

    // 球类
    const Ball = function(c, x=0, y=0){
        this.x = x
        this.y = y
        this.color = c
    }
    Ball.prototype = {
        ...color,
        ...speed,
    }

    // 精灵类
    const Sprite = function(c, x, y, s){
        this.x = x
        this.y = y
        this.color = c
        this.shape = s
    }
    Sprite.prototype = {
        ...color,
        ...speed,
        ...shape
    }

    // 人类
    const Person = function(x, y){
        this.x = x
        this.y = y
    }
    Person.prototype = {
        ...speak,
        ...speed,
    }

    const ball = new Ball('#fff', 0, 0)
    ball.draw()
    ball.run(1,2)

    const sprite = new Sprite('#fff', 0, 0, '正方形')
    sprite.draw()
    sprite.run(1,2)
    sprite.change()

    const person = new Person(1,1)
    person.run(3,4)
    person.say('我说话看看')
});
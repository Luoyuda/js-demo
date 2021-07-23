/*
 * @Author: xiaohuolong
 * @Date: 2020-08-15 21:05:11
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-15 22:05:07
 * @FilePath: /DesignPatterns/Composite.js
 */
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
/*
 * @Author: xiaohuolong
 * @Date: 2021-07-04 15:50:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-04 16:01:07
 * @FilePath: /js-demo/js/Observer/Observer.js
 */
/**
    观察者模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，
    这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
    在观察者模式中有两个主要角色：Subject（主题）和 Observer（观察者）。
 */
class Observer {
    constructor(name){
        this.name = name
    }
    notify(){
        console.log(`${this.name} has been notified`)
    }
}
class Subject {
    observers = []
    addObserver(observer){
        console.log(observer.name, 'is push')
        this.observers.push(observer)
    }
    deleteObserver(observer){
        console.log('remove observer: ', observer.name)
        this.observers = this.observers.filter(o => o !== observer)
    }
    notifyObservers(){
        console.log('notify')
        this.observers.forEach(o => o.notify())
    }
}

const subject = new Subject();
const xq = new Observer("小秦");
const xw = new Observer("小王");
subject.addObserver(xq);
subject.addObserver(xw);
subject.notifyObservers();

subject.deleteObserver(xq);
subject.notifyObservers();

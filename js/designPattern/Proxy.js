/*
 * @Author: xiaohuolong
 * @Date: 2020-08-15 17:04:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-15 18:04:53
 * @FilePath: /DesignPatterns/Proxy.js
 */
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
sendH.sendGift('一坨屎')
sendJ.sendGift('戒指')

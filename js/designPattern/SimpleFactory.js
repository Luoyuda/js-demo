/*
 * @Author: xiaohuolong
 * @Date: 2020-08-11 23:55:41
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-12 21:47:45
 * @FilePath: /DesignPatterns/SimpleFactory/index.js
 */
const PopFactory = function(type, content) {
    const o = new Object()
    // 共用部分
    o.content = content
    o.show = function(){
        console.log(`content: ${this.content}`)
    }
    // 差异部分
    switch(type){
        case 'alert':
            o.hide = function(){
                console.log('alert-hide')
            }
            break;
        case 'prompt':
            o.hide = function(){
                console.log('prompt-hide')
            }
            break;
        case 'confirm':
            o.hide = function(){
                console.log('confirm-hide')
            }
            break;
    }
    // 返回工厂对象
    return o
}

const alert = PopFactory('alert', 'alert-content')
const prompt = PopFactory('prompt', 'prompt-content')
const confirm = PopFactory('confirm', 'confirm-content')

alert.show()
prompt.show()
confirm.show()
alert.hide()
prompt.hide()
confirm.hide()
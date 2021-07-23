/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 23:25:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 23:29:21
 * @FilePath: /DesignPatterns/Interperter.js
 */
const Play = (function () {
    const _str = {
        'up': '向上',
        'down': '向下',
        'left': '向左',
        'right': '向右',
        'move': '移动', 
        'jump': '跳'
    }
    return {
        exec(strings){
            strings = strings.split(' ')
            if(!strings || !strings.length) return this
            let text = ''
            strings.forEach(str => {
                text += _str[str] || str
            })
            console.log(text)
            return this
        }
    }
})()

Play.exec('up move 5 move 10 left jump 1 right jump 10 down left jump 10')
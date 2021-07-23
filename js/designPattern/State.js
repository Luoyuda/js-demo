/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 18:43:52
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 18:55:31
 * @FilePath: /DesignPatterns/State.js
 */
const Marry = function(){
    let _currentState = {}
    const state = {
        jump(){
            console.log('jump')
        },
        move(){
            console.log('move')
        },
        shoot(){
            console.log('shoot')
        },
        squat(){
            console.log('squat')
        }
    }
    const Action = {
        changeState(...args){
            _currentState = {}
            if(args.length){
                args.forEach(state => {
                    _currentState[state] = true
                })
            }
            return this
        },
        go(){
            console.log(`触发一次动作`)
            for (const key in _currentState) {
                if (_currentState.hasOwnProperty(key)) {
                    const flag = _currentState[key];
                    if(flag && state.hasOwnProperty(key)){
                        state[key]()
                        _currentState[key] = false
                    }
                }
            }
            return this
        }
    }
    return {
        change: Action.changeState,
        go: Action.go
    }
}

const marry = new Marry()
marry.change('jump', 'shoot').go().change('squat').change('move').go().go()
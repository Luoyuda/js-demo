/*
 * @Author: xiaohuolong
 * @Date: 2020-08-16 21:24:37
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-16 21:48:43
 * @FilePath: /DesignPatterns/Command.js
 */
const Command = (function(){
    const _command = {
        a(arg){
            console.log(`a -> ${arg}`)
        },
        b(arg){
            console.log(`b -> ${arg}`)
        },
        c(arg){
            console.log(`c -> ${arg}`)
        }
    }
    return {
        execute(commands){
            if(!commands || !commands.length) return this
            commands.forEach(({ command='', params }) => {
                if(!_command[command]) return
                if(typeof params === 'string'){
                    params = [params]
                }
                _command[command].apply(this, params)
            })
            console.log(this)
            return this
        }
    }
})()

Command
.execute([])
.execute([{
    command: 'a',
    params: ['a']
},
{
    command: 'b',
    params: ['b']
},
{
    command: 'c',
    params: 'c'
},
{
    command: 'd',
    params: 'c'
}])
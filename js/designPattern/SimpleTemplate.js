/*
 * @Author: xiaohuolong
 * @Date: 2020-08-17 22:40:34
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-17 22:55:33
 * @FilePath: /DesignPatterns/SimpleTemplate.js
 */
const View = (function(){
    const _v = {
        code: '<pre><code>{#code#}</code></pre>',
        img: '<img src="{#src#}" alt="{#alt#}" title="{#title#}" />',
    }
    return {
        template(name){
            if(typeof name === 'string'){
                if(!_v[name]) _v[name] = `<${name}>{#${name}#}</${name}>`
                return _v[name]
            }else{
                let tpl = ''
                for (let index = 0; index < name.length; index++) {
                    tpl += arguments.callee(name[index])
                }
                return tpl
            }
        },
        formateString(str, data){
            return str.replace(/\{#(\w+)#\}/g, (match, key) => {
                console.log(match, key)
                return typeof data[key] === 'undefined' ? '' : data[key]
            })
        }
    }
})()
console.log(View.template('div'))
console.log(View.template(['div','li']))
console.log(View.template('div'))
console.log(View.formateString('<span>{#span#}</span>', {span: 1}))
console.log(
    View.formateString(
        View.template('li'), { 
            li: View.formateString(
                View.template(['strong', 'span']), { strong: '1', span: 2}
            )
        }
    )
)
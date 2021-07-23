/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 18:16:03
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 18:17:12
 * @FilePath: /js-demo/codewar/FormatAStringOfNames.js
 */
/*
    Given: an array containing hashes of names
    Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.
Example:
    list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
    returns 'Bart, Lisa & Maggie'
    list([ {name: 'Bart'}, {name: 'Lisa'} ])
    returns 'Bart & Lisa'
    list([ {name: 'Bart'} ])
    returns 'Bart'
    list([])
    returns ''
    Note: all the hashes are pre-validated and will only contain A-Z, a-z, '-' and '.'.
*/
function list(names){
    let l = names.map(({ name }) => name)
    let r = l.splice(names.length - 2, 2)
    return (l.length ? l.join(', ') + ', ' : '') + r.join(' & ')
}
/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 23:31:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 23:46:05
 * @FilePath: /js-demo/codewar/p.js
 */
/*
In this kata you have to create all permutations of an input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.
Examples:
permutations('a'); // ['a']
permutations('ab'); // ['ab', 'ba']
permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
The order of the permutations doesn't matter.
*/
function permutations(string) {
    string = string.split('').sort()
    let res = []
    let vis = {}
    let dfs = (str) => {
        if(str.length === string.length){
            res.push(str)
            return
        }
        for(let i = 0; i < string.length; i++){
            if (i - 1 >= 0 && string[i - 1] == string[i] && !vis[i - 1]) continue
            if(vis[i]) continue
            vis[i] = true
            dfs(str + string[i])
            vis[i] = false
        }
    }
    dfs('')
    return res
}
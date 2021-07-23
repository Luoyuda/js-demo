/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 22:36:18
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 22:40:04
 * @FilePath: /js-demo/codewar/DetectPangram.js
 */
/*
A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).
Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.
*/
function isPangram(string){
    let set = new Set()
    for(let c of string){
        if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')){
            set.add(c.toLocaleLowerCase())
        }
    }
    return set.size === 26
}
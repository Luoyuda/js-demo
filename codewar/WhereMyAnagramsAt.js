/*
 * @Author: xiaohuolong
 * @Date: 2021-07-18 23:10:59
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 23:24:31
 * @FilePath: /js-demo/codewar/WhereMyAnagramsAt.js
 */
/*
What is an anagram? Well, two words are anagrams of each other if they both contain the same letters. For example:
'abba' & 'baab' == true
'abba' & 'bbaa' == true
'abba' & 'abbba' == false
'abba' & 'abca' == false
Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:
anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']
anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']
anagrams('laser', ['lazing', 'lazy',  'lacer']) => []
Note for Go
For Go: Empty string slice is expected when there are no anagrams found.
*/
function anagrams(word, words) {
    let target = []
    word = word.split('').sort().join('')
    for(let w of words){
        if(word.length === w.length && w.split('').sort().join('') == word){
            target.push(w)
        }
    }
    return target
}
anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada'])
anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer'])
anagrams('laser', ['lazing', 'lazy',  'lacer'])
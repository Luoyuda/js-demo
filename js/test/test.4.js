const runTests = (tests, fn) => {
  tests.forEach(( { input, output } ) => {
    const target = fn(input);
    if(!(JSON.stringify(target) === JSON.stringify(output))){
      console.log(input, output, target);
    }
  })
}
(() => {
  /**
   * ['a', 'b', 'c', 'a', 'b'] => {a: true, b: true, c: false}
   */
  const tests = [
    { input: ['a', 'b', 'c', 'a', 'b'], output: {a:true, b: true, c: false} },
    { input: ['a', 'b', 'c'], output: {a:false, b: false, c: false} },
    { input: ['a', 'a', 'a'], output: {a:true} }
  ]
  /**
   * duplicatedWord
   * @param {[string[]]} list
   * @return {{String: Boolean }} 
   */
  function duplicatedWord(list) {
    const target = {};
    const hash = new Map();
    list.forEach(item => {
      let time = (hash.get(item) || 0) + 1
      hash.set(item, time )
      target[item] = time >= 2
    })
    return target
  }

  runTests(tests, duplicatedWord)
})();

(() => {
  /**
    薯队长写了一篇笔记草稿，请你帮忙输出最后内容。
    1.输入字符包括，"("    ,    ")"    和    "<"和其他字符。 
    2.其他字符表示笔记内容。
    3.()之间表示注释内容，任何字符都无效。    括号保证成对出现。
    4."<"表示退格,    删去前面一个笔记内容字符。括号不受"<"影响    。 
    输入描述:
    输入一行字符串。长度<=10000.
    输出描述:
    输出一行字符串，表示最终的笔记内容。 
    输入例子1:
    Corona(Trump)USA<<<Virus
    输出例子1:
    CoronaVirus
   */
  const tests = [
    {input: 'Corona(Trump)USA<<<Virus', output: 'CoronaVirus'}
  ]
  /**
   * 
   * @param {string} str 
   * @return {string}
   */
  function format(str){
    const target = []
    const strings = str.split('')
    strings.forEach(item => {
      if(item === ')'){
        while(target[target.length - 1] !== '(') target.pop()
        target.pop()
      }else if(item === '<'){
        target.pop()
      }else{
        target.push(item)
      }
    })
    return target.join('')
  }
  runTests(tests, format)
})();

(() => {
  /* 
  薯队长写了n篇笔记，编号从1~n,每篇笔记都获得了不少点赞数。    
  薯队长想从中选出一些笔记，作一个精选集合。挑选的时候有两个规则：
    1.不能出现连续编号的笔记。 
    2.总点赞总数最多 
  如果满足1，2条件有多种方案，挑选笔记总数最少的那种
  输入描述:
    输入包含两行。第一行整数n表示多少篇笔记。 第二行n个整数分别表示n篇笔记的获得的点赞数。   
    （0<n<=1000,    0<=点赞数<=1000) 
  输出描述:
    输出两个整数x,y。空格分割。
    x表示总点赞数，y表示挑选的笔记总数。
  示例1
    输入
    4
    1 2 3 1
  输出
    4 2
  */
  const tests = [
    { input: [1,2,3,1], output: [4, 2]},
    { input: [1,4,3], output: [4, 1]},
    { input: [4,4,3], output: [7, 2]}
  ]
  /**
   * 
   * @param {number[]} list 
   * @return {number[]}
   */
  function find(list){
    const n = list.length
    const dp = new Array(n).fill(0)
    const count = new Array(n).fill(1)
    dp[0] = list[0]
    dp[1] = Math.max(list[1], list[0])
    for (let i = 2; i < n; i++) {
      if(dp[i - 1] > dp[i - 2] + list[i]){
        dp[i] = dp[i - 1]
        count[i] = count[i - 1]
      }else{
        dp[i] = dp[i - 2] + list[i]
        count[i] = count[i - 2] +  1
      }
    }
    let max = dp[0]
    let minNum = 1
    dp.forEach((item, i) => {
      if(item > max){
        minNum = count[i]
        max = item
      }else if(item === max){
        minNum = Math.min(count[i], minNum)
      }
    })
    return [max, minNum]
  }
  runTests(tests, find)
})();

(() => {
  /* 
  现在有一个字符串，你要对这个字符串进行 n 次操作，每次操作给出两个数字：(p, l) 表示当前字符串中从下标为 p 的字符开始的长度为 l 的一个子串。你要将这个子串左右翻转后插在这个子串原来位置的正后方，求最后得到的字符串是什么。字符串的下标是从 0 开始的，你可以从样例中得到更多信息。
  输入描述:
    每组测试用例仅包含一组数据，每组数据第一行为原字符串，长度不超过 10 ，仅包含大小写字符与数字。接下来会有一个数字 n 表示有 n 个操作，再接下来有 n 行，每行两个整数，表示每次操作的(p , l)。
    保证输入的操作一定合法，最后得到的字符串长度不超过 1000。
  输出描述:
    输出一个字符串代表最后得到的字符串。
  输入例子1:
    ab
    2
    0 2
    1 3
  输出例子1:
    abbaabb
  */
  const tests = [
    { input: ['ab', [[0, 2], [1, 3]]], output: 'abbaabb' }
  ]
  function fun([line, list]){
    let n = list.length
    let i = 0
    while (i < n){
      let [p, l] = list[i++]
      line += line.slice(p, p + l).split('').reverse().join('')
    }
    return line
  }
  runTests(tests, fun)
})();

(() => {
  /*
  你作为一名出道的歌手终于要出自己的第一份专辑了，你计划收录 n 首歌而且每首歌的长度都是 s 秒，每首歌必须完整地收录于一张 CD 当中。每张 CD 的容量长度都是 L 秒，而且你至少得保证同一张 CD 内相邻两首歌中间至少要隔 1 秒。为了辟邪，你决定任意一张 CD 内的歌数不能被 13 这个数字整除，那么请问你出这张专辑至少需要多少张 CD ？
  输入描述:
    每组测试用例仅包含一组数据，每组数据第一行为三个正整数 n, s, L。 保证 n ≤ 100 , s ≤ L ≤ 10000 
  输出描述:
    输出一个整数代表你至少需要的 CD 数量。
  输入例子1:
    7 2 6
  输出例子1:
    4
  */
  const tests = [
    { input: [7, 2, 6], output: 4 },
    { input: [14, 3, 14], output: 5 }
  ]
  function fun([n, s, L]) {
    let num = 1
    let now = 0
    while (n--){
      let k = now + s + 1
      if(k > L || k % 13 === 0){
        num++
        now = s + 1
      }else{
        now = k
      }
    }
    return num
  }
  runTests(tests, fun)
})();

(() => {
  /*
  统计一个字符串出现最多的字母
  时间限制：C/C++ 1秒，其他语言2秒
  空间限制：C/C++ 256M，其他语言512M
  实现一个函数，输入一个字符串，返回该字符串出现最多的字母
  输入描述:
    字符串
  输出描述:
    出现次数最多的字母
  输入例子1:
    aab
  输出例子1:
    a
 */
  const tests = [
    {input: 'aab', output: 'a'},
    {input: 'aabb', output: 'a'},
    {input: 'aabbgb', output: 'b'},
  ]
  function fun(s){
    const map = new Map();
    let max = 0
    let x = ''
    for (const x of s) {
      map.set(x, (map.get(x) || 0) + 1)
    }
    
    for (const [k, v] of map.entries()) {
      if(max < v){
        x = k
        max = v
      }
    }
    return x
  }
  runTests(tests, fun)
})();

(() => {
  /*
  查找字符串中的最长公共前缀
  编写查询函数返回数字字符串中最大的公共前缀字符串
    输入描述:
    flower flow  flight 
  一组包含公共前缀的数组字符串
    输出描述:
    fl
  */
  const tests = [
    { input: ['flower', 'flow', 'flight'], output: 'fl'}
  ]
  function fun(list){
    let s = list[0]
    for (const k of list) {
      if(k.length < s.length) s = k
    }
    for (const k of list){
      let prefix = ''
      let n = s.length
      let i = 0
      while (i < n){
        if(k[i] === s[i]){
          prefix += k[i]
          i++
        }else{
          break
        }
      }
      s = prefix
    }
    return s
  }
  runTests(tests, fun)
})();

(() => {
  /* 
  五八文字碰碰消
    帮帮同学在设计一个文字碰碰消游戏，规定"五"和"八"形成"五八"组合碰到一起即会消除，("八五" 不会消除)。
    例如 "五八", "五八五八", "五五八八"。说明: "五五八八" 是内层的"五八"碰在一起消除后，外层的"五八"会碰在一起消除。
    帮帮同学想知道n个"五"和"八"组成的字符串中，有多少种组合可以满足消除为空字符串。
    现为帮帮同学设计一个方法，输入整数n，表示"五"和"八"的数量，返回n个"五"和n个"八"组成的字符串中，满足消除为空字符串的组合数。
  输入例子1:
    2
  输出例子1:
    2
  例子说明1:
    满足的组合  [ '五五八八', '五八五八' ]
  输入例子2:
    3
  输出例子2:
    5
  例子说明2:
    满足的组合  [ '五五五八八八', '五五八五八八', '五五八八五八', '五八五五八八', '五八五八五八' ]
  */
  const tests = [
    {input: 2, output:2},
    {input: 3, output:5}
  ]
  function fun(n){
    let res = []
    const dfs = (curr, l, r) => {
      if(curr.length / 2 === n) return res.push(curr)
      if(l > 0) dfs(curr + '五', l - 1, r)
      if(r > l) dfs(curr + '八', l, r - 1)
    }
    dfs('', n, n)
    return res.length
  }
  runTests(tests, fun)
})();
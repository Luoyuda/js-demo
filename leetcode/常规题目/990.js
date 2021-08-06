/*
 * @Author: xiaohuolong
 * @Date: 2021-08-04 11:19:25
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-04 11:19:57
 * @FilePath: /js-demo/leetcode/常规题目/990.js
 */
/*
990. 等式方程的可满足性
    给定一个由表示变量之间关系的字符串方程组成的数组，每个字符串方程 equations[i] 的长度为 4，并采用两种不同的形式之一："a==b" 或 "a!=b"。在这里，a 和 b 是小写字母（不一定不同），表示单字母变量名。
    只有当可以将整数分配给变量名，以便满足所有给定的方程时才返回 true，否则返回 false。 
示例 1：
    输入：["a==b","b!=a"]
    输出：false
    解释：如果我们指定，a = 1 且 b = 1，那么可以满足第一个方程，但无法满足第二个方程。没有办法分配变量同时满足这两个方程。
示例 2：
    输入：["b==a","a==b"]
    输出：true
    解释：我们可以指定 a = 1 且 b = 1 以满足满足这两个方程。
示例 3：
    输入：["a==b","b==c","a==c"]
    输出：true
示例 4：
    输入：["a==b","b!=c","c==a"]
    输出：false
示例 5：
    输入：["c==c","b==d","x!=z"]
    输出：true
提示：
    1 <= equations.length <= 500
    equations[i].length == 4
    equations[i][0] 和 equations[i][3] 是小写字母
    equations[i][1] 要么是 '='，要么是 '!'
    equations[i][2] 是 '='
*/
/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function(equations) {
    let eqs = []
    let unEqs = []
    for(let equation of equations){
        if(equation[1] === '='){
            eqs.push(equation.split('=='))
        }else if(equation[1] === '!'){
            unEqs.push(equation.split('!='))
        }
    }
    let c = x => x.charCodeAt() - 'a'.charCodeAt()
    let uf = new UnionFind(26)
    for(let [x, y] of eqs){
        uf.union(c(x), c(y))
    }
    for(let [x, y] of unEqs){
        if(uf.connected(c(x), c(y))) return false
    }
    return true
};

class UnionFind{
    constructor(size){
        this.rank = new Array(size).fill(0)
        this.root = new Array(size).fill(0).map((item, index) => index)
    }
    find(x){
        if(x === this.root[x]) return x
        return this.root[x] = this.find(this.root[x])
    }
    union(x, y){
        let rootX = this.find(x)
        let rootY = this.find(y)
        if(rootX != rootY){
            let rankX = this.rank[rootX]
            let rankY = this.rank[rootY]
            if(rankX > rankY){
                this.root[rootY] = rootX
            }else if(rankX < rankY){
                this.root[rootX] = rootY
            }else{
                this.root[rootY] = rootX
                this.rank[rootX]++
            }
        }
    }
    connected(x, y){
        return this.find(x) === this.find(y)
    }
}
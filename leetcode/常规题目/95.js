/* 
95. 不同的二叉搜索树 II
    给定一个整数 n，生成所有由 1 ... n 为节点所组成的 二叉搜索树 。
示例：
    输入：3
    输出：
    [
        [1,null,3,2],
        [3,2,null,1],
        [3,1,null,null,2],
        [2,1,3],
        [1,null,2,null,3]
    ]
解释：
以上的输出对应以下 5 种不同结构的二叉搜索树：
   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
提示：
    0 <= n <= 8
*/
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    if(!n) return []
    return dfs(1, n)
};

var dfs = function(l, r){
    let res = []
    if(l > r){
        res.push(null)
        return res
    }
    for (let i = l; i <= r; i++) {
        let left = dfs(l, i - 1)
        let right = dfs(i + 1, r)
        for (const l of left) {
            for (const r of right) {
                let root = new TreeNode(i)
                root.left = l
                root.right = r
                res.push(root)
            }
        }
    }
    return res
}

console.log(generateTrees(3))
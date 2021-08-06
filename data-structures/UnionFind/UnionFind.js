/*
 * @Author: xiaohuolong
 * @Date: 2021-05-20 11:32:26
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-08-05 10:24:18
 * @FilePath: /js-demo/data-structures/UnionFind/UnionFind.js
 */
/**
 * QuickFind 
 * 构造函数	O(N)
 * find 函数 O(1)
 * union 函数	O(N)
 * connected 函数 O(1)
 */
class QuickFind{
    root=[]
    constructor(size){
        // 初始化节点
        this.root = new Array(size)
        for(let i = 0; i < size; i++){
            this.root[i] = i
        }
    }
    find(x){
        // 查找顶点
        return this.root[x]
    }
    union(x, y){
        // 建立联系
        let rootX = this.find(x)
        let rootY = this.find(y)
        if(rootX != rootY){
            // 遍历顶点建立联系
            for(let i = 0; i < this.root.length; i++){
                if(this.root[i] === rootY){
                    this.root[i] = rootX
                }
            }
        }
    }
    connected(x, y){
        // 判断连通性
        return this.find(x) === this.find(y)
    }
}
/**
 * UnionFind 
 * 构造函数	O(N)
 * find 函数 O(H)
 * union 函数	O(H)
 * connected 函数 O(H)
 */
class UnionFind{
    root=[]
    constructor(size){
        // 初始化节点
        this.root = new Array(size)
        for(let i = 0; i < size; i++){
            this.root[i] = i
        }
    }
    find(x){
        while(x !== this.root[x]){
            x = this.root[x]
        }
        // 查找顶点
        return x
    }
    union(x, y){
        // 建立联系
        let rootX = this.find(x)
        let rootY = this.find(y)
        if(rootX != rootY){
            this.root[rootY] = rootX
        }
    }
    connected(x, y){
        // 判断连通性
        return this.find(x) === this.find(y)
    }
}

/**
 * RankUnionFind 
 * 构造函数	O(N)
 * find 函数 O(logN)
 * union 函数	O(logN)
 * connected 函数 O(logN)
 */
class RankUnionFind{
    constructor(size){
        this.root = new Array(size).fill(0).map((j,i) => i)
        this.rank = new Array(size).fill(1)
    }
    find(x){
        while(this.root[x] !== x){
            x = this.root[x]
        }
        return x
    }
    union(x, y){
        let rootX = this.find(x)
        let rootY = this.find(y)
        if(rootX !== rootY){
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
/**
 * UnionFindPath
 * 构造函数	O(N)
 * find 函数 O(logN)
 * union 函数	O(logN)
 * connected 函数 O(logN)
 */
class UnionFindPath{
    root=[]
    constructor(size){
        // 初始化节点
        this.root = new Array(size)
        for(let i = 0; i < size; i++){
            this.root[i] = i
        }
    }
    find(x){
        if(x === this.root[x]) return x
        return this.root[x] = this.find(this.root[x])
    }
    union(x, y){
        // 建立联系
        let rootX = this.find(x)
        let rootY = this.find(y)
        if(rootX != rootY){
            this.root[rootY] = rootX
        }
    }
    connected(x, y){
        // 判断连通性
        return this.find(x) === this.find(y)
    }
}
class RankUnionFindPath{
    constructor(size){
        this.root = new Array(size).fill(0).map((j,i) => i)
        this.rank = new Array(size).fill(1)
    }
    find(x){
        if(x === this.root[x]) return x
        return this.root[x] = this.find(this.root[x])
    }
    union(x, y){
        x = this.find(x), y = this.find(y)
        if(x !== y){
            let rankX = this.rank[x], rankY = this.rank[y]
            if(rankX > rankY){
                this.root[y] = x
            }else if(rankX < rankY){
                this.root[x] = y
            }else{
                this.root[y] = x
                this.rank[x]++
            }
        }
    }
    connected(x, y){
        return this.find(x) === this.find(y)
    }
}
const uf = new RankUnionFindPath(7);
// 1-2-5-6-7 3-8-9 4
uf.union(1, 2);
uf.union(1, 3);
uf.union(1, 4);
uf.union(1, 5);
uf.union(1, 6);
console.log(uf.connected(1,6))
console.log(uf.connected(1,6))
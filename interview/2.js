/*
 * @Author: xiaohuolong
 * @Date: 2021-07-17 08:12:40
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-07-18 12:39:14
 * @FilePath: /js-demo/interview/2.js
 */
// 生成N个button 打印 i
(() => {
    function c(n){
        var fragment = document.createDocumentFragment()
        for(var i = 0; i < n; i++){
            var button = document.createElement('button')
            button.innerText = i
            button.addEventListener('click', (function(i){
                return function(e){
                    console.log(i)
                }
            })(i))
            fragment.append(button)
        }
        document.body.append(fragment)
    }
    function c(n){
        let fragment = document.createDocumentFragment()
        for(let i = 0; i < n; i++){
            let button = document.createElement('button')
            button.innerText = i
            button.addEventListener('click',() => {
                console.log(i)
            })
            fragment.append(button)
        }
        document.body.append(fragment)
    }
    function c(n){
        let fragment = document.createDocumentFragment()
        for(let i = 0; i < n; i++){
            let button = document.createElement('button')
            button.index = i
            button.innerText = i
            fragment.append(button)
        }
        document.body.addEventListener('click', (e) => {
            if(e.target && e.target.nodeName.toLowerCase() === 'button'){
                console.log(e.target.index)
            }
        })
        document.body.append(fragment)
    }
});
// eventLoop
(() => {
    // 1 2 3 5 4
    console.log(1)
    new Promise((resolve, reject) => {
        console.log(2)
        resolve()
        console.log(3)
    }).then(() => {
        console.log(4)
    })
    console.log(5)
});
// div 上下左右居中
(() => {
    let cssText = `
        绝对定位
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        flex
        display: flex;
        align-items: center;
        justify-content: center;
        gird
        display: grid;
        justify-items: center;
        align-items: center;
    `
});
// url加载页面发生了什么
(() => {
/**
1. DNS 解析
2. TCP 连接，三次握手
3. 请求资源
4. 生成 dom tree css tree 合并成渲染树
5. 计算渲染树中的布局信息（回流）
6. 绘制页面（重绘）
7. TCP 连接，四次挥手
 */
});
(() => {
    var arr = [1,3,2,4,5,6]
    function getFirst(nums){
        let max = 0
        for(let n of nums){
            max = Math.max(max, n)
        }
        let res = new Array(max).fill(0)
        for (let n of nums) {
            res[n - 1] = 1
        }
        for (let i = 0; i < res.length; i++) {
            if(res[i] === 0) return i + 1
        }
        return -1
    }
    console.log(getFirst(arr))
});


(() => {
	function getId(count){
		let res = ''
		while (count){
			res += parseInt(Math.random() * 10)
			count -= 1
		}
		return res
	}
	function random(fn, len){
		let count = 0;
		let res = ''
		do{
			res = getId(len)
			count += 1
		}while (!fn(res))
		fn(res)
		return { res, count }
	}
	function getShinyPokemon() {
		return parseInt(Math.random()*(4096-1+1)+1,10) === 4095
	}
	// 回文
	function v1(target){
		let arr = target.split('').map(item => parseInt(item, 10))
		if(target ===arr.reverse().join('')) return true
	}
	// 顺子
	function v2(target){
		let arr = target.split('').map(item => parseInt(item, 10))
		let gap = 1
		let len = arr.length - 1
		while(gap === 1 && len > 0){
			gap = arr[len] - arr[len - 1]
			len -= 1
		}
		// 正顺子id
		if(gap === 1) return true
	}
	// 顺子(逆)
	function v3(target){
		let arr = target.split('').map(item => parseInt(item, 10))
		let gap = 1
		let len = 0
		while(gap === 1 && len < arr.length - 1){
			gap = arr[len] - arr[len + 1]
			len += 1
		}
		if(gap === 1) return true
	}
	// aabbcc
	function v4(target){
		let arr = target.split('').map(item => parseInt(item, 10))
		let map = new Map()
		arr.forEach(item => {
			map.set(item, (map.get(item) || 0) + 1)
		})
		// 112233 / 332211
		if(map.size === 3){
			if([...map.entries()].every(([,val]) => val === 2) 
			&& arr[0] === arr[1] && arr[2] === arr[3] && arr[4] === arr[5]
			&& ((arr[0] + 1 === arr[2] && arr[2] + 1 === arr[4]) || (arr[0] - 1 === arr[2] && arr[2] - 1 === arr[4]))){
				return true
			}
		}
	}
	// aaabbb
	function v5(target){
		let arr = target.split('').map(item => parseInt(item, 10))
		let map = new Map()
		arr.forEach(item => {
			map.set(item, (map.get(item) || 0) + 1)
		})
		// 111222
		if(map.size === 2){
			if([...map.entries()].every(([,val]) => val === 3) 
			&& arr[0] === arr[1] && arr[0] === arr[2] && arr[3] === arr[4] && arr[4] === arr[5]
			&& ((arr[0] + 1 === arr[3]) || (arr[0] - 1 === arr[3]))){
				return true
			}
		}
	}
	// aaaaaa
	function v6(target){
		let arr = target.split('').map(item => parseInt(item, 10))
		if(arr.every(item => item === arr[0])) return true
	}
	const valid = [
		{
			name: '刷出 abccba 类型训练师id',
			v: v1
		},
		{
			name: '刷出 123456 类型训练师id',
			v: v2
		},
		{
			name: '刷出 654321 类型训练师id',
			v: v3
		},
		{
			name: '刷出 112233/332211 类型训练师id',
			v: v4
		},
		{
			name: '刷出 111222/222111 类型训练师id',
			v: v5
		},
		{
			name: '刷出 666666 类型训练师id',
			v: v6
		},
		{
			name: '刷出初始闪',
			v: getShinyPokemon
		}
	]
	function print( { res, count }){
		var time = count * 25 / 60
		if(time > 24){
			time = parseInt(time / 24) + '天'
		}else{
			time = parseInt(time) + '小时'
		}
		console.log(`花费${count}次 ${time}后 ${res}`)
	}
	const count = 1
	console.log(`各自执行${count}次的平均值`)
	valid.forEach(({ name, v }) => {
		// console.log(`== ${name} ==`)
		const list = (new Array(count).fill(0)).map((item, index) => {
			return random(v, 6)
		})
		// list.forEach(print)
		const avgCount = parseInt(list.reduce((prev, { count }) => {
			return prev + count
		}, 0) / list.length)
		// console.log(`===== 平均 =====`)
		print({ res:name, count: avgCount })
	})
});
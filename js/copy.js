function deepCopy(obj) {
    if(!obj) return null
    let target = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        if(typeof obj[key] === 'object' && obj[key] !== null){
            target[key] = deepCopy(obj[key])
        }else{
            target[key] = obj[key]
        }
    }
    return target
}

function deepCopy(obj) {
    const map = new WeakMap()
    const dp = obj => {
        let ex = map.get(obj)
        if(ex){
            return ex
        }
        let target = Array.isArray(obj) ? [] : {}
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const el = obj[key];
                if(key && typeof el === 'object') {
                    target[key] = dp(el)
                }else{
                    target[key] = el
                }
            }
        }
        map.set(obj, target)
        return target
    }
    return dp(obj)
}

var obj = {
    a: 1,
    b: {
        c: [1, { e: 2 }],
        d: Symbol('d'),
        e(){

        }
    },
};
obj.c = obj.b

var clone = deepCopy(obj)
console.log(obj.c.e === clone.b.e)
console.log(clone.c === clone.b)
console.log(obj.b === clone.b)
console.log(obj.c === clone.c)
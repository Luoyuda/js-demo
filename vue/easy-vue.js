let active
let queue = []
let nextTick = cb => Promise.resolve().then(cb)
class Dep{
  deps = new Set()
  depend(){
    if(active){
      this.deps.add(active)
      active.deps.push(this.deps)
    }
  }
  notify(){
    this.deps.forEach(dep => queueJob(dep))
    this.deps.forEach(dep => dep.options && dep.options.scheduler && dep.options.scheduler())
  }
}
let ref = (initValue) => createReactive({}, 'value', initValue)
let createReactive = (target, prop, initValue) => {
  let value = initValue
  let dep = new Dep()
  // return new Proxy({value: initValue}, {
  //   get(target, prop){
  //     dep.depend()
  //     return Reflect.get(target, prop)
  //   },
  //   set(target, prop, value){
  //     Reflect.set(target, prop, value)
  //     dep.notify()
  //   }
  // })
  return Object.defineProperty(target, prop, {
    get(){
      dep.depend()
      return value
    },
    set(newValue){
      value = newValue
      dep.notify()
    }
  })
}
let set = (target, prop, value) => createReactive(target, prop, value)
let effect = (fn, options = {}) => {
  let effect = (...args) => {
    try {
      active = effect
      return fn(...args)
    } catch (error) {
      active = null
    }
  }
  effect.options = options
  effect.deps = []
  return effect
}
let watchEffect = function(cb){
  let runner = effect(cb)
  runner()
  return () => {
    cleanUpEffect(runner)
  }
}
let cleanUpEffect = effect => {
  const { deps } = effect
  if(deps.length){
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
  }
}
let queueJob = job => {
  if(!queue.includes(job)){
    queue.push(job)
    nextTick(flushJobs)
  }
}
let flushJobs = () => {
  let job
  while((job = queue.shift()) !== undefined){
    job()
  }
}
let computed = fn => {
  let value
  let dirty = true
  let runner = effect(fn, {
    scheduler: () => {
      if(!dirty) {
        dirty = true
      }
    }
  })
  return {
    get value(){
      if(dirty){
        value = runner()
        dirty = false
      }
      return value
    }
  }
}
let watch = (source, cb, options = {}) => {
  const { immediate } = options
  let getter = () => {
    return source()
  }
  let oldValue
  const applyCb = () => {
    let newValue = runner()
    if(newValue !== oldValue) {
      cb(newValue, oldValue)
      oldValue = newValue
    }
  }
  const runner = effect(getter, {
    scheduler: applyCb
  })
  if(immediate){
    applyCb()
  }else{
    oldValue = runner()
  }
}

class Store {
  constructor(options = {}) {
    let { state, mutations } = options
    this._vm = createReactive(state)
    this._mutations = mutations
  }
  get state(){
    return this._vm
  }
  commit(type, payload){
    const entry = this._mutations[type]
    if(entry){
      entry(this.state, payload)
    }
  }
}

let store = new Store({
  state: { count: 0 },
  mutations: {
    add(state, count = 1){
      state.count += count
    }
  }
})
store.commit('add', 1)
setTimeout(() => {
  store.commit('add', 1)
}, 1000);

watch(() => store.state.count, () => {
  console.log(`store.state.count = ${store.state.count}`)
})

let x = ref(1)
let y = ref(2)
let z = ref(3)
let computedValue = computed(() => x.value + 2)
set(x, 'y', 'y')
let stop = watchEffect(() => {
  console.log(`${x.value} ${x.y} ${y.value} ${z.value}`)
  console.log(`${computedValue.value}`)
})
// setTimeout(() =>{
//   stop()
//   x.value = 7
// }, 3000)
// watch(() => x.value, (newValue, oldValue) => {
  // console.log(`newValue: ${newValue}, oldValue: ${oldValue}`)
// }, { immediate: true })
x.value = 4
y.value = 5
z.value = 6
x.y = 'z'
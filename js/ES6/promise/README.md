# Promise

`promise` 表示一个异步操作的最终结果。和一个 `promise` 进行交互的主要方式是通过它的 `then` 方法，该方法注册回调要么接收一个 `promise` 的最终值，要么接收 `promise` 为什么不能被满足的原因。

## 规范

[Promise A+ 规范](https://promisesaplus.com/)

1. 术语

    - `promise` 是一个带有 `then` 方法的对象或函数，其行为符合此规范。
    - `thenable` 是一个定义了 `then` 方法的对象或函数。
    - `value` 是任何合法的 `JavaScript` 值(包括`undefined`、`thenable`或`promise`)。
    - `exception` 是使用 `throw` 语句抛出的值。
    - `reason` 是一个值，它指示为什么一个承诺被拒绝。
    
2. 要求

    - `promise`状态

        - `pending`：等待状态
            1. 当处于等待状态时可以转化成 `fulfilled` / `rejected`
    
        - `fulfilled`：完成状态
            1. 一定不能转换成其他状态
            2. 必须有一个不能转换的值(`value`)

        - `rejected`：拒绝状态
            1. 一定不能转换成其他状态
            2. 必须又一个不能转换的原因(`reason`)

     - `then` 方法：一个 `promise` 必须提供一个 `then` 方法来访问它的当前或最终值(`value`)或原因(`reason`)，`then` 方法接收两个参数 `promise.then(onFulfilled, onRejected)`
        - `onFulfilled` 和 `onRejected` 都是可选的参数  
        
            1. 如果 `onFulfilled` 不是个函数，必须被忽略
            2. 如果 `onRejected` 不是个函数，必须被忽略
            
        - 如果 `onFulfilled` 是一个函数
        
            1. 必须在 `promise` 完成(`resolve`)后被调用，`promise` 的值(value)作为它第一个参数
            2. 一定不能在 `promise` 完成(`resolve`)前被调用
            3. 一定不能被调用多次

        - 如果 `onRejected` 是一个函数
        
            1. 必须在 `promise` 拒绝(`reject`)后被调用，`promise` 的值(reason)作为它第一个参数
            2. 一定不能在 `promise` 拒绝(`reject`)前被调用
            3. 一定不能被调用多次
            
         - 在执行上下文堆栈只包含平台代码`[3.1]`之前，不能调用 `onfulfilled` 或 `onRejected`

         - `onFulfilled` 和 `onRejected` 必须作为函数调用(没有 `this` 值)`[3.2]`

        - 同一个 `promise` 上的 `then` 可能被多次调用
        
            1. 如果 `promise` 被完成(`resolve`)，所有相应的 `onFulfilled` 需要按照 `then` 的顺序被顺序执行
            2. 如果 `promise` 被拒绝(`reject`)，所有相应的 `onRejected` 需要按照 `then` 的顺序被顺序执行

        - `then` 必须返回一个 `promise` 实例 `[3.3]` `promise2 = promise1.then(onFulfilled, onRejected)`

            1. 如果 `onFulfilled` 和 `onRejected` 返回一个值 `x`，运行 `[[Resolve]](promise2, x)`
            2. 如果 `onFulfilled` 和 `onRejected` 抛出一个异常 `e` ，`promise2` 必须要用 `e` 作为理由拒绝
            3. 如果 `onFulfilled` 不是一个函数并且 `promise1` 被完成(`resolve`)，`promise2` 需要返回跟 `promise1` 同样的值 (`value`)
            4. 如果 `onRejected` 不是一个函数并且 `promise1` 被拒绝(`reject`)，`promise2` 需要返回跟 `promise1` 同样的值 (`reason`)

    - `promise` 解决程序（`[[Resolve]]`）`[[Resolve]]` 是一个抽象的概念，它一个 `promise` 和 `x` 作为输入 `[[Resolve]](promise, x)`，如果 `x` 是一个 `thenable`，它试图让承诺采用 `x` 的状态，假设 `x` 至少表现得有点像一个`promise`。否则，它将使用值x来实现 `promise`，这种 `thenable` 的处理允许 `promise` 的实现更具有通用型，只要它们暴露一个遵守 `Promise/A+` 的 `then` 方法即可。它还允许遵守`Promise/A+`规范的实现可以与那些不太规范但是可用的实现进行共存，运行`[[Resolve]](promise, x)`，执行以下步骤

        - 如果 `promise` 和 `x` 指向同一个对象，则以 `TypeError` 作为原因拒绝 `promise`

        - 如果 `x` 是一个 `promise` 则采取它的状态 `[3.4]`
            1. 如果 `x` 状态是 `pending`，则 `promise` 必须持续 `pending`，直到 `x` 被完成或拒绝。
            2. 如果 `x` 状态是 `resolve`，则用相同的值(value)解决 `promise`
            3. 如果 `x` 状态是 `reject`，则用相同的原因(reason)拒绝 `promise`

        - 如果 `x` 是一个函数或者对象
            1. 使 `then` 的值为 `x.then` `[3.5]`
            2. 如果获取 `x.then` 的值抛出异常 `e`， 则将 `e` 作为原因拒绝 `promise`
            3. 如果 `then` 是一个函数，用 `x` 作为 `this` 调用它，第一个参数`resolvePromise` ，第二个参数 `rejectPromise` ，其中
                1. 如果当 `resolvePromise` 的值为 `y` 时，运行 `[[Resolve]](promise, y)`
                2. 如果 `rejectPromise` 用一个原因 `r` 调用，用 `r` 拒绝 `promise`
                3. 如果同时调用了 `resolvePromise` 和 `rejectPromise` ，或者多次调用相同的参数，那么第一次调用优先，后续的调用将被忽略。(针对 `thenable` )
                4. 如果调用 `then` 抛出一个异常 `e`
                    1. 如果 `resolvePromise` 或 `rejectPromise` 已经被调用，忽略它。
                    2. 否则用 `e` 作为原因拒绝 `promise`
            4. 如果 `then` 不是一个函数，用 `x` 完成(resolve) `promise`

        - 如果 `x` 不是一个对象或函数，用 `x` 完成(resolve) `promise`
        
如果一个 `promise` 被 `thenable` 解析，并参与一个循环的 `thenable` 链，这样 `[[Resolve]](promise, thenable)` 的递归性质最终导致 `[[Resolve]](promise, thenable)` 再次被调用，按照上述算法将导致无限递归。我们鼓励(但不是必需)实现检测这种递归，并以 `TypeError` 作为原因拒绝承诺。`[3.6]`

3. 注解

    1. 这里 `平台代码` 使引擎、环境以及promise的实现代码。在实践中，这需要确保 `onFulfilled` 和 `onRejected` 异步地执行，并且应该在 `then` 方法被调用的那一轮事件循环之后用新的执行栈执行。这可以用如 `setTimeout` 或 `setImmediate` 这样的“宏任务”机制实现，或者用如 `MutationObserver` 或 `process.nextTick` 这样的“微任务”机制实现。由于 `promise` 的实现被考虑为 `平台代码` ，因此在自身处理程序被调用时可能已经包含一个任务调度队列

    2. 严格模式下，它们中的this将会是undefined；在非严格模式，this将会是全局对象

    3. 假如实现满足所有需求，可以允许 `promise2 === promise1` 。每一个实现都应该记录是否能够产生 `promise2 === promise1` 以及什么情况下会出现 `promise2 === promise1` 

    4. 通常，只有 `x` 来自于当前实现，才知道它是一个真正的 `promise` 。这条规则允许那些特例实现采用符合已知要求的 `Promise` 的状态

    5. 这个程序首先存储 `x.then` 的引用，之后测试那个引用，然后再调用那个引用，这样避免了多次访问 `x.then` 属性。此类预防措施对于确保访问者属性的一致性非常重要，因为访问者属性的值可能在俩次检索之间发生变化

    6. 实现不应该在 `thenable` 链的深度上做任意限制，并且假设超过那个任意限制将会无限递归。只有真正的循环才应该引发一个 `TypeError` ；如果遇到一个无限循环的 `thenable`，永远执行递归是正确的行为






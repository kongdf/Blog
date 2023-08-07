# 前言
聊聊js的运行机制，从基础到深入；
> 注意：Event Loop 并不是在 ECMAScript 标准中定义的，而是在 HTML 标准中定义的；

## 为什么js是单线程
JavaScript语言的一大特点就是单线程，并且这个核心短时间内不会改变；
主要是单线程可以避免同时操作同一个DOM的矛盾问题；
包括html5提出的 Web Worker标准，也只是允许js创建多个子线程，但是子线程也是受主线程控制，还不许操作dom；
> 虽然js是单线程的，但是浏览器不是！ 敲黑板！

## JS的执行机制
因为是单线程，所以js运行起来就是一个执行栈，每运行完一个，再处理下一个。

javascript代码运行时，任务被分为两种，宏任务（MacroTask/Task）和微任务（MircoTask）；
Event Loop在执行和协调各种任务时也将任务队列分为Task Queue和MircoTak Queue分别对应管理宏任务（MacroTask/Task）和微任务（MircoTask）；
作为队列，Task Queue和MircoTak Queue也具备队列特性：先进先出（FIFO—first in first out）；






## 同步/异步

所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）；
如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行；

### 同步任务(synchronous)
在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

### 异步任务(asynchronous)
不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

## 宏/微任务
宏任务和微任务是相对而言的，根据代码执时循环的先后，将代码执行分层理解，在每一层（一次）的事件循环中，首先整体代码块看作一个宏任务，宏任务中的 Promise（then、catch、finally）、MutationObserver、Process.nextTick就是该宏任务层的微任务；宏任务中的同步代码进入主线程中立即执行的，宏任务中的非微任务异步执行代码将作为下一次循环的宏任务时进入调用栈等待执行的；此时，调用栈中等待执行的队列分为两种，优先级较高先执行的本层循环微任务队列（MicroTask Queue），和优先级低的下层循环执行的宏任务队列（MacroTask Queue）！
注意：每一次/层循环，都是首先从宏任务开始，微任务结束; 

### 宏任务(macro-task)
基本上，我们将javascript中非微任务（MircoTask）的所有任务都归为宏任务，比如：

* script中全部代码
* DOM操作
* 用户交互操作
* 所有的网路请求
* 定时器相关的 setTimeout、setInterval 等
### 微任务(mincro-task)
在 HTML 标准中，并没有明确规定 Microtask，但是实际开发中包含以下四种：
* Promise中的then、catch、finally（原理参考：【js进阶】手撕Promise，一码一解析 包懂）
* MutationObserver（监视 DOM 变动的API，详情参考MDN）
* Object.observe(废弃：监听标准对象的变化)
* Process.nextTick（Node环境，通常也被认为是微任务） 
* promise.then、promise.nextTick(node)



在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。然而，根据这个异步事件的类型，这个事件实际上会被对应的宏任务队列或者微任务队列中去，当执行栈为空的时候，主线程会首先查看微任务中的事件，如果微任务不是空的那么执行微任务中的事件，如果没有在宏任务中取出最前面的一个事件。把对应的回调加入当前执行栈...如此反复，进入循环。

## javascript runtime
javascript runtime：为 JavaScript 提供一些对象或机制，使它能够与外界交互，是javascript的执行环境。javascript执行时会创建一个main thread主线程和call-stack 调用栈(执行栈，遵循后进先出的规则)，所有的任务都会被放到调用栈/执行栈等待主线程执行。 


* 1）主线程自上而下依次执行所有代码；
* 2）同步任务直接进入到主线程被执行；
* 3）异步任务进入到Event Table，当异步任务有结果后，将相对应的回调函数进行注册，放入Event Queue；
* 4）主线程任务执行完空闲下来后，从Event Queue（FIFO）中读取任务，放入主线程执行；
* 5）放入主线程的Event Queue任务继续从第一步开始，如此循环执行；
上述步骤执行过程就是我们所说的事件循环(Event Loop)，上图展示了事件循环中的一个完整循环过程。 

## setTimeout
setTimeout这个函数，是经过指定时间后，把要执行的任务加入到Event Queue中，又因为是单线程任务要一个一个执行，如果前面的任务需要的时间太久，那么只能等着，导致真正的延迟时间并不是自己定义的时间。

> 即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，循环嵌套超过5层的，并且延迟不到4ms，才会变成4ms。

## setInterval
跟 setTimeout 差不多，唯一需要注意的一点是，对于setInterval(fn,ms)来说，我们已经知道不是每过ms秒会执行一次fn，而是每过ms秒，会有fn进入Event Queue。
> setInterval的最短间隔时间是10毫秒，也就是说，小于10毫秒的时间间隔会被调整到10毫秒
**一旦setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了。**

## Node 环境下的 Event Loop

Node中的Event Loop是基于libuv实现的：libuv是 Node 的新跨平台抽象层，libuv使用异步，事件驱动的编程方式，核心是提供i/o的事件循环和异步回调。libuv的API包含有时间，非阻塞的网络，异步文件操作，子进程等等。

Node的Event loop一共分为6个阶段，每个细节具体如下：

* timers: 执行setTimeout和setInterval中到期的callback。
* pending callback: 上一轮循环中少数的callback会放在这一阶段执行。
* idle, prepare:仅在内部使用。
* poll:最重要的阶段，执行pending callback，在适当的情况下回阻塞在这个阶段。
* check:执行setImmediate的callback。
* close callbacks: 执行close事件的callback，例如socket.on(‘close’[,fn])或者http.server.on('close, fn)。 

注意：上面六个阶段都不包括 process.nextTick()

在Node.js中，一次宏任务可以认为是包含上述6个阶段、微任务microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。

### process.nextTick()
在第二节中就了解到，process.nextTick()属于微任务，但是这里需要重点提及下：

* process.nextTick()虽然它是异步API的一部分，但未在图中显示。因为process.nextTick()从技术上讲，它不是事件循环的一部分；
* 当每个阶段完成后，如果存在 nextTick，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行（可以理解为微任务中优先级最高的） 

# 总结
浏览器和Node环境下，microtask 任务队列的执行时机不同：Node 端，microtask 在事件循环的各个阶段之间执行；浏览器端，microtask 在事件循环的 macrotask 执行完之后执行；
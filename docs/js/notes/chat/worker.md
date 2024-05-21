# 介绍
JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

## Web Worker 有以下几个使用注意点。
### 同源限制
分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源
### DOM 限制
Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。

### 通信联系

Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。

### 脚本限制

Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。

### 文件限制

Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

## 基本用法
### index.js
```js
  function init(){
                //创建一个Worker对象，并向它传递将在新线程中执行的脚本url
                var worker = new Worker('worker.js');
                //接收worker传递过来的数据
                worker.onmessage = function(event){
                    document.getElementById('result').innerHTML+=event.data+"<br/>" ;
                };
            };

```

### Worker.js
```js
var i = 0;
function timedCount(){
    for(var j = 0, sum = 0; j < 100; j++){
        for(var i = 0; i < 100000000; i++){
            sum+=i;
        };
    };
    //将得到的sum发送回主线程
    postMessage(sum);
};
//将执行timedCount前的时间，通过postMessage发送回主线程
postMessage('Before computing, '+new Date());
timedCount();
//结束timedCount后，将结束时间发送回主线程
postMessage('After computing, ' +new Date());

```

上面代码执行的流程是：创建的worker对象，并用onmessage方法接收worker.js里面postMessage传递过来的数据(event.data)。



```js

// 主线程
var myWorker = new Worker('worker.js', { name : 'myWorker' });

// Worker 线程
self.name // myWorker



```
##  常用ＡＰＩ
### 进程
* Worker.onerror：指定 error 事件的监听函数。
* Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。
* Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
* Worker.postMessage()：向 Worker 线程发送消息。
* Worker.terminate()：立即终止 Worker 线程。

### 线程
* self.name： Worker 的名字。该属性只读，由构造函数指定。
* self.onmessage：指定message事件的监听函数。
* self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
* self.close()：关闭 Worker 线程。
* self.postMessage()：向产生这个 Worker 线程发送消息。
* self.importScripts()：加载 JS 脚本。

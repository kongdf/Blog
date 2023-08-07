# 介绍

浏览器缓存 是浏览器将用户请求过的静态资源（html、css、js），存储到电脑本地磁盘中，当浏览器再次访问时，就可以直接从本地加载了，不需要再去服务端请求了。
但也不是说缓存没有缺点，如果处理不当，可能会导致服务端代码更新了，但是用户却还是老页面。所以前端们要针对项目中各个资源的实际情况，做出合理的缓存策略。
 
# 优缺点
## 优点
*减少了冗余的数据传输，节省网费
*减少服务器的负担，提升网站性能
*加快了客户端加载网页的速度

## 缺点
资源如果有更改但是客户端不及时更新会造成用户获取信息滞后，如果老版本有bug的话，情况会更加糟糕。 

--- 
# 缓存规则

## 强缓存
简单粗暴，如果资源没过期，就取缓存，如果过期了，则请求服务器。

强是强制的意思。当浏览器去请求某个文件的时候，服务端就在respone header里面对该文件做了缓存配置。缓存的时间、缓存类型都由服务端控制，具体表现为： respone header 的cache-control，常见的设置是max-age public private no-cache no-store等
 
* max-age 过期时间
* public 浏览器和代理服务器都可以缓存（对于private和public，前端可以认为一样，不用深究）
* immutable 表示该资源永远不变，但是实际上该资源并不是永远不变，它这么设置的意思是为了让用户在刷新页面的时候不要去请求服务器！
* private 仅浏览器可以缓存
* no-cache 跳过设置强缓存，但是不妨碍设置协商缓存
* no-store 不强缓存，也不协商缓存，基本不用，缓存越多才越好呢
> 注意：规则可以同时多个


简单点说就是 设置max-ag后，后面的属性规定了怎样缓存；

* cache-control: max-age=xxxx，public
说明客户端和服务端都可以缓存，用户如果说xxx秒内请求，那么请求时会读取缓存并返回200状态码；
* cache-control: max-age=xxxx，private
说明客户端可以缓存，用户如果说xxx秒内请求，那么请求时会读取缓存并返回200状态码；
* cache-control: max-age=xxxx，immutable
客户端在xxx秒的有效期内，如果有请求该资源的需求的话就直接读取缓存,statu code:200 ，即使用户做了刷新操作，也不向服务器发起http请求
* cache-control: no-cache
设置了no-cache就不会走强缓存了，每次请求都回询问服务端。可以协商缓存；
* cache-control: no-store
无缓存，协商也不行；

>   max-age = 0 ，和 no-cache 有啥区别，我理解的是，no-cache直接不进行强缓存，让你去走协商缓存，而max-age=0是进行强缓存，但是过期了，需要更新。



## 协商缓存

强缓存是根据时间来判断需不需要重新加载，而协商缓存是通过文件是否更改；

### 触发条件：

* Cache-Control 的值为 no-cache （不强缓存）
* max-age 过期了 （强缓存，但总有过期的时候）
也就是说，不管怎样，都可能最后要进行协商缓存（no-store除外）

```bash
# response header
etag: '5c20abbd-e2e8'
last-modified: Mon, 24 Dec 2018 09:49:49 GMT
```



* etag：文件唯一标示的hash值
* last-modified：文件的修改时间，精确到秒；
 
请求资源时，把用户本地该资源的 etag 同时带到服务端，服务端和最新资源做对比。
如果资源没更改，返回304，浏览器读取本地缓存。
如果资源有更改，返回200，返回最新的资源。
 
 每次http返回来 response header 中的 ETag和 Last-Modified，在下次请求时在 request header 就把这两个带上（但是名字变了ETag-->If-None-Match，Last-Modified-->If-Modified-Since ），服务端把你带过来的标识，资源目前的标识，进行对比，然后判断资源是否更改了。

这个过程是循环往复的，即缓存表在每次请求成功后都会更新规则。


## 为什么要有etag
etag是http1.1新增的，主要是为了解决几个last-modified比较难解决的问题
* 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新get；
* 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，if-modified-since能检查到的粒度是秒级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
* 某些服务器不能精确的得到文件的最后修改时间。


---
# 大致流程

![](/images/js/catch.jpg)
 
> response header中的etag、last-modified在客户端重新向服务端发起请求时，会在request header中换个key名

```bash
// response header
etag: '5c20abbd-e2e8'
last-modified: Mon, 24 Dec 2018 09:49:49 GMT

// request header 变为
if-none-matched: '5c20abbd-e2e8'
if-modified-since: Mon, 24 Dec 2018 09:49:49 GMT
```







# 设置强缓存与协商缓存
node.js
```js
res.setHeader('max-age': '3600 public')
res.setHeader(etag: '5c20abbd-e2e8')
res.setHeader('last-modified': Mon, 24 Dec 2018 09:49:49 GMT)
```

nginx配置
```bash
add_header Cache-Control 'xxxxx'
```
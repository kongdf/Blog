# 前端八股文

#### 1.JavaScript 有哪些数据类型，它们的区别？

<details>
<summary>查看回答</summary>
8种,Undefined、Null、Boolean、Number、String、Object、Symbol(ES6)、BigInt(ES6)。

* Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。比如发起请求时需要标识;
* BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数。
* 栈（stack）：原始数据类型（Undefined、Null、Boolean、Number、String、Symbol、BigInt）
* 堆（heap）：引用数据类型（对象、数组和函数）
* 在数据结构中，栈中数据的存取方式为先进后出。
* 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定
* 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
* 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。

</details>
 
#### 2. 数据类型检测的方式有哪些?
<details>
<summary>查看回答</summary>

* typeof
    *  其中数组、对象、null 都会被判断为 object，其他判断都正确。
* instanceof
    * 内部运行机制是判断在其原型链中能否找到该类型的原型
    * instanceof 只能正确判断引用数据类型，而不能判断基本数据类型。
* constructor
    * constructor 有两个作用，一是判断数据的类型，二是对象实例通过constrcutor 对象访问它的构造函数。
    * 如果创建一个对象来改变它的原型，constructor 就不能用来判断数据类型了

```js
function Fn(){};
Fn.prototype = new Array();
var f = new Fn();
console.log(f.constructor===Fn);//false
console.log(f.constructor===Array); // true
```
* Object.prototype.toString.call()

> obj.toString()的结果和Object.prototype.toString.call(obj)的结果不一样;

>   这是因为 toString 是 Object 的原型方法，而 Array、function 等类型作为 Object 的实例，都重写了 toString 方法。不同的对象类型调用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法（function 类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用 Object 上原型toString 方法（返回对象的具体类型），所以采用 obj.toString()不能得到其对象类型，只能将 obj 转换为字符串类型；
>   因此，在想要得到对象的具体类型时，应该调用 Object 原型上的 toString 方法。
```js
var a = Object.prototype.toString;
console.log(a.call(2));
console.log(a.call(true));
console.log(a.call('str'));
console.log(a.call([]));
console.log(a.call(function()));
console.log(a.call({}));
console.log(a.call(undefined));
console.log(a.call(null));

```
 

</details>


#### 3.null 和 undefined 区别

<details> 
<summary>查看回答</summary>
undefined 代表的含义是未定义，null 代表的含义是空对象。
一般变量声明了但还没有定义的时候会返回undefined，null 主要用于赋值给一些可能会返回对象的变量，作为初始化。

当对这两种类型使用 typeof 进行判断时，Null 类型化会返回“object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回false。

</details>

#### 4.intanceof 操作符的实现原理及实现

<details> 
<summary>查看回答</summary>
instanceof 运算符用于判断构造函数的prototype 属性是否出现在对象的原型链中的任何位置。

```js

function myInstanceof(left,right)
//获取对象的原型
let proto = Object.getPrototypeof(left)
// 获取构造函数的 prototype 对象
let prototype = right .prototype;
// 判断构造函数的 prototype 对象是否在对象的原型链上while (true)
if ( !proto) return false;
if (proto === prototype) return true;
// 如果没有找到，就维续从其原型上找，object.getPrototypeOf方法用来获取指定对象的原型proto = Object.getPrototype0f(proto);

```
</details>

#### 6.如何获取安全的 undefined 值？

<details> 
<summary>查看回答</summary>
因为 undefined 是一个标识符，所以可以被当作变量来使用和赋值，但是这样会影响 undefined 的正常判断。
表达式void ___ 没有返回值，因此返回结果是 undefined。void 并不改变表达式的结果，只是让表达式不返回值。因此可以用 void 0 来获得undefined。
 
</details>

#### 6. Object.is() 与比较操作符 “===”、“==”的区别？
<details> 
<summary>查看回答</summary>

 * 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
 * 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
 * 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和+0 不再相等，两个NaN是相等的。
</details>

#### 7. 什么是 JavaScript 中的包装类型？

<details> 
<summary>查看回答</summary>

 在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时JavaScript会在后台隐式地将基本类型的值转换为对象，如：
```js
 
const a ='abc';
a.length //3
a.toUpperCase //'ABC'

```
在 访 问 'abc'.length 时 ， JavaScript 将'abc' 在后台转换成String('abc')，然后再访问其 length 属性。


JavaScript 也可以使用 Object 函数显式地将基本类型转换为包装类型：
```js
 
var a ='abc';

 Object(a) //String {"abc"}

```
也可以使用 valueOf 方法将包装类型倒转成基本类型：
```js
var a='abc' 
var  b = Object(a)
var c = b.valueOf( ) // abc'

```

看看如下代码会打印出什么：
```js
var a = new Boolean( false );
if (!a){
console.log( "Oops" ); // never runs
}

```
答案是什么都不会打印，因为虽然包裹的基本类型是false，但是false 被包裹成包装类型后就成了对象，所以其非值为false，所以循环体中的内容不会运行。
</details>

#### 8. 为什么会有 BigInt 的提案？
<details> 
<summary>查看回答</summary>
JavaScript 中 Number.MAX_SAFE_INTEGER 表示最⼤安全数字，计算结果是 9007199254740991，即在这个数范围内不会出现精度丢失（⼩数除外）。但是⼀旦超过这个范围，js 就会出现计算不准确的情况，这在⼤数计算的时候不得不依靠⼀些第三⽅库进⾏解决，因此官⽅提出了 BigInt 来解决此问题。
</details>

#### 9. 如何判断一个对象是空对象

<details> 
<summary>查看回答</summary>

```js
if(JSON.stringify(Obj) =='{}'){
    console,log()};

if(Object.keys(Obj).length < 0){
    console.log('空对象')
    };


```
</details>

#### 10. const 对象的属性可以修改吗

<details> 
<summary>查看回答</summary>
 基本类型不可,引用类型的属性可以;

</details>  


#### 11. 如果 new 一个箭头函数的会怎么样

<details> 
<summary>查看回答</summary>
    箭头函数没有prototype，也没有自己的this指向，更不可以使用 arguments 参数，所以不能New 一个箭头函数。

    new 操作符的实现步骤如下：

    1.创建一个对象
    2.将构造函数的作用域赋给新对象（也就是将对象的__proto__属性指向构造函数的 prototype 属性）
    3.指向构造函数中的代码，构造函数中的this 指向该对象（也就是为这个对象添加属性和方法）
    4.返回新的对象
</details>  

#### 12. 箭头函数的 this 指向哪⾥？

<details> 
<summary>查看回答</summary>
    上下文;最上层啥

</details>  
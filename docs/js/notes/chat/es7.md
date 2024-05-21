## ES7

### Array Includes

`arr.includes(valueToFind)`

`arr.includes(valueToFind, fromIndex)`

```js
let arr = [1, 2, 3, 4];
arr.includes(3); // true
arr.includes(5); // false
arr.includes(3, 1); // true

arr.includes(3, 3); // false
arr.includes(3, 20); // false

arr.includes(3, -100); // true
arr.includes(3, -1); // false
```

### 指数 exponentiation 运算符

幂运算符\*\*，相当于 Math.pow()

```js
5 ** 2; // 25
Math.pow(5, 2); // 25
```

## ES8

### Async functions

```js

async function name([param[, param[, ...param]]]) {
  // statements
}

```

### Object.entries

Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组

```js
let obj = { a: 1, b: 2 };
Object.entries(obj); // [['a', 1], ['b', 2]]
```

### Object.values

Object.values()方法返回一个给定对象自身可枚举属性值的数组

```js
let obj = { a: 1, b: 2 };
Object.values(obj); // [1, 2]
```

### Object.getOwnPropertyDescriptors

```js
let obj = { a: 1, b: 2 };
Object.getOwnPropertyDescriptors(obj);
```

### Trailing commas 尾后逗号

我们允许在函数定义和调用时多加一个逗号

```js
function foo(num1, num2) {
  console.log(num1, num2);
}

foo(10, 20);
```

### String.padStart()&padEnd()

padStart() 在原字符串开头填充指定的填充字符串直到目标长度所形成的新字符串。
padEnd() 在原字符串的末尾

```js
str.padStart(targetLength);
str.padStart(targetLength, padString);
// targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
// padString（可选）：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "。

"abc".padStart(10); // "       abc"
"abc".padStart(10, "foo"); // "foofoofabc"
"abc".padStart(6, "123465"); // "123abc"
"abc".padStart(8, "0"); // "00000abc"
"abc".padStart(1); // "abc"
```

## ES9

### Async iterators 异步迭代器

Async iterator 对象的 next() 方法返回一个 Promise，这个 Promise 的返回值可以被解析成 {value, done} 的格式;
`iterator.next().then(({value, done}) => {});`

```js
// 模拟一个返回大量数据的迭代器
function* dataIterator() {
  for (let i = 0; i < 1000000; i++) {
    yield i;
  }
}

// 处理数据的函数
function processData() {
  const iterator = dataIterator();

  function processNextValue() {
    const { value, done } = iterator.next();
    if (!done) {
      // 处理当前值
      console.log(value);
      // 继续处理下一个值
      processNextValue();
    }
  }

  processNextValue();
}

processData();
```

### Object rest properties 剩余属性

```js
let test = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

let { a, b, ...rest } = test;

console.log(a); // 1
console.log(b); // 2
console.log(rest); // {c: 3, d: 4}
```

### Object spread properties 扩展属性

```js
let test = {
  a: 1,
  b: 2,
};
let result = { c: 3, ...test };
console.log(result); // {c: 3, a: 1, b: 2}
```

### Promise.prototype.finally

在 Promise 结束的时候，不管是结果是 resolved 还是 rejected，都会调用 finally 中的方法

```js
const promise = new Promise((resolve, reject) => {
  resolve("resolved");
  reject("rejectd");
});

promise
  .then((res) => {
    console.log(res);
  })
  .finally(() => {
    console.log("finally");
  });
```

## ES10

### Array.prototype.{flat, flatMap}扁平化嵌套数组

```js
const arr = [1, 2, [[[[3, 4]]]]];

arr.flat(); // [1, 2, [[[3, 4]]]]
arr.flat(3); // [1, 2, [3, 4]]
arr.flat(-1); // [1, 2, [[[[3, 4]]]]]
arr.flat(Infinity); // [1, 2, 3, 4]
```

> flat()会移除数组中的空项

### Object.fromEntries()

这个静态方法允许将键值对列表转换为对象。它接收一个键值对的可迭代对象（如数组）作为参数，并返回一个新的对象。
Object.fromEntries() 则是 Object.entries()
```js
const entries = [
  ["name", "John"],
  ["age", 30],
  ["city", "New York"],
];

// 将键值对列表转换为对象
const obj = Object.fromEntries(entries);
console.log(obj); // { name: 'John', age: 30, city: 'New York' }
```

### String.prototype.trimStart()&String.prototype.trimEnd()

去空格,只删除开头或结尾.. 如果全去除还得用 trim();

```js
const str = "   Hello, World!   ";
// 我们可以使用trimStart()方法去除字符串开头的空白字符：

const trimmedStr = str.trimStart();
console.log(trimmedStr);
// 输出: "Hello, World!   "
```
### Symbol.prototype.description

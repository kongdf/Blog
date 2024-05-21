## 禁止浏览器打开文件或下载

```js
// 禁止浏览器打开文件或下载
document.addEventListener(
  "drop",
  function (e) {
    e.preventDefault();
  },
  false
);
document.addEventListener(
  "dragover",
  function (e) {
    e.preventDefault();
  },
  false
);
```

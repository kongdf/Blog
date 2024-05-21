## 解决 js 下载 txt/图片直接打开

```js
downloadFile(url) {

     const link = document.createElement("a");
     fetch(url)
       .then((res) => res.blob())
       .then((blob) => {
         link.href = URL.createObjectURL(blob);
         link.download = file_name;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
       });
   }
```

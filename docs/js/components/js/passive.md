## chrome浏览器passive警告

main.js引入 browser _patch.js



```js
(() => {
    if (typeof EventTarget !== "undefined") {
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, fn, capture) {
            this.originalAddEventListener = originalAddEventListener;
            if (typeof capture !== "boolean") {
                capture = capture || {};
                capture.passive = false;
            }

            originalAddEventListener.call(this, type, fn, capture);
        };
    }
})();

```

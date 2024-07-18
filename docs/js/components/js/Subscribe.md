---
aside: false
editLink: true
---
```js
const AudioPlayListeners = [];

export function AudioPlaySubscribe(listener) {
    AudioPlayListeners.push(listener);
}

export function AudioPlaySubscribeSet(type, data = null) {
    AudioPlayListeners.forEach((listener) => listener(type, data));
}

```
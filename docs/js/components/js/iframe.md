## iframe 获取摄像头设备失败

iframe 引入一个 webRTC 获取摄像头设备的时候，getUserMedia 获取设备失败，需要在 iframe 标签中加入 allow;

```html
<iframe
  src="src" frameborder="0"  allow="microphone;camera;midi;encrypted-media;" ></iframe>
```

这样就可以了

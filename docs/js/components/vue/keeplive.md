---
aside: false
---
 
# vue3 中 keep alive

```vue
<router-view v-slot="{ Component }">
     <keep-alive :include="state.keepaliveNameList">
                       <component :is="Component" :key="state.componentKey" />
     </keep-alive>
</router-view>
```
 
注意：被包裹的组件或页面需要 name 属性;不是路由的name;

```js
<script>
  export default {
    name: 'Test',
  };
</script>


```
如果是setup语法糖
使用 vite-plugin-vue-setup-extend 插件

`npm i vite-plugin-vue-setup-extend --save` 

vite.config.js

```js
import VueSetupExtend from "vite-plugin-vue-setup-extend";

plugins: [
          //  ...
            VueSetupExtend(), 
        ],



```

x.vue
```vue
<script setup name="HotDealOrder">
</script>
```
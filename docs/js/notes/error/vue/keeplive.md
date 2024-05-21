## vue3 中 keep alive

```html
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
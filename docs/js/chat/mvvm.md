## 前言
MVVM,MVC,MVP新人可能不太懂这些，所以写一篇关于MVVM来记录下自己的理解；

## 什么是MVC
MVC=Model(数据)、View(视图)、Controller(控制器)； 

举个例子，

```js
document.getElementById('con').innerHTML='test'
```
比如我想改变html中id为con的内容，我需要手动的去获取dom再进行更改；

con所展示的内容，就是view层，而model则是我要更改的数据，而这句js就倾向于Controller了；

这样 获得数据-操作dom-更新视图 的模式就被称作简单的mvc;

## 什么是MVVM

MVVM=Model(数据)、View(视图)、ViewModel(视图模型)；
其实MVVM其实就是MVC的增强版,只不过是把Controller中的部分给隐藏起来,这样开发过程中就省略了通过Controller控制View这一步；

比如vue的v-model双向绑定,我更改v-model的数据，达到视图更新，或者视图更新，数据也改变；

举个例子

```vue
<div>{{msg}}</div>
```
大家在写vue的时候，很少会手动进行dom操作；

基本都是把动态的model放到data里，然后再通过 this.msg='' 等更改数据；这样我们就已经省略了操作dom的一步；

通过监听数据更改来达到视图更新的目的，这种开发思想被称作mvvm模式，所有的业务逻辑基本都在VM层；

## MVP
MVP的全称为Model-View-Presenter，Model提供数据，View负责显示，Controller/Presenter负责逻辑的处理。

MVP与MVC有着一个重大的区别：在MVP中View并不直接使用Model，它们之间的通信是通过Presenter (MVC中的Controller)来进行的，所有的交互都发生在Presenter内部，而在MVC中View会直接从Model中读取数据而不是通过 Controller。
Presenter层 控制器，视图层发生一个事件交给控制器，控制器要不获取数据，要不然就直接去操作DOM，根据视图发送的事件，相当于View和Model的中转站。
JQ就属于是MVP模式，大部分都是在操作DOM。
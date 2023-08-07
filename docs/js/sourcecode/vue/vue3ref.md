---
title: vue3中的ref是否是reactive；
tags:
  - 源码
  - vue3
categories:
  - JavaScript
description: 难啃也得啃的源码;

date: 2021-10-28 18:00:00
---

## 介绍
之前看过一个说法，说vue3.0中，ref实际用的是object.defineproperty()，然后我翻了源码，发现说法是错误的；
先上代码
```js
// ...
// 直接看创建ref,他new了一个RefImpl
export function ref(value?: unknown) {
  return createRef(value)
}

/**
 * @description: 
 * @param {rawValue} 原始值 
 * @param {shallow} 是否是浅观察 
 */
function createRef(rawValue: unknown, shallow = false) {
  // 如果已经是ref直接返回
  if (isRef(rawValue)) {
    return rawValue
  }

  // 如果是浅观察直接观察，不是则将 rawValue 转换成 reactive ,
  // reactive 的定义在下方 
  let value = shallow ? rawValue : convert(rawValue)

  // ref 的结构
  const r = {
    // ref 标识
    __v_isRef: true,
    get value() {
      // 依赖收集
      track(r, TrackOpTypes.GET, 'value')
      return value
    },
    set value(newVal) {
      if (hasChanged(toRaw(newVal), rawValue)) {
        rawValue = newVal
        value = shallow ? newVal : convert(newVal)
        // 触发依赖
        trigger(
          r,
          TriggerOpTypes.SET,
          'value',
          __DEV__ ? { newValue: newVal } : void 0
        )
      }
    }
  }
  return r
}

// 如是是对象则调用 reactive, 否则直接返回 
const convert = <T extends unknown>(val: T): T =>
  isObject(val) ? reactive(val) : val
// ...
``` 
createRef 先判断 value 是否已经是一个 ref, 如果是则直接返回，如果不是接着判断是不是浅观察，如果是浅观察直接构造一个 ref 返回，不是则将 rawValue 转换成 reactive 再构造一个 ref 返回
 
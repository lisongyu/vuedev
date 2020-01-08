import {
  isObject,
  hasOwn,
  def,
  hasProto
} from '../utils/index.js';
import {
  arrayMethods
} from './array'
import Dep from './dep.js';

export class Observer {
  constructor(data) {
    this.data = data;
    this.dep = new Dep();
    //将data 数据中添加 属性 __ob__ 为Observer 以便数组调用

    def(data, '__ob__', this);

    const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
    //判断是否是数组
    if (Array.isArray(data)) {
      //支持__proto__走protoAugment否则走copyAugment
      const augment = hasProto ? protoAugment : copyAugment;
      augment(data, arrayMethods, arrayKeys)
      
      this.observeArray(data)
    } else {
      this.walk(data)
    }

  }

  /**
   * 侦测Array中的每一项
   * **/
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i], this.vm)
    }
  }
  walk(data) {
    Object.keys(data).forEach(key => {

      defineReactive(data, key, data[key]);

    })

  }
}
//初始化
export function observe(value, asRootData) {
  //不是对象则返回
  if (!isObject(value)) {
    return
  }
  let ob;
  //判断是否是自身属性
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {

    ob = new Observer(value, asRootData)
  }

  return ob
}

export function proxyData(data, vm) {

  Object.keys(data).forEach(key => {


    Object.defineProperty(vm, key, {
      get() {

        return data[key]
      },
      set(newVal) {
        data[key] = newVal
      }
    })


  })
}


function protoAugment(target, src, keys) {
  target.__proto__ = src
}

function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
//defineReactive 方法使用
export function defineReactive(data, key, val) {
  let dep = new Dep();
  //如果是对象
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    get() {

      dep.depend()
      if (childOb) {
        childOb.dep.depend();
      }
      return val

    },
    set(newVal) {
      if (newVal === val) {
        return
      }
      val = newVal;
      //进行通知
      dep.notify()
    }
  })

}
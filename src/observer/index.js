import {
  isObject
} from '../utils/index.js';
import Dep from './dep.js';

export class Observer {
  constructor(data, vm) {
    this.data = data;
    this.$vm = vm;

    this.walk(data)
  }
  walk(data) {
    Object.keys(data).forEach(key => {

      defineReactive(data, key, data[key]);

    })

  }
}
//初始化
export function observe(value, vm, asRootData) {
  //不是对象则返回
  if (!isObject(value)) {
    return
  }
  new Observer(value, vm)
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
//defineReactive 方法使用
export function defineReactive(data, key, val) {
  let dep = new Dep();
  //如果是对象
  observe(val)

  Object.defineProperty(data, key, {
    get() {

      if (Dep.target) {

        dep.addSub(Dep.target)
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
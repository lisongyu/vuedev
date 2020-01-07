import Dep from './dep.js';
export class Watcher {
  constructor(vm, key, cb) {
    Dep.target = this;
    this.$vm = vm;
    this.$key = key;
    //赋值
    this.cb = cb;
    //收集触发get响应式
    vm.$data[key];
    Dep.target = null;
  }
  //页面更新
  update() {
    console.log('数据更新了')
    this.cb.call(this.$vm, this.$vm.$data[this.$key])
  }
}
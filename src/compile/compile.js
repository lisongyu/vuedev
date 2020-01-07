import {
  Watcher
} from '../observer/watcher.js';
export default class Compile {
  constructor(el, vm) {
    //查找元素
    this.$el = document.querySelector(el);
    this.$vm = vm;
    console.log(vm)
    //如果存在
    if (this.$el) {
      //转化为片段
      this.fragment = this.node2Fragment(this.$el);

      this.compile(this.fragment);
      this.$el.appendChild(this.fragment);
    }
  }
  node2Fragment(el) {
    //创建片段
    let frag = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
      frag.appendChild(child)
    }
    return frag
  }
  //页面编译
  compile(el) {
    let childNodes = el.childNodes;
    console.log(childNodes)
    //将dom 列数组转化为数组
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        //取node中的属性
        const nodeAttrs = node.attributes;
        console.log('编译元素');
        Array.from(nodeAttrs).forEach(attr => {
          const attrName = attr.name;
          const attrValue = attr.value;
          //对不同name值进行判断
          if (this.isDirective(attrName)) {
            let dir = attrName.substring(2);
            this[dir] && this[dir](node, this.$vm, attrValue);
          } else if (this.isEvent(attrName)) {
            let dir = attrName.slice(1);
            this.eventHandler(node, this.$vm, attrValue, dir)

          }

        })
      } else if (this.isInterpolation(node)) {
        //文本插值
        //编译文本
        this.compileText(node)
      }
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  //事件操作
  eventHandler(node, vm, exp, dir) {

    let fn = vm.$option.methods && vm.$option.methods[exp];

    if (fn) {

      node.addEventListener(dir, fn.bind(vm))
    }
  }
  //如果是指令
  isDirective(attr) {
    return attr.indexOf('l-') === 0
  }

  html(node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }
  model(node, vm, exp) {
    this.update(node, vm, exp, 'model');
    node.addEventListener('input', (e) => {
      vm[exp] = e.target.value
    })
  }
  //如果是事件
  isEvent(attr) {
    return attr.indexOf('@') === 0
  }
  compileText(node) {
    // node.textContent = vm.$data[exp]
    this.update(node, this.$vm, RegExp.$1, 'text');
  }
  textUpdater(node, val) {

    node.textContent = val;
  }
  modelUpdater(node, val) {

    node.value = val;
  }
  htmlUpdater(node, val) {

    node.innerHTML = val;
  }
  update(node, vm, exp, dir) {
    //1. 方法调用
    const updaterFn = this[dir + 'Updater'];
    //初始化 数据
    var key = vm[exp]
    if (exp.indexOf('.') != -1) {
      let expArr = exp.split('.');
      key = this.dataData(expArr, vm);
    }
    updaterFn && updaterFn(node, key);
    //watcher 方法监听
    new Watcher(vm, exp, (newVal) => {

      updaterFn && updaterFn(node, newVal);

    })

  }
  //将数组转化为对象的键值对序列形式
  dataData(expArr, vm) {
    //取第一个
    var getKey = expArr.shift();
    //this.vm
    if (expArr.length) {
      return this.dataData(expArr, vm[getKey])
    }
    //最终返回值
    return vm[getKey]
  }
  //文本插值
  isInterpolation(node) {
    let reg = /\{\{\s*(\S*)\s*\}\}/
    return node.nodeType === 3 && reg.test(node.textContent)
  }
  //元素
  isElement(node) {

    return node.nodeType === 1
  }
}
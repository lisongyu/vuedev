//初始化编译
import Compile from './compile/compile.js';
//初始化监听器
import {
  observe,
  proxyData
} from './observer/index.js';
//初始化 MyVue 调用基初始化
export default class MyVue {
  constructor(option) {
    //设置option
    this.$option = option;
    //设置数据
    this.$data = option.data;
    //执行观察
    proxyData(this.$data,this)
    observe(this.$data, this)
    //执行编译
    new Compile(option.el, this);

    if (option.created) {
      option.created.call(this)
    }


  }
}
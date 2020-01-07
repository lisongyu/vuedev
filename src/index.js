//引入编译类 compile
import MyVue from './init.js';

let vm = new MyVue({
  el: "#app",
  data: {
    name: '我是琦琦',
    age: 12,
    obj: {
      foo: '我是重复'
    },
    content: '我是书写的内容'
  },
  methods: {
    changeName() {

      this.name = "哈喽你好呀";
      this.age = 1;

    }
  },
  created() {
    console.log("开始啦")
    setTimeout(() => {
      this.name = '我是猪猪'
    }, 1000)
  },

})
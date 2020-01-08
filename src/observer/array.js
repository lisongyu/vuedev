import {
  def
} from '../utils/index.js';
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = ['pop', 'shift', 'unshift', 'sort', 'reverse', 'splice', 'push'];

methodsToPatch.forEach(method => {
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {

    const result = original.apply(this, args);

    //this 代表Observer
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) {

    }
     ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result

  })

})
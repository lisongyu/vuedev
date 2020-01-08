import {
  pushTarget,
  popTarget
} from '../observer/dep'
export function getData(data, vm) {

  pushTarget()
  try {
    return data.call(vm)
  } catch (e) {
    //(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}
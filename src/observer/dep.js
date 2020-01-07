export default class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
   
    this.subs.forEach(v => {
      v.update()
    })
  }
}
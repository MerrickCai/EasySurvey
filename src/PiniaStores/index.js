import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    //响应式数据
    name: 'cai',
    value: 5
  }),
  getters: {
    //计算属性
    doubleValue: (state) => state.value * 2,
    doublePlusOne() {
      return this.value * 2 + 1
      //return this.doubleValue * 2 + 1    套娃
    },
  },
  actions: {
    //方法
    increment() {
      this.value++
    },
    decline() {
      this.value--
    },
  }
})

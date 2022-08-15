import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    navShow: true //导航栏展示
  }),
  getters: {
    //计算属性
    doubleValue: (state) => state.value * 2,
    doublePlusOne() {
      return this.value * 2 + 1
    }
  },
  actions: {
    //方法
    increment() {
      this.value++
    },
    decline() {
      this.value--
    }
  }
})

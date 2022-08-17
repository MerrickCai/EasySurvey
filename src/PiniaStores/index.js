import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    navShow: true //导航栏展示（除logo外的控件）
  }),
  getters: {
  },
  actions: {
  }
})

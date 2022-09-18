import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    //顶部导航栏组件的展示
    navShow: true,
    //背景展示
    backgroundShow: false,
    //用户数据
    user: {
      status: false,
      account: 0,
      password: 0,
      userId: 0,
      token: 0,
      refreshtoken: 0,
      age: 0,
      area: 0
    }
  })
})

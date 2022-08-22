import { defineStore } from 'pinia'

import survey1 from './survey1.js'
import survey2 from './survey2.js'
import survey3 from './survey3.js'
import survey4 from './survey4.js'
import survey5 from './survey5.js'

export const useStore = defineStore('main', {
  state: () => ({
    //顶部导航栏组件的展示
    navShow: true,
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
    },
    //填写问卷和创建问卷的数据：计划后期从survey.vue文件中通过异步网络请求获取，以下代码只是过渡使用
    survey: {
      survey1,
      survey2,
      survey3,
      survey4,
      survey5
    }
  })
})

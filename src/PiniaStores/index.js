import { defineStore } from 'pinia'

import { survey1 } from './survey.js'

export const useStore = defineStore('main', {
  state: () => ({
    //导航栏展示（除logo外的控件）
    navShow: true,
    //确定用户是否登录以及访问用户数据
    user: {
      status: false,
      account: 0,
      password: 0,
      token:0
    },
    //填写问卷的信息 后期会整合进用户数据，因为发布的问卷是属于某个用户下面的
    //计划：用户登录完成后用异步函数向后台获取问卷数据，这样子跳转到首页会展示他发布问卷的统计数据
    survey: {
      currentSurvey: 0,
      survey1,
      survey2: null,
    }
  }),
  getters: {
  },
  actions: {
  }
})

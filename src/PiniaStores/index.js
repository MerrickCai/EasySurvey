import { defineStore } from 'pinia'

import { survey1, survey2 ,survey3 , survey4 , survey5} from './survey.js'

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
    //填写问卷和创建问卷的数据
    survey: {
      currentSurvey: 0,
      survey1,
      survey2,
      survey3,
      survey4,
      survey5
    }
  })
})

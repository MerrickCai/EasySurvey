import { defineStore } from 'pinia'
import { survey1 } from './survey.js'

export const useStore = defineStore('main', {
  state: () => ({
    navShow: true, //导航栏展示（除logo外的控件）
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

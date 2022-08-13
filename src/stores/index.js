import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
      user:{
        account:'cai',
        password:123
      },
      survey1:{
        ques1:{
          ques:'问题一',
          value:'2'
        },
        ques2:{
          ques:'问题一',
          value:'2'
        },
        ques3:{
          ques:'问题一',
          value:'2'
        },
      }
     }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
import { defineStore } from 'pinia'
import axios from "axios"

export const useStore = defineStore('main', {

  state: () => ({

    //顶部导航栏组件的展示
    navShow: true,

    //背景展示
    backgroundShow: false,

    //用户数据
    user: {

      status: false,
      token: 0,
      refreshtoken: 0,
      userId: 0,
      username: 0,
      email: 0,
      age: 0,
      area: 0,
      picture: 0,
      account: 0,
      password: 0,

    }

  }),

  actions: {

    async login(account, password, remember) {
      try {

        const response = await axios({
          url: "https://q.denglu1.cn/api/user/login",
          method: "post",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          data: { phone_number: account, password: password },
        })

        //console.log('登录成功返回response', response)

        if (response.data.code === 200) { //账号密码正确

          //写入用户数据到pinia状态管理库
          this.user.status = true
          this.user.account = account
          this.user.password = password
          this.user.token = response.data.data.token
          this.user.refreshtoken = response.data.data.refreshtoken



          if (remember) { // 确认用户是否自动登录

            localStorage.setItem('User', JSON.stringify({
              token: response.data.data.token,
              refreshtoken: response.data.data.refreshtoken
            }))
          } else {
            localStorage.setItem('User', JSON.stringify({
              token: response.data.data.token
            }))
          }

          return true // 返回true，可以跳转到填写地区和年龄的弹窗页面


        } else if (response.data.code === 401) { //账号或者密码错误

          return false // 返回false，账号或者密码错误
        }

      } catch (error) {

        console.log('由于网络问题，登录失败', error)

        return error

      }
    },

    async getUserMessage(token) {
      try {

        const response = await axios({
          url: `https://q.denglu1.cn/api/user/getUserMessage`,
          method: "get",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          headers: { token: token }
        })

        //console.log('获取的用户信息', response)

        //写入pinia
        this.user.status=true
        this.user.userId = response.data.data.id
        this.user.username = response.data.data.username
        this.user.email = response.data.data.email
        this.user.age = response.data.data.age
        this.user.area = response.data.data.province
        this.user.picture = response.data.data.picture
        this.user.account = response.data.data.phone_number
        this.user.password = response.data.data.password

        //console.log('调用getUserMessage()后Pinia中的用户数据(datas.user)', this.user)

        return true

      } catch (error) {

        console.log('获取用户数据错误', error)

        return false
      }

    },

    getToken() {

      const User = JSON.parse(localStorage.getItem('User'))
      const result = this.getUserMessage(User.token)

      if (result) {
        return User.token
      } else {
        return false
      }

    }

  }


})

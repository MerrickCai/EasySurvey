import { defineStore } from 'pinia'
import axios from "axios"
import { useRouter } from "vue-router"
const router = useRouter()

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

        if (response.data.code === 200) { //账号密码正确

          //console.log('登录成功response', response)

          if (remember) { // 确认用户是否保持长期登录

            localStorage.setItem('User', JSON.stringify({
              token: response.data.data.token,
              refreshtoken: response.data.data.refreshtoken
            }))

          } else {

            localStorage.setItem('User', JSON.stringify({
              token: response.data.data.token
            }))

          }

          return true // 登录成功

        } else if (response.data.code === 401) { //账号或者密码错误

          //console.log('登录失败response（账号或者密码错误）', response)

          return false // 登录失败，账号或者密码错误
        }

      } catch (error) {

        console.log('登录接口错误', error)

        return error

      }

    },


    async register(account, password) {

      const response = await axios({
        url: 'https://q.denglu1.cn/api/user/regist',
        method: 'post',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: {
          phone_number: account,
          password: password
        }
      })

      if (response.data.code === 200) { // 注册成功

        await this.login(account, password, true)

        return true //注册成功

      } else { //response.data.code === 400 => 重复注册

        return false //重复注册

      }

    },

    async getUserMessage(token) {

      try {

        const response = await axios({
          url: `https://q.denglu1.cn/api/user/getUserMessage`,
          method: "get",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "token": token
          }
        })

        //console.log('getUserMessage接口获取的用户信息', response)

        if (response.data.code === 200) { //获取成功。token有效

          //写入pinia状态管理库（！注意：页面关闭会销毁）
          this.user.status = true
          this.user.userId = response.data.data.id
          this.user.username = response.data.data.username
          this.user.email = response.data.data.email
          this.user.age = response.data.data.age
          this.user.area = response.data.data.province
          this.user.picture = response.data.data.picture
          this.user.account = response.data.data.phone_number
          this.user.password = response.data.data.password

          //console.log('调用getUserMessage()后Pinia中的用户数据(datas.user)', this.user)

          return true //用户验证成功

        } else {  //response.data.code === 403 || response.data.code === 500 => token过期或者非法

          return false //token无效

        }

      } catch (error) {

        console.log('获取用户数据接口错误', error)

        return false
      }

    },

    async getToken() {

      const User = JSON.parse(localStorage.getItem('User'))

      const result = await this.getUserMessage(User.token)

      if (result) { //token有效

        return User.token //token有效

      } else { //token无效

        if (User.refreshToken) { //用户选择保持登录,本地有refreshToken

          const result = await this.refreshToken()

          if (result) { //refreshToken有效，返回了正确的token

            localStorage.removeItem('User')
            localStorage.setItem('User', JSON.stringify({
              token: result,
              refreshToken: User.refreshToken
            }))

            return result //refreshToken有效，返回了正确的token

          } else { //refreshToken无效，只能重新进行登录注册

            localStorage.removeItem('User')

            // 跳转到登录注册页面
            router.push({
              path: "/login",
              query: { redirect: to.fullPath },
            })

            return false //token无效，refreshToken无效

          }

        } else { //token无效，且无refreshToken，只能重新进行登录注册

          localStorage.removeItem('User')

          // 跳转到登录注册页面
          router.push({
            path: "/login",
            query: { redirect: to.fullPath },
          })

          return false

        }

      }

    },

    async refreshToken() {

      const User = JSON.parse(localStorage.getItem('User'))

      const response = axios({
        url: `q.denglu1.cn/user/refresh`,
        method: "post",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          refreshtoken: User.refreshToken
        }
      })

      if (response.data.code === 200) { //refreshToken有效

        return response.data.token

      } else {  //response.data.code === 403 || response.data.code === 500 => refreshToken过期或者非法

        return false //refreshToken过期或者非法

      }

    }

  }

})

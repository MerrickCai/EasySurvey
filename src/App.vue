<script setup>
//导航栏组件
import navbar from './components/navbar.vue'

//获取 Pinia 的用户数据
import { useStore } from "./PiniaStores/index.js";
const datas = useStore();
import axios from 'axios'
//路由守卫
import { useRouter } from 'vue-router'
const router = useRouter()
router.beforeEach(async (to) => { //这个函数会激活两次！！
  if (to.meta.requireLogin) { //先确认网页是否需要登录
    if (datas.user.status) { //确认用户是否登录
      return true
    } else {
      // 利用localStorage 帮用户登录
      if (localStorage.length == 2) {
        console.log('已记住密码，本次自动登录')
        await axios({
          url: 'http://q.denglu1.cn:8080/user/login',
          method: 'post',
          data: {
            "phone_number": localStorage.getItem('account'),
            "password": localStorage.getItem('password')
          },
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => {
            console.log(response)
            //记录用户本次登录数据到pinia
            if (response.data.msg === '登陆成功') {
              datas.user.status = true
              datas.user.account = localStorage.getItem('account')
              datas.user.password = localStorage.getItem('password')
              datas.user.token = response.data.token
            }
          })
          .catch(error => { console.log(error) })
      }
      if (datas.user.status) {
        return true
      } else {
        datas.navShow = false
        return {
          path: '/login',
          query: { redirect: to.fullPath }
        }
      }
    }
  } else {
    return true
  }
})
</script>

<template>
  <navbar></navbar>
  <main>
    <div>
      <!--主路由容器-->
      <router-view></router-view>
      <!--主路由容器-->
    </div>
  </main>
</template>

<style lang="less" scoped>
@nav: 80px;

main {
  display: block;
  height: 100vh;
  width: var(--safe_area);
  margin: 0 auto;
  padding-top: @nav;

  >div {
    display: block;
    height: calc(100vh - @nav);
    width: 100%;
    overflow: visible;
  }
}
</style>
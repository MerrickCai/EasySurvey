<script setup>
//导航栏组件
import navbar from './components/navbar.vue'

//获取 Pinia 的用户数据来做跳转
import { useStore } from "./PiniaStores/index.js";
const datas = useStore();

//路由守卫
import { useRouter } from 'vue-router'
const router = useRouter()
router.beforeEach((to) => { //这个函数会激活两次！！
  if (to.meta.requireLogin) { //先确认网页是否需要登录
    if (datas.user.status) { //确认用户是否登录
      return true
    } else {
      datas.navShow = false
      return { path: '/login' }
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
<script setup>
import Navbar from "./view/Navbar.vue"
import { useRouter } from "vue-router"
import { useStore } from "./Stores/pinia.js"
import bg1 from './assets/login_cloud.jpg'
import bg2 from './assets/login_mount.jpg'
import bg3 from './assets/login_mountain.jpg'
const router = useRouter()
const datas = useStore()



//------------------------ //全局前置守卫（帮助用户自动登录） --------------------------
router.beforeEach(async (to) => {

  if (to.path === "/login") { //判断是否进入登录注册页面=>防止死循环
    //顶部导航栏组件的展示
    datas.navShow = false
    return true
  } else {
    //顶部导航栏组件的展示
    datas.navShow = true
  }

  if (to.meta.requireLogin === false) {
    //确认页面是否需要登录
    return true
  }

  if (datas.user.status === true) {
    //确认用户是否登录
    return true
  }

  // 如果 localStorage 储存了用户登录数据，帮用户自动登录
  if (localStorage.getItem("User")) {


    const result = await datas.getToken()

    if (result) { //token有效，可能没用到refreshToken，或者没有refreshToken

      ElMessage({
        message: '自动登录成功',
        type: 'success',
        duration: 3000,
        showClose: true,
        center: true
      })

      return true

    } else { //token无效，refreshToken也无效

      ElMessage({
        message: '自动登录失败',
        type: 'error',
        duration: 3000,
        showClose: true,
        center: true
      })

      false

    }

  }

  // 跳转登录注册页面
  return {
    path: "/login",
    query: { redirect: to.fullPath },
  }

})
//------------------------ //全局前置守卫（帮助用户自动登录） --------------------------





//------------------------ 随机背景图 ----------------------------------
const background = {
  url: [bg1, bg2, bg3],
  random(x, y) {//随机返回[x,y]的数字
    return Math.floor(Math.random() * (y - x + 1)) + x
  },
  geturl() {
    return this.url[this.random(0, this.url.length - 1)]
  }
}
const background_url = background.geturl()
//------------------------ 随机背景图 ----------------------------------
</script>

<template>
  <main>
    <Navbar />
    <div>
      <!--主路由容器-->
      <router-view v-slot="{ Component, route }">
        <transition name="mainView" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
      <!--主路由容器-->
    </div>
  </main>
  <div class="background" v-if="datas.backgroundShow">
    <img v-lazy="background_url" alt="页面背景" />
  </div>
</template>

<style lang="less" scoped>
div.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  height: 100%;

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

main {
  display: block;
  height: 100vh;
  width: var(--safe_area);
  margin: 0 auto;

  >div {
    display: block;
    height: calc(100vh - @navSpan);
    width: 100%;
    overflow: visible;

    @media (max-width:@breakpoint) {
      height: calc(100vh - @navSpan + 10px);
    }

    >.mainView-enter-active,
    >.mainView-leave-active {
      transition: all 0.2s ease-in-out 0s;
    }

    >.mainView-enter-from,
    >.mainView-leave-to {
      transform: translateX(20px);
      filter: opacity(0);
    }
  }
}
</style>





<style lang="less">
:root {
  --safe_area: @safeArea;
}

@media (max-width:@safeArea) {
  :root {
    --safe_area: 100%;
  }
}

@media (max-width:@breakpoint) {
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 1.5px solid rgba(255, 255, 255, 0);
    border-radius: 5px;
    background-color: rgba(30, 111, 255, 1);
  }
}

#app {
  display: block;
  height: 100vh;
  width: 100%;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

ol,
li {
  list-style: none;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-corner {
  background-color: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  border: 3px solid rgba(255, 255, 255, 0);
  border-radius: 5px;
  background-color: rgba(30, 111, 255, 1);
}
</style>
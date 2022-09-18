<script setup>
import navbar from "./view/navbar.vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { useStore } from "./Stores/index.js"
import { ElMessage } from 'element-plus'
const router = useRouter()
const datas = useStore()



//------------------------ //全局前置守卫（帮助用户自动登录） --------------------------
router.beforeEach(async (to, from) => {
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
  if (localStorage.getItem("account") && localStorage.getItem("password")) {
    try {
      const response = await axios({
        url: "https://q.denglu1.cn/api/user/login",
        method: "post",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        data: {
          phone_number: atob(localStorage.getItem("account")),
          password: atob(localStorage.getItem("password")),
        },
      })
      ElMessage({
        message: '记住密码，为您自动登录',
        type: 'success',
        duration: 4000,
        showClose: true,
        center: true
      })
      //写入用户数据
      datas.user.status = true
      datas.user.account = atob(localStorage.getItem("account"))
      datas.user.password = atob(localStorage.getItem("password"))
      datas.user.userId = response.data.data.userId
      datas.user.token = response.data.data.token
      datas.user.refreshtoken = response.data.data.refreshtoken
      return true
    } catch (error) {
      ElMessage({
        message: '记住密码，自动登录失败',
        type: 'error',
        duration: 4000,
        showClose: true,
        center: true
      })
      // 跳转登录注册页面
      datas.navShow = false
      return {
        path: "/login",
        query: { redirect: to.fullPath },
      }
    }
  }
  // 跳转登录注册页面
  datas.navShow = false
  return {
    path: "/login",
    query: { redirect: to.fullPath },
  }
})
//------------------------ //全局前置守卫（帮助用户自动登录） --------------------------





//------------------------ 随机背景图 ----------------------------------
const background = {
  url: ['/assets/login_cloud.png', '/assets/login_mountain.png', '/assets/login_mount.jpg'],
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
    <navbar />
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
@navSpan: var(--navSpan);
@safe_area: var(--safe_area);

div.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  height: 100%;

  @media (max-width:800px) {
    display: none;
  }

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

main {
  display: block;
  height: 100vh;
  width: @safe_area;
  margin: 0 auto;

  >div {
    display: block;
    height: calc(100vh - @navSpan);
    width: 100%;
    overflow: visible;

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
@safe_area: 1200px;

:root {
  --navSpan: 70px;
  --safe_area: @safe_area; //页面安全区
}

@media (max-width:@safe_area) {
  :root {
    --safe_area: 100%;
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
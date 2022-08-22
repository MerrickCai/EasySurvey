<script setup>
import navbar from "./view/navbar.vue";
//全局前置守卫（帮助用户自动登录）
import { useRouter } from "vue-router";
import { useStore } from "./PiniaStores/index.js";
import axios from "axios";
const router = useRouter();
const datas = useStore();
router.beforeEach(async (to, from) => {
  if (to.path === "/login") {
    //判断是否进入登录注册页面=>防止死循环
    return true;
  }
  if (to.meta.requireLogin === false) {
    //确认页面是否需要登录
    return true;
  }
  if (datas.user.status === true) {
    //确认用户是否登录
    return true;
  }
  // 如果 localStorage 储存了用户登录数据，帮用户自动登录
  if (localStorage.getItem("account") && localStorage.getItem("password")) {
    try {
      const response = await axios({
        url: "https://q.denglu1.cn/user/login",
        method: "post",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        data: {
          phone_number: localStorage.getItem("account"),
          password: localStorage.getItem("password"),
        },
      });
      console.log("用户选择记住密码，本次为自动登录");
      //写入用户数据
      datas.user.status = true;
      datas.user.account = localStorage.getItem("account");
      datas.user.password = localStorage.getItem("password");
      datas.user.userId = response.data.data.userId;
      datas.user.token = response.data.data.token;
      datas.user.refreshtoken = response.data.data.refreshtoken;
      return true;
    } catch (error) {
      console.log("用户选择记住密码，本次为自动登录，但是登录失败");
      datas.navShow = false;
      return {
        path: "/login",
        query: { redirect: to.fullPath },
      };
    }
  }
  // 跳转登录注册页面
  datas.navShow = false;
  return {
    path: "/login",
    query: { redirect: to.fullPath },
  };
});
</script>

<template>
  <main>
    <navbar />
    <div>
      <!--主路由容器-->
      <router-view v-slot="{ Component, route }">
        <transition name="mainView" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
      <!--主路由容器-->
    </div>
  </main>
</template>

<style lang="less" scoped>
@navSpan: 90px;

main {
  display: block;
  height: 100vh;
  width: var(--safe_area);
  margin: 0 auto;

  > div {
    display: block;
    height: calc(100vh - @navSpan);
    width: 100%;
    overflow: visible;

    > .mainView-enter-active,
    > .mainView-leave-active {
      transition: all 0.2s ease-in-out 0s;
    }

    > .mainView-enter-from,
    > .mainView-leave-to {
      filter: opacity(0);
    }
  }
}
</style>
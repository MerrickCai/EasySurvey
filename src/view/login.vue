<script setup>
//顶部导航栏组件的展示（除logo外的控件）
import { useStore } from '../PiniaStores/index.js'
const datas = useStore()
datas.navShow = false
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave(() => {
   datas.navShow = true
})

//动态组件
import { ref, computed, provide } from 'vue'
import accountLogin from '../components/login/accountLogin.vue'
import wechatLogin from '../components/login/wechatLogin.vue'
const viewList = [wechatLogin, accountLogin]
const viewId = ref(1)
const currentView = computed(() => viewList[viewId.value])
provide('viewId', viewId)

//随机背景图
const background = {
   url: ['/login_cloud.png', '/login_mountain.png', 'login_mount.jpg'],
   random(x, y) {//随机返回[x,y]的数字
      return Math.floor(Math.random() * (y - x + 1)) + x
   },
   geturl() {
      return this.url[this.random(0, this.url.length - 1)]
   }
}
const background_url = background.geturl()
</script>

<template>
   <!--动态背景-->
   <Teleport to="#app">
      <div class="background">
         <img :src="background_url" alt="登陆注册页背景" />
      </div>
   </Teleport>
   <!--动态组件-->
   <main>
      <Transition name="fade" mode="out-in">
         <KeepAlive>
            <component :is="currentView"></component>
         </KeepAlive>
      </Transition>
   </main>
</template>

<style lang="less" scoped>
.fade-enter-active,
.navbar-leave-active {
   transition: all 0.2s linear 0s;
}

.fade-enter-from,
.fade-leave-to {
   filter: opacity(0);
}

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
   width: auto;
   height: auto;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background-color: rgb(255, 255, 255);
   box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
   border-radius: 5px;
}
</style>
<script setup>
//随机背景图
const background = {
   url: ['/img/login_cloud.png', '/img/login_mountain.png', '/img/login_mount.jpg'],
   random(x, y) {//随机返回[x,y]的数字
      return Math.floor(Math.random() * (y - x + 1)) + x
   },
   geturl() {
      return this.url[this.random(0, this.url.length - 1)]
   }
}
const background_url = background.geturl()


//动态组件
import { ref, computed, provide } from 'vue';
import accountLogin from '../components/login/accountLogin.vue';
import wechatLogin from '../components/login/wechatLogin.vue';
import register from '../components/login/register.vue';
import popUp from '../components/login/popUp.vue';
const viewList = [wechatLogin, accountLogin, register, popUp]
const viewId = ref(1)
const currentView = computed(() => viewList[viewId.value])
provide('viewId', viewId)
</script>

<template>
   <div wrapper>
      <!--动态背景-->
      <Teleport to="#app">
         <div class="background">
            <img :src="background_url" alt="登陆注册页背景" />
         </div>
      </Teleport>
      <main>
         <!--动态组件-->
         <Transition name="fade" mode="out-in">
            <KeepAlive>
               <component :is="currentView"></component>
            </KeepAlive>
         </Transition>
      </main>
   </div>
</template>

<style lang="less" scoped>
@navSpan: 70px;

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

div[wrapper] {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;
   width: 100%;
   >main {
      display: block;
      width: auto;
      height: auto;
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
      border-radius: 10px;
      margin-top: -@navSpan;

      @media (max-width:800px) {
         box-shadow: none;
         border-radius: 0;
         width: 100%;
      }

      .fade-enter-active,
      .navbar-leave-active {
         transition: all 0.2s ease-in-out 0s;
      }

      .fade-enter-from,
      .fade-leave-to {
         filter: opacity(0);
      }
   }
}
</style>
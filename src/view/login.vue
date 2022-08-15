<script setup>
const bcgurl = ['/login_cloud.png', '/login_mountain.png'];
function random(x, y) { //随机返回[x,y]的数字
   return Math.floor(Math.random() * (y - x + 1)) + x
}

import { useStore } from '../PiniaStores/index.js'
const datas = useStore()

datas.navShow=false
//路由守卫
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave((to, from) => {
   datas.navShow = true
})
</script>

<template>
   <div class="background">
      <img :src="`${bcgurl[random(0, 1)]}`" alt="背景">
   </div>
   <div class="main">
      <div class="title">
         <router-link to="/login/WechatLogin" active-class="active change" exact>
            <h2>微信登录</h2>
         </router-link>
         <router-link to="/login/AccountLogin" active-class="active change" exact>
            <h2>账号登录</h2>
         </router-link>
      </div>
      <router-view></router-view>
   </div>
</template>

<style lang="less" scoped>
@rem: 0.625px;
@a: 0.9px;

.background {
   display: block;
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   z-index: -10;

   img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
}

.main {
   width: 440* @a;
   height: 380* @a;
   background-color: #fff;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translateX(-50%) translateY(-50%);

   .title {
      display: flex;
      position: absolute;
      left: 60*@a;
      top: 60*@a;

      h2 {
         box-sizing: border-box;
         font-weight: bold;
         font-size: 20*@a;
         margin-right: 32*@a;
         letter-spacing: 0*@a;
         line-height: 28*@a;
         font-family: '思源黑体';
         font-weight: 500;
         position: relative;
         cursor: pointer;

         &::after {
            content: '';
            // width: 40*@a;
            width: 0;
            height: 4*@a;
            position: absolute;
            left: 40*@a;
            bottom: -6*@a;
            background-color: blue;
            transition: all .4s linear;
         }
      }
   }

   .active {
      h2 {
         &::after {
            content: '';
            width: 40*@a;
            // width: 0;
            height: 4*@a;
            position: absolute;
            left: 20*@a;
            bottom: -6*@a;
            background-color: blue;
         }
      }
   }


}
</style>
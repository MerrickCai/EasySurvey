<script setup>
//路由守卫=>导航栏隐藏
import { useStore } from '../PiniaStores/index.js'
const datas = useStore()
datas.navShow = false
import { onBeforeRouteLeave } from 'vue-router'
onBeforeRouteLeave(() => {
   datas.navShow = true
})


//随机背景图
const background = {
   url: ['/login_cloud.png', '/login_mountain.png', 'login_mount.jpg'],
   random(x, y) {//随机返回[x,y]的数字
      return Math.floor(Math.random() * (y - x + 1)) + x
   },
   geturl() {
      return this.url[this.random(0, this.url.length-1)]
   }
}
const background_url = background.geturl()
</script>

<template>
   <div class="background">
      <img :src="background_url" alt="背景">
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
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   z-index: -1;
   user-select: none;
   -webkit-user-drag: none;

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
}

.main {
   width: 440* @a;
   height: 380* @a;
   background-color: rgb(255,255,255);
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translateX(-50%) translateY(-50%);
     box-shadow: 0px 6px 30px 0px rgba(73, 107, 158, 0.1);
     border-radius: 8px;
   .title {
      display: flex;
      position: absolute;
      left: 60*@a;
      top: 60*@a;
      user-select: none;
      -webkit-user-drag: none;

      h2 {
         box-sizing: border-box;
         font-weight: bold !important;
         font-size: 20*@a;
         margin-right: 32*@a;
         letter-spacing: 0*@a;
         line-height: 28*@a;
         font-weight: 500;
         position: relative;
         cursor: pointer;
         color: rgba(217, 217, 217, 1);

         &:hover {
            color: #000;
         }

         &::after {
            content: '';
            // width: 40*@a;
            width: 0;
            height: 4*@a;
            position: absolute;
            left: 40*@a;
            bottom: -6*@a;
            background-color: rgba(30, 111, 255, 1);
            transition: all .4s linear;
            border-radius: 5*@a;
         }
      }
   }

   .active {
      h2 {
         color: #000;

         &::after {
            content: '';
            width: 40*@a;
            // width: 0;
            height: 4*@a;
            position: absolute;
            left: 20*@a;
            bottom: -6*@a;
            background-color: rgba(30, 111, 255, 1);
         }
      }
   }


}
</style>
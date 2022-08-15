<script setup>
import AccountLogin from '../components/AccountLogin.vue';
import WechatLogin from '../components/WechatLogin.vue';
import Register from '../components/register.vue';

const bcgurl = ['/login_cloud.png', '/login_mountain.png'];
function random(){ //随机返回[x,y]的数字
   let x=0
   let y=1
   return Math.floor(Math.random()*(y-x+1))+x
}
</script>

<template>
   <div class="background">
        <img :src="`${bcgurl[random()]}`" alt=""> 
    </div>
    <div class="main">
       <div class="title">
         <router-link to="/login/WechatLogin" active-class="active change"  exact><h2>微信登录</h2></router-link>
         <router-link to="/login/AccountLogin" active-class="active change"  exact><h2>账号登录</h2></router-link>
       </div> 
   <router-view></router-view>
   </div>
</template>

<style lang="less" scoped>
@rem:0.625px; 
@a:0.9px;
.background{
    width: 1920 * @rem;
    height: 972* @rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-47%);
    z-index: -1;
       img{
          width: 100%;
          height: 100%;
      }
}

.main{
  width: 440* @a;
  height: 380* @a;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  .title{
     display: flex;
     position: absolute;
     left: 60*@a;
     top: 60*@a;
   h2{
      box-sizing: border-box;
      font-weight: bold;
      font-size:20*@a;
      margin-right: 32*@a;
      letter-spacing: 0*@a;
      line-height: 28*@a;
      font-family: '思源黑体';
      font-weight: 500;
      position: relative;
      cursor: pointer;
        &::after{
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

.active{
   h2{
        &::after{
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
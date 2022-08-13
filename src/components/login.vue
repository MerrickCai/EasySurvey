<script setup>
import AccountLogin from './AccountLogin.vue';
const bcgurl = ['/login_cloud.png', '/login_mountain.png'];
</script>

<template>
    <div class="background">
        <img :src=bcgurl[1] alt=""> 
    </div>
    <div class="main">
       <AccountLogin> </AccountLogin>
    </div>
</template>

<style lang="less" scoped>
.background{
      width: 100%;
      height: 100%;
       img{
          width: 100%;
          height: 100%;
          // height: 802px;
          position: fixed;
          left: 0;
          top: 0;
          z-index: -1;
      }
}

.main{
  width: 440px;
  height: 550px;
  background-color: pink;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
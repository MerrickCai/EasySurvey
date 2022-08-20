<script setup>
import { inject } from 'vue'
const viewId = inject('viewId')
</script>

<template>
   <div class="wrapper">
      <div class="title">
         <a @click="viewId = 0">微信登录</a>
         <a @click="viewId = 1">账号登录</a>
      </div>
      <img src='/login_icon1.png' />
   </div>
</template>

<style lang="less" scoped>
@rem: 0.9px;
@a: 0.9px;

.wrapper {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 400px;
   width: 450px;

   .title {
      display: flex;
      left: 60*@a;
      top: 60*@a;

      a {
         font-weight: bold;
         font-size: 20*@a;
         margin-right: 32*@a;
         line-height: 28*@a;
         position: relative;

         color: rgba(217, 217, 217, 1);
         cursor: pointer;

         &:hover {
            color: #000;
         }
      }
   }

   >img {
      display: block;
      height: 300px;
      width: 300px;
   }
}
</style>
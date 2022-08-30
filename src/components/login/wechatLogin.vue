<script setup>
//视图切换
import { inject } from 'vue'
const viewId = inject('viewId')
</script>

<template>
   <div class="wrapper">

      <div class="selectArea">
         <a active @click="viewId = 0">微信登录</a>
         <a @click="viewId = 1">账号登录</a>
      </div>

      <div img>
         <img src='/img/login_icon1.png' alt="微信扫码登录" />
      </div>

      <div class="buttom">使用微信扫一扫登录</div>
      
   </div>
</template>

<style lang="less" scoped>
div.wrapper {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 400px;
   width: 420px;

   >div.selectArea {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-end;
      height: 80px;
      width: 70%;

      >a {
         display: block;
         position: relative;
         font-size: 19px;
         font-weight: bold;
         margin-right: 15px;
         color: rgba(217, 217, 217, 1);
         cursor: pointer;

         &[active] {
            color: rgb(0, 0, 0);

            &::before {
               content: '';
               position: absolute;
               left: 25%;
               bottom: -12px;
               height: 5px;
               width: 50%;
               background-color: rgba(30, 111, 255, 1);
               border-radius: 10px;
            }
         }

         &:not([active]):hover {
            color: rgb(0, 0, 0);
         }
      }
   }

   >div[img] {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      height: 220px;
      width: auto;

      >img {
         display: block;
         height: 180px;
         width: 180px;
         object-fit: contain;
      }
   }

   >div.buttom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: auto;
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
   }
}
</style>
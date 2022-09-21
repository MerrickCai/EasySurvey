<script setup>
//视图切换
import axios from 'axios';
import { inject,onMounted,ref,onActivated} from 'vue'
import textlistVue from '../surveynew/textlist.vue';
const viewId = inject('viewId')

// 轮询向接口获取token （未实现）
let timer = setInterval(() => {
   axios({
      url: `https://q.denglu1.cn/denglu/qrLogin`,
      method: "POST",
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },   
   }).then((res) => {
      console.log(res);
   }).catch((error) => {
      console.log(error);
   })
}, 1000);


let showQrcode = ref(false);
let test = ref(null);

let base64Url = ref("");
// axios({
//    url: `https://qrconnect.denglu.net.cn/connect.php`,
//    method: "GET",
//    withCredentials: true,
//    headers: { 'Content-Type': 'application/json' },
//    params: {
//       'sAppId': '18845bb439a2f17eb217014948af7d90',
//       'sUrl': 'https://q.denglu1.cn/',
//       'sType': 'login',
//       'sResType': 'web',
//       'sMethod': 'POST',
//    }
// }).then((response) => {
//       console.log(response);
//       console.log(response.data);
//       test.value = response.data;
//     showQrcode.value = true;
//    }).catch((error) => {
//       console.log(error);
//    })

function jumpTodengluyi() {
   viewId.value = 0;
   showQrcode.value = true;
}

</script>

<template>
   <div class="wrapper">

      <div class="selectArea">
         <a active @click="jumpTodengluyi()">微信登录</a>
         <a @click="viewId = 1">账号登录</a>
      </div>

      <div img> 
         <!-- <img v-lazy="'/assets/login_icon1.png'" alt="微信扫码登录" /> -->
         <!-- <img :src="base64Url" alt="登录易扫码登录" id="dengluyiqrCode"> -->
       </div>

       <div v-if="showQrcode" class="qrCode">
         <span class="close" @click="showQrcode=false,viewId = 1">关闭</span>
         <iframe :src="`https://qrconnect.denglu.net.cn/connect.php?sAppId=18845bb439a2f17eb217014948af7d90&sUrl=https://q.denglu1.cn/&sType=login&sResType=web`" class="qr-content"></iframe>
      </div>
      <!-- <div class="buttom">请用<a href="https://denglu1.cn/" target="_blank" class="download-link">登录易手机App</a>扫描二维码登录</div> -->
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
   @media (max-width:800px) {
    width: 100%;
  }
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
      font-family: '思源黑体';
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100px;
      width: auto;
      transform: translateY(35px);
      font-size: 14px;
      color: rgba(0, 0, 0, 1);
      a{
         color: #4791ff;
      }
   }

   .qrCode{
      background-color: skyblue;
      width: 70%;
      height: 70%;
      position: absolute;
      background-color: rgba(100,149,237);
      .qr-content{
         width: 100%;
         height: 100%;
      }
      .close{
         font-size: 16px;
          position: absolute;
          right: 16px;
          top: 16px;
          background-color: #eef9fd;
          width: 60px;
          height: 30px;
          border-radius: 5px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          &:hover{   
             background-color: #57c2e9;
          }
      }
   }
}
</style>
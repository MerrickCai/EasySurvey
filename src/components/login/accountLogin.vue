<script setup>
//登陆注册页视图切换
import { reactive, inject } from 'vue'
const viewId = inject('viewId')

//登录逻辑
const user = reactive({ account: '', password: '', remember: false })
import { useStore } from "../../PiniaStores/index.js"
const datas = useStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import axios from 'axios'
function login(account, password, remember) {
     if (datas.user.status === true) { //确认用户是否登录
          alert('您已经登录')
          return true
     }
     axios({
          url: 'https://q.denglu1.cn/user/login',
          method: 'post',
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
          data: { "phone_number": account, "password": password }
     }).then((response) => {
          //写入用户数据
          datas.user.status = true
          datas.user.account = account
          datas.user.password = password
          datas.user.userId = response.data.userId
          datas.user.token = response.data.token
          datas.user.refreshtoken = response.data.refreshtoken
          if (remember) { //确认用户是否自动登录
               localStorage.setItem('account', account)
               localStorage.setItem('password', password)
          }
          if(route.query.redirect){ //判断用户是否从其他页面过来
          router.push({ path: route.query.redirect })
          }else{
               router.push({ path: '/' })
          }
          return true
     }).catch((error) => {
          console.log('登录失败')
          console.log(error)
     })
}
</script>

<template>
     <div class="wrapper">
          <div class="selectArea">
               <a @click="viewId = 0">微信登录</a>
               <a active @click="viewId = 1">账号登录</a>
          </div>

          <div class="typeArea">
               <input type="text" v-model="user.account" placeholder="用户名 / 手机号 / Email" onfocus="this.placeholder=''"
                    onblur="this.placeholder='用户名 / 手机号 / Email'" />
               <input type="password" v-model="user.password" placeholder="请输入登录密码" onfocus="this.placeholder=''"
                    onblur="this.placeholder='请输入登录密码'" />
          </div>

          <div class="functionArea">
               <div remember>
                    <input type="checkbox" id="checkbox" v-model="user.remember" />
                    <p><label for="checkbox">下次自动登录</label></p>
               </div>
               <a>立即注册</a>
          </div>

          <div button @click="login(user.account, user.password, user.remember)">
               <div>登录</div>
          </div>
     </div>
</template>

<style lang="less" scoped>
div.wrapper {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     height: 400px;
     width: 450px;

     >div.selectArea {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-end;
          height: 80px;
          width: 320px;

          >a {
               display: block;
               position: relative;
               font-size: 20px;
               font-weight: bold;
               margin-right: 25px;
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

     >div.typeArea {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          height: 150px;
          width: 70%;

          >input {
               outline: none;
               height: 45px;
               width: 100%;
               border-radius: 10px;
               border: solid 1px rgba(217, 217, 217, 1);
               background-color: rgb(255, 255, 255);
               text-indent: 15px;
               font-size: 15px;

               &:nth-child(1) {
                    margin-bottom: 15px;
               }

               &::placeholder {
                    color: rgba(217, 217, 217, 1);
               }
          }
     }

     >div.functionArea {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-start;
          height: 70px;
          width: 70%;

          >div[remember] {
               display: flex;
               flex-direction: row;
               justify-content: center;
               align-items: center;
               height: 50px;

               >input {
                    display: block;
                    height: 13px;
                    width: 13px;
                    cursor: pointer;
                    position: relative;
                    margin: 0 10px;

                    &::after {
                         content: '';
                         position: absolute;
                         z-index: 1;
                         top: 0;
                         left: 0;
                         display: block;
                         width: 13px;
                         height: 13px;
                         font-size: 13px;
                         font-weight: bold;
                         line-height: 15px;
                         text-align: center;
                         background-color: rgb(255, 255, 255);
                         border: rgba(217, 217, 217, 1) solid 1px;
                    }

                    &:checked::after {
                         content: "✓";
                         width: 15px;
                         height: 15px;
                         color: rgba(255, 250, 250, 1);
                         background-color: rgba(30, 111, 255, 1);
                         border: none;
                    }
               }

               >p {
                    display: block;
                    font-size: 13px;
                    color: rgba(217, 217, 217, 1);

                    >label {
                         cursor: pointer;
                    }
               }
          }

          >a {
               flex: 1;
               display: flex;
               flex-direction: row;
               justify-content: flex-end;
               align-items: center;
               height: 50px;
               font-size: 13px;
               color: rgba(71, 145, 255, 1);
               cursor: pointer;
          }
     }

     >div[button] {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          height: 100px;
          width: 70%;

          >div {
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               height: 50px;
               background-color: rgba(30, 111, 255, 1);
               border-radius: 10px;
               width: 100%;
               color: rgba(255, 255, 255, 1);
               font-size: 16px;
               cursor: pointer;
          }
     }
}
</style>
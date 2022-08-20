<script setup>

import { ref, reactive, inject } from 'vue'

const viewId = inject('viewId')


//获取 Pinia 的用户数据
import { useStore } from "../../PiniaStores/index.js";
const datas = useStore();
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()
//登录
const loginInfo = reactive({
     account: '',
     pass: ''
})
import axios from 'axios'
function login(account, pass) {
     axios({
          url: 'https://q.denglu1.cn/user/login',
          method: 'post',
          data: {
               "phone_number": account,
               "password": pass
          },
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
     }).then(response => {
          console.log(response)
          //记录用户登录
          if (response.data.msg === '登陆成功') {
               datas.user.status = true
               datas.user.account = account
               datas.user.password = pass
               datas.user.token = response.data.token
               //保存用户信息到localStorage
               localStorage.setItem('account', account)
               localStorage.setItem('password', pass)
               if (route.query.redirect) {
                    router.push({ path: route.query.redirect })
               }
               else {
                    router.push({ path: '/' })
               }
          }
     }).catch(error => { console.log(error) })
}

const dataArr = [
     {
          name: 'username',
          tips: '请输入用户名'
     },
     {
          name: 'phone',
          tips: '请输入手机号'
     },
     {
          name: 'password',
          tips: '设置密码（8-20位字母、数字或特殊符号）'
     },]

let mes = reactive([]);
dataArr.forEach(item => {
     mes.push(item.tips)
});
function showDetail(item, index) {
     mes[index] = item.tips;
}
const show = ref(true)
</script>

<template>
<div>
     <div class="wrapper" v-show="show">
          <div class="title">
               <a @click="viewId = 0">
                    <h2>微信登录</h2>
               </a>
               <a @click="viewId = 1">
                    <h2>账号登录</h2>
               </a>
          </div>
          <input class="info" type="text" v-model="loginInfo.account" placeholder="用户名 / 手机号 / Email"
               onfocus="this.placeholder=''" onblur="this.placeholder='用户名 / 手机号 / Email'">
          <input class="info password" type="password" v-model="loginInfo.pass" placeholder="请输入登录密码"
               onfocus="this.placeholder=''" onblur="this.placeholder='请输入登录密码'">
          <input class="checkbox" type="checkbox">
          <p class="tips">下次自动登录</p>
          <a @click="show = !show" class="register">立即注册</a>
          <el-button class="loginbtn" type="primary" @click="login(loginInfo.account, loginInfo.pass)">登录</el-button>
     </div>

     <div class='register_wrapper' v-show="!show">
          <div class="innerbox">
               <h2>用户注册</h2>
               <img src="/circle.png" class="head" alt="">
               <el-button type="primary" class="upload">+上传头像</el-button><br>
               <div class="inputArr">
                    <input type="text" class='input' v-for="(item, index) of dataArr " :key="index"
                         :placeholder=mes[index] :name="item.name" @focus="mes[index] = ''"
                         @blur="showDetail(item, index)">
               </div>
          </div>

          <input type="checkbox" class="checkbox" id="checkbox1" name="">
          <p class="checkbox_detail">我同意<a href="">《用户隐私协议》</a>和<a href="">《隐私条款》</a></p>

          <el-button type="primary" class="sumbit">创建用户</el-button><br>
          <p class="login">已有账号？<a @click="show = !show">立即登录</a>
          </p>
     </div>
     </div>
</template>

<style lang="less" scoped>
@rem: 0.9px;
@a: 0.9px;

.wrapper {
     height: 400px;
     width: 450px;
}

.info {
     position: absolute;
     top: 100px;
     left: 60*@rem;
     width: 320*@rem;
     height: 44 *@rem;
     text-indent: 17px;
     border: 1px solid rgba(217, 217, 217, 1);
     border-radius: 5px;
     outline: none;

     &.password {
          top: 176*@rem;
     }

     &:first-child {
          top: 120*@rem;
     }

     &::placeholder {
          font-size: 12px;
          letter-spacing: 0px;
          line-height: 20px;
          color: rgba(217, 217, 217, 1);
          text-align: left;
          vertical-align: top;
     }

}

.checkbox {
     position: absolute;
     top: 239*@rem;
     left: 70*@rem;
     height: 15px;
     width: 15px;
     cursor: pointer;

     &::after {
          content: ' ';
          display: block;
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          width: 13px;
          height: 13px;
          padding-left: 1px;
          font-size: 10px;
          font-weight: bold;
          text-align: center;
          background-color: rgb(255, 255, 255);
          border: rgba(217, 217, 217, 1) solid 1px;
     }

     &:checked::after {
          content: "✓";
          color: rgba(255, 250, 250, 1);
          background-color: rgba(30, 111, 255, 1);
          background-clip: padding-box;
          border: transparent;
     }
}

.tips {
     position: absolute;
     left: 89*@rem;
     top: 236*@rem ;
     font-size: 10*@rem;
     letter-spacing: 0*@rem;
     line-height: 20*@rem;
     color: rgba(217, 217, 217, 1);
     text-align: left;
     vertical-align: top;
}

.loginbtn {
     width: 320*@rem;
     height: 44*@rem;
     position: absolute;
     bottom: 54*@rem;
     left: 50%;
     transform: translateX(-50%);
}

.register {
     font-size: 10*@rem;
     letter-spacing: 0*@rem;
     line-height: 20*@rem;
     position: absolute;
     top: 238*@rem;
     right: 72*@rem;
     color: rgba(71, 145, 255, 1);
     cursor: pointer;
}


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

.register_wrapper {
     height: 500px;
     width: 450px;

     .innerbox {
          position: absolute;
          left: 80*@a;
          top: 60*@a;

          img.head {
               width: 48*@a;
               height: 48*@a;
               position: absolute;
               left: 8*@a;
               top: 55*@a;
          }

          .upload {
               width: 80*@a;
               height: 22*@a;
               position: absolute;
               left: 86*@a;
               top: 71*@a;
               font-size: 10px;
               padding: 10px;
               background-color: rgba(30, 111, 255, 1);
          }

     }

     p {
          display: inline;
     }

     h2 {
          font-weight: bold;
          letter-spacing: 0*@a;
          line-height: 28*@a;
          font-size: 23px;
          float: left;
     }

     .inputArr {
          width: 320*@a;
          height: 200*@a;
          position: absolute;
          top: 118*@a;
          left: 0*@a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: b;

          .input {
               width: 350*@a;
               height: 54*@a;
               margin-top: 6*@a;
               text-indent: 14*@a;
               border: 1*@a solid rgba(217, 217, 217, 1);
               border-radius: 5*@a;
               outline: none;

               &::placeholder {
                    font-size: 12*@a;
                    letter-spacing: 0*@a;
                    line-height: 20*@a;
                    color: rgba(217, 217, 217, 1);
                    text-align: left;
                    vertical-align: top;
               }
          }
     }

     .checkbox {
          position: absolute;
          left: 91*@a;
          bottom: 129*@a;
          height: 15px;
          width: 15px;
          cursor: pointer;

          &::after {
               content: ' ';
               display: block;
               position: absolute;
               z-index: 5;
               top: 0;
               left: 0;
               width: 13px;
               height: 13px;
               padding-left: 1px;
               font-size: 10px;
               font-weight: bold;
               text-align: center;
               background-color: rgb(255, 255, 255);
               border: rgba(217, 217, 217, 1) solid 1px;
          }

          &:checked::after {
               content: "✓";
               color: rgba(255, 250, 250, 1);
               background-color: rgba(30, 111, 255, 1);
               background-clip: padding-box;
               border: transparent;
          }
     }

     .checkbox_detail {
          position: absolute;
          left: 120*@a;
          bottom: 127.7*@a;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0*@a;
          line-height: 20*@a;
          color: rgba(217, 217, 217, 1);

          a {
               color: rgba(71, 145, 255, 1);
          }
     }

     .sumbit {
          width: 350*@a;
          height: 54*@a;
          position: absolute;
          left: 80*@a;
          bottom: 52*@a;
          background-color: rgba(30, 111, 255, 1);
          border-radius: 10px;
     }

     .login {
          font-size: 10*@a;
          font-weight: 400;
          letter-spacing: 0*@a;
          line-height: 20*@a;
          position: absolute;
          bottom: 22*@a;
          left: 184*@a;
          color: rgba(217, 217, 217, 1);

          a {
               color: rgba(71, 145, 255, 1);
               cursor: pointer;
          }
     }

}
</style>
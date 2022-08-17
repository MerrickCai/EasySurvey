<script setup>
import { reactive } from 'vue';

//登录
const loginInfo = reactive({
     account: '',
     pass: ''
})
import axios from 'axios'
function login(account, pass) {
     axios({
          url: 'http://q.denglu1.cn:8080/user/login',
          method: 'post',
          data: {
               "phone_number": account,
               "password": pass
          },
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
     })
          .then(response => {
               console.log(response)
          })
          .catch(error => { console.log(error) })
}
</script>

<template>
     <div class="wrapper">

          <input class="info" type="text" v-model="loginInfo.account" placeholder="用户名 / 手机号 / Email"
               onfocus="this.placeholder=''" onblur="this.placeholder='用户名 / 手机号 / Email'">
          <input class="info password" type="password" v-model="loginInfo.pass" placeholder="请输入登录密码"
               onfocus="this.placeholder=''" onblur="this.placeholder='请输入登录密码'">

          <input class="checkbox" type="checkbox">
          <p class="tips">下次自动登录</p>
          <router-link class="register" to="/login/register" exact>立即注册</router-link>

          <el-button class="loginbtn" type="primary" @click="login(loginInfo.account, loginInfo.pass)">登录</el-button>

     </div>

     <router-view></router-view>
</template>

<style lang="less" scoped>
@rem: 0.9px;

/* 以1200为安全区  1200/1920=0.625*/
.wrapper {
     width: 440*@rem ;
     height: 380*@rem;
     position: relative;

     z-index: -1;

     .info {
          position: absolute;
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
     }
}
</style>